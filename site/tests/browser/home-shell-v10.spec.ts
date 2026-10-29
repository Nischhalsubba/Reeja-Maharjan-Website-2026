import {expect,test} from '@playwright/test';
const origin=process.env.BROWSER_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const lum=(x:string)=>{
 const m=x.match(/[\d.]+/g)?.slice(0,3).map(Number)??[];
 return m.map(c=>{const v=c/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);
};
const contrast=(a:string,b:string)=>{const [hi,lo]=[lum(a),lum(b)].sort((a,b)=>b-a);return(hi+.05)/(lo+.05)};

test('home-only neutral header menu and footer credits are readable on light surfaces',async({page})=>{
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  if(width<=1024){
   const menu=page.locator('.menu-toggle__label');
   await expect(menu).toBeVisible();
   const colors=await menu.evaluate(e=>({fg:getComputedStyle(e).color,bg:getComputedStyle(e.closest('button')!).backgroundColor}));
   expect(contrast(colors.fg,colors.bg),'menu contrast @ '+width).toBeGreaterThanOrEqual(4.5);
  }
  const credit=page.locator('.care-footer__credits summary');
  const c=await credit.evaluate(e=>({fg:getComputedStyle(e).color,bg:getComputedStyle(e.closest('footer')!).backgroundColor}));
  expect(contrast(c.fg,c.bg),'credit contrast @ '+width).toBeGreaterThanOrEqual(4.5);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
 }
});

test('the real portrait and minimally styled pages remain navigable',async({page})=>{
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('main h1')).toContainText('Reeja');
 await expect(page.locator('.rm-hero__portrait')).toHaveAttribute('src','/reeja-headshot.jpg');
 await expect(page.locator('.rm-experience__roles li')).toHaveCount(4);
 await expect(page.locator('.rm-research__scope li')).toHaveCount(4);
 await expect(page.locator('.rm-writing__cards article')).toHaveCount(3);
 await expect(page.getByRole('link',{name:/View CV/}).first()).toHaveAttribute('href','/cv/');
 await expect(page.locator('.rm-contact a')).toHaveAttribute('href','/contact/');
});
