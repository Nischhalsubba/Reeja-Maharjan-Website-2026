import { readFile } from 'node:fs/promises';
import process from 'node:process';

const failures = [];

async function read(relativePath) {
  return readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const [header, mobileTest, accountAudit, accountWorkflow, evidence] = await Promise.all([
  read('src/components/Header.astro'),
  read('tests/browser/mobile-navigation.spec.mjs'),
  read('scripts/audit-cloudflare-account.mjs'),
  read('.github/workflows/cloudflare-account-audit.yml'),
  read('docs/FINAL_ACCEPTANCE_EVIDENCE.md')
]);

const contracts = [
  [header, 'role="dialog"', 'Mobile navigation must expose dialog semantics.'],
  [header, 'aria-modal="true"', 'Mobile navigation must be modal to assistive technology.'],
  [header, 'aria-labelledby="mobile-nav-title"', 'Mobile navigation must have a stable accessible name.'],
  [header, 'aria-haspopup="dialog"', 'Menu trigger must announce that it opens a dialog.'],
  [mobileTest, "getByRole('dialog', { name: 'Mobile navigation' })", 'Browser coverage must query the accessible dialog.'],
  [mobileTest, "toHaveAttribute('aria-modal', 'true')", 'Browser coverage must verify modal semantics.'],
  [accountAudit, 'CLOUDFLARE_API_TOKEN', 'Cloudflare account audit must require scoped credentials.'],
  [accountAudit, '/workers/routes', 'Cloudflare account audit must inspect Worker routes.'],
  [accountAudit, '/dns_records?', 'Cloudflare account audit must inspect DNS records.'],
  [accountAudit, '/pages/projects/', 'Cloudflare account audit must inspect the Pages project.'],
  [accountWorkflow, '${{ secrets.CLOUDFLARE_API_TOKEN }}', 'Workflow must read the API token from GitHub Secrets.'],
  [accountWorkflow, 'retention-days: 30', 'Account audit evidence must be retained for 30 days.'],
  [evidence, '## RW-3: Cloudflare production integrity', 'Evidence record must cover RW-3.'],
  [evidence, '## RW-4: professional facts approval', 'Evidence record must cover RW-4.'],
  [evidence, '## RW-11: live screen-reader review', 'Evidence record must cover RW-11.'],
  [evidence, '## RW-12: production smoke and browser quality', 'Evidence record must cover RW-12.'],
  [evidence, '## RW-13: CSP and external requests', 'Evidence record must cover RW-13.']
];

for (const [source, fragment, message] of contracts) {
  if (!source.includes(fragment)) failures.push(message);
}

if (accountAudit.includes('console.log(token)') || accountAudit.includes('authorization: token')) {
  failures.push('Cloudflare audit must not expose its API token.');
}

if (failures.length) {
  console.error('\nFinal acceptance contract verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Final acceptance contract verification passed.');
