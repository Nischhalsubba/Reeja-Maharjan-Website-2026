import { writeFile } from 'node:fs/promises';
import process from 'node:process';
import { expectedCommit, pagesOrigin, reportPath, siteOrigin } from './diagnostics/config.mjs';
import { inspectDns } from './diagnostics/dns.mjs';
import { inspectUrl } from './diagnostics/http.mjs';

const paths = ['/', '/build.json', '/cv/', '/resume.pdf'];
const inspectOrigin = async (origin) => ({
  origin: origin.toString(),
  pages: await Promise.all(paths.map((path) => inspectUrl(new URL(path, origin))))
});

const report = {
  generatedAt: new Date().toISOString(),
  expectedCommit,
  dns: await inspectDns(siteOrigin.hostname),
  customDomain: await inspectOrigin(siteOrigin),
  pagesOrigin: pagesOrigin ? await inspectOrigin(pagesOrigin) : null
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));

const buildProbe = report.customDomain.pages.find((page) => page.url.endsWith('/build.json'));
if (expectedCommit && !buildProbe?.preview?.includes(expectedCommit)) {
  console.error(`Custom domain is not serving expected commit ${expectedCommit}.`);
  process.exitCode = 1;
}
