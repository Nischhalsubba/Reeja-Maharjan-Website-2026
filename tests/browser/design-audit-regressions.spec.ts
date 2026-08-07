import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

function matrixTranslateX(transform: string) {
  if (!transform || transform === 'none') return 0;
  const match = transform.match(/^matrix\(([^)]+)\)$/);
  if (!match) return 0;
  const values = match[1].split(',').map((value) => Number(value.trim()));
  return Number.isFinite(values[4]) ? values[4] : 0;
}

test('supporting-page hero rule clears the headline and metadata rows have real inset', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/hire-reeja/`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('.site-page__hero');
    const headline = document.querySelector<HTMLElement>('.site-page__hero h1');
    const firstRow = document.querySelector<HTMLElement>('.site-page__summary > div');
    if (!hero || !headline || !firstRow) throw new Error('Expected hiring hero elements were not found.');

    const pseudo = getComputedStyle(hero, '::before');
    const heroRect = hero.getBoundingClientRect();
    const headlineRect = headline.getBoundingClientRect();
    const transform = pseudo.transform;
    const matrixMatch = transform.match(/^matrix\(([^)]+)\)$/);
    const translateX = matrixMatch ? Number(matrixMatch[1].split(',')[4]?.trim() ?? 0) : 0;
    const ruleLeft = heroRect.left + Number.parseFloat(pseudo.left) + (Number.isFinite(translateX) ? translateX : 0);
    const rowStyle = getComputedStyle(firstRow);

    return {
      ruleGap: headlineRect.left - ruleLeft,
      paddingLeft: Number.parseFloat(rowStyle.paddingLeft),
      paddingRight: Number.parseFloat(rowStyle.paddingRight)
    };
  });

  expect(metrics.ruleGap).toBeGreaterThanOrEqual(16);
  expect(metrics.paddingLeft).toBeGreaterThanOrEqual(18);
  expect(metrics.paddingRight).toBeGreaterThanOrEqual(18);
});

test('Reeja portrait uses the headshot and never relies on a cropping fit', async ({ browser }) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 1050 }
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

    const portrait = page.locator('.ledger-portrait img');
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute('src', '/reeja-headshot.jpg');

    const imageState = await portrait.evaluate((image) => {
      const element = image as HTMLImageElement;
      const style = getComputedStyle(element);
      return {
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        minHeight: style.minHeight
      };
    });

    expect(imageState.naturalWidth).toBeGreaterThan(0);
    expect(imageState.naturalHeight).toBeGreaterThan(0);
    expect(imageState.objectFit).toBe('contain');
    expect(imageState.objectPosition).toContain('50%');
    expect(Number.parseFloat(imageState.minHeight)).toBe(0);

    await context.close();
  }
});
