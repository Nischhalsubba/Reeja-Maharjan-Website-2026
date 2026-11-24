import { access, readdir, readFile } from 'node:fs/promises';
import process from 'node:process';

const root = new URL('../', import.meta.url);
const failures = [];
const read = (path) => readFile(new URL(path, root), 'utf8');
const exists = async (path) => { try { await access(new URL(path, root)); return true; } catch { return false; } };

const layout = await read('src/layouts/BaseLayout.astro');
const canonical = await read('src/styles/reeja-cinematic.css');
const styles = (await readdir(new URL('src/styles/', root))).filter((name) => name.endsWith('.css'));
const extraStyles = styles.filter((name) => name !== 'reeja-cinematic.css');
if (extraStyles.length) failures.push('Legacy stylesheet files remain: ' + extraStyles.join(', '));
if (layout.split("import '../styles/reeja-cinematic.css';").length !== 2) failures.push('BaseLayout must import the canonical stylesheet exactly once.');
if (/import ['"]\.\.\/styles\/[^'"]+\.css['"]/.test(layout.replace("import '../styles/reeja-cinematic.css';", ''))) failures.push('Unexpected stylesheet import remains in BaseLayout.');
if (layout.includes('styles/design-system.css') || layout.includes('styles/cinematic-refinements.css')) failures.push('Legacy stylesheet reference remains in BaseLayout.');
for (const required of ['--reeja-ink', '--reeja-paper', '--reeja-accent', 'prefers-reduced-motion: reduce', '.blog-search', '.cv-page']) {
  if (!canonical.includes(required)) failures.push('Canonical stylesheet is missing ' + required + '.');
}
for (const path of ['src/styles/tokens.css','src/styles/base.css','src/styles/site-pages.css','src/styles/shell.css','src/styles/care-shell.css','src/styles/care-inner-layout.css','src/styles/care-personal-inner.css','src/styles/care-article-footer.css','src/styles/care-editorial-v4.css','src/styles/care-blog-v44.css','src/styles/slate-home.css','src/styles/slate-site.css','src/styles/design-system.css','src/styles/reeja-editorial-home.css','src/styles/reeja-minimal-home.css','src/styles/reeja-sitewide-v11.css','src/styles/cinematic-demo.css','src/styles/cinematic-refinements.css','src/styles/care-cv-print.css']) {
  if (await exists(path)) failures.push('Legacy stylesheet still exists: ' + path);
}
const cv = await read('src/pages/cv.astro');
if (cv.includes('.css')) failures.push('CV page must not import a separate stylesheet.');
if (!layout.includes('class="care-personal-site"')) failures.push('Expected accessible site root class is missing.');
if (!canonical.includes('focus-visible')) failures.push('Visible keyboard focus styles are missing.');
if (failures.length) {
  console.error('Source ownership verification failed:\n' + failures.map((item) => '- ' + item).join('\n'));
  process.exit(1);
}
console.log('Source ownership passed: one canonical stylesheet, no legacy stylesheet files or page-level CSS imports.');
