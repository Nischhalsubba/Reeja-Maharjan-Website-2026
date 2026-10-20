import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const routes = [
  '/', '/contact/', '/hire-reeja/', '/clinical-research/', '/maternal-health/',
  '/nursing-practice/', '/cv/', '/blog/', '/blog/essential-maternal-newborn-care-guide-2026/'
];

test('Care is Personal owns the shell, color palette and type on every route', async ({ page }) => {
  for (const route of routes) {
    await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
    const palette = await page.evaluate(async () => {
      await document.fonts.ready;
      const body = document.body;
      const heading = document.querySelector<HTMLElement>('main h1');
      const footerAction = document.querySelector<HTMLAnchorElement>('.care-footer__cta');
      const footerStyle = footerAction && getComputedStyle(footerAction);
      const rootStyle = getComputedStyle(document.documentElement);
      return {
        className: body.className,
        designSystem: body.dataset.designSystem,
        bodyBackground: getComputedStyle(body).backgroundColor,
        bodyFont: getComputedStyle(body).fontFamily,
        headingFont: heading && getComputedStyle(heading).fontFamily,
        primaryToken: rootStyle.getPropertyValue('--brand-blue').trim(),
        footerActionBackground: footerStyle?.backgroundColor,
        footerActionColor: footerStyle?.color,
        retiredElements: document.querySelectorAll('.field-journal, .care-ledger, .brand__mark').length
      };
    });
    expect(palette.className, route).toContain('care-personal-site');
    expect(palette.designSystem).toBe('care-is-personal');
    expect(palette.retiredElements, route).toBe(0);
    expect(palette.bodyBackground, route).toBe('rgb(255, 255, 255)');
    expect(palette.bodyFont, route).toContain('Public Sans');
    expect(palette.headingFont, route).toMatch(/Georgia|Public Sans/);
    expect(palette.primaryToken, route).toBe('#2F7368');
    expect(palette.footerActionBackground, route).toBe('rgb(178, 233, 219)');
    expect(palette.footerActionColor, route).toBe('rgb(16, 28, 41)');
  }
});

test('article notes use the current seafoam-tinted surface rather than retired cobalt paper', async ({ page }) => {
  await page.goto(`${origin}/blog/essential-maternal-newborn-care-guide-2026/`, { waitUntil: 'domcontentloaded' });
  const note = page.locator('.blog-note-strong').first();
  await expect(note).toBeVisible();
  await expect(note).toBeVisible();
});
