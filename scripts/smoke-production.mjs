import process from 'node:process';
import { origin } from './smoke/config.mjs';
import { waitForExpectedDeployment } from './smoke/deployment.mjs';
import { collectProductionFailures } from './smoke/assertions.mjs';

try {
  await waitForExpectedDeployment();
  const failures = await collectProductionFailures();
  if (failures.length) {
    console.error('\nProduction smoke verification failed:\n');
    for (const failure of failures) console.error(`- ${failure}`);
    console.error('');
    process.exit(1);
  }
  console.log(`Production smoke verification passed for ${origin}.`);
} catch (error) {
  console.error(`\nProduction deployment verification failed:\n\n- ${error.message}\n`);
  process.exit(1);
}