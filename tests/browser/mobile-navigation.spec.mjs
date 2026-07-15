import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test.use({ viewport: { width: 320, height: 800 }, reducedMotion: 'reduce' });

test('mobile navigation exposes dialog semantics and manages focus', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto(origin, { waitUntil: 'networkidle' });
  const toggle = page.getByRole('button', { name: 'Menu' });
  const dialogElement = page.locator('#mobile-nav');

  await expect(toggle).toHaveAttribute('aria-haspopup', 'dialog');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(dialogElement).toHaveAttribute('role', 'dialog');
  await expect(dialogElement).toHaveAttribute('aria-modal', 'true');
  await expect(dialogElement).toHaveAttribute('aria-hidden', 'true');

  await toggle.focus();
  await toggle.click();

  const dialog = page.getByRole('dialog', { name: 'Mobile navigation' });
  const close = dialog.getByRole('button', { name: 'Close menu' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(dialog).toHaveAttribute('aria-hidden', 'false');
  await expect(close).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert', '');

  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(dialogElement).toHaveAttribute('aria-hidden', 'true');
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  expect(errors).toEqual([]);
});
