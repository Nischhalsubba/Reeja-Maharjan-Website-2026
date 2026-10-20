import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 1050 }
];
const routes = [
  { name: 'home', path: '/' },
  { name: 'contact', path: '/contact/' },
  { name: 'hire', path: '/hire-reeja/' },
  { name: 'research', path: '/clinical-research/' },
  { name: 'maternal-health', path: '/maternal-health/' },
  { name: 'nursing-practice', path: '/nursing-practice/' },
  { name: 'blog', path: '/blog/' },
  { name: 'article', path: '/blog/essential-maternal-newborn-care-guide-2026/' },
  { name: 'cv', path: '/cv/' },
  { name: 'not-found', path: '/field-journal-page-not-found/' }
];

test('Care is Personal remains composed across release viewports', async ({ browser }) => {
  test.setTimeout(180_000);

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    for (const route of routes) {
      await page.goto(`${origin}${route.path}`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
      });

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        designSystem: document.body.dataset.designSystem,
        background: getComputedStyle(document.body).backgroundColor
      }));
      expect(dimensions.scrollWidth, `${route.path} overflows at ${viewport.width}px`).toBeLessThanOrEqual(
        dimensions.clientWidth + 1
      );
      expect(dimensions.designSystem).toBe('care-is-personal');
      expect(dimensions.background).toBe(route.path === '/' ? 'rgb(250, 250, 248)' : 'rgb(255, 255, 255)');

      await expect(page.locator('body')).toHaveClass(/care-personal-site/);
      await expect(page.locator('main')).toBeVisible();
      await page.screenshot({
        path: `test-results/visual/${viewport.name}/${route.name}.png`,
        fullPage: true,
        animations: 'disabled'
      });
    }

    await context.close();
  }
});
