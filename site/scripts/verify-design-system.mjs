/**
 * Validate CURRENT Neutral Editorial v11 design contracts.
 * Archived v1 Figma tokens are not current visual authority.
 */
import { readFile } from 'node:fs/promises';
const load=async p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const css=await load('src/styles/design-system.css');
const layout=await load('src/layouts/BaseLayout.astro');
const finalCss=await load('src/styles/reeja-sitewide-v11.css');
const docs=await load('design-system/reeja-v11/README.md');
const errors=[];
function variable(key) {
 return css.match(new RegExp(key+'\\s*:\\s*([^;]+);'))?.[1]?.trim()??'';
}
const canonical={
 '--ds-ink':'#17191A','--ds-muted':'#505957',
 '--ds-ink-inverse':'#FFFFFF','--ds-slate-950':'#17191A',
 '--ds-teal-700':'#39403F','--ds-teal-600':'#17191A',
 '--ds-seafoam-300':'#D9DBD7','--ds-seafoam-100':'#ECEBE7',
 '--ds-paper':'#FFFFFF','--ds-canvas':'#FAFAF8',
 '--ds-border':'#D9DBD7','--ds-focus':'#17191A',
 '--ds-target-min':'44px'
};
for(const [key,expected] of Object.entries(canonical)){
 const actual=variable(key);
 if(actual.toUpperCase()!==expected.toUpperCase())errors.push(key+' expected '+expected+', got '+actual);
}
if(!variable('--ds-font-body').includes('Public Sans'))errors.push('Body font must prefer Public Sans');
if(!variable('--ds-font-editorial').includes('Georgia'))errors.push('Display font must prefer Georgia');
if(!docs.includes('#FAFAF8')||!docs.includes('#17191A')||!docs.includes('Neutral Editorial'))errors.push('Canonical design documentation missing');
if(layout.split("import '../styles/design-system.css';").length!==2)errors.push('DS stylesheet must be imported once');
if(layout.indexOf("import '../styles/design-system.css';")>layout.indexOf("import '../styles/reeja-sitewide-v11.css';"))errors.push('Final neutral stylesheet must follow DS aliases');
if(!finalCss.includes('care-personal-site'))errors.push('Final neutral styles missing');
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
 ['#17191A','#FAFAF8','Primary reading'],['#505957','#FAFAF8','Muted reading'],
 ['#FFFFFF','#17191A','Primary action'],['#39403F','#ECEBE7','Muted action on stone']
]){
 const ratio=contrast(fg,bg);if(!(ratio>=4.5))errors.push(label+' contrast '+ratio.toFixed(2)+' below AA');
}
if(errors.length){console.error('Neutral Editorial v11 validation failed:\n'+errors.map(e=>'- '+e).join('\n'));process.exitCode=1;}
else console.log('Neutral Editorial v11 verified: '+Object.keys(canonical).length+' role tokens, 2 fonts, 4 consuming routes and AA contrast pairs.');
