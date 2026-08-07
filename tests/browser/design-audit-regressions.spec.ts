import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('supporting-page heroes contain no decorative line or WebGL scene and summary rows retain comfortable inset', async ({ page }) => {
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
  await expect(page.locator('.fj-hero canvas')).toHaveCount(0);
  await expect(page.locator('[data-hero-scene]')).toHaveCount(0);
});

test('Field Journal portrait uses the headshot and never relies on a cropping fit', async ({ browser }) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 1050 }
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' });

    const portrait = page.locator('.fj-portrait__frame img');
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute('src', '/reeja-headshot.jpg');

    const imageState = await portrait.evaluate((image) => {
      const element = image as HTMLImageElement;
      const style = getComputedStyle(element);
      return {
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition
      };
    });

    expect(imageState.naturalWidth).toBeGreaterThan(0);
    expect(imageState.naturalHeight).toBeGreaterThan(0);
    expect(imageState.objectFit).toBe('contain');
    expect(imageState.objectPosition).toContain('50%');

    await context.close();
  }
});

test('Field Journal homepage uses the approved palette and does not ship decorative Three.js', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts.ready);

  const state = await page.evaluate(() => {
    const body = document.body;
    const styles = getComputedStyle(body);
    return {
      fieldJournal: body.classList.contains('field-journal'),
      background: styles.backgroundColor,
      canvasCount: document.querySelectorAll('canvas').length,
      heroTitle: document.querySelector('.fj-hero__title')?.textContent ?? ''
    };
  });

  expect(state.fieldJournal).toBe(true);
  expect(state.background).toBe('rgb(244, 239, 230)');
  expect(state.canvasCount).toBe(0);
  expect(state.heroTitle).toContain('researcher’s eye');
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

  const form = page.getByRole('form', { name: /Share the opportunity details/i });
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('action', 'https://formsubmit.co/ajax/maharjanreeja88@gmail.com');

  await page.getByLabel('Name').fill('Reeja Recruiter');
  await page.getByLabel('Email').fill('recruiter@example.com');
  await page.getByLabel('Organisation / hospital').fill('Example Health Research');
  await page.getByLabel('Role / opportunity type').fill('Research role');
  await page.getByLabel('Location').fill('Kathmandu, Nepal');
  await page.getByLabel('Message').fill('Maternal health research opportunity with participant follow-up and care coordination responsibilities.');

  const submit = page.getByRole('button', { name: 'Send message' });
  await submit.click();

  const success = page.locator('[data-form-success]');
  await expect(success.getByText('Message sent.')).toBeVisible();
  await expect(success.getByText(/maharjanreeja88@gmail\.com/)).toBeVisible();
  await expect(submit).toBeEnabled();
});

test('contact form keeps invalid users at the field with clear feedback', async ({ page }) => {
  await page.goto(`${origin}/contact/`, { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Send message' }).click();

  const name = page.getByLabel('Name');
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Please complete this field.').first()).toBeVisible();
});
