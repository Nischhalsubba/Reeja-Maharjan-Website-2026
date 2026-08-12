import { expectedCommit, maxAttempts, retryDelayMs } from './config.mjs';
import { readBuildFingerprint, sleep } from './http.mjs';

export async function waitForExpectedDeployment() {
  if (!expectedCommit) return;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const fingerprint = await readBuildFingerprint();
    const deployedCommit = fingerprint.ok ? fingerprint.payload?.commit : undefined;
    if (deployedCommit === expectedCommit) {
      console.log(`Production is serving expected commit ${expectedCommit}.`);
      return;
    }
    const detail = fingerprint.ok ? `currently serving ${deployedCommit ?? 'an unknown commit'}` : fingerprint.message;
    if (attempt === maxAttempts) throw new Error(`Production did not reach expected commit ${expectedCommit}; ${detail}`);
    console.log(`Attempt ${attempt}/${maxAttempts}: ${detail}. Retrying.`);
    await sleep(retryDelayMs);
  }
}