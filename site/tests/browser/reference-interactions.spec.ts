import { test, expect } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';

test('reference-inspired navigation opens visual experience menu and real inner routes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin);
  await page.locator('.menupop summary').click();
  await expect(page.locator('.reference-mega .mega-grid a')).toHaveCount(3);
  await expect(page.locator('.reference-mega')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.menupop')).not.toHaveAttribute('open', '');
  await page.locator('.desktop-nav a[href="/about/"]').click();
  await expect(page.locator('main h1')).toHaveText(/Care, research and/);
  await expect(page.locator('.reference-timeline > li').first()).toBeAttached();
  await page.goto(`${origin}/experience/`);
  await page.getByRole('button', { name: 'Clinical research' }).click();
  await expect(page.locator('[data-experience-category]:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'All experience' }).click();
  await expect(page.locator('[data-experience-category]:visible')).toHaveCount(4);
});

test('hero copy receives a contrast backing as video approaches front profile', async ({ page }) => {
  await page.goto(origin);
  await expect(page.locator('.hero-track')).toHaveClass(/has-film/);
  await page.evaluate(() => window.scrollTo({top:(document.querySelector('.hero-track')!.getBoundingClientRect().height-innerHeight)/2,behavior:'instant'}));
  await expect.poll(() => page.locator('.hero-track').evaluate(el=>Number((el as HTMLElement).style.getPropertyValue('--hero-copy-shade')))).toBeGreaterThan(.8);
});

test('visual regression: fixed contrast, bounded experience navigation and usable contact grid', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(origin);
  await expect(page.locator('.hero-bottom > div').first()).toHaveCSS('background-color', 'rgb(250, 248, 233)');
  await expect(page.locator('.site-header')).toHaveCSS('background-color', 'rgb(250, 248, 233)');
  await page.locator('.menupop summary').click();
  for (const image of await page.locator('.mega-grid img').all()) {
    expect((await image.boundingBox())!.height).toBeLessThanOrEqual(220);
  }
  await page.goto(`${origin}/contact/`);
  const form = page.locator('.professional-contact-form');
  const copy = page.locator('.contact-hero__copy');
  expect((await form.boundingBox())!.width).toBeGreaterThan(500);
  expect(Math.abs((await form.boundingBox())!.y - (await copy.boundingBox())!.y)).toBeLessThan(40);
  await expect(page.locator('.professional-contact-form__privacy')).toHaveCSS('background-color', 'rgb(36, 36, 36)');
  await page.goto(`${origin}/nursing-practice/`);
  await expect(page.locator('.site-section--dark h2').first()).toHaveCSS('color', 'rgb(250, 248, 233)');
  await expect(page.locator('.care-footer__column a').first()).toHaveCSS('color', 'rgb(233, 231, 219)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/contact/`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test('editorial assets and card indices use the cinematic layout without obstructing text', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${origin}/about/`);
  await expect(page.locator('.reference-about-portrait img')).toHaveCSS('mask-image', /reeja-portrait-mask\.svg/);
  await expect(page.locator('.reference-practice-card img')).toHaveCount(3);
  for (const route of ['/clinical-research/', '/maternal-health/', '/nursing-practice/', '/hire-reeja/']) {
    await page.goto(origin + route);
    const cards = page.locator('.site-grid > .site-card');
    for (const card of await cards.all()) {
      expect(await card.evaluate(el => getComputedStyle(el, '::before').position)).toBe('static');
    }
    if (route !== '/hire-reeja/') {
      const photo = page.locator('.site-page > .cip-photo-band img');
      await expect(photo).not.toHaveAttribute('src', /mom-hd-care-journey\.svg/);
      expect((await photo.boundingBox())!.width).toBeGreaterThan(1380);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/about/`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});


test('reference grid is shared by header, content and footer throughout the portfolio', async ({page}) => {
  for (const width of [390, 768, 1440, 1920]) {
    await page.setViewportSize({width,height:900});
    for (const route of ['/', '/about/', '/experience/', '/clinical-research/', '/maternal-health/', '/nursing-practice/', '/cv/', '/hire-reeja/', '/contact/', '/blog/']) {
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      const edges=await page.evaluate(()=>{
        const header=document.querySelector('.site-header__inner')!.getBoundingClientRect();
        const footer=document.querySelector('.care-footer__main')!.getBoundingClientRect();
        const first=document.querySelector('main .wrap,main .container:not(.inner-breadcrumb)')?.getBoundingClientRect();
        return {header:header.left,footer:footer.left,content:first?.left,overflow:document.documentElement.scrollWidth-innerWidth};
      });
      expect(Math.abs(edges.header-edges.footer),route).toBeLessThanOrEqual(1);
      if(edges.content!==undefined)expect(Math.abs(edges.header-edges.content),route).toBeLessThanOrEqual(1);
      expect(edges.overflow,route).toBeLessThanOrEqual(1);
    }
  }
});

test('split action labels roll inside a fixed-size tile and keep one accessible name', async ({page}) => {
  await page.goto(origin);
  const button=page.locator('.hero .btn').first();
  await expect(button).toHaveClass(/ref-action/);
  await expect(button.locator('.ref-action-copy')).toHaveAttribute('aria-hidden','true');
  const before=await button.boundingBox();
  await button.hover();
  await expect.poll(()=>button.locator('.ref-action-original').evaluate(el=>getComputedStyle(el).transform)).not.toBe('none');
  const after=await button.boundingBox();
  expect(Math.abs(before!.width-after!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(before!.height-after!.height)).toBeLessThanOrEqual(1);
});

test('contact enquiry and conversation section retain one form and real contact routes', async ({page})=>{
  await page.goto(origin+'/contact/');
  await expect(page.locator('main h1')).toHaveText('Let’s talk.');
  await expect(page.locator('#professional-contact-form')).toHaveCount(1);
  await expect(page.locator('#contact-role')).toHaveJSProperty('tagName','SELECT');
  await expect(page.locator('#arrange-a-call')).toBeVisible();
  await expect(page.getByRole('link',{name:'Request a time'})).toHaveAttribute('href',/mailto:/);
  await page.goto(origin+'/about/');
  await expect(page.locator('footer #professional-contact-form')).toHaveCount(1);
});
