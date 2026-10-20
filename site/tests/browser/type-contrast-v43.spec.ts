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

test('Slate hero and article typography meet minimum readable size',async({page})=>{
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  for(const selector of ['.slate-hero__lede','.slate-heading>div:last-child>p','.slate-focus__card>p']){
   const el=page.locator(selector).first();await expect(el).toBeVisible();
   expect(await el.evaluate(n=>parseFloat(getComputedStyle(n).fontSize))).toBeGreaterThanOrEqual(14);
  }
  await expect(page.locator('.slate-contact h2')).toBeVisible();
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
          px: parseFloat(getComputedStyle(node).fontSize),
          dark: Boolean(node.closest('.site-page__hero,.contact-hero,.blog-article__header,.blog-index__hero,.cv-page__hero'))
        }));
        expect(computed.px, route+' '+selector+' at '+width+'px').toBeGreaterThanOrEqual(14);
        // The redesigned editorial heroes are deep slate, while article, CV and form details remain on light surfaces.
        const surface = computed.dark ? 'rgb(28, 44, 58)' : 'rgb(234, 240, 245)';
        expect(contrast(computed.color, surface), route+' '+selector+' contrast').toBeGreaterThanOrEqual(4.5);
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
