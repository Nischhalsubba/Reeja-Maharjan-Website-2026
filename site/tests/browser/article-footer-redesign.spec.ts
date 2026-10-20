import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const articlePaths = [
  '/blog/mastering-nursing-documentation-sbar-handover/',
  '/blog/essential-maternal-newborn-care-guide-2026/'
];

test('all article detail headers have a wide reading masthead and metadata below the title', async ({ browser }) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    for (const path of articlePaths) {
      await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1')).toBeVisible();
      const article = page.locator('.site-article.blog-article');
      const masthead = page.locator('.blog-article__intro');
      const title = masthead.locator('h1');
      const metadata = masthead.locator('.blog-article__meta-panel');
      await expect(metadata.locator('div')).toHaveCount(5);
      const sizes = await page.evaluate(() => {
        const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
        const outer = rect('.blog-article');
        const header = rect('.blog-article__intro');
        const titleRect = rect('.blog-article__intro h1');
        const meta = rect('.blog-article__meta-panel');
        return {
          outerWidth: outer.width, headerWidth: header.width, titleWidth: titleRect.width,
          metaTop: meta.top, titleBottom: titleRect.bottom,
          viewport: document.documentElement.clientWidth,
          documentWidth: document.documentElement.scrollWidth
        };
      });
      expect(sizes.documentWidth, `${path} horizontal overflow at ${width}px`).toBeLessThanOrEqual(sizes.viewport + 1);
      expect(sizes.metaTop, 'Metadata should follow the full-width headline').toBeGreaterThan(sizes.titleBottom);
      if (width >= 1024) {
        expect(sizes.outerWidth, 'The outer article should not be clamped to the old 860px width').toBeGreaterThan(950);
        expect(sizes.headerWidth).toBeGreaterThan(900);
        expect(sizes.titleWidth).toBeGreaterThan(width >= 1440 ? 850 : 680);
      } else {
        expect(sizes.headerWidth).toBeGreaterThan(width - 160);
      }
      await expect(title).toHaveCSS('font-family', /Georgia/);
      await expect(article).toBeVisible();
    }
    await context.close();
  }
});

test('redesigned footer is consistent and accessible on homepage and article', async ({ browser }) => {
  for (const width of [320, 375, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    for (const path of ['/', '/blog/mastering-nursing-documentation-sbar-handover/', '/cv/']) {
      await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
      const footer = page.locator('footer.site-footer--care');
      await expect(footer).toBeVisible();
      if(path==='/') await expect(page.locator('.slate-contact h2')).toBeVisible();
      else await expect(footer.getByRole('heading',{name:/Write to Reeja/})).toBeVisible();
      if(path==='/') await expect(page.locator('.slate-contact').getByRole('link',{name:/Get in touch/})).toHaveAttribute('href','/contact/');
      else await expect(footer.getByRole('link',{name:/Get in touch/})).toHaveAttribute('href','/contact/');
      await expect(footer.getByRole('navigation', { name: "Explore Reeja's website" })).toBeVisible();
      await expect(footer.getByRole('navigation', { name: 'Professional resources' })).toBeVisible();
      await expect(footer.locator('.cip-image-credits')).toHaveCount(1);
      await expect(footer.getByRole('link', { name: /Back to top/ })).toHaveAttribute('href', '#page-top');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} footer overflow at ${width}px`).toBeLessThanOrEqual(1);
    }
    await context.close();
  }
});
