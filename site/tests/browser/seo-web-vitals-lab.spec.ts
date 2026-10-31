import { test } from '@playwright/test';

/**
 * Diagnostic-only browser-lab measurements: NOT CrUX or field INP.
 * They provide reproducible per-run evidence without inventing real-user scores.
 */
const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('collect desktop and mobile laboratory paint and layout stability diagnostics', async ({ browser }, testInfo) => {
  test.setTimeout(180_000);
  const samples: Array<Record<string, unknown>> = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
      deviceScaleFactor: width === 390 ? 2 : 1
    });
    const page = await context.newPage();
    for (const route of ['/', '/cv/', '/blog/']) {
      await page.addInitScript(() => {
        const global = window as typeof window & {
          __seoDiagnostic?: { lcp: number | null; cls: number };
        };
        global.__seoDiagnostic = { lcp: null, cls: 0 };
        if (!('PerformanceObserver' in window)) return;
        try {
          new PerformanceObserver((list) => {
            const latest = list.getEntries().at(-1);
            if (latest && global.__seoDiagnostic) global.__seoDiagnostic.lcp = latest.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch { /* Unsupported browser metric */ }
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean }>) {
              if (!entry.hadRecentInput && global.__seoDiagnostic) global.__seoDiagnostic.cls += entry.value ?? 0;
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch { /* Unsupported browser metric */ }
      });
      await page.goto(origin + route, { waitUntil: 'load' });
      await page.waitForTimeout(350);
      const data = await page.evaluate(() => {
        const global = window as typeof window & { __seoDiagnostic?: { lcp: number | null; cls: number } };
        return {
          fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null,
          lcpMs: global.__seoDiagnostic?.lcp ?? null,
          cls: global.__seoDiagnostic?.cls ?? null,
          resourceCount: performance.getEntriesByType('resource').length
        };
      });
      samples.push({ width, route, ...data });
    }
    await context.close();
  }
  console.log('SEO browser-lab diagnostics (not CrUX):', JSON.stringify(samples));
  await testInfo.attach('seo-lab-paint-layout.json', {
    body: JSON.stringify({ capturedAt: new Date().toISOString(), origin, note: 'Lab approximations only; do not label as field Core Web Vitals', samples }, null, 2),
    contentType: 'application/json'
  });
});
