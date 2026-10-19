import {expect,test} from '@playwright/test';

const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('homepage v5 is structured as real HTML with every approved section and meaningful content',async({page})=>{
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('main h1')).toContainText(/Care is\s*personal\./);
  await expect(page.locator('.rv5-home')).toBeVisible();
  await expect(page.locator('.rv5-pillar')).toHaveCount(5);
  await expect(page.locator('.rv5-career-card')).toHaveCount(3);
  await expect(page.locator('.rv5-writing-card')).toHaveCount(3);
  await expect(page.locator('.rv5-hero__stats>div')).toHaveCount(3);
  for (const selector of ['.rv5-hero','.rv5-pillars','.rv5-career','.rv5-focus','.rv5-writing','.rv5-personal','.rv5-updates']){
    await expect(page.locator(selector),selector).toHaveCount(1);
  }
  await expect(page.locator('.rv5-hero__stats')).toContainText('17');
  await expect(page.locator('.rv5-hero__portrait img')).toHaveAttribute('src','/reeja-headshot.jpg');
  await expect(page.getByRole('link',{name:/Learn about my work/})).toHaveAttribute('href','#experience');
  await expect(page.getByRole('link',{name:/View my CV/})).toHaveAttribute('href','/cv/');
  await expect(page.getByRole('link',{name:/View all writing/})).toHaveAttribute('href','/blog/');
  await expect(page.getByRole('link',{name:/Explore latest writing/})).toHaveAttribute('href','/blog/');
  await expect(page.locator('.rv5-career-card__photo figcaption')).toHaveCount(3);
  await expect(page.locator('.rv5-writing-card__photo-credit')).toHaveCount(3);
  await expect(page.locator('.rv5-hero canvas')).toHaveCount(0);
});

test('homepage hero has balanced two-column composition on desktop and no clipping',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const metrics=await page.evaluate(()=>{
    const rect=(q:string)=>document.querySelector(q)!.getBoundingClientRect();
    const h=rect('.rv5-hero'),copy=rect('.rv5-hero__copy'),portrait=rect('.rv5-hero__portrait');
    return {heroHeight:h.height,copyWidth:copy.width,portraitWidth:portrait.width,portraitLeft:portrait.left,copyRight:copy.right,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}
  });
  expect(metrics.heroHeight).toBeGreaterThan(520);
  expect(metrics.copyWidth).toBeGreaterThan(380);
  expect(metrics.portraitWidth).toBeGreaterThan(400);
  expect(metrics.portraitLeft).toBeGreaterThan(metrics.copyRight);
  expect(metrics.overflow).toBeLessThanOrEqual(1);
  const img=page.locator('.rv5-hero__portrait img');
  await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:20000}).toBeGreaterThan(0);
  await expect(img).toHaveCSS('object-fit','contain');
});

test('homepage remains readable, unclipped and navigable on common breakpoints',async({browser})=>{
  test.setTimeout(180000);
  for(const width of [320,375,390,768,1024,1440]){
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
    const state=await page.evaluate(()=>{
      const heading=document.querySelector<HTMLElement>('.rv5-hero h1')!;
      return {
        overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
        headingFont:parseFloat(getComputedStyle(heading).fontSize),
        hasHorizontalScroll:document.body.scrollWidth>window.innerWidth+1,
        careers:document.querySelectorAll('.rv5-career-card').length
      };
    });
    expect(state.overflow,'horizontal overflow at '+width).toBeLessThanOrEqual(1);
    expect(state.hasHorizontalScroll).toBe(false);
    expect(state.headingFont).toBeGreaterThanOrEqual(49);
    expect(state.careers).toBe(3);
    await expect(page.locator('.rv5-hero h1')).toBeVisible();
    await expect(page.locator('.rv5-personal h2')).toBeVisible();
    await expect(page.locator('.rv5-writing-card').first()).toBeVisible();
    await ctx.close();
  }
});

test('home navigation works on mobile and all approved CTAs target live routes',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const menu=page.getByRole('button',{name:'Menu',exact:true});
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.locator('#mobile-nav')).toBeVisible();
  await expect(page.locator('#mobile-nav').getByRole('link',{name:'Writing'})).toHaveAttribute('href','/blog/');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-nav')).toBeHidden();
  const experience=page.locator('.rv5-hero__actions a[href="#experience"]');
  await experience.click();
  await expect(page).toHaveURL(/#experience$/);
  const hrefs=await page.locator('.rv5-home a[href^="/"]').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')));
  for(const href of hrefs){
    if(!href || href==='/' || href==='/cv/'||href==='/blog/'||href==='/clinical-research/')continue;
    expect(href).toMatch(/^\/blog\/[a-z0-9-]+\/$/);
  }
});

test('homepage real photo credit and article visuals are present rather than screenshot overlays',async({page})=>{
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const images=page.locator('.rv5-home img');
  expect(await images.count()).toBeGreaterThanOrEqual(8);
  const all=await images.evaluateAll(nodes=>nodes.map(img=>({alt:img.getAttribute('alt'),src:img.getAttribute('src')})));
  expect(all.every(x=>(x.alt||'').length>15)).toBe(true);
  expect(all.some(x=>x.src==='/reeja-headshot.jpg')).toBe(true);
  expect(all.filter(x=>x.src?.startsWith('https://images.unsplash.com/')).length).toBeGreaterThanOrEqual(7);
});
