import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test.use({ viewport: { width: 320, height: 800 }, reducedMotion: 'reduce' });

test('mobile navigation manages focus and keyboard closure', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto(origin, { waitUntil: 'networkidle' });
  const toggle = page.locator('.menu-toggle');
  const nav = page.locator('#mobile-nav');
  const close = page.locator('[data-mobile-nav-close]');

  await toggle.focus();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toHaveAttribute('aria-hidden', 'false');
  await expect(close).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert', '');

  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#mobile-nav a').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).toHaveAttribute('aria-hidden', 'true');
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  expect(errors).toEqual([]);
});
