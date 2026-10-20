import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('home page makes identity, credentials and professional contact discoverable', async ({ page }) => {
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1 })).toContainText('person');
  await expect(page.locator('.slate-hero__lede')).toContainText('Reeja Maharjan');
  await expect(page.locator('.slate-hero__lede')).toContainText('registered nurse');
  await expect(page.getByRole('link', { name: /Discuss an opportunity/ })).toHaveAttribute('href', '/contact/');
  await expect(page.getByRole('link', { name: /View professional CV/ })).toHaveAttribute('href', '/cv/');

  const proof = page.locator('.slate-credentials');
  await expect(proof.getByRole('heading', { name: 'Qualifications at a glance.' })).toBeVisible();
  await expect(proof.locator('li')).toHaveCount(3);
  await expect(proof).toContainText('NNC Licensed RN');
  await expect(proof).toContainText('B.Sc. Nursing');
  await expect(proof).toContainText('IISH');
  await expect(proof.getByRole('link', { name: /Review credentials/ })).toHaveAttribute('href', '/cv/');
});

test('brand muted text and timeline indices have AA contrast on light canvas', async ({ page }) => {
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const ratios = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const hex = (key: string) => root.getPropertyValue(key).trim();
    const rgb = (value: string) => {
      if (value.startsWith('#')) {
        const n = Number.parseInt(value.slice(1), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
      }
      return (value.match(/[\\d.]+/g) ?? []).slice(0, 3).map(Number);
    };
    const luminance = (value: string) =>
      rgb(value).map((c) => {
        const v = c / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
    const ratio = (fg: string, bg: string) => {
      const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const canvas = hex('--brand-canvas');
    const timeline = document.querySelector<HTMLElement>('.slate-experience__count');
    return {
      muted: ratio(hex('--brand-muted'), canvas),
      timeline: timeline ? ratio(getComputedStyle(timeline).color, canvas) : 0
    };
  });
  expect(ratios.muted).toBeGreaterThanOrEqual(4.5);
  expect(ratios.timeline).toBeGreaterThanOrEqual(4.5);
});

test('mobile navigation is aligned with the sticky header and returns keyboard focus', async ({ page }) => {
  for (const width of [375, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
    const toggle = page.getByRole('button', { name: 'Menu', exact: true });
    await expect(toggle).toBeVisible();
    await toggle.click();
    const dialog = page.getByRole('dialog', { name: 'Mobile navigation' });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
    const topGap = await page.evaluate(() => {
      const header = document.querySelector<HTMLElement>('.site-header');
      const menu = document.querySelector<HTMLElement>('.mobile-nav');
      return header && menu ? Math.abs(menu.getBoundingClientRect().top - header.getBoundingClientRect().bottom) : 100;
    });
    expect(topGap, 'menu/header alignment at ' + width + 'px').toBeLessThanOrEqual(2);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(toggle).toBeFocused();
  }
});

test('essential routes reflow without horizontal overflow and contain one H1', async ({ browser }) => {
  test.setTimeout(180_000);
  const routes = ['/', '/cv/', '/contact/', '/blog/', '/clinical-research/'];
  for (const width of [320, 375, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        headingCount: document.querySelectorAll('main h1').length,
        hasMain: Boolean(document.getElementById('main-content'))
      }));
      expect(result.overflow, 'horizontal overflow ' + width + 'px on ' + route).toBeLessThanOrEqual(1);
      expect(result.headingCount, 'one h1 on ' + route).toBe(1);
      expect(result.hasMain).toBe(true);
    }
    await context.close();
  }
});

test('priority routes emit canonical, description, image, and Person schema', async ({ page }) => {
  for (const route of ['/', '/cv/', '/contact/', '/clinical-research/', '/blog/']) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://reejamaharjan.com.np' + route);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Reeja/i);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /https:\/\//);
    const schema = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(schema).toContain('"Person"');
  }
});

test('browse-by-topic opens topic-specific article archives instead of unrelated service pages', async ({ page }) => {
  await page.goto(origin + '/blog/', { waitUntil: 'domcontentloaded' });
  const expected = [
    { label: 'Maternal health', slug: 'maternal-health' },
    { label: 'Nursing practice', slug: 'nursing-practice' },
    { label: 'Research & digital health', slug: 'research-and-digital-health' }
  ];
  for (const topic of expected) {
    const href = '/blog/topics/' + topic.slug + '/';
    await expect(page.locator('.blog-topic-panel a[href="' + href + '"]')).toBeVisible();
    await page.goto(origin + href, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText(topic.label);
    await expect(page.locator('.blog-card').first()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://reejamaharjan.com.np' + href);
    await page.goto(origin + '/blog/', { waitUntil: 'domcontentloaded' });
  }
});
