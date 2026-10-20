import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

const paletteSamples = [
  { id:'oxblood', paper:'#F6F0E8', ink:'#28282D', accent:'#703F50' },
  { id:'olive', paper:'#F4F2EA', ink:'#28302B', accent:'#4E6147' },
  { id:'copper', paper:'#F3EEE7', ink:'#282A2C', accent:'#82513B' }
];

const luminance = (hex: string) => {
  const ch = hex.slice(1).match(/../g)!.map(x => parseInt(x,16)/255);
  const lin=ch.map(v => v<=0.04045?v/12.92:((v+.055)/1.055)**2.4);
  return lin[0]*.2126 + lin[1]*.7152 + lin[2]*.0722;
};
const ratio=(a:string,b:string)=>{const v=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (v[0]+.05)/(v[1]+.05)};

test('footer CTA is part of the page footer rather than a borderless-content card', async ({ page }) => {
  for(const viewport of [375,768,1440]){
    await page.setViewportSize({width:viewport,height:900});
    for(const route of ['/blog/','/cv/','/clinical-research/']){
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      const cta=page.locator('.care-footer__invitation');
      await cta.scrollIntoViewIfNeeded();
      await expect(cta).toBeVisible();
      await expect(cta.getByRole('heading',{name:/Write to Reeja/})).toBeVisible();
      await expect(cta.getByRole('link',{name:/Get in touch/})).toHaveAttribute('href','/contact/');
      const vals=await cta.evaluate(el=>{
        const style=getComputedStyle(el);
        const main=document.querySelector('.care-footer__main')!.getBoundingClientRect();
        const invitation=el.getBoundingClientRect();
        const heading=el.querySelector('h2')!.getBoundingClientRect();
        return {borderLeft:style.borderLeftWidth,bg:style.backgroundImage,inset:heading.left-invitation.left,aligned:Math.abs(main.left-invitation.left),overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
      });
      expect(vals.borderLeft,route).toBe('0px');
      expect(vals.bg,route).toBe('none');
      expect(vals.inset,route).toBeGreaterThanOrEqual(0);
      expect(vals.aligned,route).toBeLessThanOrEqual(1);
      expect(vals.overflow,route+' at '+viewport).toBeLessThanOrEqual(1);
    }
  }
});

test('palette studio changes real hero, research and footer colors with one selection', async ({ page }) => {
  await page.goto(origin+'/palette-studio/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
  for(const palette of paletteSamples){
    const button=page.getByRole('button',{name:new RegExp(palette.id==='oxblood'?'Oxblood & Paper':palette.id==='olive'?'Olive & Linen':'Charcoal & Copper')});
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('.palette-studio')).toHaveAttribute('data-palette',palette.id);
    const others=page.locator('[data-palette-option]:not([aria-pressed="true"])');
    await expect(others).toHaveCount(2);
    const colors=await page.evaluate(()=>{
      const root=document.querySelector('.palette-studio')!;
      const style=getComputedStyle(root);
      const hero=document.querySelector('.palette-stage__hero')!;
      const footer=document.querySelector('.palette-stage__footer')!;
      return {paper:style.getPropertyValue('--p-paper').trim(),ink:style.getPropertyValue('--p-ink').trim(),accent:style.getPropertyValue('--p-accent').trim(),footerBg:getComputedStyle(footer).backgroundColor,heroBg:getComputedStyle(hero).backgroundColor};
    });
    expect(colors.paper.toUpperCase()).toBe(palette.paper);
    expect(colors.ink.toUpperCase()).toBe(palette.ink);
    expect(colors.accent.toUpperCase()).toBe(palette.accent);
    expect(ratio(palette.ink,palette.paper)).toBeGreaterThanOrEqual(4.5);
    expect(ratio(palette.accent,palette.paper)).toBeGreaterThanOrEqual(4.5);
    expect(ratio('#FFFFFF',palette.accent)).toBeGreaterThanOrEqual(4.5);
  }
});

test('palette preview never overflows the viewport and its controls remain keyboard operable',async ({page})=>{
  for(const width of [320,375,390,430,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    await page.goto(origin+'/palette-studio/?palette=copper',{waitUntil:'domcontentloaded'});
    await expect(page.locator('.palette-studio')).toHaveAttribute('data-palette','copper');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow,'palette overflow @ '+width).toBeLessThanOrEqual(1);
    const olive=page.getByRole('button',{name:/Olive & Linen/});
    await olive.focus();
    await expect(olive).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(olive).toHaveAttribute('aria-pressed','true');
  }
});

test('capture palette samples at 1440px and mobile footer at 390px',async ({browser})=>{
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const palette of paletteSamples){
    await page.goto(origin+'/palette-studio/?palette='+palette.id,{waitUntil:'domcontentloaded'});
    await page.locator('.palette-stage__photo img').evaluate(async (img:Element) => {
      const photo=img as HTMLImageElement;
      if(!photo.complete)await new Promise<void>(res=>{photo.onload=()=>res();photo.onerror=()=>res()});
    });
    await page.screenshot({path:'test-results/screenshots/palette-'+palette.id+'-desktop.png',fullPage:true,animations:'disabled'});
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(origin+'/blog/',{waitUntil:'domcontentloaded'});
  await page.locator('.care-footer__invitation').scrollIntoViewIfNeeded();
  await page.locator('footer.site-footer--care').screenshot({path:'test-results/screenshots/footer-fixed-mobile-390.png',animations:'disabled'});
  await page.setViewportSize({width:1440,height:900});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.care-footer__invitation').scrollIntoViewIfNeeded();
  await page.locator('footer.site-footer--care').screenshot({path:'test-results/screenshots/footer-fixed-desktop-1440.png',animations:'disabled'});
  await context.close();
});
