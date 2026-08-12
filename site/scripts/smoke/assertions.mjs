import {
  forbiddenHomepageText,
  requiredHomepageText,
  requiredPublicFacts,
  requiredRoutes,
  retiredPaths,
  requiredSecurityHeaders
} from './config.mjs';
import { readBuildFingerprint, request } from './http.mjs';

async function readHtml(path, failures) {
  const response = await request(path, { cacheBust: true });
  if (!response.ok) {
    failures.push(`${path} returned ${response.status}.`);
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) failures.push(`${path} returned unexpected content-type ${contentType || '(missing)'}.`);
  return response.text();
}

function assertContainsAll(source, values, label, failures) {
  for (const value of values) if (!source.includes(value)) failures.push(`${label} is missing: ${value}`);
}

function assertContainsNone(source, values, label, failures) {
  for (const value of values) if (source.includes(value)) failures.push(`${label} contains retired content: ${value}`);
}

export async function collectProductionFailures() {
  const failures = [];

  for (const path of requiredRoutes) await readHtml(path, failures);

  const homepage = await readHtml('/', failures);
  if (homepage) {
    assertContainsAll(homepage, requiredHomepageText, 'Homepage', failures);
    assertContainsAll(homepage, requiredPublicFacts, 'Homepage', failures);
    assertContainsNone(homepage, forbiddenHomepageText, 'Homepage', failures);
  }

  for (const path of retiredPaths) {
    const response = await request(path, { cacheBust: true });
    if (response.status !== 404) failures.push(`${path} returned ${response.status}; expected a real 404.`);
  }

  const article = await readHtml('/blog/essential-maternal-newborn-care-guide-2026/', failures);
  if (article) {
    assertContainsAll(
      article,
      ['Last edited', 'Written by Reeja Maharjan', 'no named independent clinical reviewer is claimed'],
      'Priority article',
      failures
    );
    if (article.includes('FAQPage')) failures.push('Priority article still emits FAQPage schema.');
  }

  const missingPage = await request('/qa-nonexistent-route', { cacheBust: true });
  if (missingPage.status !== 404) {
    failures.push(`Missing page returned ${missingPage.status}; expected 404.`);
  } else {
    const html = await missingPage.text();
    if (!html.includes('name="robots" content="noindex, nofollow"')) {
      failures.push('404 page is missing noindex, nofollow robots metadata.');
    }
  }

  const fingerprint = await readBuildFingerprint();
  if (!fingerprint.ok) {
    failures.push(fingerprint.message);
  } else {
    const cacheControl = fingerprint.headers?.['cache-control'] ?? '';
    if (!cacheControl.includes('no-store')) failures.push('/build.json is missing Cache-Control: no-store.');
  }

  const headersResponse = await request('/', { method: 'HEAD', cacheBust: true });
  if (!headersResponse.ok) failures.push(`Homepage HEAD request returned ${headersResponse.status}.`);
  const headers = headersResponse.headers;
  for (const [name, fragments] of Object.entries(requiredSecurityHeaders)) {
    const actual = headers.get(name) ?? '';
    if (!actual) {
      failures.push(`Missing production security header: ${name}`);
      continue;
    }
    for (const fragment of fragments) {
      if (!actual.includes(fragment)) failures.push(`${name} is missing required policy fragment: ${fragment}`);
    }
  }

  return failures;
}
