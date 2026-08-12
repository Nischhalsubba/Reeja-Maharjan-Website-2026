import process from 'node:process';

export const siteOrigin = new URL(process.env.SITE_ORIGIN ?? 'https://reejamaharjan.com.np');
export const pagesOrigin = process.env.PAGES_ORIGIN ? new URL(process.env.PAGES_ORIGIN) : null;
export const expectedCommit = process.env.EXPECTED_COMMIT?.trim() ?? '';
export const reportPath = process.env.DIAGNOSTICS_REPORT ?? 'production-diagnostics.json';
