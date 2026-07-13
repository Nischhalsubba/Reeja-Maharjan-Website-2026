import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import process from 'node:process';

const baselineOrigin = process.env.BASELINE_ORIGIN ?? 'http://127.0.0.1:4321';
const candidateOrigin = process.env.CANDIDATE_ORIGIN ?? 'http://127.0.0.1:4322';
const outputDir = new URL('../../test-results/visual-regression/', import.meta.url);

const routes = [
  '/',
  '/hire-reeja/',
  '/cv/',
  '/blog/'
];

const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 }
];

const failures = [];
const browser = await chromium.launch();
await mkdir(outputDir, { recursive: true });

function slugFor(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '-');
}

function digest(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function capture(origin, route, viewport, label) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
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
    window.scrollTo(0, 0);
  });

  const filename = `${slugFor(route)}-${viewport.name}-${label}.png`;
  const path = new URL(filename, outputDir);
  const screenshot = await page.screenshot({ path, fullPage: true, animations: 'disabled' });
  await context.close();
  return { screenshot, filename };
}

for (const viewport of viewports) {
  for (const route of routes) {
    const baseline = await capture(baselineOrigin, route, viewport, 'main');
    const candidate = await capture(candidateOrigin, route, viewport, 'candidate');

    if (!baseline.screenshot.equals(candidate.screenshot)) {
      failures.push(
        `${route} at ${viewport.name} changed visually: main=${digest(baseline.screenshot)} candidate=${digest(candidate.screenshot)}`
      );
    }
  }
}

await browser.close();
await writeFile(new URL('result.json', outputDir), JSON.stringify({ failures, routes, viewports }, null, 2));

if (failures.length) {
  console.error('\nVisual regression comparison failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Visual regression comparison passed for ${routes.length} routes across ${viewports.length} viewports.`);
