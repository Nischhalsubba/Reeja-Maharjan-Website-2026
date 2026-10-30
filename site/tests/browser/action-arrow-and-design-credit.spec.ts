import { expect, test } from '@playwright/test';

const origin = process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const actionSelectors = [
  '.rm-hero__actions .rm-button--primary',
  '.rm-hero__actions .rm-button--outline',
  '.rm-research .rm-button',
  '.desktop-nav .nav-cta'
];

test('action buttons all have one right-arrow slot, on the right of their text', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  for (const selector of actionSelectors) {
    const action = page.locator(selector);
    await expect(action).toHaveCount(1);
    const before = await action.evaluate(element => {
      const style = getComputedStyle(element, '::after');
      const text = element.firstChild?.nodeType === Node.TEXT_NODE ? element.firstChild.textContent ?? '' : element.textContent ?? '';
      return {
        content: style.content,
        width: style.width,
        mask: style.maskImage || style.getPropertyValue('-webkit-mask-image'),
        text: text.trim()
      };
    });
    expect(before.content).not.toBe('none');
    expect(before.width).toBe('24px');
    expect(before.mask).toContain('svg');
    expect(before.text.length).toBeGreaterThan(2);
  }
  await expect(page.locator('.rm-hero__actions .rm-button--primary > svg.brand-icon')).toBeHidden();
});

test('arrow cycles on hover while button label stays fixed and never swaps sides', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const cta = page.locator('.rm-hero__actions .rm-button--primary');
  const before = await cta.boundingBox();
  expect(before).not.toBeNull();
  await cta.hover();
  const animated = await cta.evaluate(element => getComputedStyle(element, '::after').animationName);
  expect(animated).toContain('reeja-action-arrow-cycle');
  // The arrow mask moves inside its fixed 24px pseudo-element; no text node is moved.
  await expect(cta).toContainText('View CV');
});

test('keyboard and reduced-motion visitors retain a stable arrow and visible focus', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion:'reduce', viewport:{width:390,height:844} });
  const page = await context.newPage();
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  const cta=page.locator('.rm-hero__actions .rm-button--primary');
  await cta.focus();
  await expect(cta).toBeFocused();
  const state=await cta.evaluate(element=>({
    animation:getComputedStyle(element,'::after').animationName,
    maskPosition:getComputedStyle(element,'::after').maskPosition,
    outline:getComputedStyle(element).outlineStyle
  }));
  expect(state.animation).toBe('none');
  expect(state.maskPosition).toContain('50%');
  expect(state.outline).toBe('solid');
  await context.close();
});

test('design attribution is a real, crawlable, consistent footer link', async ({ page }) => {
  for(const route of ['/','/cv/','/clinical-research/','/blog/','/contact/']){
    await page.goto(origin+route,{waitUntil:'domcontentloaded'});
    const link=page.locator('.care-footer__bottom .reeja-design-credit a');
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('href','https://nischhalsubba.com.np/');
    await expect(link).toContainText('Nischhalsubba.com.np');
  }
});
