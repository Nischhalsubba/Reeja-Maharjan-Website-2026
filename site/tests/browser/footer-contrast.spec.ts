import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

function luminance(rgb: string): number {
  const channels = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Invalid computed RGB color: ${rgb}`);
  const [r, g, b] = channels.map((v) => {
    const x = v / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

function contrast(a: string, b: string): number {
  const [bright, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (bright + 0.05) / (dark + 0.05);
}

test('footer CTA retains WCAG AA contrast in default hover and focus states', async ({ browser }) => {
  test.setTimeout(90_000);
  for (const width of [375, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    for (const route of ['/', '/cv/', '/blog/mastering-nursing-documentation-sbar-handover/']) {
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      const cta = route==='/' ? page.locator('.slate-contact a.slate-button--mint') : page.locator('footer.site-footer--care a.care-footer__cta');
      await cta.scrollIntoViewIfNeeded();
      await expect(cta).toBeVisible();

      const readColors = async () => cta.evaluate((element) => {
        const s = getComputedStyle(element);
        const arrow = element.querySelector<SVGElement>('svg.brand-icon');
        return {
          foreground: s.color,
          background: s.backgroundColor,
          arrowColor: arrow ? getComputedStyle(arrow).color : '',
          outline: s.outlineStyle
        };
      });

      const states = [await readColors()];
      await cta.hover();
      await expect(cta).toHaveCSS('background-color', route === '/' ? 'rgb(178, 233, 219)' : 'rgb(215, 247, 237)');
      states.push(await readColors());
      await cta.focus();
      states.push(await readColors());

      for (const state of states) {
        expect(contrast(state.foreground, state.background), `CTA contrast on ${route} at ${width}px`).toBeGreaterThanOrEqual(4.5);
        expect(state.arrowColor).toBe(state.foreground);
      }
      expect(states[0].background).toBe(route === '/' ? 'rgb(28, 44, 58)' : 'rgb(178, 233, 219)');
      expect(states[1].background).toBe(route === '/' ? 'rgb(178, 233, 219)' : 'rgb(215, 247, 237)');
      expect(states[2].outline).not.toBe('none');
      await expect(cta).toHaveAttribute('href', '/contact/');
    }
    await context.close();
  }
});

test('footer back-to-top control targets the document start', async ({ page }) => {
  await page.goto(`${origin}/blog/mastering-nursing-documentation-sbar-handover/`, { waitUntil: 'domcontentloaded' });
  const back = page.getByRole('link', { name: /Back to top/ });
  await expect(back).toHaveAttribute('href', '#page-top');
  expect(await page.locator('#page-top').count()).toBe(1);
});
