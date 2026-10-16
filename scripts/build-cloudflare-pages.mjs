/**
 * Cloudflare Pages currently executes "npm run build" from the repository root.
 * The Astro app is inside site/. Keep the standard site/ build unchanged and
 * mirror its verified output to root/dist for both valid Pages output settings.
 */
import { spawnSync } from 'node:child_process';
import { access, cp, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const app = join(root, 'site');
const source = join(app, 'dist');
const destination = join(root, 'dist');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(args) {
  console.log(`[Cloudflare build] ${npm} ${args.join(' ')} (cwd: site/)`);
  const child = spawnSync(npm, args, {
    cwd: app,
    stdio: 'inherit',
    env: process.env,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) throw new Error(`Command failed with exit code ${child.status}: ${npm} ${args.join(' ')}`);
}

await access(join(app, 'package-lock.json'));
run(['ci', '--no-audit', '--no-fund', '--legacy-peer-deps']);
run(['run', 'build']);

// Do not report a successful Cloudflare build without deployable pages.
for (const required of [
  'index.html',
  '404.html',
  '_headers',
  'build.json',
  'cv/index.html',
  'contact/index.html',
  'clinical-research/index.html',
  'nursing-practice/index.html',
  'blog/index.html'
]) {
  const file = join(source, required);
  const info = await stat(file);
  if (!info.isFile() || info.size === 0) throw new Error(`Missing or empty built page: site/dist/${required}`);
}

await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });

console.log('[Cloudflare build] Successful. Both root/dist and site/dist contain the complete Astro output.');
console.log('[Cloudflare build] Use output directory "dist" from repository root, or "site/dist" from repository root. Prefer project root "site" with output "dist".');
