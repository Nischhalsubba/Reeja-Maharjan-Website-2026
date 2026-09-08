/*
 * Verifies the final acceptance contract for the portfolio workspace.
 * Project files are read from site/, while GitHub workflow definitions remain
 * at the repository-level .github directory required by GitHub Actions.
 */
import { readFile } from 'node:fs/promises';
import process from 'node:process';

const failures = [];

/** Reads one file relative to the site workspace. */
async function readProject(relativePath) {
  return readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

/** Reads one repository-level file outside the site workspace. */
async function readRepository(relativePath) {
  return readFile(new URL(`../../${relativePath}`, import.meta.url), 'utf8');
}

const [header, mobileTest, buildCheck, productionSmoke, evidence] = await Promise.all([
  readProject('src/components/Header.astro'),
  readProject('tests/browser/mobile-navigation.spec.mjs'),
  readRepository('.github/workflows/build-check.yml'),
  readRepository('.github/workflows/production-smoke.yml'),
  readProject('docs/FINAL_ACCEPTANCE_EVIDENCE.md')
]);

const contracts = [
  [header, 'role="dialog"', 'Mobile navigation must expose dialog semantics.'],
  [header, 'aria-modal="true"', 'Mobile navigation must be modal to assistive technology.'],
  [header, 'aria-labelledby="mobile-nav-title"', 'Mobile navigation must have a stable accessible name.'],
  [header, 'aria-haspopup="dialog"', 'Menu trigger must announce that it opens a dialog.'],
  [mobileTest, "getByRole('dialog', { name: 'Mobile navigation', exact: true })", 'Browser coverage must query the accessible dialog with an exact name.'],
  [mobileTest, "toHaveAttribute('aria-modal', 'true')", 'Browser coverage must verify modal semantics.'],
  [buildCheck, 'npm run verify:final-acceptance', 'Build Check must enforce the final acceptance contract.'],
  [buildCheck, "DESCRIPTION='Verification and build passed; production verification follows.'", 'Build Check must hand production acceptance to the production verifier.'],
  [productionSmoke, 'workflows: [Build Check]', 'Production Smoke must follow a successful Build Check.'],
  [productionSmoke, 'https://reejamaharjan.com.np', 'Production Smoke must target the canonical domain by default.'],
  [productionSmoke, 'EXPECTED_COMMIT:', 'Production Smoke must verify the deployed commit fingerprint.'],
  [productionSmoke, 'BROWSER_TEST_ORIGIN:', 'Production Smoke must run the live browser suite against production.'],
  [productionSmoke, 'retention-days: 30', 'Production smoke evidence must be retained for 30 days.'],
  [evidence, '## RW-3: Cloudflare production integrity', 'Evidence record must cover RW-3.'],
  [evidence, '## RW-4: professional facts approval', 'Evidence record must cover RW-4.'],
  [evidence, '## RW-11: live screen-reader review', 'Evidence record must cover RW-11.'],
  [evidence, '## RW-12: production smoke and browser quality', 'Evidence record must cover RW-12.'],
  [evidence, '## RW-13: CSP and external requests', 'Evidence record must cover RW-13.']
];

for (const [source, fragment, message] of contracts) {
  if (!source.includes(fragment)) failures.push(message);
}

for (const obsoleteSecret of ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID']) {
  if (buildCheck.includes(obsoleteSecret)) {
    failures.push(`Build Check must not depend on the obsolete ${obsoleteSecret} GitHub secret.`);
  }
}

if (buildCheck.includes('cloudflare/wrangler-action@')) {
  failures.push('Build Check must not perform a second direct-upload deployment outside Cloudflare Git integration.');
}

if (failures.length) {
  console.error('\nFinal acceptance contract verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Final acceptance contract verification passed.');
