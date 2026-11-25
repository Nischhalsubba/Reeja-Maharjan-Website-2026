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
  await expect(page.locator('main h1')).toHaveText(/Care that extends/);
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
  await expect(page.locator('.hero-bottom')).toHaveCSS('opacity','1');
  await expect(page.locator('.hero h1')).toBeVisible();
  await expect(page.locator('.hero .btn').first()).toBeVisible();
});

test('visual regression: fixed contrast, bounded experience navigation and usable contact grid', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(origin);
  // The reference has a transparent header over the film; copy receives a
  // contrast backing while scrolling and becomes visible on keyboard focus.
  await expect(page.locator('.site-header')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('.hero-bottom > div').first()).toHaveCSS('color', 'rgb(20, 19, 20)');
  await page.locator('.menupop summary').click();
  for (const image of await page.locator('.mega-grid img').all()) {
    expect((await image.boundingBox())!.height).toBeLessThanOrEqual(220);
  }
  await page.goto(`${origin}/contact/`);
  const form = page.locator('.professional-contact-form');
  const copy = page.locator('.contact-hero__copy');
  expect((await form.boundingBox())!.width).toBeGreaterThan(500);
  expect(Math.abs((await form.boundingBox())!.y - (await copy.boundingBox())!.y)).toBeLessThan(40);
  await expect(page.locator('.professional-contact-form__privacy summary')).toBeVisible();
  await expect(page.locator('.professional-contact-form__privacy summary')).toContainText('No patient records');
  await page.goto(`${origin}/nursing-practice/`);
  await expect(page.locator('.site-section--dark h2').first()).toHaveCSS('color', 'rgb(250, 248, 233)');
  await expect(page.locator('.care-footer__bottom nav a').first()).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/contact/`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test('editorial assets and card indices use the cinematic layout without obstructing text', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${origin}/about/`);
  await expect(page.locator('.reference-about-portrait img')).toHaveCSS('mask-image', /linear-gradient/);
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
        const footer=document.querySelector('.care-footer__bottom')!.getBoundingClientRect();
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
  await expect(button.locator('.ref-action-icon--leading')).toHaveCount(1);
  await expect(button.locator('.ref-action-icon--trailing')).toHaveCount(1);
  const before=await button.boundingBox();
  await button.hover();
  await expect.poll(()=>button.locator('.ref-action-original').evaluate(el=>getComputedStyle(el).transform)).not.toBe('none');
  const after=await button.boundingBox();
  expect(Math.abs(before!.width-after!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(before!.height-after!.height)).toBeLessThanOrEqual(1);
});

test('desktop custom cursor follows pointer and yields to native form cursor', async ({page}) => {
  await page.goto(origin+'/contact/');
  await page.mouse.move(200,200);
  const cursor=page.locator('.reference-cursor');
  await expect(cursor).toHaveClass(/is-visible/);
  await expect(cursor).toHaveCSS('width','11px');
  await expect(cursor).toHaveCSS('pointer-events','none');
  await page.locator('input:not([type="hidden"])').first().hover();
  await expect(cursor).not.toHaveClass(/is-visible/);
});

test('article metadata presents readable label/value rows', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto(origin+'/blog/');
  const article=page.locator('main a[href^="/blog/"]:not([href="/blog/"])').first();
  await article.click();
  const metadata=page.locator('.blog-article__meta-panel');
  await expect(metadata).toBeVisible();
  for(const row of await metadata.locator(':scope > div').all()) {
    const value=await row.locator('dd').boundingBox();
    expect(value!.width).toBeGreaterThan(140);
  }
});

test('practice and toolkit tabs work with pointer and keyboard', async ({page}) => {
  await page.goto(origin);
  const research = page.getByRole('tab',{name:/Research support/});
  await research.click();
  await expect(research).toHaveAttribute('aria-selected','true');
  await expect(page.locator('#panel-research')).toBeVisible();
  await research.press('ArrowLeft');
  await expect(page.locator('#panel-clinical')).toBeVisible();
  await page.goto(origin+'/about/');
  const tabs=page.locator('.reference-toolkit [role=tab]');
  await tabs.first().press('End');
  await expect(tabs.last()).toHaveAttribute('aria-selected','true');
  await expect(page.locator('.reference-toolkit [role=tabpanel]:visible')).toHaveCount(1);
});

test('contact enquiry and conversation section retain one form and real contact routes', async ({page})=>{
  await page.goto(origin+'/contact/');
  await expect(page.locator('main h1')).toHaveText('Let’s talk.');
  await expect(page.locator('#professional-contact-form')).toHaveCount(1);
  await expect(page.locator('#contact-role')).toHaveJSProperty('tagName','SELECT');
  await expect(page.locator('#arrange-a-call')).toBeVisible();
  await expect(page.getByRole('button',{name:'Request a time'})).toBeVisible();
  await expect(page.locator('#call-request')).toHaveAttribute('action',/^https:\/\/formsubmit\.co\//);
  await expect(page.locator('#call-date')).toHaveAttribute('required','');
  await page.goto(origin+'/about/');
  await expect(page.locator('footer #professional-contact-form')).toHaveCount(1);
});

test('reference footer uses compact enquiry, location clock and responsive links',async({page})=>{
  await page.goto(origin);
  await expect(page.locator('.reference-footer-wave')).toBeAttached();
  await expect(page.locator('[data-nepal-clock]')).toHaveText(/\d\d:\d\d:\d\d/);
  await expect(page.locator('footer .professional-contact-form--compact input[required]')).toHaveCount(2);
  await expect(page.locator('.reference-footer-ending a')).toHaveAttribute('href','#page-top');
  await page.locator('.reference-footer-links summary').click();
  await expect(page.locator('.care-footer__column a').first()).toBeVisible();
});

test('heading wipe leaves the original text visible and the cover collapsed',async({page})=>{
  await page.goto(origin);
  const title=page.locator('.hero h1');
  await expect(title.locator('.reference-reveal-cover')).toHaveCount(4);
  await expect(title.locator('.reference-reveal-ink').first()).toHaveCSS('opacity','1');
  await expect.poll(()=>title.locator('.reference-reveal-gold').first().evaluate(e=>e.getBoundingClientRect().width)).toBeLessThan(1);
  await expect(page.locator('.desktop-nav a[href="/about/"]')).toHaveCSS('transition-duration','0.15s');
});
