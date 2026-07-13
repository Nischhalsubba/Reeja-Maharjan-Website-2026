import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test.use({
  viewport: { width: 320, height: 800 },
  reducedMotion: 'reduce'
});

test('mobile navigation manages focus, inertness, and keyboard closure', async ({ page }) => {
  const consoleErrors = [];
  const failedRequests = [];
  page.on('