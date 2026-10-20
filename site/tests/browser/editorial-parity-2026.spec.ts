import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('active and hovered desktop navigation always have visible labels', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });

  const home = page.locator('.desktop-nav > a[aria-current="page"]').first();
  await expect(home).toBeVisible();
  const active = await home.evaluate((el) => ({
    color: getComputedStyle(el).color,
    background: getComputedStyle(el).backgroundColor
  }));
  expect(active.color).toBe('rgb(23, 25, 26)');
  expect(active.background).not.toBe('rgb(234, 240, 245)');
  expect(active.background).not.toBe('rgb(28, 44, 58)');

  await home.hover();
  await expect.poll(() => home.evaluate(el => getComputedStyle(el).color)).toBe('rgb(23, 25, 26)');

  const research = page.locator('.desktop-nav > a[href="/clinical-research/"]');
  await research.hover();
  await expect.poll(() => research.evaluate(el => getComputedStyle(el).color)).toBe('rgb(23, 25, 26)');

  await research.focus();
  await expect(research).toBeFocused();
});

test('inner routes follow the shared slate/seafoam hero and editorial typography', async ({ page }) => {
  const routes = [
    ['/clinical-research/', '.site-page__hero'],
    ['/maternal-health/', '.site-page__hero'],
    ['/nursing-practice/', '.site-page__hero'],
    ['/hire-reeja/', '.site-page__hero'],
    ['/cv/', '.site-page__hero'],
    ['/contact/', '.contact-hero'],
    ['/blog/', '.blog-index__hero'],
    ['/blog/essential-maternal-newborn-care-guide-2026/', '.blog-article__header']
  ] as const;
  await page.setViewportSize({ width: 1440, height: 980 });
  for (const [route, selector] of routes) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    const data = await page.locator(selector).evaluate((el) => {
      const h1 = el.querySelector('h1');
      return {
        heroBackground: getComputedStyle(el).backgroundImage,
        h1Color: h1 ? getComputedStyle(h1).color : 'missing',
        h1Font: h1 ? getComputedStyle(h1).fontFamily : 'missing'
      };
    });
    expect(data.heroBackground, route).toContain('linear-gradient');
    expect(data.heroBackground, route).toContain('16, 28, 41');
    expect(data.h1Color, route).toBe('rgb(255, 255, 255)');
    expect(data.h1Font, route).toContain('Georgia');
  }
});

test('research visual is a scalable, accurate editorial asset, not a fictional dashboard', async ({ page }) => {
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const illustration = page.locator('.rm-research__photo > img');
  await expect(illustration).toHaveAttribute('src', /images\.unsplash\.com/);
  await expect(illustration).toHaveAttribute('width', '700');
  await expect(illustration).toHaveAttribute('height', '790');
  await expect(illustration).toHaveAttribute('alt', /Illustrative/);
  await illustration.scrollIntoViewIfNeeded();
  await expect.poll(async () => illustration.evaluate((el) => (el as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);

  await page.goto(origin + '/clinical-research/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.cip-photo-band--care-journey > img')).toHaveAttribute('src', '/images/mom-hd-care-journey.svg');
  await expect(page.locator('.cip-photo-band--care-journey .cip-photo-band__credit')).toContainText('No patient data');
});

test('site remains horizontally scroll-free across editorial routes at narrow widths', async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/clinical-research/', '/nursing-practice/', '/contact/', '/blog/']) {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `Unexpected horizontal scrolling: ${route} @ ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});
