import { test, expect } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

for (const viewport of [{width:320,height:640},{width:390,height:844},{width:540,height:1060},{width:768,height:1024},{width:834,height:1194},{width:844,height:390}]) {
  test(`cinematic hero stays connected at ${viewport.width}×${viewport.height}`, async ({page}) => {
    await page.setViewportSize(viewport);
    await page.goto(origin);
    const hero = page.locator('.hero');
    const image = page.locator('.hero-portrait');
    const copy = page.locator('.hero-bottom');
    await expect(page.locator('.menu-toggle')).toBeVisible();
    await expect(copy.locator('h1')).toBeVisible();
    const [h,i,c] = await Promise.all([hero.boundingBox(),image.boundingBox(),copy.boundingBox()]);
    expect(h && i && c).toBeTruthy();
    expect(i!.y + i!.height).toBeGreaterThan(c!.y);
    expect(c!.y + c!.height).toBeLessThanOrEqual(h!.y + h!.height + 1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  });
}

test('tablet preserves two-column professional sections', async ({page})=>{
  await page.setViewportSize({width:768,height:1024});
  await page.goto(`${origin}/about/`);
  await expect(page.locator('.reference-about-grid')).toHaveCSS('display','grid');
  const columns=await page.locator('.reference-about-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
  expect(columns).toBe(2);
  await page.goto(`${origin}/contact/`);
  await expect(page.locator('.professional-contact-form')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
});

for (const width of [320,390,768,834,1440,1920]) {
  test(`journal pagination remains readable and functional at ${width}px`, async ({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto(origin);
    const controls=page.locator('.journal-carousel-controls');
    const status=controls.locator('[aria-live]');
    const prev=controls.getByRole('button',{name:'Previous journal articles'});
    const next=controls.getByRole('button',{name:'Next journal articles'});
    await expect(status).toHaveText('1–3 / 6');
    await expect(status).toHaveCSS('color','rgb(20, 19, 20)');
    await expect(prev).toBeDisabled();
    await expect(prev).toHaveCSS('opacity','1');
    await expect(prev).toHaveCSS('color','rgb(85, 73, 0)');
    await next.click();
    await expect(status).toHaveText('4–6 / 6');
    await expect(next).toBeDisabled();
    await prev.click();
    await expect(status).toHaveText('1–3 / 6');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  });
}
