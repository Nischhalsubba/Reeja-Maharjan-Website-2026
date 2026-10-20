import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('homepage is a genuinely new split editorial composition, not a full-bleed photograph', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const hero = page.locator('.rm-hero');
  const portrait = page.locator('.rm-hero__figure .slate-hero__photograph');
  await expect(hero.getByRole('heading', { level: 1 })).toContainText('Reeja');
  await expect(portrait).toHaveAttribute('src', '/reeja-headshot.jpg');
  await expect(portrait).toHaveAttribute('width', '896');
  await expect(page.locator('.rm-hero__figure figcaption')).toContainText('Reeja Maharjan');

  const geometry = await page.evaluate(() => {
    const text = document.querySelector('.rm-hero__copy')!.getBoundingClientRect();
    const media = document.querySelector('.rm-hero__figure')!.getBoundingClientRect();
    const hero = getComputedStyle(document.querySelector('.rm-hero')!);
    const heading = getComputedStyle(document.querySelector('.rm-hero h1')!);
    return { textRight: text.right, mediaLeft: media.left, heroBg: hero.backgroundColor, headingFont: heading.fontFamily };
  });
  expect(geometry.mediaLeft).toBeGreaterThan(geometry.textRight - 2);
  expect(geometry.heroBg).toBe('rgb(250, 250, 248)');
  expect(geometry.headingFont).toContain('Georgia');
});

test('editorial rhythm uses intentionally asymmetric topics and reading cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.rm-focus__link')).toHaveCount(4);
  await expect(page.locator('.rm-writing__article')).toHaveCount(3);
  const ratios = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.rm-focus__link')].map(x => x.getBoundingClientRect().width);
    const articles = [...document.querySelectorAll('.rm-writing__article')].map(x => x.getBoundingClientRect().height);
    return { first: cards[0], second: cards[1], leadArticle: articles[0], supportArticle: articles[1] };
  });
  expect(ratios.first).toBeGreaterThan(0);
  expect(ratios.leadArticle).toBeGreaterThan(0);
});

test('homepage has no overflow or concealed hero actions across primary widths', async ({ browser }) => {
  test.setTimeout(120_000);
  for (const width of [320, 375, 390, 430, 680, 768, 1024, 1440, 1920]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBg: getComputedStyle(document.querySelector('.rm-hero')!).backgroundColor,
      portraitWidth: document.querySelector('.rm-hero__figure')!.getBoundingClientRect().width
    }));
    expect(state.overflow, 'horizontal overflow @' + width).toBeLessThanOrEqual(1);
    expect(state.heroBg).toBe('rgb(250, 250, 248)');
    expect(state.portraitWidth).toBeGreaterThan(190);
    await expect(page.getByRole('link', { name: /Get in touch/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /View experience/ })).toBeVisible();
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
    for (const selector of ['.rm-focus', '.rm-experience', '.rm-experience', '.rm-research', '.rm-writing', '.rm-contact']) {
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
