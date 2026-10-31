import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const article = '/blog/gestational-diabetes-in-pregnancy-2026-monitoring-care/';

test('TOC heading and link text share one horizontal alignment', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + article, { waitUntil: 'domcontentloaded' });
  const toc = page.locator('.blog-toc');
  await expect(toc).toBeVisible();
  const info = await toc.evaluate(node => {
    const heading = node.querySelector('h2');
    const link = node.querySelector('nav a');
    if (!heading || !link) throw new Error('TOC heading or first link missing');
    const linkStyle = getComputedStyle(link);
    return {
      headingX: heading.getBoundingClientRect().left,
      linkTextX: link.getBoundingClientRect().left + parseFloat(linkStyle.paddingLeft) + parseFloat(linkStyle.borderLeftWidth),
      inset: parseFloat(getComputedStyle(node).paddingLeft),
      width: node.getBoundingClientRect().width,
      headingFont: getComputedStyle(heading).fontFamily,
      linkFont: linkStyle.fontFamily
    };
  });
  expect(info.inset).toBeGreaterThanOrEqual(16);
  expect(Math.abs(info.headingX - info.linkTextX)).toBeLessThanOrEqual(4);
  expect(info.width).toBeGreaterThan(180);
  expect(info.headingFont).toContain('Public Sans');
  expect(info.linkFont).toContain('Public Sans');
  await toc.locator('nav a').first().focus();
  await expect(toc.locator('nav a').first()).toBeFocused();
});

test('FAQ has one separating border, not two adjacent rules', async ({ page }) => {
  await page.goto(origin + article, { waitUntil: 'domcontentloaded' });
  const metrics = await page.locator('.blog-article__body > section#faq').evaluate(faq => {
    const previous = faq.previousElementSibling;
    const sources = document.querySelector('.blog-article__body > section#sources');
    if (!previous || !sources) throw new Error('FAQ neighbors missing');
    return {
      previousTag: previous.tagName,
      precedingBottom: getComputedStyle(previous).borderBottomWidth,
      faqTop: getComputedStyle(faq).borderTopWidth,
      faqBottom: getComputedStyle(faq).borderBottomWidth,
      sourcesTop: getComputedStyle(sources).borderTopWidth
    };
  });
  expect(metrics.previousTag).toBe('SECTION');
  expect(metrics.precedingBottom).toBe('0px');
  expect(metrics.faqTop).toBe('1px');
  expect(metrics.faqBottom).toBe('0px');
  expect(metrics.sourcesTop).toBe('1px');
});

test('sitewide font system uses Georgia display and Public Sans text', async ({ page }) => {
  const routes = [
    '/', '/cv/', '/blog/', '/nursing-practice/', '/maternal-health/',
    '/clinical-research/', '/hire-reeja/', '/contact/', article
  ];
  for (const route of routes) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    const fonts = await page.evaluate(() => {
      const heading = document.querySelector('main h1');
      const paragraph = document.querySelector('main p');
      if (!heading || !paragraph) throw new Error('Missing heading or paragraph');
      return { display: getComputedStyle(heading).fontFamily, reading: getComputedStyle(paragraph).fontFamily };
    });
    expect(fonts.display, route).toContain('Georgia');
    expect(fonts.reading, route).toContain('Public Sans');
  }
  await page.goto(origin + article, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#faq h2')).toHaveCSS('font-family', /Georgia/);
});

test('sidebar stays responsive without overflowing or losing its menu', async ({ browser }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(origin + article, { waitUntil: 'domcontentloaded' });
    const excess = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(excess, 'overflow at ' + width + 'px').toBeLessThanOrEqual(1);
    if (width <= 920) {
      const toggle = page.locator('.blog-toc__toggle');
      await expect(toggle).toBeVisible();
      await toggle.click();
      await expect(page.locator('.blog-toc nav a').first()).toBeVisible();
    }
    await ctx.close();
  }
});
