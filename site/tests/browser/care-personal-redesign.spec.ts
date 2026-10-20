import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('Care is Personal design language is consistent across inner routes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    '/clinical-research/', '/nursing-practice/', '/maternal-health/',
    '/hire-reeja/', '/contact/', '/blog/',
    '/blog/essential-maternal-newborn-care-guide-2026/'
  ]) {
    await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main h1').first()).toBeVisible();

    const metrics = await page.evaluate(() => {
      const heading = document.querySelector<HTMLElement>('main h1');
      return {
        bodyBackground: getComputedStyle(document.body).backgroundColor,
        headingFamily: heading && getComputedStyle(heading).fontFamily,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        photo: Boolean(document.querySelector('.cip-photo-band img')),
      };
    });
    expect(metrics.bodyBackground).toBe('rgb(255, 255, 255)');
    expect(metrics.headingFamily).toContain('Georgia');
    expect(metrics.overflow, `Overflow on ${path}`).toBeLessThanOrEqual(1);
    expect(metrics.photo, `Missing illustrative photo on ${path}`).toBe(true);
    await expect(page.locator('.cip-photo-band__credit')).toBeVisible();
  }
});

test('Licensed imagery loads and exposes source credit', async ({ page }) => {
  await page.goto(origin + '/nursing-practice/', { waitUntil: 'domcontentloaded' });
  const image = page.locator('.cip-photo-band img');
  await image.scrollIntoViewIfNeeded();
  await expect.poll(async () => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), {
    timeout: 25000,
    message: 'The public Unsplash image should load successfully'
  }).toBe(true);
  await expect(page.getByRole('link', { name: /Photo: Luis Melendez/ })).toBeVisible();
});

test('Reduced motion does not conceal sections or interfere with links', async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1, name: /Reeja\s*Maharjan\./ })).toBeVisible();
  const revealState = await page.locator('.rm-experience__grid').evaluate((element) => getComputedStyle(element).visibility);
  expect(revealState).not.toBe('hidden');
  await expect(page.getByRole('link', { name: /Get in touch/ }).first()).toHaveAttribute('href', '/contact/');
  await context.close();
});
