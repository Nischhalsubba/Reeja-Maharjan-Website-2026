import { test, expect } from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const article='/blog/kangaroo-mother-care-who-2025-guide-parents-nurses/';

test('all seventeen posts have credited Unsplash images on the index and detail', async({page})=>{
  await page.goto(origin+'/blog/',{waitUntil:'domcontentloaded'});
  const cards=page.locator('.blog-index__lead-card,.blog-grid .blog-card');
  await expect(cards).toHaveCount(17);
  await expect(page.locator('.blog-index__hero-visual img')).toHaveCount(1);
  for(const card of await cards.all()){
    await expect(card.locator('.blog-photo img')).toHaveCount(1);
    await expect(card.locator('.blog-photo img')).toHaveAttribute('alt',/^Illustrative photo:/);
    await expect(card.locator('.blog-photo__credit a')).toHaveAttribute('href',/^https:\/\/unsplash\.com\/photos\//);
  }
  for(const path of [article,'/blog/gestational-diabetes-in-pregnancy-2026-monitoring-care/','/blog/hpv-vaccine-nepal-2026-cervical-cancer-prevention/','/blog/mastering-nursing-documentation-sbar-handover/']){
    await page.goto(origin+path,{waitUntil:'domcontentloaded'});
    await expect(page.locator('.blog-photo--hero img')).toHaveCount(1);
    await expect(page.locator('.blog-photo--hero .blog-photo__credit a')).toHaveAttribute('href',/^https:\/\/unsplash\.com\/photos\//);
  }
});

test('scrolling article updates bold active table-of-contents link and aria-current',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto(origin+article,{waitUntil:'domcontentloaded'});
  const key=page.locator('[data-blog-toc] a[href="#key-points"]');
  const faq=page.locator('[data-blog-toc] a[href="#faq"]');
  await page.locator('#key-points').scrollIntoViewIfNeeded();
  await expect.poll(()=>key.getAttribute('aria-current')).toBe('location');
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await expect.poll(()=>faq.getAttribute('aria-current')).toBe('location');
  await expect(faq).toHaveClass(/is-active/);
  await expect(key).not.toHaveAttribute('aria-current','location');
  await key.click();
  await expect.poll(()=>key.getAttribute('aria-current')).toBe('location');
});

test('mobile hamburger is a viewport dialog that opens closes and navigates',async({browser})=>{
  for(const width of [320,390,768,1024]){
    const ctx=await browser.newContext({viewport:{width,height:780},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    await page.goto(origin+'/blog/',{waitUntil:'domcontentloaded'});
    const button=page.getByRole('button',{name:'Menu',exact:true});
    await expect(button).toBeVisible();
    await button.click();
    const dialog=page.locator('#mobile-nav');
    await expect(dialog).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded','true');
    const box=await dialog.evaluate(node=>{
      const r=node.getBoundingClientRect();
      const header=document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect();
      return {top:r.top,headerBottom:header?.bottom ?? -1,left:r.left,width:r.width,height:r.height,iw:innerWidth,ih:innerHeight};
    });
    // In release 8.1 the menu is a fixed viewport dialog directly below the sticky header.
    expect(Math.abs(box.top-box.headerBottom), 'dialog must touch header').toBeLessThanOrEqual(2);
    expect(box.left).toBe(0);
    expect(box.width).toBe(box.iw);
    expect(box.height).toBeGreaterThanOrEqual(box.ih-box.top-1);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await button.click();
    await page.locator('.mobile-nav__close').click();
    await expect(dialog).toBeHidden();
    await button.click();
    await dialog.getByRole('link',{name:'CV',exact:true}).click();
    await expect(page).toHaveURL(/\/cv\/$/);
    await ctx.close();
  }
});

test('article sections can be expanded and collapsed on mobile',async({page})=>{
  await page.setViewportSize({width:375,height:812});
  await page.goto(origin+article,{waitUntil:'domcontentloaded'});
  const toc=page.locator('[data-blog-toc]');
  const menu=toc.locator('nav');
  const button=toc.locator('[data-blog-toc-toggle]');
  await expect(button).toBeVisible();
  await expect(menu).toBeHidden();
  await button.click();
  await expect(menu).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded','true');
  await menu.locator('a[href="#faq"]').click();
  await expect(menu).toBeHidden();
  await expect(button).toHaveAttribute('aria-expanded','false');
});

test('blog layout is balanced and not horizontally overflowing at five widths',async({browser})=>{
  for(const width of [320,390,768,1024,1440]){
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    for(const route of ['/blog/',article]){
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      expect(overflow,route+' at '+width).toBeLessThanOrEqual(1);
      await expect(page.locator('.blog-photo img').first()).toBeVisible();
      if(route==='/blog/') {
        await expect(page.locator('.blog-index__hero-actions a')).toHaveCount(2);
        await expect(page.locator('.blog-index__hero-counter')).toContainText('17');
      } else {
        await expect(page.locator('.article-governance dl > div')).toHaveCount(7);
        await expect(page.locator('.blog-related-grid .blog-photo')).toHaveCount(3);
      }
    }
    await ctx.close();
  }
});
