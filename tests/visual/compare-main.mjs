import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';

const baselineOrigin = process.env.BASELINE_ORIGIN ?? 'http://127.0.0.1:4321';
const candidateOrigin = process.env.CANDIDATE_ORIGIN ?? 'http://127.0.0.1:4322';
const outputDir = new URL('../../test-results/visual-regression/', import.meta.url);
const maxDiffPixelRatio = Number(process.env.MAX_DIFF_PIXEL_RATIO ?? '0.001');

const routes = ['/', '/hire-reeja/', '/cv/', '/blog/'];
const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 }
];

const failures = [];
const comparisons = [];
const browser = await chromium.launch();
await mkdir(outputDir, { recursive: true });

function slugFor(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '-');
}

async function capture(origin, route, viewport, label) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
    serviceWorkers: 'block'
  });
  const page = await context.newPage();
  const response = await page.goto(new URL(route, origin).toString(), { waitUntil: 'networkidle' });

  if (!response?.ok()) {
    failures.push(`${label} ${route} returned ${response?.status() ?? 'no response'}.`);
  }

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
      .scroll-progress { visibility: hidden !important; }
    `
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            })
      )
    );
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);

  const filename = `${slugFor(route)}-${viewport.name}-${label}.png`;
  const path = new URL(filename, outputDir);
  const screenshot = await page.screenshot({ path, fullPage: true, animations: 'disabled' });
  await context.close();
  return { screenshot, filename };
}

try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const baseline = await capture(baselineOrigin, route, viewport, 'main');
      const candidate = await capture(candidateOrigin, route, viewport, 'candidate');
      const baselinePng = PNG.sync.read(baseline.screenshot);
      const candidatePng = PNG.sync.read(candidate.screenshot);

      if (baselinePng.width !== candidatePng.width || baselinePng.height !== candidatePng.height) {
        failures.push(
          `${route} at ${viewport.name} changed dimensions: main=${baselinePng.width}x${baselinePng.height} candidate=${candidatePng.width}x${candidatePng.height}`
        );
        continue;
      }

      const diff = new PNG({ width: baselinePng.width, height: baselinePng.height });
      const diffPixels = pixelmatch(
        baselinePng.data,
        candidatePng.data,
        diff.data,
        baselinePng.width,
        baselinePng.height,
        { threshold: 0.1, includeAA: false }
      );
      const totalPixels = baselinePng.width * baselinePng.height;
      const diffPixelRatio = diffPixels / totalPixels;
      const diffFilename = `${slugFor(route)}-${viewport.name}-diff.png`;
      await writeFile(new URL(diffFilename, outputDir), PNG.sync.write(diff));

      comparisons.push({ route, viewport: viewport.name, diffPixels, totalPixels, diffPixelRatio });
      if (diffPixelRatio > maxDiffPixelRatio) {
        failures.push(
          `${route} at ${viewport.name} exceeded visual threshold: ${(diffPixelRatio * 100).toFixed(4)}% > ${(maxDiffPixelRatio * 100).toFixed(4)}%`
        );
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(
    new URL('result.json', outputDir),
    JSON.stringify({ failures, comparisons, routes, viewports, maxDiffPixelRatio }, null, 2)
  );
}

if (failures.length) {
  console.error('\nVisual regression comparison failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Visual regression comparison passed for ${routes.length} routes across ${viewports.length} viewports.`);
