import { readFile } from 'node:fs/promises';
import process from 'node:process';

const failures = [];

async function readText(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    failures.push(`${path} could not be read: ${error.message}`);
    return '';
  }
}

function parseJson(path, source) {
  try {
    return JSON.parse(source);
  } catch (error) {
    failures.push(`${path} is invalid JSON: ${error.message}`);
    return null;
  }
}

const packageSource = await readText('package.json');
const lockSource = await readText('package-lock.json');
const headersSource = await readText('public/_headers');
const smokeConfigSource = await readText('scripts/smoke/config.mjs');
const smokeAssertionsSource = await readText('scripts/smoke/assertions.mjs');
const layoutSource = await readText('src/layouts/BaseLayout.astro');
const notFoundSource = await readText('src/pages/404.astro');
const packageJson = parseJson('package.json', packageSource);
const packageLock = parseJson('package-lock.json', lockSource);

if (packageJson) {
  const requiredScripts = ['build', 'check', 'lint', 'verify:deployment', 'verify:facts', 'verify:expiry'];
  for (const script of requiredScripts) {
    if (!packageJson.scripts?.[script]) failures.push(`package.json is missing scripts.${script}.`);
  }

  if (packageJson.scripts?.prebuild !== 'npm run verify:deployment') {
    failures.push('package.json prebuild must run npm run verify:deployment.');
  }
}

if (packageJson && packageLock) {
  if (packageJson.name !== packageLock.name) failures.push('package.json and package-lock.json names differ.');
  if (packageJson.version !== packageLock.version) failures.push('package.json and package-lock.json versions differ.');
}

const requiredHeaderFragments = [
  'Content-Security-Policy:',
  "base-uri 'self';",
  "frame-ancestors 'none';",
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'X-Frame-Options: DENY',
  'Permissions-Policy: camera=()'
];

for (const fragment of requiredHeaderFragments) {
  if (!headersSource.includes(fragment)) failures.push(`public/_headers is missing required fragment: ${fragment}`);
}

const cspLine = headersSource
  .split(/\r?\n/)
  .find((line) => line.trimStart().startsWith('Content-Security-Policy:'));

if (!cspLine?.trim().endsWith(';')) {
  failures.push('public/_headers Content-Security-Policy must end with a semicolon.');
}

for (const exportName of ['requiredHomepageText', 'forbiddenHomepageText', 'retiredPaths']) {
  if (!smokeConfigSource.includes(`export const ${exportName}`)) {
    failures.push(`scripts/smoke/config.mjs must export ${exportName}.`);
  }
  if (!smokeAssertionsSource.includes(exportName)) {
    failures.push(`scripts/smoke/assertions.mjs must use ${exportName}.`);
  }
}

if (/\bexport\s*$/.test(smokeConfigSource.trim())) {
  failures.push('scripts/smoke/config.mjs ends with an incomplete export statement.');
}

if (!layoutSource.includes('robots?: string') || !layoutSource.includes('<meta name="robots" content={robots} />')) {
  failures.push('BaseLayout must support page-specific robots metadata.');
}

if (!notFoundSource.includes('robots="noindex, nofollow"')) {
  failures.push('404 page must use noindex, nofollow robots metadata.');
}

if (!smokeAssertionsSource.includes('/qa-nonexistent-route') || !smokeAssertionsSource.includes('noindex, nofollow')) {
  failures.push('Production smoke assertions must verify the 404 status and noindex metadata.');
}

if (failures.length) {
  console.error('\nDeployment configuration validation failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error('');
  process.exit(1);
}

console.log('Deployment configuration validation passed.');
