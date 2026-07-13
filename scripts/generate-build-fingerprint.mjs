import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';

const commit = process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? 'local';
const branch = process.env.CF_PAGES_BRANCH ?? process.env.GITHUB_REF_NAME ?? 'local';
const builtAt = new Date().toISOString();

await mkdir('public', { recursive: true });
await writeFile(
  'public/build.json',
  `${JSON.stringify({ commit, branch, builtAt }, null, 2)}\n`,
  'utf8'
);

console.log(`Generated public/build.json for ${commit} on ${branch}.`);
