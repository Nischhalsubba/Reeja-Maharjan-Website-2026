import { readFile } from 'node:fs/promises';
import process from 'node:process';

const source = await readFile(new URL('../src/content/professional-facts-evidence.ts', import.meta.url), 'utf8');
const requiredSections = ['identityAndCredentials', 'currentRoleAndProject', 'locationAndAvailability', 'licensing', 'contactAndProfiles'];
const failures = [];

for (const section of requiredSections) {
  if (!source.includes(`${section}:`)) failures.push(`Missing evidence section: ${section}`);
}

const dates = [...source.matchAll(/checkedAt:\s*'([^']+)'/g)].map((match) => match[1]);
if (dates.length !== requiredSections.length) failures.push(`Expected ${requiredSections.length} evidence dates, found ${dates.length}.`);

const maximumAgeDays = 180;
for (const value of dates) {
  const checkedAt = new Date(`${value}T23:59:59Z`);
  if (Number.isNaN(checkedAt.getTime())) {
    failures.push(`Invalid evidence date: ${value}`);
    continue;
  }
  const ageDays = Math.floor((Date.now() - checkedAt.getTime()) / 86_400_000);
  if (ageDays > maximumAgeDays) failures.push(`Evidence date ${value} is ${ageDays} days old; refresh required.`);
}

for (const required of ["owner: 'Reeja Maharjan'", 'source:', 'checkedAt:']) {
  if (!source.includes(required)) failures.push(`Evidence register is missing required fragment: ${required}`);
}

if (failures.length) {
  console.error('\nProfessional facts evidence verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Professional facts evidence verification passed.');
