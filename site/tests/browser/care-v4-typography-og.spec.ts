import { test, expect } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const pages = [
  '/', '/nursing-practice/', '/clinical-research/', '/maternal-health/',
  '/hire-reeja/', '/cv/', '/contact/', '/blog/',
  '/blog/mastering-nursing-documentation-sbar-handover/'
];

test('all major templates use Care is Personal v4 without old theme, unreadable type or overflow', async ({browser}) => {
  test.setTimeout(200_000);
  for(const width of [320,390,768,1440]){
    const context = await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce'});
    const page = await context.newPage();
    for(const path of pages){
      await page.goto(origin + path, {waitUntil:'domcontentloaded'});
      const state = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('main h1');
        const styles = el ? getComputedStyle(el) : null;
        return {
          system: document.body.dataset.designSystem,
          version: document.body.dataset.designVersion,
          font: styles?.fontFamily ?? '',
          size: styles ? Number.parseFloat(styles.fontSize) : 0,
          lineHeight: styles ? Number.parseFloat(styles.lineHeight) : 0,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
        };
      });
      expect(state.system).toBe('care-is-personal');
      expect(state.version).toBe('7.0.0-care-personal');
      expect(state.font).toContain('Public Sans');
      expect(state.overflow, `${path} horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
      expect(state.size, `${path} undersized page heading at ${width}px`).toBeGreaterThanOrEqual(width <= 390 ? 28 : 36);
      if (path !== '/') expect(state.lineHeight / state.size, `${path} compressed heading`).toBeGreaterThanOrEqual(1);
    }
    await context.close();
  }
});

test('homepage and article share PNG social cards that really exist', async ({page,request}) => {
  for (const [path,expected] of [
    ['/', '/og-default.png'],
    ['/blog/mastering-nursing-documentation-sbar-handover/', '/og/articles/mastering-nursing-documentation-sbar-handover.png'],
    ['/blog/essential-maternal-newborn-care-guide-2026/', '/og/articles/essential-maternal-newborn-care-guide-2026.png']
  ]) {
    await page.goto(origin + path, { waitUntil:'domcontentloaded' });
    const image = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(image).toContain(expected);
    const response = await request.get(new URL(expected,origin).toString());
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const bytes = await response.body();
    expect(bytes.length).toBeGreaterThan(1800);
    expect(Array.from(bytes.subarray(0,8))).toEqual([137,80,78,71,13,10,26,10]);
  }
});

test('high contrast keyboard focus on light inner pages and on dark footer', async ({ page }) => {
  await page.goto(origin + '/clinical-research/', {waitUntil:'domcontentloaded'});
  const nav = page.locator('.desktop-nav a').first();
  await nav.focus();
  await expect(nav).toHaveCSS('outline-color','rgb(25, 56, 172)');
  const footer = page.locator('.care-footer__bottom a[href="#page-top"]');
  await footer.focus();
  await expect(footer).toHaveCSS('outline-color','rgb(255, 255, 255)');
});
