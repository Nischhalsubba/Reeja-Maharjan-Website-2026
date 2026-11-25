import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('Care is Personal supporting-page heroes stay line-free, spacious and WebGL-free', async ({ page }) => {
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
  expect(metrics.cardRadius).toBeLessThanOrEqual(3);
  expect(metrics.cardShadow).toBe('none');
  expect(metrics.bodyDesign).toBe('care-is-personal');

  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  await expect(page.locator('.fj-hero canvas')).toHaveCount(0);
  await expect(page.locator('[data-hero-scene]')).toHaveCount(0);
});

test('Homepage keeps Reeja’s real hero photo and loads the labelled clinical portrait illustration', async ({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const img=page.locator('.slate-hero__photograph');await expect(img).toBeVisible();
 await expect(img).toHaveAttribute('src','/reeja-headshot.jpg');
 await expect.poll(()=>img.evaluate(n=>(n as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 const clinicalPortrait=page.locator('.rm-experience__photo img');
 await expect(clinicalPortrait).toHaveAttribute('src','/images/reeja-clinical-portrait-2026.jpg');
 await expect(clinicalPortrait).toHaveAttribute('width','800');
 await expect(clinicalPortrait).toHaveAttribute('height','1600');
 await expect(clinicalPortrait).toHaveAttribute('alt',/Illustrated portrait of Reeja Maharjan/);
 await expect(page.locator('.rm-experience__photo figcaption')).toHaveCount(0);
 await clinicalPortrait.scrollIntoViewIfNeeded();
 await expect.poll(()=>clinicalPortrait.evaluate(n=>(n as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await expect(page.locator('.slate-hero canvas')).toHaveCount(0);
});

test('Slate & Seafoam palette and typography apply across the site', async ({ page }) => {
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
        carePersonal: body.classList.contains('care-personal-site'),
        background: getComputedStyle(body).backgroundColor,
        bodyFont: getComputedStyle(body).fontFamily,
        headingFont: heading ? getComputedStyle(heading).fontFamily : '',
        canvasCount: document.querySelectorAll('canvas').length
      };
    });

    expect(state.carePersonal).toBe(true);
    expect(state.background).toBe('rgb(250, 250, 248)');
    expect(state.bodyFont).toContain('Public Sans');
    expect(state.headingFont).toContain('Georgia');
    expect(state.canvasCount).toBe(0);
  }
});

test('primary pages identify Reeja in SEO metadata while keeping editorial headings readable', async ({ page }) => {
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
    if (path === '/') expect(heading.replace(/\s+/g, ' ')).toMatch(/Reeja\s*Maharjan\./g);
    else expect(heading.trim().length).toBeGreaterThan(9);
  }

  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  const nav = page.locator('.desktop-nav');
  await expect(nav.getByRole('link', { name: 'Experience' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Research' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Nursing' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Writing' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'CV' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Hire Reeja' })).toBeVisible();
  await expect(page.getByText('Clinical care with a', { exact: false })).toHaveCount(0);
});

test('Slate homepage keeps real professional pathways and published article links',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.slate-focus__card')).toHaveCount(4);
 await expect(page.locator('.slate-experience__item')).toHaveCount(4);
 await expect(page.locator('.slate-writing__card')).toHaveCount(3);
 await expect(page.getByRole('link',{name:/Get in touch/}).first()).toHaveAttribute('href','/contact/');
 await expect(page.locator('.desktop-nav').getByRole('link',{name:'Hire Reeja'})).toBeVisible();
});

for (const path of ['/contact/','/nursing-practice/','/']) {
  test(`same-origin enquiry delivery from ${path}`, async ({page})=>{
    await page.goto(origin+path);
    const form=page.locator('#professional-contact-form');
    await expect(form).toHaveAttribute('action','/api/contact');
    await expect(form.locator('a[href^="mailto:"]')).toBeVisible();
    if (!await form.locator('.cf-turnstile').count()) {
      await expect(form.locator('[data-delivery-status]')).toContainText('not configured');
      return;
    }
    await page.route('**/api/contact',async route=>{
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON().email).toBe('recruiter@example.com');
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true})});
    });
    await form.getByLabel('Your name').fill('Example Recruiter');
    await form.getByLabel('Work email').fill('recruiter@example.com');
    await form.getByLabel('Message',{exact:true}).fill('A professional enquiry regarding maternal health research.');
    // Provider tokens are mocked only for this intercepted browser test.
    await form.evaluate(el=>{let field=el.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');if(!field){field=document.createElement('input');field.name='cf-turnstile-response';field.type='hidden';el.append(field);}field.value='mock-token';});
    await form.getByRole('button',{name:'Send enquiry'}).click();
    await expect(form.locator('[data-delivery-status]')).toContainText('accepted for email delivery');
    expect(new URL(page.url()).pathname).toBe(path);
  });
}

test('call request uses the same email delivery endpoint',async({page})=>{
  await page.goto(origin+'/contact/');
  const form=page.locator('#call-request');
  await expect(form).toHaveAttribute('action','/api/contact');
  await expect(form.locator('input[name="kind"]')).toHaveValue('call');
  await form.locator('[data-iso]').first().click();
  await form.locator('[data-call-time="09:00"]').click();
  await expect(form.locator('#call-time')).toHaveValue('09:00');
});

test('contact form keeps invalid users at the field with clear feedback', async ({page})=>{
  await page.goto(origin+'/contact/');
  const form=page.locator('#professional-contact-form');
  await form.getByRole('button',{name:'Send enquiry'}).click();
  await expect(form.getByLabel('Your name')).toBeFocused();
  await expect(form.getByLabel('Your name')).toHaveAttribute('aria-invalid','true');
});
