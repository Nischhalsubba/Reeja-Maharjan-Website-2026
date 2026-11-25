import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('hero uses full-width real video frames, supports forward and reverse scroll, and has branded nursing identity', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toHaveAttribute('data-design-system', 'reeja-cinematic');
  await expect(page.locator('.site-header .brand')).toHaveAccessibleName(/Reeja Maharjan/);
  await expect(page.locator('.site-header .brand__symbol img')).toHaveAttribute('src', '/images/reeja-mark.svg');
  await expect(page.locator('.hero-track')).toHaveClass(/has-film/);
  const film = page.locator('.hero-portrait video');
  const initial = await film.evaluate((video: HTMLVideoElement) => ({ duration:video.duration,width:video.videoWidth,height:video.videoHeight }));
  expect(initial.width).toBe(1280);
  expect(initial.height).toBe(720);
  expect(initial.duration).toBeGreaterThan(5);
  const portraitBox = await page.locator('.hero-portrait').boundingBox();
  expect(portraitBox?.x).toBeCloseTo(0);
  expect(portraitBox?.width).toBeCloseTo(1440);
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }));
  await expect.poll(() => film.evaluate((video:HTMLVideoElement) => video.currentTime)).toBeGreaterThan(1);
  await expect(film).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(() => film.evaluate((video:HTMLVideoElement) => video.currentTime)).toBeLessThan(.1);
  await expect(page.locator('.hero-portrait img')).toBeVisible();
});

test('reduced motion keeps the authentic poster and every action usable', async ({ browser }) => {
  const context = await browser.newContext({ viewport:{ width:390,height:844 }, reducedMotion:'reduce' });
  const page = await context.newPage();
  await page.goto(origin);
  await expect(page.locator('.hero-portrait img')).toBeVisible();
  await expect(page.locator('.hero-track')).not.toHaveClass(/has-film/);
  await expect(page.locator('.hero .btn[href="/cv/"]')).toBeVisible();
  await expect(page.locator('.hero .btn[href="#experience"]')).toBeVisible();
  await expect(page.locator('#more')).toBeVisible();
  await page.locator('#more').click();
  await expect(page.locator('#extra')).toBeVisible();
  await context.close();
});

test('hero recovers seekability on a static origin without byte-range support', async ({page}) => {
  const filmBytes=await readFile(new URL('../../public/images/reeja-hero.mp4',import.meta.url));
  await page.route('**/images/reeja-hero.mp4', route=>route.fulfill({status:200,contentType:'video/mp4',headers:{'Content-Length':String(filmBytes.length)},body:filmBytes}));
  await page.goto(origin);
  await expect(page.locator('.hero-track')).toHaveClass(/has-film/);
  await page.evaluate(()=>window.scrollTo({top:600,behavior:'instant'}));
  const film=page.locator('.hero-portrait video');
  await expect.poll(()=>film.evaluate((video:HTMLVideoElement)=>video.currentTime),{timeout:15000}).toBeGreaterThan(1);
  await expect(film).toHaveClass(/film-visible/);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await expect.poll(()=>film.evaluate((video:HTMLVideoElement)=>video.currentTime)).toBeLessThan(.1);
  await expect(page.locator('.hero-portrait img')).toBeVisible();
});

test('every indexed route retains one H1, canonical metadata and responsive layout under the same design identity', async ({ browser, request }) => {
  const sitemap = await (await request.get(`${origin}/sitemap-0.xml`)).text();
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
  expect(routes.length).toBeGreaterThanOrEqual(28);
  test.setTimeout(240_000);
  for (const width of [390,1440]) {
    const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`${origin}${route}`, {waitUntil:'domcontentloaded'});
      await expect(page.locator('main h1'),route).toHaveCount(1);
      await expect(page.locator('body')).toHaveAttribute('data-design-version','14.0.0-cinematic');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://reejamaharjan.com.np${route}`);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      expect(overflow,`${route} at ${width}px`).toBeLessThanOrEqual(1);
    }
    await context.close();
  }
});
