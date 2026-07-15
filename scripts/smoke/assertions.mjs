import { forbiddenHomepageText, requiredHomepageText, retiredPaths } from './config.mjs';
import { request } from './http.mjs';

export async function collectProductionFailures() {
  const failures = [];
  const homepage = await request('/');
  if (!homepage.ok) {
    failures.push(`Homepage returned ${homepage.status}.`);
  } else {
    const html = await homepage.text();
    for (const value of requiredHomepageText) if (!html.includes(value)) failures.push(`Homepage is missing: ${value}`);
    for (const value of forbiddenHomepageText) if (html.includes(value)) failures.push(`Homepage contains retired content: ${value}`);
  }

  const cv = await request('/cv/');
  if (!cv.ok) failures.push(`/cv/ returned ${cv.status}.`);

  for (const path of retiredPaths) {
    const response = await request(path);
    if (response.status === 200) failures.push(`${path} is still publicly available.`);
  }

  const article = await request('/blog/essential-maternal-newborn-care-guide-2026/');
  if (!article.ok) {
    failures.push(`Priority article returned ${article.status}.`);
  } else {
    const html = await article.text();
    for (const value of ['Last updated', 'Written by', 'No named clinical review is claimed']) {
      if (!html.includes(value)) failures.push(`Priority article is missing: ${value}`);
    }
    if (html.includes('FAQPage')) failures.push('Priority article still emits FAQPage schema.');
  }

  const missingPage = await request('/qa-nonexistent-route');
  if (missingPage.status !== 404) {
    failures.push(`Missing page returned ${missingPage.status} instead of 404.`);
  } else {
    const html = await missingPage.text();
    if (!html.includes('name="robots" content="noindex, nofollow"')) {
      failures.push('404 page is missing noindex, nofollow robots metadata.');
    }
  }

  const headers = await request('/', { method: 'HEAD' });
  for (const name of [
    'content-security-policy',
    'x-content-type-options',
    'referrer-policy',
    'x-frame-options',
    'permissions-policy'
  ]) {
    if (!headers.headers.get(name)) failures.push(`Missing production security header: ${name}`);
  }
  return failures;
}
