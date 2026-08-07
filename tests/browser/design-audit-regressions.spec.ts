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

test('primary pages keep Reeja as the subject in titles, descriptions and headings', async ({ page }) => {
  const routes = [
    '/',
    '/hire-reeja/',
    '/clinical-research/',
    '/maternal-health/',
    '/nursing-practice/',
    '/contact/',
    '/blog/',
    '/cv/'
  ];

  for (const path of routes) {
    await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const heading = await page.locator('main h1').first().innerText();

    expect(title).toContain('Reeja Maharjan');
    expect(description).toContain('Reeja');
    expect(heading).toContain('Reeja');
  }

  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  const nav = page.locator('.desktop-nav');
  await expect(nav.getByRole('link', { name: 'Experience' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Research' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Maternal Health' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Nursing' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Writing' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'CV' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Contact Reeja' })).toBeVisible();
  await expect(page.getByText('Clinical care with a', { exact: false })).toHaveCount(0);
});

test('contact page submits through the provider POST flow and returns with success feedback', async ({ page }) => {
  const providerEndpoint = 'https://formsubmit.co/maharjanreeja88@gmail.com';
  const successUrl = `${origin}/contact/?sent=1#professional-contact-form`;

  await page.route(providerEndpoint, async (route) => {
    const request = route.request();
    expect(request.method()).toBe('POST');

    const postData = request.postData() ?? '';
    const payload = new URLSearchParams(postData);
    expect(payload.get('name')).toBe('Reeja Recruiter');
    expect(payload.get('email')).toBe('recruiter@example.com');
    expect(payload.get('organization')).toBe('Example Health Research');
    expect(payload.get('role_type')).toBe('Research role');
    expect(payload.get('location')).toBe('Kathmandu, Nepal');
    expect(payload.get('message')).toContain('Maternal health research opportunity');
    expect(payload.get('_next')).toBe('https://reejamaharjan.com.np/contact/?sent=1#professional-contact-form');
    expect(payload.get('_url')).toBe('https://reejamaharjan.com.np/contact/');
    expect(payload.get('_captcha')).toBe('false');

    await route.fulfill({
      status: 303,
      headers: { location: successUrl },
      body: ''
    });
  });

  await page.goto(`${origin}/contact/`, { waitUntil: 'networkidle' });

  const form = page.getByRole('form', { name: /Send a message to Reeja/i });
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('method', 'POST');
  await expect(form).toHaveAttribute('action', providerEndpoint);

  const honeypot = page.locator('.form-honeypot');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
  await expect(honeypot).toHaveAttribute('tabindex', '-1');
  const honeypotState = await honeypot.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      opacity: style.opacity,
      position: style.position,
      width: rect.width,
      height: rect.height,
      pointerEvents: style.pointerEvents,
      clipPath: style.clipPath
    };
  });
  expect(honeypotState.opacity).toBe('0');
  expect(honeypotState.position).toBe('absolute');
  expect(honeypotState.width).toBeLessThanOrEqual(1);
  expect(honeypotState.height).toBeLessThanOrEqual(1);
  expect(honeypotState.pointerEvents).toBe('none');
  expect(honeypotState.clipPath).not.toBe('none');

  await page.getByLabel('Your name').fill('Reeja Recruiter');
  await page.getByLabel('Your email').fill('recruiter@example.com');
  await page.getByLabel('Organisation / hospital').fill('Example Health Research');
  await page.getByLabel('Role / opportunity').fill('Research role');
  await page.getByLabel('Location').fill('Kathmandu, Nepal');
  await page.getByLabel('Message').fill('Maternal health research opportunity with participant follow-up and care coordination responsibilities.');

  const submit = page.getByRole('button', { name: 'Send to Reeja' });
  await Promise.all([
    page.waitForURL((url) => url.pathname === '/contact/' && url.hash === '#professional-contact-form'),
    submit.click()
  ]);

  const success = page.locator('[data-form-success]');
  await expect(success.getByText('Message submitted for delivery to Reeja.')).toBeVisible();
  await expect(success.getByText(/maharjanreeja88@gmail\.com/)).toBeVisible();
  await expect(submit).toBeEnabled();
});

test('contact form keeps invalid users at the field with clear feedback', async ({ page }) => {
  await page.goto(`${origin}/contact/`, { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Send to Reeja' }).click();

  const name = page.getByLabel('Your name');
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Please complete this field.').first()).toBeVisible();
});
