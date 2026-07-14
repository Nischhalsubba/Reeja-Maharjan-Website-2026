import process from 'node:process';

export const origin = process.env.SITE_ORIGIN ?? 'https://reejamaharjan.com.np';
export const expectedCommit = process.env.EXPECTED_COMMIT?.trim();
export const maxAttempts = Number(process.env.SMOKE_ATTEMPTS ?? 20);
export const retryDelayMs = Number(process.env.SMOKE_DELAY_MS ?? 30000);
export