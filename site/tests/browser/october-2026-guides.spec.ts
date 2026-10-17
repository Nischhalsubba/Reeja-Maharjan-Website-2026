import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const posts = [
  ['pre-eclampsia-pregnancy-warning-signs-monitoring-2026', 'Pre-eclampsia in Pregnancy', 'research'],
  ['gestational-diabetes-in-pregnancy-2026-monitoring-care', 'Gestational Diabetes in Pregnancy', 'writing'],
  ['postpartum-haemorrhage-2026-nursing-recognition-response', 'Postpartum Haemorrhage', 'clinical'],
  ['nursing-careers-2026-who-workforce-report-nepal', 'Nursing Careers in 2026', 'nepal']
] as const;

test('new evidence-informed guides render correctly on phone and desktop', async ({ browser }) => {
  test.setTimeout(130_000);
  for (const width of [375, 1440]) {
    const context = await browser.newContext({viewport: {width, height: 900}, reducedMotion:'reduce'});
    const page = await context.newPage();
    for (const [slug, headline, imageKind] of posts) {
      await page.goto(origin + '/blog/' + slug + '/', { waitUntil:'domcontentloaded' });
      await expect(page.locator('main h1')).toContainText(headline);
      await expect(page.locator('.blog-article__body section[id]').first()).toBeVisible();
      await expect(page.locator('.blog-article__body #sources a')).toHaveCount(
        slug.includes('postpartum-haemorrhage') || slug.includes('nursing-careers') ? 4 : 3
      );
      await expect(page.locator('.blog-article__body #faq h3')).toHaveCount(4);
      await expect(page.locator('.cip-photo-band')).toHaveClass(new RegExp('cip-photo-band--' + imageKind));
      const structure = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ld: Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(element => { try { return JSON.parse(element.textContent || '{}'); } catch { return {}; } })
      }));
      expect(structure.overflow, 'horizontal overflow on ' + slug + ' at ' + width).toBeLessThanOrEqual(1);
      expect(structure.ld.some((x: any) => x['@type'] === 'BlogPosting' && x.headline.includes(headline))).toBe(true);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',new RegExp('/og/articles/' + slug + '\\.png'));
    }
    await context.close();
  }
});

test('journal index includes all four October 2026 guides with working related links',async({page})=>{
  await page.goto(origin + '/blog/', {waitUntil:'domcontentloaded'});
  for(const [slug] of posts) {
    await expect(page.locator('a[href="/blog/' + slug + '/"]').first()).toBeVisible();
  }
  const articleLinks=await page.locator('.blog-index__lead-card, .blog-grid .blog-card').count();
  expect(articleLinks).toBeGreaterThanOrEqual(17);
});

test('new social cards are generated as genuine PNGs',async({request})=>{
  for(const [slug] of posts) {
    const response = await request.get(origin + '/og/articles/' + slug + '.png');
    expect(response.ok(),slug + ' social image').toBe(true);
    const bytes = await response.body();
    expect(Array.from(bytes.subarray(0,8))).toEqual([137,80,78,71,13,10,26,10]);
  }
});
