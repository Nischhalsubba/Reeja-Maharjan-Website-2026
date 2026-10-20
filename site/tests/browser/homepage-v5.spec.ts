import { expect, test } from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('approved minimal homepage shows authentic identity, verified work and published articles', async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('main h1')).toContainText('Reeja');
 await expect(page.locator('main h1')).toContainText('Maharjan');
 await expect(page.locator('.rm-focus__link')).toHaveCount(4);
 await expect(page.locator('.slate-experience__item')).toHaveCount(4);
 await expect(page.locator('.slate-writing__card')).toHaveCount(3);
 await expect(page.locator('.slate-research__steps li')).toHaveCount(4);
 await expect(page.locator('.slate-experience__list')).toContainText('Sindhuli Hospital');
 await expect(page.locator('.slate-experience__list')).toContainText('Institute for Implementation Science and Health');
 await expect(page.getByRole('link',{name:/View experience/})).toHaveAttribute('href','#experience');
 await expect(page.getByRole('link',{name:/Get in touch/}).first()).toHaveAttribute('href','/contact/');
 await expect(page.locator('.rm-home')).not.toContainText('Texas RN Active');
 await expect(page.locator('.slate-credentials__list li')).toHaveCount(3);
 const img=page.locator('.slate-hero__photograph');
 await expect(img).toHaveAttribute('src','/reeja-headshot.jpg');
 await expect.poll(()=>img.evaluate(x=>(x as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
});

test('minimal homepage chapters reflow without horizontal overflow',async({browser})=>{
 test.setTimeout(180000);
 for(const width of [320,375,390,768,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const state=await page.evaluate(()=>{
   const ids=['home','experience','research','focus','writing','contact'];
   const positions=ids.map(id=>Math.round(document.getElementById(id)!.getBoundingClientRect().top+scrollY));
   return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,positions,hero:getComputedStyle(document.querySelector('.rm-hero')!).backgroundColor};
  });
  expect(state.overflow,'horizontal overflow '+width).toBeLessThanOrEqual(1);
  expect(state.positions.every((p,i)=>i===0||p>state.positions[i-1])).toBe(true);
  expect(state.hero).toBe('rgb(250, 250, 248)');
  await ctx.close();
 }
});

test('mobile menu opens and closes and nursing path works',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'Menu',exact:true}).click();
 await expect(page.locator('#mobile-nav')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.locator('#mobile-nav')).toBeHidden();
 await page.locator('.rm-focus__link[href="/nursing-practice/"]').first().click();
 await expect(page).toHaveURL(/\/nursing-practice\/$/);
});

test('remote article photography degrades to labelled local illustrations',async({page})=>{
 await page.route('https://images.unsplash.com/**',route=>route.abort());
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const images=page.locator('.rm-writing__image img');
 await expect(images).toHaveCount(3);
 for(let i=0;i<3;i++){
  const image=images.nth(i);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.getAttribute('src'),{timeout:12000}).toMatch(/^\/images\/.+\.svg$/);
  await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 }
});

test('home uses neutral artwork with locally sourced real portrait, not decorative icon collage',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const state=await page.evaluate(()=>({
  name:document.querySelector('main h1')?.textContent,
  portrait:document.querySelector<HTMLImageElement>('.rm-hero__portrait')?.getAttribute('src'),
  iconCount:document.querySelectorAll('.rm-home svg.brand-icon').length,
  background:getComputedStyle(document.querySelector('.rm-home')!).backgroundColor
 }));
 expect(state.name).toContain('Reeja');
 expect(state.portrait).toBe('/reeja-headshot.jpg');
 expect(state.iconCount).toBeGreaterThan(4);
 expect(state.background).toBe('rgb(250, 250, 248)');
});
