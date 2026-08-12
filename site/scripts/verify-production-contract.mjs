/*
 * Verifies the production release contract from the site workspace while
 * reading GitHub workflow definitions from the repository-level .github folder.
 */
import { readFile } from 'node:fs/promises';
import {
  forbiddenHomepageText,
  origin,
  requiredHomepageText,
  requiredPublicFacts,
  requiredRoutes,
  requiredSecurityHeaders,
  retiredPaths
} from './smoke/config.mjs';

const failures = [];

/** Validates that a contract collection contains unique non-empty strings. */
function requireUniqueNonEmptyStrings(name, values) {
  if (!Array.isArray(values) || values.length === 0) {
    failures.push(`${name} must be a non-empty array.`);
    return;
  }
  if (values.some((value) => typeof value !== 'string' || !value.trim())) {
    failures.push(`${name} must contain only non-empty strings.`);
  }
  if (new Set(values).size !== values.length) failures.push(`${name} contains duplicate values.`);
}

for (const [name, values] of Object.entries({
  requiredHomepageText,
  forbiddenHomepageText,
  requiredPublicFacts,
  requiredRoutes,
  retiredPaths
})) {
  requireUniqueNonEmptyStrings(name, values);
}

if (origin !== 'https://reejamaharjan.com.np') failures.push(`Default production origin is unexpected: ${origin}`);
if (
  !requiredRoutes.includes('/') ||
  !requiredRoutes.includes('/cv/') ||
  !requiredRoutes.includes('/hire-reeja/') ||
  !requiredRoutes.includes('/contact/')
) {
  failures.push('Required route inventory must cover homepage, CV, recruiter journey, and dedicated contact page.');
}
if (!retiredPaths.includes('/resume.pdf')) failures.push('Retired route inventory must contain /resume.pdf.');

for (const [header, fragments] of Object.entries(requiredSecurityHeaders)) {
  requireUniqueNonEmptyStrings(`requiredSecurityHeaders.${header}`, fragments);
}
for (const header of [
  'content-security-policy',
  'x-content-type-options',
  'referrer-policy',
  'x-frame-options',
  'permissions-policy'
]) {
  if (!requiredSecurityHeaders[header]) failures.push(`Security contract is missing ${header}.`);
}

const workflow = await readFile(
  new URL('../../.github/workflows/production-smoke.yml', import.meta.url),
  'utf8',
);
for (const fragment of [
  'workflow_run:',
  'github.event.workflow_run.head_sha',
  'PRODUCTION_REPORT: production-smoke-report.json',
  'BROWSER_TEST_ORIGIN:',
  'npx playwright test tests/browser',
  'Upload production evidence'
]) {
  if (!workflow.includes(fragment)) failures.push(`Production workflow is missing: ${fragment}`);
}

const smokeRunner = await readFile(new URL('./smoke-production.mjs', import.meta.url), 'utf8');
if (!smokeRunner.includes('schemaVersion: 1')) failures.push('Smoke report implementation is missing schemaVersion: 1.');
for (const status of ['passed', 'failed', 'error']) {
  if (!smokeRunner.includes(`'${status}'`)) failures.push(`Smoke report implementation is missing status value: ${status}`);
}

if (failures.length) {
  console.error('\nProduction contract verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Production release contract verification passed.');
