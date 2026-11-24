/**
 * Validate the unified Reeja Cinematic Nursing v14 design contracts.
 * Archived v1 Figma tokens are not current visual authority.
 */
import { readFile } from 'node:fs/promises';
const load=async p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const css=await load('src/styles/reeja-cinematic.css');
const layout=await load('src/layouts/BaseLayout.astro');
const finalCss=await load('src/styles/reeja-cinematic.css');
const docs=await load('design-system/reeja-v13/README.md');
const errors=[];
function variable(key) {
 return css.match(new RegExp(key+'\\s*:\\s*([^;]+);'))?.[1]?.trim()??'';
}
const canonical={
 '--ds-ink':'#111111','--ds-muted':'#55554C',
 '--ds-ink-inverse':'#FFFFFF','--ds-slate-950':'#090909',
 '--ds-teal-700':'#333333','--ds-teal-600':'#111111',
 '--ds-seafoam-300':'#D5D2C4','--ds-seafoam-100':'#F1EEDF',
 '--ds-paper':'#FAF8E9','--ds-canvas':'#FAF8E9',
 '--ds-border':'#B3AFA0','--ds-focus':'#4776E6','--ds-accent':'#FFDF00',
 '--ds-target-min':'44px'
};
for(const [key,expected] of Object.entries(canonical)){
 const actual=variable(key);
 if(actual.toUpperCase()!==expected.toUpperCase())errors.push(key+' expected '+expected+', got '+actual);
}
if(!variable('--ds-font-body').includes('Public Sans'))errors.push('Body font must prefer Public Sans');
if(!variable('--ds-font-editorial').includes('Arial'))errors.push('Display font must prefer Arial');
if(!docs.includes('#FAF8E9')||!docs.includes('#FFDF00')||!docs.includes('Cinematic Nursing'))errors.push('Canonical design documentation missing');
if(layout.split("import '../styles/reeja-cinematic.css';").length!==2)errors.push('Canonical Reeja stylesheet must be imported exactly once');
if(layout.includes("import '../styles/design-system.css';")||layout.includes("import '../styles/cinematic-refinements.css';"))errors.push('Legacy stylesheet imports remain in BaseLayout');
if(!finalCss.includes('REEJA CINEMATIC NURSING'))errors.push('Canonical cinematic nursing styles missing');
for(const p of ['clinical-research.astro','hire-reeja.astro','maternal-health.astro','nursing-practice.astro']){
 if(!(await load('src/pages/'+p)).includes('components/design-system/'))errors.push(p+': DS components not reused');
}
function luminance(hex){
 const c=hex.match(/[0-9a-f]{2}/gi)?.slice(0,3).map(x=>parseInt(x,16)/255)||[];
 if(c.length!==3)return NaN;
 const l=c.map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 return .2126*l[0]+.7152*l[1]+.0722*l[2];
}
function contrast(a,b){const v=[luminance(a),luminance(b)].sort((a,b)=>b-a);return(v[0]+.05)/(v[1]+.05);}
for(const [fg,bg,label] of [
 ['#111111','#FAF8E9','Primary reading'],['#55554C','#FAF8E9','Muted reading'],
 ['#111111','#FFDF00','Primary action'],['#FFFFFF','#090909','Dark section reading']
]){
 const ratio=contrast(fg,bg);if(!(ratio>=4.5))errors.push(label+' contrast '+ratio.toFixed(2)+' below AA');
}
if(errors.length){console.error('Cinematic Nursing v14 validation failed:\n'+errors.map(e=>'- '+e).join('\n'));process.exitCode=1;}
else console.log('Cinematic Nursing v14 verified: '+Object.keys(canonical).length+' role tokens, shared typography, 4 consuming routes and AA contrast pairs.');
