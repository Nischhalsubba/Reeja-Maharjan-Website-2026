import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const isRemote = !origin.includes('127.0.0.1') && !origin.includes('localhost');

test('approved browser requests remain clean', async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', (request) => {
    failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`.trim());
  });

  await page.goto(origin, { waitUntil: 'networkidle' });

  const contactForm = page.locator('form[action*="formsubmit.co"]');
  if (await contactForm.count()) {
    await expect(contactForm).toHaveAttribute('method', /post/i);
    await expect(contactForm).toHaveAttribute('action', /^https:\/\/formsubmit\.co\//);
  }

  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('remote deployment serves restrictive security headers', async ({ request }) => {
  test.skip(!isRemote, 'Security headers are applied by Cloudflare Pages, not Astro preview.');

  const response = await request.get(origin, {
    headers: { 'cache-control': 'no-cache', pragma: 'no-cache' }
  });
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['permissions-policy']).toContain('camera=()');

  const csp = headers['content-security-policy'] ?? '';
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).toContain("base-uri 'self'");
  expect(csp).toContain('https://formsubmit.co');
  expect(csp).toContain('https://www.googletagmanager.com');
});
