import { test, expect } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('education is discoverable, truthful and in the canonical sitemap', async ({ page, request }) => {
  await page.goto(`${origin}/education/`);
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('main')).toContainText('Semester 1 passed');
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
  await expect(page.locator('.reference-footer-contact h2')).toHaveText('Let’s talk.');
});

test('major routes have one visible heading and no horizontal scrolling at six widths', async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [390,768,1024,1280,1440,1920]) {
    await page.setViewportSize({width,height:900});
    for (const route of ['/','/about/','/education/','/cv/','/experience/','/clinical-research/','/maternal-health/','/nursing-practice/','/hire-reeja/','/contact/','/blog/']) {
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      await expect(page.locator('main h1')).toHaveCount(1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),`${route} @ ${width}`).toBeLessThanOrEqual(1);
    }
  }
});
