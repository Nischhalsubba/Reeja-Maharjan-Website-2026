import { access, readFile } from 'node:fs/promises';
import process from 'node:process';

const failures = [];

async function exists(relativePath) {
  try {
    await access(new URL(`../${relativePath}`, import.meta.url));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

for (const retiredRoot of ['src-old-v55', 'src-legacy-v55']) {
  if (await exists(retiredRoot)) {
    failures.push(`Retired source root must not exist: ${retiredRoot}`);
  }
}

const layoutSource = await read('src/layouts/BaseLayout.astro');
for(const legacy of [
  'src/styles/field-journal-home.css',
  'src/styles/field-journal-pages.css',
  'src/styles/field-journal-finish.css',
  'src/lib/fieldJournalMotion.ts'
]){
  if(await exists(legacy)) failures.push(`Retired Field Journal source must not exist: ${legacy}`);
}
if(layoutSource.includes('field-journal-home.css') || layoutSource.includes('field-journal-pages.css') ||
  layoutSource.includes('fieldJournalMotion')) failures.push('Layout still refers to a retired theme module.');

const tokenSource = await read('src/styles/tokens.css');
const baseSource = await read('src/styles/base.css');
const shellSource = await read('src/styles/shell.css');
const footerSource = await read('src/styles/care-article-footer.css');

const expectedStyleImports = [
  '../styles/tokens.css',
  '../styles/base.css',
  '../styles/site-pages.css',
  '../styles/shell.css',
  '../styles/care-shell.css',
  '../styles/care-inner-layout.css',
  '../styles/care-interaction-guards.css',
  '../styles/care-personal-inner.css',
  '../styles/care-article-footer.css',
  '../styles/care-editorial-v4.css',
  '../styles/reeja-home-v7.css'
];

for (const stylesheet of expectedStyleImports) {
  const importStatement = `import '${stylesheet}';`;
  const occurrences = layoutSource.split(importStatement).length - 1;
  if (occurrences !== 1) {
    failures.push(`BaseLayout must import ${stylesheet} exactly once; found ${occurrences}.`);
  }
}

if (!layoutSource.includes('class="care-personal-site"') || layoutSource.includes('field-journal')) {
  failures.push('The active document must use the Care is Personal root scope only.');
}
for (const retiredStylesheet of ['layout.css','components.css','pages.css','blog.css','cv.css']) {
  if (layoutSource.includes(`styles/${retiredStylesheet}`)) failures.push('Retired CSS imported globally: '+retiredStylesheet);
}
const cvPageSource = await read('src/pages/cv.astro');
if (!cvPageSource.includes("import '../styles/care-cv-print.css'")) {
  failures.push('The CV must import the dedicated print-only stylesheet.');
}
for (const stylesheet of ['care-shell.css','care-inner-layout.css','reeja-home-v7.css','care-personal-inner.css','care-article-footer.css','care-editorial-v4.css']) {
  const source = await read(`src/styles/${stylesheet}`);
  if (/field-journal|care-ledger|--fj-/i.test(source)) {
    failures.push(`Obsolete theme scope/token found in active CSS: ${stylesheet}`);
  }
}

if (/<style\b[^>]*is:global/i.test(layoutSource)) {
  failures.push('BaseLayout must not own global CSS. Put shared rules in an owned stylesheet module.');
}

for (const selector of ['.site-header', '.desktop-nav', '.mobile-nav']) {
  if (layoutSource.includes(selector)) {
    failures.push(`BaseLayout contains shell selector ${selector}; shell rules belong in src/styles/shell.css.`);
  }
  if (!shellSource.includes(selector)) {
    failures.push(`src/styles/shell.css is missing required shell selector ${selector}.`);
  }
}

if (!footerSource.includes('.site-footer--care') || !footerSource.includes('.care-footer__cta')) {
  failures.push('Care is Personal footer rules must belong to care-article-footer.css.');
}
if (shellSource.includes('.site-footer {') || shellSource.includes('.site-footer a:hover')) {
  failures.push('Retired footer styles must not be reintroduced into shell.css.');
}

if (/(^|\n)\s*:root\s*\{/m.test(baseSource)) {
  failures.push('src/styles/base.css must not redefine :root tokens; tokens belong in src/styles/tokens.css.');
}

for (const token of [
  '--font-sans',
  '--bg',
  '--surface',
  '--text',
  '--muted',
  '--line',
  '--accent',
  '--r-card',
  '--container-max',
  '--gutter',
  '--section-gap'
]) {
  if (!tokenSource.includes(`${token}:`)) {
    failures.push(`src/styles/tokens.css is missing required token ${token}.`);
  }
}

if (failures.length) {
  console.error('\nSource ownership verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Source ownership verification passed.');
