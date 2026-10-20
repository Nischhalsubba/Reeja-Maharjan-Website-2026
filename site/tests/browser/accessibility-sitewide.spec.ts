import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const routes = [
  '/', '/hire-reeja/', '/nursing-practice/', '/clinical-research/',
  '/maternal-health/', '/blog/', '/blog/mastering-nursing-documentation-sbar-handover/',
  '/blog/essential-maternal-newborn-care-guide-2026/', '/cv/', '/contact/',
];

const luminance = (rgb: string): number => {
  const hex = /^#([0-9a-f]{6})$/i.exec(rgb);
  if (hex) {
    rgb = 'rgb(' + [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).join(', ') + ')';
  }
  const values = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!values || values.length < 3) throw new Error('Non-RGB computed color: ' + rgb);
  const linear = values.map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  });
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
};

const ratio = (foreground: string, background: string): number => {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + .05) / (dark + .05);
};

// Inspect what browsers actually render, not just declarations in CSS files.
test('all public routes have labelled controls, accessible images, valid landmarks and responsive layout', async ({ browser }) => {
  test.setTimeout(210_000);
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
      const issues = await page.evaluate(() => {
        const issues: string[] = [];
        const visible = (el: Element) => {
          const style = getComputedStyle(el);
          const box = el.getBoundingClientRect();
          const collapsedDetails = el.closest('details:not([open])');
          if (collapsedDetails && !el.closest('summary')) return false;
          return style.visibility !== 'hidden' && style.display !== 'none' && box.width > 0 && box.height > 0
            && !el.closest('[inert], [aria-hidden="true"]');
        };
        if (document.querySelectorAll('main h1').length !== 1) issues.push('Expected one visible page h1');
        if (!document.querySelector('main#main-content')) issues.push('Main landmark missing');
        for (const img of document.querySelectorAll<HTMLImageElement>('img')) {
          if (!img.hasAttribute('alt')) issues.push('Image missing alt: ' + img.getAttribute('src'));
        }
        for (const el of document.querySelectorAll<HTMLElement>('a[href],button')) {
          if (!visible(el)) continue;
          const content = el.innerText?.trim()
            || el.getAttribute('aria-label')?.trim()
            || el.getAttribute('title')?.trim()
            || el.querySelector('img')?.getAttribute('alt')?.trim();
          if (!content) issues.push('Unnamed interactive element: ' + el.outerHTML.slice(0, 150));
          if (el instanceof HTMLAnchorElement && el.target === '_blank' && !el.rel.includes('noopener')) {
            issues.push('External tab without noopener: ' + el.href);
          }
        }
        for (const el of document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
          'input:not([type="hidden"]),textarea,select')) {
          if (!visible(el)) continue;
          if (!(el.labels?.length) && !el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
            issues.push('Unlabelled form field: ' + el.name);
          }
        }
        if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) {
          issues.push('Horizontal overflow');
        }
        return issues;
      });
      expect(issues, `Accessibility and responsive issues at ${width}px ${route}`).toEqual([]);
    }
    await context.close();
  }
});

test('canonical palette text remains readable over site backgrounds', async ({ page }) => {
  test.setTimeout(80_000);
  const checks = [
    { route: '/', selector: '.slate-heading .slate-eyebrow', surface: '#F5F8FA' },
    { route: '/', selector: '.slate-writing__text h3 a', surface: '#ffffff' },
    { route: '/', selector: '.slate-hero__lede', surface: '#1C2C3A' },
    { route: '/nursing-practice/', selector: '.site-page__hero .site-eyebrow', surface: '#1C2C3A' },
    { route: '/clinical-research/', selector: '.site-page__hero .site-eyebrow', surface: '#1C2C3A' },
    { route: '/contact/', selector: '.contact-hero .site-eyebrow', surface: '#1C2C3A' },
    { route: '/blog/mastering-nursing-documentation-sbar-handover/', selector: '.blog-article__header .site-eyebrow', surface: '#1C2C3A' },
    { route: '/blog/', selector: '.blog-index__hero .site-eyebrow', surface: '#1C2C3A' },
    { route: '/cv/', selector: '.site-page__hero .site-eyebrow', surface: '#1C2C3A' },
    { route: '/', selector: '.care-footer__column a', surface: '#101C29' },
    { route: '/contact/', selector: '.care-footer__eyebrow', surface: '#101C29' },
  ];
  for (const check of checks) {
    await page.goto(origin + check.route, { waitUntil: 'domcontentloaded' });
    const element = page.locator(check.selector).first();
    await expect(element).toBeVisible();
    const color = await element.evaluate((el) => getComputedStyle(el).color);
    expect(ratio(color, check.surface), `${check.selector} on ${check.route}: ${color}`).toBeGreaterThanOrEqual(4.5);
  }
});

test('keyboard skip navigation and focused controls stay visible', async ({ page }) => {
  for (const route of ['/', '/contact/', '/blog/mastering-nursing-documentation-sbar-handover/']) {
    await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main-content');
    const style = await skip.evaluate((element) => {
      const s = getComputedStyle(element);
      return { outline: s.outlineStyle, top: element.getBoundingClientRect().top };
    });
    expect(style.outline).not.toBe('none');
    expect(style.top).toBeGreaterThanOrEqual(0);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
  }
});
