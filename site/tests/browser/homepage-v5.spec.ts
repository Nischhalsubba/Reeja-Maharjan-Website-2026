import { expect, test } from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('v6 homepage presents verified background, two pathways and complete work chronology',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.rv6-home')).toBeVisible();
 await expect(page.locator('main h1')).toContainText(/Care is\s*personal\./);
 await expect(page.locator('.rv6-trust__grid > div')).toHaveCount(3);
 await expect(page.locator('.rv6-pillar')).toHaveCount(2);
 await expect(page.locator('.rv6-career__timeline > li')).toHaveCount(4);
 await expect(page.locator('.rv5-writing-card')).toHaveCount(3);
 await expect(page.locator('.rv7-personal__photo')).toBeVisible();
 await expect(page.locator('.rv6-personal__aside')).toHaveCount(0);
 await expect(page.locator('.rv7-personal__photo figcaption')).toContainText('Reeja’s personal collection');
 await expect(page.locator('.rv5-updates')).toHaveCount(0);
 await expect(page.locator('.rv6-career__timeline')).toContainText('Sindhuli Hospital');
 await expect(page.locator('.rv6-career__timeline')).toContainText('Institute for Implementation Science and Health');
 await expect(page.locator('.rv6-trust__grid')).toContainText('Nepal Nursing Council');
 await expect(page.locator('.rv6-trust__grid')).toContainText('B.Sc. Nursing');
 await expect(page.locator('.rv6-hero__portrait img')).toHaveAttribute('src','/reeja-headshot.jpg');
 await expect(page.locator('.rv6-home')).not.toContainText('1 Research project');
 await expect(page.locator('.rv6-home')).not.toContainText('Texas RN Active');
 for(const link of [
  {name:/Explore my work/,href:'#experience'},
  {name:/Get in touch/,href:'/contact/'},
  {name:/View professional CV/,href:'/cv/'},
  {name:/Explore nursing practice/,href:'/nursing-practice/'},
  {name:/Explore research work/,href:'/clinical-research/'},
  {name:/My professional journey/,href:'/cv/'}
 ]) await expect(page.getByRole('link',{name:link.name}).first()).toHaveAttribute('href',link.href);
});

test('hero remains two balanced desktop columns with a genuine local portrait',async({page})=>{
 await page.setViewportSize({width:1440,height:950});
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const state=await page.evaluate(()=>{
  const rect=(selector:string)=>document.querySelector(selector)!.getBoundingClientRect();
  const copy=rect('.rv6-hero__copy'),portrait=rect('.rv6-hero__portrait'),hero=rect('.rv6-hero');
  return {copyWidth:copy.width,portraitWidth:portrait.width,portraitLeft:portrait.left,copyRight:copy.right,heroHeight:hero.height,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}
 });
 expect(state.heroHeight).toBeGreaterThan(520);
 expect(state.copyWidth).toBeGreaterThan(390);
 expect(state.portraitWidth).toBeGreaterThan(390);
 expect(state.portraitLeft).toBeGreaterThan(state.copyRight);
 expect(state.overflow).toBeLessThanOrEqual(1);
 const image=page.locator('.rv6-hero__portrait img');
 await expect.poll(()=>image.evaluate(node=>(node as HTMLImageElement).naturalWidth),{timeout:16000}).toBeGreaterThan(0);
});

test('mobile and desktop no overflow, readable 14px labels, and healthy section order',async({browser})=>{
 test.setTimeout(180000);
 for(const width of [320,375,390,768,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const result=await page.evaluate(()=>{
   const selectors=['.rv6-hero','.rv6-trust','.rv6-pillars','.rv6-career','.rv6-focus','.rv6-writing','.rv6-personal'];
   const tops=selectors.map(q=>Math.round(document.querySelector(q)!.getBoundingClientRect().top+window.scrollY));
   const labels=['.rv6-trust__grid p span','.rv6-pillar__index','.rv6-career__meta','.rv5-writing-card__category'];
   const sizes=labels.map(q=>parseFloat(getComputedStyle(document.querySelector(q)!).fontSize));
   return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,tops,sizes};
  });
  expect(result.overflow,'overflow at '+width).toBeLessThanOrEqual(1);
  expect(result.tops.every((top,i)=>i===0||top>result.tops[i-1]),'section order at '+width).toBe(true);
  expect(Math.min(...result.sizes),'compact type at '+width).toBeGreaterThanOrEqual(14);
  await ctx.close();
 }
});

test('mobile menu and hero CTAs work without overlapping the page',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const toggle=page.getByRole('button',{name:'Menu',exact:true});
 await toggle.click();
 await expect(page.locator('#mobile-nav')).toBeVisible();
 await expect(page.locator('#mobile-nav').getByRole('link',{name:'Home',exact:true})).toHaveCount(1);
 await page.keyboard.press('Escape');
 await expect(page.locator('#mobile-nav')).toBeHidden();
 await page.locator('.rv6-hero__actions a[href="#experience"]').click();
 await expect(page).toHaveURL(/#experience$/);
 await expect(page.locator('#experience')).toBeVisible();
});

test('third-party editorial images use locally hosted clinical art when blocked',async({page})=>{
 await page.route('https://images.unsplash.com/**',route=>route.abort());
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const first=page.locator('[data-editorial-image]').first();
 await first.scrollIntoViewIfNeeded();
 await expect.poll(()=>first.getAttribute('src')).toContain('/images/research-monitoring.svg');
 await expect.poll(()=>first.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await expect(page.locator('.rv6-focus__image')).toHaveClass(/is-fallback-loaded/);
 await expect(page.locator('.rv6-hero__portrait img')).toBeVisible();
});

test('all article previews use different topical source images and retain source credits',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const imgs=page.locator('.rv6-writing__card img');
 await expect(imgs).toHaveCount(3);
 const srcs=await imgs.evaluateAll(nodes=>nodes.map(x=>x.getAttribute('src')));
 expect(new Set(srcs).size).toBe(3);
 await expect(page.locator('.rv6-writing__image .rv5-writing-card__photo-credit')).toHaveCount(3);
});

test('real lakeside photo loads and remains visible at mobile and desktop sizes', async({browser}) => {
  for(const width of [320,390,768,1440]) {
    const ctx=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
    const personal=page.locator('.rv7-personal');
    const image=personal.locator('img');
    await personal.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('src','/images/reeja-lakeside.webp');
    await expect(image).toHaveAttribute('loading','lazy');
    await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:12000}).toBeGreaterThan(0);
    await expect(image).toHaveCSS('object-fit','cover');
    await expect(personal.getByRole('link',{name:/Get in touch/})).toHaveAttribute('href','/contact/');
    await expect(personal.getByRole('link',{name:/My professional journey/})).toHaveAttribute('href','/cv/');
    const dimensions=await image.evaluate(el=>{const r=el.getBoundingClientRect();return {width:r.width,height:r.height}});
    expect(dimensions.width,'image width at '+width).toBeGreaterThan(220);
    expect(dimensions.height,'image height at '+width).toBeGreaterThan(190);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow,'overflow at '+width).toBeLessThanOrEqual(1);
    await ctx.close();
  }
});
