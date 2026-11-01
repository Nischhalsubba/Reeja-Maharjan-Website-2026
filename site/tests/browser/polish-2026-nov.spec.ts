import {expect, test} from '@playwright/test';

const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const article='/blog/kangaroo-mother-care-who-2025-guide-parents-nurses/';

test('key points and safety notes have even inset and equal-weight borders',async({page})=>{
  await page.goto(origin+article,{waitUntil:'domcontentloaded'});
  for(const id of ['key-points','safety-note']){
    const n=page.locator('#'+id);
    await expect(n).toBeVisible();
    const css=await n.evaluate(e=>{
      const s=getComputedStyle(e);
      return {left:parseFloat(s.paddingLeft),right:parseFloat(s.paddingRight),
        top:s.borderTopWidth,bottom:s.borderBottomWidth,leftBorder:s.borderLeftWidth,rightBorder:s.borderRightWidth};
    });
    expect(css.left).toBeGreaterThanOrEqual(20);
    expect(Math.abs(css.left-css.right)).toBeLessThanOrEqual(2);
    expect(new Set([css.top,css.bottom,css.leftBorder,css.rightBorder])).toEqual(new Set(['1px']));
  }
});

test('related cards animate on pointer hover and expose optional accessible photo credits',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto(origin+article,{waitUntil:'domcontentloaded'});
  const cards=page.locator('.blog-related-grid > .blog-card');
  await expect(cards).toHaveCount(3);
  const first=cards.first();
  await first.scrollIntoViewIfNeeded();
  await first.hover();
  await expect.poll(()=>first.evaluate(e=>getComputedStyle(e).transform)).not.toBe('none');
  const credit=first.locator('.blog-photo__credit-disclosure');
  await expect(credit).not.toHaveAttribute('open',/./);
  await expect(credit.locator('.blog-photo__credit-details')).toBeHidden();
  await credit.locator('summary').click();
  await expect(credit).toHaveAttribute('open','');
  await expect(credit.getByRole('link')).toHaveAttribute('href',/unsplash.com/);
  await credit.locator('summary').click();
  await expect(credit.locator('.blog-photo__credit-details')).toBeHidden();
  const third=cards.last();
  const grid=await third.evaluate(e=>({col:getComputedStyle(e).gridColumnStart,display:getComputedStyle(e).display}));
  expect(grid.col).toBe('1');
  expect(grid.display).toBe('grid');
});

test('reduced motion turns off card transform transitions',async({browser})=>{
  const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:900}});
  const page=await context.newPage();
  await page.goto(origin+article,{waitUntil:'domcontentloaded'});
  const card=page.locator('.blog-related-grid>.blog-card').first();
  await card.hover();
  const props=await card.evaluate(e=>({transform:getComputedStyle(e).transform,transition:getComputedStyle(e).transitionDuration}));
  expect(props.transform).toBe('none');
  expect(props.transition.split(',').every(x=>x.trim()==='0s')).toBe(true);
  await context.close();
});

test('header and footer use same brand markup on major pages',async({page})=>{
  for(const path of ['/','/blog/',article,'/contact/']){
    await page.goto(origin+path,{waitUntil:'domcontentloaded'});
    const marks=await page.evaluate(()=>{
      const head=document.querySelector('.site-header .brand');
      const foot=document.querySelector('.site-footer .care-footer__wordmark');
      if(!head||!foot)throw Error('Brand links missing');
      const svg=(e:Element)=>e.querySelector('svg')?.innerHTML.trim();
      const strong=(e:Element)=>e.querySelector('.brand__text strong')?.textContent?.trim();
      return {headerSvg:svg(head),footerSvg:svg(foot),headerText:strong(head),footerText:strong(foot)};
    });
    expect(marks.headerSvg,path).toBe(marks.footerSvg);
    expect(marks.headerText,path).toBe('reeja.');
    expect(marks.footerText,path).toBe('reeja.');
  }
});

test('home CV action is a button-style link, with usable min target size',async({page})=>{
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const cta=page.locator('.rm-experience__cv-link');
  await expect(cta).toHaveAttribute('href','/cv/');
  await expect(cta).toHaveClass(/rm-button/);
  const css=await cta.evaluate(e=>({height:e.getBoundingClientRect().height,display:getComputedStyle(e).display,decoration:getComputedStyle(e).textDecorationLine}));
  expect(css.height).toBeGreaterThanOrEqual(44);
  expect(css.display).toBe('inline-flex');
  expect(css.decoration).toBe('none');
});

test('inquiry form has equal borders and no floating number badge',async({page})=>{
  await page.goto(origin+'/contact/',{waitUntil:'domcontentloaded'});
  const form=page.locator('.professional-contact-form');
  const state=await form.evaluate(e=>{
    const s=getComputedStyle(e);
    return {top:s.borderTopWidth,bottom:s.borderBottomWidth,left:s.borderLeftWidth,right:s.borderRightWidth,badge:getComputedStyle(e,'::before').content};
  });
  expect(new Set([state.top,state.bottom,state.left,state.right])).toEqual(new Set(['1px']));
  expect(state.badge).toBe('none');
});

test('card grid and form avoid overflow at phone, tablet, desktop widths',async({browser})=>{
  for(const width of [320,390,768,1024,1440]){
    const ctx=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    for(const route of [article,'/contact/','/']){
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      expect(overflow,route+' at '+width).toBeLessThanOrEqual(1);
    }
    await ctx.close();
  }
});
