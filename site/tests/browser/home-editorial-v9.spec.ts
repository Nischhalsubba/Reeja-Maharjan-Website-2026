import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('homepage is a genuinely new split editorial composition, not a full-bleed photograph', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const hero = page.locator('.slate-hero');
  const portrait = page.locator('.rv9-hero__media .slate-hero__photograph');
  await expect(hero.getByRole('heading', { level: 1 })).toContainText('person');
  await expect(portrait).toHaveAttribute('src', '/reeja-headshot.jpg');
  await expect(portrait).toHaveAttribute('width', '896');
  await expect(page.locator('.rv9-hero__media figcaption')).toContainText('REEJA MAHARJAN');

  const geometry = await page.evaluate(() => {
    const text = document.querySelector('.slate-hero__content')!.getBoundingClientRect();
    const media = document.querySelector('.rv9-hero__media')!.getBoundingClientRect();
    const hero = getComputedStyle(document.querySelector('.slate-hero')!);
    const heading = getComputedStyle(document.querySelector('.slate-hero h1')!);
    return { textRight: text.right, mediaLeft: media.left, heroBg: hero.backgroundColor, headingFont: heading.fontFamily };
  });
  expect(geometry.mediaLeft).toBeGreaterThan(geometry.textRight - 2);
  expect(geometry.heroBg).toBe('rgb(243, 241, 235)');
  expect(geometry.headingFont).toContain('Georgia');
});

test('editorial rhythm uses intentionally asymmetric topics and reading cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.slate-focus__card')).toHaveCount(4);
  await expect(page.locator('.slate-writing__card')).toHaveCount(3);
  const ratios = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.slate-focus__card')].map(x => x.getBoundingClientRect().width);
    const articles = [...document.querySelectorAll('.slate-writing__card')].map(x => x.getBoundingClientRect().height);
    return { first: cards[0], second: cards[1], leadArticle: articles[0], supportArticle: articles[1] };
  });
  expect(ratios.first).toBeGreaterThan(ratios.second);
  expect(ratios.leadArticle).toBeGreaterThan(ratios.supportArticle);
});

test('homepage has no overflow or concealed hero actions across primary widths', async ({ browser }) => {
  test.setTimeout(120_000);
  for (const width of [320, 375, 390, 430, 680, 768, 1024, 1440, 1920]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBg: getComputedStyle(document.querySelector('.slate-hero')!).backgroundColor,
      portraitWidth: document.querySelector('.rv9-hero__media')!.getBoundingClientRect().width
    }));
    expect(state.overflow, 'horizontal overflow @' + width).toBeLessThanOrEqual(1);
    expect(state.heroBg).toBe('rgb(243, 241, 235)');
    expect(state.portraitWidth).toBeGreaterThan(190);
    await expect(page.getByRole('link', { name: /Discuss an opportunity/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /View professional CV/ })).toBeVisible();
    await ctx.close();
  }
});

test('capture entire redesigned homepage for section-by-section review', async ({ browser }) => {
  test.setTimeout(110_000);
  for (const { width, label } of [
    { width: 390, label: 'mobile-390' },
    { width: 1440, label: 'desktop-1440' }
  ]) {
    const context = await browser.newContext({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => document.fonts.ready);
    // Scroll through once to trigger lazy-loaded assets, then capture the complete page.
    for (const selector of ['.slate-focus', '.slate-about', '.slate-experience', '.slate-research', '.slate-writing', '.slate-contact']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/screenshots/editorial-v9-full-${label}.png`,
      fullPage: true,
      animations: 'disabled',
      timeout: 25000
    });
    await context.close();
  }
});
