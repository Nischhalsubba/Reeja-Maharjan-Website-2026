import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('clinical portrait remains uncropped, hero ends with its photo, and offscreen images are lazy',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const portrait=page.locator('.rm-experience__photo img');
  await portrait.scrollIntoViewIfNeeded();
  await expect.poll(()=>portrait.evaluate(e=>(e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const metric=await portrait.evaluate((image)=>{
    const img=image as HTMLImageElement;
    const rect=img.getBoundingClientRect();
    const style=getComputedStyle(img);
    return {ratio:rect.width/rect.height,naturalRatio:img.naturalWidth/img.naturalHeight,fit:style.objectFit};
  });
  expect(Math.abs(metric.ratio-metric.naturalRatio)).toBeLessThan(.015);
  expect(metric.fit).toBe('contain');
  await expect(portrait).toHaveAttribute('loading','lazy');
  await expect(page.locator('.rm-hero__figure figcaption')).toHaveCount(0);
  const heroEdges=await page.locator('.rm-hero__figure').evaluate(figure=>{
    const photo=figure.querySelector('img');
    if(!photo)throw Error('Missing hero photograph');
    return {gap:Math.abs(photo.getBoundingClientRect().bottom-figure.getBoundingClientRect().bottom),figureHeight:figure.getBoundingClientRect().height};
  });
  expect(heroEdges.gap).toBeLessThanOrEqual(1);
  expect(heroEdges.figureHeight).toBeGreaterThan(400);
});

test('CV uses exactly the established display and reading font families',async({page})=>{
  await page.goto(origin+'/cv/',{waitUntil:'domcontentloaded'});
  const fonts=await page.evaluate(()=>{
    const font=(selector:string)=>{
      const element=document.querySelector(selector);
      if(!element)throw Error('Missing '+selector);
      return getComputedStyle(element).fontFamily;
    };
    return {display:font('.cv-page h1'),section:font('.cv-page h2'),role:font('.cv-experience__heading h3'),body:font('.cv-profile-copy')};
  });
  expect(fonts.display).toContain('Georgia');
  expect(fonts.section).toContain('Georgia');
  expect(fonts.role).toContain('Public Sans');
  expect(fonts.body).toContain('Public Sans');
});

test('contact inputs retain focus feedback and buttons respond on hover',async({browser})=>{
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
  const page=await context.newPage();
  await page.goto(origin+'/contact/',{waitUntil:'domcontentloaded'});
  const input=page.locator('#contact-name');
  await input.focus();
  await expect(input).toBeFocused();
  await expect(input).toHaveCSS('outline-style','solid');
  const button=page.locator('.professional-contact-form button[type="submit"]');
  await button.hover();
  await page.waitForTimeout(320);
  const transform=await button.evaluate(e=>getComputedStyle(e).transform);
  expect(transform).not.toBe('none');
  await context.close();
});

test('portrait and CV remain usable at phone and tablet widths',async({browser})=>{
 for(const width of [320,390,768]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const route of ['/','/cv/']){
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   expect(overflow,route+' @ '+width).toBeLessThanOrEqual(1);
  }
  await context.close();
 }
});
