import {expect,test} from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
test('Slate homepage contains authentic hero, four focus areas, four career roles and three articles',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('main h1')).toContainText(/The person\s*before the\s*number\./);
 await expect(page.locator('.slate-focus__card')).toHaveCount(4);
 await expect(page.locator('.slate-experience__item')).toHaveCount(4);
 await expect(page.locator('.slate-writing__card')).toHaveCount(3);
 await expect(page.locator('.slate-research__steps li')).toHaveCount(4);
 await expect(page.locator('.slate-experience__list')).toContainText('Sindhuli Hospital');
 await expect(page.locator('.slate-experience__list')).toContainText('Institute for Implementation Science and Health');
 await expect(page.getByRole('link',{name:/Discuss an opportunity/})).toHaveAttribute('href','/contact/');
 await expect(page.getByRole('link',{name:/View professional CV/})).toHaveAttribute('href','/cv/');
 await expect(page.locator('.slate-home')).not.toContainText('Texas RN Active');
 await expect(page.locator('.slate-credentials__list li')).toHaveCount(3);
 const img=page.locator('.slate-hero__photograph');
 await expect(img).toHaveAttribute('src','/images/reeja-lakeside.webp');
 await expect.poll(()=>img.evaluate(x=>(x as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
});
test('Slate homepage resizes without horizontal overflow or hidden chapters',async({browser})=>{
 test.setTimeout(180000);
 for(const width of [320,375,390,768,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const state=await page.evaluate(()=>{
   const ids=['home','focus','about','experience','research','writing','contact'];
   const positions=ids.map(id=>Math.round(document.getElementById(id)!.getBoundingClientRect().top+scrollY));
   return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,positions,hero:getComputedStyle(document.querySelector('.slate-hero')!).backgroundColor};
  });
  expect(state.overflow,'horizontal overflow '+width).toBeLessThanOrEqual(1);
  expect(state.positions.every((p,i)=>i===0||p>state.positions[i-1])).toBe(true);
  expect(state.hero).toBe('rgb(28, 44, 58)');
  await ctx.close();
 }
});
test('mobile navigation opens, closes and topic navigation works',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'Menu',exact:true}).click();
 await expect(page.locator('#mobile-nav')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.locator('#mobile-nav')).toBeHidden();
 await page.locator('.slate-thread a[href="/nursing-practice/"]').click();
 await expect(page).toHaveURL(/\/nursing-practice\/$/);
});
test('remote article photos degrade to branded local illustrations',async({page})=>{
 await page.route('https://images.unsplash.com/**',route=>route.abort());
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const images=page.locator('.slate-writing__image img');
 await expect(images).toHaveCount(3);
 for(let i=0;i<3;i++){
  const image=images.nth(i);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.getAttribute('src'),{timeout:12000}).toMatch(/^\/images\/.+\.svg$/);
  await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 }
});
test('site palette and icon system share precise tokens and round strokes',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const state=await page.evaluate(()=>({
  primary:getComputedStyle(document.documentElement).getPropertyValue('--brand-blue').trim(),
  count:document.querySelectorAll('.slate-home svg.brand-icon').length,
  strokes:[...document.querySelectorAll('.slate-home svg.brand-icon')].every(el=>el.getAttribute('stroke-width')==='2'&&el.getAttribute('viewBox')==='0 0 24 24')
 }));
 expect(state.primary.toLowerCase()).toBe('#2f7368');expect(state.count).toBeGreaterThan(15);expect(state.strokes).toBe(true);
});
