import {expect,test} from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const slugs=[
 'kangaroo-mother-care-who-2025-guide-parents-nurses',
 'hpv-vaccine-nepal-2026-cervical-cancer-prevention',
 'postpartum-infection-warning-signs-nursing-guide-2026'
];
test('new evidence-led articles have complete SEO, content, references and social imagery', async ({page,request})=>{
  for(const slug of slugs){
    const url=`${origin}/blog/${slug}/`;
    const response=await page.goto(url,{waitUntil:'domcontentloaded'});
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    expect((await page.locator('main h1').innerText()).length).toBeGreaterThan(25);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',new RegExp(slug));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.{70,}/);
    expect(await page.locator('.blog-article__body section').count()).toBeGreaterThanOrEqual(4);
    const image=await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(image).toContain(`/og/articles/${slug}.png`);
    const png=await request.get(`${origin}/og/articles/${slug}.png`);
    expect(png.ok()).toBe(true);
    expect((await png.body()).subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(await page.locator('a[href*="who.int"],a[href*="unicef.org"],a[href*="cdc.gov"]').count()).toBeGreaterThanOrEqual(1);
  }
});
test('new blogs remain readable at 320 and 1440px without overflow',async ({browser})=>{
  for(const width of [320,390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await context.newPage();
    for(const slug of slugs){
      await page.goto(`${origin}/blog/${slug}/`,{waitUntil:'domcontentloaded'});
      const widthDiff=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      expect(widthDiff,`${slug} at ${width}`).toBeLessThanOrEqual(1);
      await expect(page.locator('footer.site-footer--care')).toBeVisible();
    }
    await context.close();
  }
});
