import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('Care Practice heroes contain no decorative line or WebGL scene and summary rows retain comfortable inset', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/hire-reeja/`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('.site-page__hero');
    const firstRow = document.querySelector<HTMLElement>('.site-page__summary > div');
    if (!hero || !firstRow) throw new Error('Expected hiring hero elements were not found.');

    const before = getComputedStyle(hero, '::before');
    const after = getComputedStyle(hero, '::after');
    const rowStyle = getComputedStyle(firstRow);

    return {
      beforeDisplay: before.display,
      afterDisplay: after.display,
      paddingLeft: Number.parseFloat(rowStyle.paddingLeft),
      paddingRight: Number.parseFloat(rowStyle.paddingRight),
      canvasCount: hero.querySelectorAll('canvas').length
    };
  });

  expect(metrics.beforeDisplay).toBe('none');
  expect(metrics.afterDisplay).toBe('none');
  expect(metrics.canvasCount).toBe(0);
  expect(metrics.paddingLeft).toBeGreaterThanOrEqual(16);
  expect(metrics.paddingRight).toBeGreaterThanOrEqual(16);

  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  await expect(page.locator('.ledger-hero canvas')).toHaveCount(0);
  await expect(page.locator('[data-hero-scene]')).toHaveCount(0);
});

test('Reeja portrait uses the headshot and never relies on a cropping fit', async ({ browser }) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 1050 }
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

    const portrait = page.locator('.ledger-portrait img');
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute('src', '/reeja-headshot.jpg');

    const imageState = await portrait.evaluate((image) => {
      const element = image as HTMLImageElement;
      const style = getComputedStyle(element);
      return {
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        minHeight: style.minHeight
      };
    });

    expect(imageState.naturalWidth).toBeGreaterThan(0);
    expect(imageState.naturalHeight).toBeGreaterThan(0);
    expect(imageState.objectFit).toBe('contain');
    expect(imageState.objectPosition).toContain('50%');
    expect(Number.parseFloat(imageState.minHeight)).toBe(0);

    await context.close();
  }
});

test('contact page exposes accessible fields and submits to Reeja email endpoint', async ({ page }) => {
  await page.route('https://formsubmit.co/ajax/maharjanreeja88@gmail.com', async (route) => {
    expect(route.request().method()).toBe('POST');
    const postData = route.request().postData() ?? '';
    expect(postData).toContain('Reeja Recruiter');
    expect(postData).toContain('recruiter@example.com');
    expect(postData).toContain('Maternal health research opportunity');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true })
    });
  });

  await page.goto(`${origin}/contact/`, { waitUntil: 'networkidle' });

  const form = page.getByRole('form', { name: 'Share the opportunity details.' });
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('action', 'https://formsubmit.co/ajax/maharjanreeja88@gmail.com');

  await page.getByLabel('Name *').fill('Reeja Recruiter');
  await page.getByLabel('Email *').fill('recruiter@example.com');
  await page.getByLabel('Organisation / hospital').fill('Example Health Research');
  await page.getByLabel('Role / opportunity type').fill('Research role');
  await page.getByLabel('Location').fill('Kathmandu, Nepal');
  await page.getByLabel('Message *').fill('Maternal health research opportunity with participant follow-up and care coordination responsibilities.');

  const submit = page.getByRole('button', { name: 'Send message' });
  await submit.click();

  await expect(page.getByText('Message sent.')).toBeVisible();
  await expect(page.getByText(/maharjanreeja88@gmail\.com/)).toBeVisible();
  await expect(submit).toBeEnabled();
});

test('contact form keeps invalid users at the field with clear feedback', async ({ page }) => {
  await page.goto(`${origin}/contact/`, { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Send message' }).click();

  const name = page.getByLabel('Name *');
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Please complete this field.').first()).toBeVisible();
});
