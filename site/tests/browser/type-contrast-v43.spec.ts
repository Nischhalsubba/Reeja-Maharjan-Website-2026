import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

const luminance = (value: string): number => {
  const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error('Unexpected computed RGB: ' + value);
  const linear = channels.map(v => {
    const s = v / 255;
    return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
  });
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
};
const contrast = (foreground: string, background: string) => {
  const [a,b] = [luminance(foreground), luminance(background)].sort((x,y) => y-x);
  return (a+.05)/(b+.05);
};

test('homepage v5 dark CTA has visible white heading, and real homepage text is legible', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/', { waitUntil:'domcontentloaded' });
    const heading = page.locator('footer.site-footer--care .care-footer__intro h2');
    await expect(heading).toBeVisible();
    const fg = await heading.evaluate(el=>getComputedStyle(el).color);
    expect(contrast(fg,'rgb(21, 38, 79)'), 'Dark call-to-action heading').toBeGreaterThanOrEqual(4.5);
    for (const selector of ['.rv5-eyebrow', '.rv5-pillar p', '.rv5-career-card__org', '.rv5-writing-card h3', '.rv5-updates p:not(.rv5-eyebrow)']) {
      const element=page.locator(selector).first();
      await expect(element).toBeVisible();
      const px=await element.evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
      expect(px, selector + ' at '+width+'px').toBeGreaterThanOrEqual(14);
    }
    for (const selector of ['.cip-hero__lead', '.rv5-section-header__aside p', '.rv5-focus__inner > p:not(.rv5-eyebrow)']) {
      const element = page.locator(selector).first();
      await expect(element).toBeVisible();
      const px=await element.evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
      expect(px, selector + ' body copy').toBeGreaterThanOrEqual(16);
    }
  }
});

test('CV, article, contact and navigation text remain legible without coral metadata', async ({ page }) => {
  const cases = [
    { route: '/cv/', selectors: [
      '.site-eyebrow', '.site-page__summary dt', '.site-page__summary dd',
      '.cv-credential__issuer', '.cv-credential__verification', '.cv-experience__meta'
    ] },
    { route: '/blog/', selectors: ['.site-eyebrow', '.blog-card__meta'] },
    { route: '/blog/essential-maternal-newborn-care-guide-2026/', selectors: [
      '.blog-article__header .site-eyebrow', '.blog-article__meta-panel dt', '.blog-article__meta-panel dd'
    ] },
    { route: '/contact/', selectors: ['.contact-hero .site-eyebrow', '.form-field label', '.form-field__help'] }
  ];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const {route, selectors} of cases) {
      await page.goto(origin+route, {waitUntil:'domcontentloaded'});
      for (const selector of selectors) {
        const el = page.locator(selector).first();
        await expect(el, route+' '+selector).toBeVisible();
        const computed = await el.evaluate(node => ({
          color: getComputedStyle(node).color,
          px: parseFloat(getComputedStyle(node).fontSize)
        }));
        expect(computed.px, route+' '+selector+' at '+width+'px').toBeGreaterThanOrEqual(14);
        // All tested metadata is on light page/hero surfaces.
        expect(contrast(computed.color, 'rgb(240, 239, 255)'), route+' '+selector+' contrast').toBeGreaterThanOrEqual(4.5);
      }
    }
    await page.goto(origin+'/', {waitUntil:'domcontentloaded'});
    const navSelector = width >= 1080 ? '.desktop-nav a' : '.menu-toggle';
    const nav = page.locator(navSelector).first();
    await expect(nav).toBeVisible();
    const px = await nav.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(px, navSelector+' at '+width+'px').toBeGreaterThanOrEqual(15);
  }
});
