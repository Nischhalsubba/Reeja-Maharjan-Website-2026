import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('capture reviewable inner-page and research-section evidence', async ({ browser }) => {
  test.setTimeout(150_000);
  const checkpoints = [
    { width: 390, height: 844, label: 'mobile-390' },
    { width: 1440, height: 960, label: 'desktop-1440' }
  ];
  const routes = [
    { path: '/', name: 'home' },
    { path: '/clinical-research/', name: 'research' },
    { path: '/nursing-practice/', name: 'nursing' },
    { path: '/maternal-health/', name: 'maternal' },
    { path: '/contact/', name: 'contact' }
  ];

  for (const checkpoint of checkpoints) {
    const context = await browser.newContext({
      viewport: { width: checkpoint.width, height: checkpoint.height },
      reducedMotion: 'reduce',
      locale: 'en-US',
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(origin + route.path, { waitUntil: 'domcontentloaded' });
      expect(response?.ok(), route.path).toBeTruthy();
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `test-results/screenshots/${route.name}-${checkpoint.label}.png`,
        fullPage: false,
        animations: 'disabled'
      });
    }

    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
    const visual = page.locator('.slate-research');
    await visual.scrollIntoViewIfNeeded();
    await visual.screenshot({
      path: `test-results/screenshots/research-section-${checkpoint.label}.png`,
      animations: 'disabled'
    });
    await context.close();
  }
});
