import { test, expect } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('reference-inspired navigation opens visual experience menu and real inner routes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin);
  await page.locator('.menupop summary').click();
  await expect(page.locator('.reference-mega .mega-grid a')).toHaveCount(3);
  await expect(page.locator('.reference-mega')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.menupop')).not.toHaveAttribute('open', '');
  await page.locator('.desktop-nav a[href="/about/"]').click();
  await expect(page.locator('main h1')).toHaveText(/Care, research and/);
  await expect(page.locator('.reference-timeline > li').first()).toBeAttached();
  await page.goto(`${origin}/experience/`);
  await page.getByRole('button', { name: 'Clinical research' }).click();
  await expect(page.locator('[data-experience-category]:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'All experience' }).click();
  await expect(page.locator('[data-experience-category]:visible')).toHaveCount(4);
});

test('hero copy receives a contrast backing as video approaches front profile', async ({ page }) => {
  await page.goto(origin);
  await expect(page.locator('.hero-track')).toHaveClass(/has-film/);
  await page.evaluate(() => window.scrollTo({top:(document.querySelector('.hero-track')!.getBoundingClientRect().height-innerHeight)/2,behavior:'instant'}));
  await expect.poll(() => page.locator('.hero-track').evaluate(el=>Number((el as HTMLElement).style.getPropertyValue('--hero-copy-shade')))).toBeGreaterThan(.8);
});

test('visual regression: fixed contrast, bounded experience navigation and usable contact grid', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(origin);
  await expect(page.locator('.hero-bottom > div').first()).toHaveCSS('background-color', 'rgb(250, 248, 233)');
  await expect(page.locator('.site-header')).toHaveCSS('background-color', 'rgb(250, 248, 233)');
  await page.locator('.menupop summary').click();
  for (const image of await page.locator('.mega-grid img').all()) {
    expect((await image.boundingBox())!.height).toBeLessThanOrEqual(220);
  }
  await page.goto(`${origin}/contact/`);
  const form = page.locator('.professional-contact-form');
  const copy = page.locator('.contact-hero__copy');
  expect((await form.boundingBox())!.width).toBeGreaterThan(500);
  expect(Math.abs((await form.boundingBox())!.y - (await copy.boundingBox())!.y)).toBeLessThan(40);
  await expect(page.locator('.professional-contact-form__privacy')).toHaveCSS('background-color', 'rgb(36, 36, 36)');
  await page.goto(`${origin}/nursing-practice/`);
  await expect(page.locator('.site-section--dark h2').first()).toHaveCSS('color', 'rgb(250, 248, 233)');
  await expect(page.locator('.care-footer__column a').first()).toHaveCSS('color', 'rgb(233, 231, 219)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/contact/`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
