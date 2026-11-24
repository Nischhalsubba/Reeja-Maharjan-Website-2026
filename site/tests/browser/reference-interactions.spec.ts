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
