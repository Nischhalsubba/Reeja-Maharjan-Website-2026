import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('Field Journal supporting-page heroes stay line-free, spacious and WebGL-free', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/hire-reeja/`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('.site-page__hero');
    const firstRow = document.querySelector<HTMLElement>('.site-page__summary > div');
    const firstCard = document.querySelector<HTMLElement>('.site-card');
    if (!hero || !firstRow || !firstCard) throw new Error('Expected hiring page elements were not found.');

    const before = getComputedStyle(hero, '::before');
    const after = getComputedStyle(hero, '::after');
    const rowStyle = getComputedStyle(firstRow);
    const cardStyle = getComputedStyle(firstCard);

    return {
      beforeDisplay: before.display,
      afterDisplay: after.display,
      rowPaddingTop: Number.parseFloat(rowStyle.paddingTop),
      rowGap: Number.parseFloat(rowStyle.columnGap),
      canvasCount: hero.querySelectorAll('canvas').length,
      cardRadius: Number.parseFloat(cardStyle.borderTopLeftRadius),
      cardShadow: cardStyle.boxShadow,
      bodyDesign: document.body.dataset.designSystem
    };
  });

  expect(metrics.beforeDisplay).toBe('none');
  expect(metrics.afterDisplay).toBe('none');
  expect(metrics.canvasCount).toBe(0);
  expect(metrics.rowPaddingTop).toBeGreaterThanOrEqual(12);
  expect(metrics.rowGap).toBeGreaterThanOrEqual(12);
  expect(metrics.cardRadius).toBe(0);
  expect(metrics.cardShadow).toBe('none');
  expect(metrics.bodyDesign).toBe('reeja-field-journal');

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

test('Field Journal palette and typography apply across the site', async ({ page }) => {
  for (const path of [
    '/hire-reeja/',
    '/clinical-research/',
    '/maternal-health/',
    '/nursing-practice/',
    '/contact/',
    '/blog/',
    '/blog/essential-maternal-newborn-care-guide-2026/',
    '/cv/'
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => document.fonts.ready);

    const state = await page.evaluate(() => {
      const body = document.body;
      const heading = document.querySelector<HTMLElement>('main h1');
      return {
        fieldJournal: body.classList.contains('field-journal'),
        background: getComputedStyle(body).backgroundColor,
        bodyFont: getComputedStyle(body).fontFamily,
        headingFont: heading ? getComputedStyle(heading).fontFamily : '',
        canvasCount: document.querySelectorAll('canvas').length
      };
    });

    expect(state.fieldJournal).toBe(true);
    expect(state.background).toBe('rgb(244, 239, 230)');
    expect(state.bodyFont).toContain('Atkinson Hyperlegible');
    expect(state.headingFont).toContain('Crimson Pro');
    expect(state.canvasCount).toBe(0);
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

  const form = page.getByRole('form', { name: /Share the opportunity details/i });
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('action', 'https://formsubmit.co/ajax/maharjanreeja88@gmail.com');

  const honeypot = page.locator('.form-honeypot');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toBeHidden();

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
