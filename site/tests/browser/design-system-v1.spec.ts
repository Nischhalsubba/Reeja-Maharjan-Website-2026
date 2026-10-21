import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('design reference is accessible, intentionally non-indexed and uses the real components', async ({ page }) => {
  await page.goto(origin + '/design-system/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Care is personal');
  await expect(page.locator('.ds-lab__swatch')).toHaveCount(12);
  await expect(page.locator('.ds-card')).toHaveCount(3);
  await expect(page.locator('.ds-evidence dt')).toHaveCount(3);
  await expect(page.locator('.ds-action--primary').first()).toHaveAttribute('href', '/contact/');
  await expect(page.getByRole('button', { name: 'Not available' })).toBeDisabled();
  await expect(page.locator('.ds-lab a[target="_blank"]')).toHaveCount(0);
});

test('design-system layout reflows without horizontal scrolling', async ({ browser }) => {
  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(origin + '/design-system/', { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      headings: document.querySelectorAll('main h1').length,
      unlabeledInputs: [...document.querySelectorAll<HTMLInputElement>('main input')].filter(el => !el.labels?.length)
    }));
    expect(data.overflow, 'DS overflow at ' + width).toBeLessThanOrEqual(1);
    expect(data.headings).toBe(1);
    expect(data.unlabeledInputs.length).toBe(0);
    await context.close();
  }
});

test('component actions and focus states have semantic output', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/design-system/', { waitUntil: 'domcontentloaded' });
  const primary = page.locator('.ds-lab__canvas .ds-action--primary').first();
  await primary.focus();
  await expect(primary).toBeFocused();
  await expect(primary).toHaveCSS('min-height', '44px');
  const styles = await primary.evaluate(node => {
    const s = getComputedStyle(node);
    return { outline: s.outlineStyle, foreground: s.color, background: s.backgroundColor };
  });
  expect(styles.outline).not.toBe('none');
  expect(styles.foreground).toBe('rgb(255, 255, 255)');
  expect(styles.background).toBe('rgb(49, 53, 54)');
});

test('real professional pages consume shared DS components', async ({ page }) => {
  for (const route of ['/clinical-research/', '/hire-reeja/', '/nursing-practice/', '/maternal-health/']) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.ds-evidence').first()).toBeVisible();
    await expect(page.locator('.ds-card').first()).toBeVisible();
  }
});
