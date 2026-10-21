import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

function luminance(rgb: string): number {
  const channels = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Invalid computed RGB color: ${rgb}`);
  const [r, g, b] = channels.map((v) => {
    const x = v / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

function contrast(a: string, b: string): number {
  const [bright, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (bright + 0.05) / (dark + 0.05);
}

test('shared navigation, home CTA and footer links keep legible monochrome states', async ({ browser }) => {
  test.setTimeout(100_000);
  for(const width of [375,1440]){
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    for(const route of ['/','/cv/','/blog/mastering-nursing-documentation-sbar-handover/']){
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      const footer=page.locator('.care-footer__column a').first();
      await footer.scrollIntoViewIfNeeded();
      const footerColors=await footer.evaluate(el=>({fg:getComputedStyle(el).color,bg:getComputedStyle(el.closest('footer')!).backgroundColor}));
      expect(contrast(footerColors.fg,footerColors.bg),'footer contrast '+route+' @ '+width).toBeGreaterThanOrEqual(4.5);
      if(width===1440){
        const nav=page.locator('.desktop-nav .nav-cta');
        await expect(nav).toBeVisible();
        const values=await nav.evaluate(el=>({fg:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
        expect(contrast(values.fg,values.bg)).toBeGreaterThanOrEqual(4.5);
        await nav.focus();await expect(nav).toBeFocused();
        expect(await nav.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
      }
      if(route==='/'){
        const cta=page.locator('.rm-contact a.rm-button--primary');
        await expect(cta).toBeVisible();
        await expect(cta).toHaveAttribute('href','/contact/');
        const read=async()=>cta.evaluate(el=>({fg:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
        let vals=await read();
        expect(contrast(vals.fg,vals.bg)).toBeGreaterThanOrEqual(4.5);
        await cta.hover(); vals=await read();
        expect(contrast(vals.fg,vals.bg)).toBeGreaterThanOrEqual(4.5);
        await cta.focus();
        expect(await cta.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
      }
    }
    await ctx.close();
  }
});

test('footer back-to-top control targets the document start', async ({ page }) => {
  await page.goto(`${origin}/blog/mastering-nursing-documentation-sbar-handover/`, { waitUntil: 'domcontentloaded' });
  const back = page.getByRole('link', { name: /Back to top/ });
  await expect(back).toHaveAttribute('href', '#page-top');
  expect(await page.locator('#page-top').count()).toBe(1);
});
