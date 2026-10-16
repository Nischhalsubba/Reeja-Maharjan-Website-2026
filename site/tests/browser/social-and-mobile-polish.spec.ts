import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const pages = [
  { route: '/', prefix: '/og-default.png' },
  { route: '/blog/mastering-nursing-documentation-sbar-handover/', prefix: '/og/articles/mastering-nursing-documentation-sbar-handover.png' },
  { route: '/blog/essential-maternal-newborn-care-guide-2026/', prefix: '/og/articles/essential-maternal-newborn-care-guide-2026.png' }
];

test('all social previews serve actual generated PNG images and never stale SVG metadata', async ({ page, request }) => {
  for (const { route, prefix } of pages) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    const og = page.locator('meta[property="og:image"]');
    const twitter = page.locator('meta[name="twitter:image"]');
    const source = await og.getAttribute('content');
    expect(source, 'Open Graph must reference PNG social asset').toContain(prefix);
    expect(await twitter.getAttribute('content')).toContain(prefix);
    const response = await request.get(source!);
    expect(response.ok(), prefix).toBe(true);
    expect(response.headers()['content-type']).toMatch(/image\/png/);
    const data = await response.body();
    expect(data.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(data.byteLength).toBeGreaterThan(1000);
  }
});

test('mobile page headlines remain readable and footer typography is legible', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const route of ['/', '/cv/', '/clinical-research/', '/nursing-practice/', '/maternal-health/', '/blog/']) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    const heading = page.locator('main h1').first();
    const layout = await heading.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const css = getComputedStyle(el);
      return { height: r.height, width: r.width, lineHeight: parseFloat(css.lineHeight), fontSize: parseFloat(css.fontSize) };
    });
    expect(layout.height / layout.lineHeight, 'Mobile H1 is too tall for ' + route).toBeLessThanOrEqual(6.3);
    expect(layout.fontSize).toBeGreaterThanOrEqual(30);
    const footer = page.locator('.care-footer__bottom');
    await expect(footer).toBeVisible();
    const font = await footer.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(font, 'Legal copy too small for ' + route).toBeGreaterThanOrEqual(13);
  }
  await context.close();
});
