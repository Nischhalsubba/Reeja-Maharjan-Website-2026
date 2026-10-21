import {test,expect} from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN??'http://127.0.0.1:4321';
const routes=[
  '/', '/nursing-practice/', '/clinical-research/', '/maternal-health/',
  '/hire-reeja/', '/cv/', '/contact/', '/blog/',
  '/blog/mastering-nursing-documentation-sbar-handover/'
];
test('one neutral design grammar and stable spacing across all priority page templates',async({browser})=>{
 test.setTimeout(210000);
 for(const width of [320,390,768,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  for(const route of routes){
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});
   const values=await page.evaluate(()=>{
    const header=document.querySelector<HTMLElement>('.site-header')!;
    const content=document.querySelector<HTMLElement>('main')!;
    const footer=document.querySelector<HTMLElement>('.site-footer--care')!;
    const hero=content.querySelector<HTMLElement>('.site-page__hero,.contact-hero,.blog-index__hero,.blog-article__header');
    const mainHeroTitle=content.querySelector<HTMLElement>('h1')!;
    const mainContainer=content.querySelector<HTMLElement>('.site-page__hero-grid,.contact-hero__grid,.blog-index__hero-grid,.blog-article__intro,.rm-hero__grid');
    const headerContainer=document.querySelector<HTMLElement>('.site-header__inner')!;
    const html=document.documentElement;
    const logo=header.querySelector<HTMLElement>('.brand')!;
    return{
     overflow:html.scrollWidth-html.clientWidth,
     bg:getComputedStyle(document.body).backgroundColor,
     headerBg:getComputedStyle(header).backgroundColor,
     footerBg:getComputedStyle(footer).backgroundColor,
     heroBg:hero?getComputedStyle(hero).backgroundColor:'',
     heroBackgroundImage:hero?getComputedStyle(hero).backgroundImage:'',
     headingFont:getComputedStyle(mainHeroTitle).fontFamily,
     headingCount:content.querySelectorAll('h1').length,
     navOffset:Math.abs(logo.getBoundingClientRect().left-(mainContainer?.getBoundingClientRect().left??headerContainer.getBoundingClientRect().left)),
     footerInvite:getComputedStyle(document.querySelector('.care-footer__invitation')!).display
    };
   });
   expect(values.overflow,route+' @'+width).toBeLessThanOrEqual(1);
   expect(values.bg).toBe('rgb(250, 250, 248)');
   expect(values.footerBg).toBe('rgb(250, 250, 248)');
   expect(values.headingCount).toBe(1);
   expect(values.headingFont).toContain('Georgia');
   expect(values.footerInvite).toBe('none');
   if(route!=='/'){
    expect(values.heroBg,route).toBe('rgb(250, 250, 248)');
    expect(values.heroBackgroundImage,route).toBe('none');
   }
   expect(values.navOffset,route+' left alignment @ '+width).toBeLessThanOrEqual(2);
  }
  await ctx.close();
 }
});
test('inner research and contact flow retain role evidence and usable inputs',async({page})=>{
 await page.goto(origin+'/clinical-research/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('heading',{level:1})).toContainText('Maternal-health research');
 await expect(page.getByText('MOM-HD',{exact:false}).first()).toBeVisible();
 await page.goto(origin+'/contact/',{waitUntil:'domcontentloaded'});
 const inputs=page.locator('.professional-contact-form input,.professional-contact-form textarea');
 await expect(inputs.first()).toBeVisible();
 await expect(page.getByRole('heading',{level:1})).toContainText('Contact');
});
test('capture light inner templates for desktop/mobile visual QA',async({browser})=>{
 test.setTimeout(110000);
 const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const page=await ctx.newPage();
 for(const route of [
  {url:'/clinical-research/',tag:'research'},
  {url:'/blog/',tag:'journal'},
  {url:'/cv/',tag:'cv'},
  {url:'/contact/',tag:'contact'}
 ]){
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:900});
   await page.goto(origin+route.url,{waitUntil:'domcontentloaded'});
   await page.evaluate(async()=>document.fonts.ready);
   await page.screenshot({path:'test-results/screenshots/sitewide-v11-'+route.tag+'-'+width+'.png',fullPage:false,animations:'disabled'});
  }
 }
 await ctx.close();
});
