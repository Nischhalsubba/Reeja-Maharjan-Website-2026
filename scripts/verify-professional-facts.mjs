import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const sourceRoot = join(root, 'src');
const factsPath = join(sourceRoot, 'content', 'professional-facts.ts');
const allowedExtensions = new Set(['.astro', '.ts', '.tsx', '.js', '.jsx', '.md', '.mdx']);

const requiredFacts = [
  "publicCvPath: '/cv/'",
  "currentLocation: 'Biratnagar, Nepal'",
  "currentRole: 'Research Assistant'",
  "currentEmployer: 'Institute for Implementation Science and Health (IISH)'",
  "texasLicenseExpiry: '2026-10-31'",
  "lastVerified: '2026-07-12'"
];

const forbiddenPatterns = [
  {
    pattern: /['\"]\/resume\.pdf['\"]/g,
    message: 'Retired public resume path must not be referenced from active source.'
  },
  {
    pattern: /\bimmediate(?:ly)? available\b/gi,
    message: 'Availability must not claim immediate availability without explicit approval.'
  },
  {
    pattern: /Lalitpur Metropolitan-21|Khokana, Lalitpur/gi,
    message: 'Street-level or retired location copy must not appear in active source.'
  }
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolutePath)));
    } else if (allowedExtensions.has(extname(entry.name))) {
      files.push(absolutePath);
    }
  }

  return files;
}

const failures = [];
const factsSource = await readFile(factsPath, 'utf8');

for (const fact of requiredFacts) {
  if (!factsSource.includes(fact)) {
    failures.push(`professional-facts.ts is missing required entry: ${fact}`);
  }
}

for (const file of await walk(sourceRoot)) {
  const source = await readFile(file, 'utf8');
  const displayPath = relative(root, file);

  for (const { pattern, message } of forbiddenPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(source)) {
      failures.push(`${displayPath}: ${message}`);
    }
  }
}

if (failures.length > 0) {
  console.error('\nProfessional facts verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('');
  process.exit(1);
}

console.log('Professional facts verification passed.');
