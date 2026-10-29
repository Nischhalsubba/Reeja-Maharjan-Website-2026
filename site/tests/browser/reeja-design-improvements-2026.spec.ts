import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('recruiters can open Reeja’s CV directly and read verified role summaries', async ({ page }) => {
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const hero = page.locator('.rm-hero__actions');
  await expect(hero.getByRole('link', { name: /View CV/ })).toHaveAttribute('href', '/cv/');
  await expect(hero.getByRole('link', { name: /Get in touch/ })).toHaveAttribute('href', '/contact/');
  const roles = page.locator('.rm-experience__roles li');
  await expect(roles).toHaveCount(4);
  await expect(page.locator('.rm-role__summary')).toHaveCount(4);
  for (const role of await roles.all()) {
    expect((await role.locator('.rm-role__summary').innerText()).trim().length).toBeGreaterThan(40);
    await expect(role.locator('.rm-role__period')).not.toBeEmpty();
  }
});

test('clinical research offers published related guides without implying trial outcomes', async ({ page }) => {
  await page.goto(origin + '/clinical-research/', { waitUntil: 'domcontentloaded' });
  const reading = page.locator('.research-reading');
  await expect(reading.getByRole('heading', { name: 'Understand pregnancy monitoring.' })).toBeVisible();
  await expect(reading.locator('.research-reading__item')).toHaveCount(2);
  await expect(reading.getByRole('link', { name: /Pre-eclampsia/ })).toHaveAttribute('href', '/blog/pre-eclampsia-pregnancy-warning-signs-monitoring-2026/');
  await expect(reading.getByRole('link', { name: /Gestational Diabetes/ })).toHaveAttribute('href', '/blog/gestational-diabetes-in-pregnancy-2026-monitoring-care/');
  await expect(reading).toContainText('do not report MOM-HD trial outcomes');
});

test('home and research links remain usable without mobile overflow or motion', async ({ browser }) => {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of ['/', '/clinical-research/']) {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, route + ' @ ' + width).toBeLessThanOrEqual(1);
    }
    await context.close();
  }
});
