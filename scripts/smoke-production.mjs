import { writeFile } from 'node:fs/promises';
import process from 'node:process';
import { expectedCommit, origin } from './smoke/config.mjs';
import { waitForExpectedDeployment } from './smoke/deployment.mjs';
import { collectProductionFailures } from './smoke/assertions.mjs';

const startedAt = new Date().toISOString();
const reportPath = process.env.PRODUCTION_REPORT?.trim();

async function writeReport(report) {
  if (!reportPath) return;
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
}

try {
  await waitForExpectedDeployment();
  const failures = await collectProductionFailures();
  const report = {
    schemaVersion: 1,
    origin,
    expectedCommit: expectedCommit ?? null,
    startedAt,
    completedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    failures
  };
  await writeReport(report);

  if (failures.length) {
    console.error('\nProduction smoke verification failed:\n');
    for (const failure of failures) console.error(`- ${failure}`);
    console.error('');
    process.exitCode = 1;
  } else {
    console.log(`Production smoke verification passed for ${origin}.`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await writeReport({
    schemaVersion: 1,
    origin,
    expectedCommit: expectedCommit ?? null,
    startedAt,
    completedAt: new Date().toISOString(),
    status: 'error',
    failures: [message]
  });
  console.error(`\nProduction deployment verification failed:\n\n- ${message}\n`);
  process.exitCode = 1;
}
