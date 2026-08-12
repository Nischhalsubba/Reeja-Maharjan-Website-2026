import { writeFile } from 'node:fs/promises';
import process from 'node:process';

const required = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_ZONE_ID'];
const missing = required.filter((name) => !process.env[name]?.trim());
if (missing.length) {
  throw new Error(`Missing required Cloudflare credentials: ${missing.join(', ')}`);
}

const token = process.env.CLOUDFLARE_API_TOKEN.trim();
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID.trim();
const zoneId = process.env.CLOUDFLARE_ZONE_ID.trim();
const hostname = process.env.CLOUDFLARE_HOSTNAME?.trim() || 'reejamaharjan.com.np';
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT?.trim() || 'reeja-maharjan-website-2026';
const reportPath = process.env.CLOUDFLARE_AUDIT_REPORT?.trim() || 'cloudflare-account-audit.json';

async function api(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    signal: AbortSignal.timeout(20_000)
  });

  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    const details = payload.errors?.map((error) => error.message).join('; ') || response.statusText;
    throw new Error(`Cloudflare API ${path} failed: ${details}`);
  }
  return payload.result;
}

const [dnsRecords, workerRoutes, pagesProject, pagesDomains] = await Promise.all([
  api(`/zones/${zoneId}/dns_records?name=${encodeURIComponent(hostname)}&per_page=100`),
  api(`/zones/${zoneId}/workers/routes`),
  api(`/accounts/${accountId}/pages/projects/${encodeURIComponent(projectName)}`),
  api(`/accounts/${accountId}/pages/projects/${encodeURIComponent(projectName)}/domains`)
]);

const matchingRoutes = workerRoutes.filter(({ pattern }) => {
  const normalized = pattern.replace(/^https?:\/\//, '');
  return normalized === hostname || normalized.startsWith(`${hostname}/`) || normalized.startsWith(`${hostname}/*`);
});

const activeDomain = pagesDomains.find((domain) => domain.name === hostname);
const competingDns = dnsRecords.filter((record) => !(
  record.type === 'CNAME' &&
  String(record.content).replace(/\.$/, '') === `${projectName}.pages.dev`
));

const findings = [];
if (!activeDomain) findings.push(`Pages project ${projectName} does not list ${hostname} as a custom domain.`);
if (activeDomain && activeDomain.status !== 'active') findings.push(`Custom domain status is ${activeDomain.status}, not active.`);
if (matchingRoutes.length) findings.push(`${matchingRoutes.length} Worker route(s) can intercept ${hostname}.`);
if (competingDns.length) findings.push(`${competingDns.length} DNS record(s) may compete with the Pages hostname.`);

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  hostname,
  project: {
    name: pagesProject.name,
    productionBranch: pagesProject.production_branch,
    subdomain: pagesProject.subdomain
  },
  customDomain: activeDomain ?? null,
  dnsRecords,
  matchingWorkerRoutes: matchingRoutes,
  competingDnsRecords: competingDns,
  findings,
  status: findings.length ? 'action-required' : 'clear'
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));

if (findings.length) {
  console.error('\nCloudflare account audit found routing conflicts. Review the generated report before changing account configuration.');
  process.exitCode = 1;
}
