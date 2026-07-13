import { readdir, readFile } from 'node:fs/promises';
import process from 'node:process';

const root = new URL('../', import.meta.url);
const blogDir = new URL('../src/content/blog/', import.meta.url);
const failures = [];
const articleFiles = (await readdir(blogDir)).filter((name) => name.endsWith('.ts') && !['index.ts', 'types.ts', 'governance.ts'].includes(name));
const governanceSource = await readFile(new URL('../src/content/blog/governance.ts', import.meta.url), 'utf8');
const routeSource = await readFile(new URL('../src/pages/blog/[slug].astro', import.meta.url), 'utf8');
const previewSource = await readFile(new URL('../src/pages/og/articles/[slug].svg.ts', import.meta.url), 'utf8');

for (const file of articleFiles) {
  const source = await readFile(new URL(file, blogDir), 'utf8');
  const slug = source.match(/slug:\s*'([^']+)'/)?.[1];
  if (!slug) {
    failures.push(`${file}: missing slug`);
    continue;
  }
  if (!governanceSource.includes(`'${slug}':`)) failures.push(`${file}: missing governance metadata for ${slug}`);
  for (const required of ['primaryKeyword:', 'sources:', 'relatedSlugs:', 'disclaimer:']) {
    if (!source.includes(required)) failures.push(`${file}: missing ${required.replace(':', '')}`);
  }
}

const reviewDueAt = governanceSource.match(/const reviewDueAt = '([^']+)'/)?.[1];
const sourcesAccessedAt = governanceSource.match(/const sourcesAccessedAt = '([^']+)'/)?.[1];
for (const [label, value] of [['review due date', reviewDueAt], ['source access date', sourcesAccessedAt]]) {
  if (!value || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) failures.push(`Invalid ${label}.`);
}
if (reviewDueAt && Date.parse(`${reviewDueAt}T23:59:59Z`) < Date.now()) failures.push(`Article review date expired on ${reviewDueAt}.`);

const forbiddenRouteFragments = ['FAQPage', 'Reviewed {updated}', 'Reviewed {post.updatedAt}'];
for (const fragment of forbiddenRouteFragments) {
  if (routeSource.includes(fragment)) failures.push(`Article route contains forbidden fragment: ${fragment}`);
}
for (const required of ['getBlogGovernance', 'ArticleGovernance', '/og/articles/${post.slug}.svg', "'@type': 'BlogPosting'", "'@type': 'BreadcrumbList'"]) {
  if (!routeSource.includes(required)) failures.push(`Article route is missing required fragment: ${required}`);
}
for (const required of ['width="1200"', 'height="630"', 'getStaticPaths', 'image/svg+xml']) {
  if (!previewSource.includes(required)) failures.push(`Article preview generator is missing: ${required}`);
}

if (articleFiles.length !== 10) failures.push(`Expected 10 governed articles, found ${articleFiles.length}.`);

if (failures.length) {
  console.error('\nEditorial governance verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(`Editorial governance passed for ${articleFiles.length} articles.`);
