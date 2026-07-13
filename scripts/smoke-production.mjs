import process from 'node:process';

const origin = process.env.SITE_ORIGIN ?? 'https://reejamaharjan.com.np';
const expectedCommit = process.env.EXPECTED_COMMIT?.trim();
const maxAttempts = Number(process.env.SMOKE_ATTEMPTS ?? 20);
const retryDelayMs = Number(process.env.SMOKE_DELAY_MS ?? 30000);

const requiredText = [
  'Clinical