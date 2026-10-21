import {expect,test} from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const routes=[
 '/', '/nursing-practice/','/maternal-health/','/clinical-research/',
 '/hire-reeja/','/cv/','/contact/','/blog/',
 '/blog/essential-maternal-newborn-care-guide-2026/',
 '/blog/topics/maternal-health/'
];
test('all principal pages use the shared neutral editorial shell, without overflow or drifting containers',async({browser})=>{
 test.setTimeout(220000);
 for(const width of [320,390,768,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  for(const route of routes){
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});
   const state=await page.evaluate(()=>{
    const rect=(selector:string)=>document.querySelector(selector)?.getBoundingClientRect();
    const main=document.querySelector('main');
    const hero=rect('main .site-page__hero .container, main .contact-hero .container, main .blog-article__intro, main .rm-hero__grid');
    const footer=rect('.care-footer__main');
    const head=rect('.site-header__inner');
    const firstSection=rect('main .site-section .container, main .contact-section .container');
    const target=hero?.x??firstSection?.x??0;
    return {
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
      headingCount:main?.querySelectorAll('h1').length??0,
      bg:getComputedStyle(document.body).backgroundColor,
      headerColor:getComputedStyle(document.querySelector('.site-header')!).backgroundColor,
      footerColor:getComputedStyle(document.querySelector('.site-footer--care')!).backgroundColor,
      heroTop:hero?.y??0,
      deltaFooter:footer?Math.abs(footer.x-target):0,
      deltaHeader:head?Math.abs(head.x-target):0,
      deltaSection:firstSection?Math.abs(firstSection.x-target):0,
      bodyWidth:document.documentElement.clientWidth
    };
   });
   expect(state.overflow,`${route} @ ${width}px overflow`).toBeLessThanOrEqual(1);
   expect(state.headingCount,`${route} single h1`).toBe(1);
   expect(state.bg,`${route} neutral canvas`).toBe('rgb(250, 250, 248)');
   expect(state.deltaFooter,`${route} footer alignment`).toBeLessThanOrEqual(4);
   expect(state.deltaHeader,`${route} header alignment`).toBeLessThanOrEqual(4);
   if(state.deltaSection)expect(state.deltaSection,`${route} section alignment`).toBeLessThanOrEqual(4);
  }
  await ctx.close();
 }
});
test('main navigation has clear readable current, hover and keyboard focus states on inner pages',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto(origin+'/clinical-research/',{waitUntil:'domcontentloaded'});
 const active=page.locator('.desktop-nav>a[aria-current="page"]').first();
 await expect(active).toBeVisible();
 await expect(active).toHaveCSS('color','rgb(23, 25, 26)');
 await active.hover();
 await expect(active).toHaveCSS('color','rgb(23, 25, 26)');
 await active.focus();
 await expect(active).toBeFocused();
 const nav=page.locator('.desktop-nav');
 await expect(nav.getByRole('link',{name:'Hire Reeja'})).toBeVisible();
});
test('essential routes have distinct human-readable search titles and descriptions',async({page})=>{
 const titles=new Set<string>();
 const descriptions=new Set<string>();
 for(const route of ['/', '/nursing-practice/','/maternal-health/','/clinical-research/','/hire-reeja/','/cv/','/contact/','/blog/']){
  await page.goto(origin+route,{waitUntil:'domcontentloaded'});
  const title=await page.title();
  const description=await page.locator('meta[name="description"]').getAttribute('content')??'';
  expect(title,route).toMatch(/Reeja Maharjan/);
  expect(description,route).toMatch(/Reeja Maharjan/);
  expect(title.trim().length,route).toBeGreaterThan(18);
  expect(description.trim().length,route).toBeGreaterThan(75);
  expect(titles.has(title),`${route} unique title`).toBe(false);
  expect(descriptions.has(description),`${route} unique description`).toBe(false);
  titles.add(title);descriptions.add(description);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://reejamaharjan.com.np'+route);
 }
});
