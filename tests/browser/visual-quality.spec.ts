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
  { name: 'hire', path: '/hire-reeja/' },
  { name: 'research', path: '/clinical-research/' },
  { name: 'maternal-health', path: '/maternal-health/' },
  { name: 'nursing-practice', path: '/nursing-practice/' },
  { name: 'blog', path: '/blog/' },
  { name: 'cv', path: '/cv/' }
];

test('Care Ledger remains composed across release viewports', async ({ browser }) => {
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
        scrollWidth: document.documentElement.scrollWidth
      }));
      expect(dimensions.scrollWidth, `${route.path} overflows at ${viewport.width}px`).toBeLessThanOrEqual(
        dimensions.clientWidth + 1
      );

      await expect(page.locator('body')).toHaveClass(/care-ledger/);
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