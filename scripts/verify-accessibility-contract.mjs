import { readFile } from 'node:fs/promises';
import process from 'node:process';

const navSource = await readFile(new URL('../src/lib/mobileNavA11y.ts', import.meta.url), 'utf8');
const headerSource = await readFile(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
const layoutSource = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const failures = [];

for (const fragment of ['Escape', "event.key !== 'Tab'", 'restoreFocus', 'focusFirstControl', 'aria-expanded']) {
  if (!navSource.includes(fragment)) failures.push(`Mobile navigation is missing ${fragment}.`);
}
for (const fragment of ['id="mobile-nav"', 'aria-controls="mobile-nav"', 'aria-expanded="false"']) {
  if (!headerSource.includes(fragment)) failures.push(`Header is missing ${fragment}.`);
}
if (!layoutSource.includes('initMobileNavA11y()')) failures.push('Base layout does not initialize mobile navigation accessibility.');
if (!layoutSource.includes('prefers-reduced-motion: reduce')) failures.push('Base layout lacks reduced-motion handling.');

if (failures.length) {
  console.error('\nAccessibility contract verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Mobile navigation accessibility contract passed.');