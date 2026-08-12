import { readFile } from 'node:fs/promises';
import process from 'node:process';

const source = await readFile(new URL('../src/content/professional-facts.ts', import.meta.url), 'utf8');
const today = new Date();
const warningWindowDays = 45;

const fields = [
  { key: 'texasLicenseExpiry', label: 'Texas RN license' },
  { key: 'currentRoleContractEnd', label: 'Current role contract' }
];

const failures = [];
const warnings = [];

for (const field of fields) {
  const match = source.match(new RegExp(`${field.key}:\\s*'([^']+)'`));
  if (!match) {
    failures.push(`${field.label}: missing ${field.key} in professional-facts.ts`);
    continue;
  }

  const expiry = new Date(`${match[1]}T23:59:59Z`);
  if (Number.isNaN(expiry.getTime())) {
    failures.push(`${field.label}: invalid ISO date ${match[1]}`);
    continue;
  }

  const daysRemaining = Math.ceil((expiry.getTime() - today.getTime()) / 86_400_000);
  if (daysRemaining < 0) {
    failures.push(`${field.label}: expired ${Math.abs(daysRemaining)} day(s) ago`);
  } else if (daysRemaining <= warningWindowDays) {
    warnings.push(`${field.label}: expires in ${daysRemaining} day(s)`);
  }
}

for (const warning of warnings) console.warn(`WARNING: ${warning}`);

if (failures.length > 0) {
  console.error('\nExpiry control verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('');
  process.exit(1);
}

console.log('License and contract expiry controls passed.');
