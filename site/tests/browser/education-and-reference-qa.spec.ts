import { test, expect } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('decorative heading reveals never duplicate the heading text', async ({ page }) => {
  await page.goto(`${origin}/education/`);
  const title = page.locator('main h1');
  await expect(title.locator('.reference-reveal-highlight').first()).toBeAttached();
  await expect(title).toHaveText(/^From nursing\s*to rural development\.$/i);
  await expect(title.locator('.reference-reveal-highlight').first()).toBeEmpty();
  await expect(page.getByRole('heading', { level: 1, name: /From nursing\s*to rural development\./i })).toBeVisible();
});

test('education is discoverable, truthful and in the canonical sitemap', async ({ page, request }) => {
  await page.goto(`${origin}/education/`);
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('main')).toContainText(/semester 1 passed/i);
  await expect(page.locator('main')).toContainText('degree is in progress');
  const sitemap = await (await request.get(`${origin}/sitemap-0.xml`)).text();
  expect(sitemap).toContain('https://reejamaharjan.com.np/education/');
  const graph = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(graph).toContain('T00:00:00+05:45');
});

test('suggested call dates and times are selectable without claiming bookings', async ({ page }) => {
  await page.goto(`${origin}/contact/`);
  await expect(page.locator('[data-date-step="-1"]')).toBeDisabled();
  await expect(page.locator('.call-date-choice')).toHaveCount(6);
  await page.locator('[data-date-step="1"]').click();
  await expect(page.locator('[data-date-step="-1"]')).toBeEnabled();
  await page.locator('.call-date-choice').first().click();
  await expect(page.locator('.call-date-choice').first()).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-call-time="09:30"]').click();
  await expect(page.locator('#call-time')).toHaveValue('09:30');
  await expect(page.locator('.reference-call-availability')).toContainText('not confirmed availability');
});

test('portrait gallery has optional motion and footer invitation changes by route', async ({ page }) => {
  await page.goto(`${origin}/about/`);
  await expect(page.locator('.reference-gallery-track figure')).toHaveCount(3);
  const play = page.locator('[data-gallery-pause]');
  await play.click(); await expect(play).toHaveText('Pause');
  await play.click(); await expect(play).toHaveText('Play');
  await expect(page.locator('.reference-footer-contact').getByRole('heading',{name:'Let’s talk.',exact:true})).toBeVisible();
});

test('experience photographs advance without navigating and all roles have real detail pages',async({page})=>{
  await page.goto(`${origin}/experience/`);
  const card=page.locator('[data-media-slideshow]').first();
  await expect(card.locator('[data-media-slide]:visible')).toHaveCount(1);
  const before=await card.locator('[data-media-slide]:visible').getAttribute('src');
  await card.locator('[data-media-next]').click();
  await expect(card.locator('[data-media-slide]:visible')).not.toHaveAttribute('src',before!);
  await expect(page.locator('a[href="/maternity-care/"]').first()).toBeAttached();
  await page.goto(`${origin}/maternity-care/`);
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('.practice-story__chapter')).toHaveCount(3);
});

test('major routes have one visible heading and no horizontal scrolling at six widths', async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [320,390,768,1024,1280,1440,1920]) {
    await page.setViewportSize({width,height:900});
    for (const route of ['/','/about/','/education/','/cv/','/experience/','/clinical-research/','/maternal-health/','/maternity-care/','/nursing-practice/','/hire-reeja/','/contact/','/blog/']) {
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      await expect(page.locator('main h1')).toHaveCount(1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),`${route} @ ${width}`).toBeLessThanOrEqual(1);
    }
  }
});
