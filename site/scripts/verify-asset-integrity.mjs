/**
 * Verify every generated HTML image/srcset/social-preview file that the
 * browser could request. Also measure the shipped CSS/JS/image byte budgets.
 * No Lighthouse/CrUX claims: this is a deterministic build-artifact audit.
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist=fileURLToPath(new URL('../dist/',import.meta.url));
const origin='https://reejamaharjan.com.np';
const errors=[];
const warnings=[];
const assets=[];
const checked=new Set();
const htmls=[];
const sizeByType={css:0,js:0,images:0,other:0};
const extType=(file)=>/\.(?:png|jpe?g|gif|webp|avif|svg|ico)$/i.test(file)?'images':
  /\.css$/i.test(file)?'css':/\.(?:js|mjs)$/i.test(file)?'js':'other';

async function walk(path){
 for(const entry of await readdir(path,{withFileTypes:true})){
  const abs=join(path,entry.name);
  if(entry.isDirectory()){await walk(abs);continue;}
  const pathname='/'+relative(dist,abs).replaceAll('\\','/');
  const size=(await stat(abs)).size;
  const type=extType(pathname);
  sizeByType[type]+=size;
  assets.push({path:pathname,size,type});
  if(pathname.endsWith('.html'))htmls.push(abs);
 }
}
function attr(tag,key){
 const match=tag.match(new RegExp('(?:\\s|^)'+key+'\\s*=\\s*["\\x27]([^"\\x27]*)["\\x27]','i'));
 return match?.[1]||'';
}
function tags(html,name){return [...html.matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))].map(x=>x[0]);}
function localPath(value){
 if(!value||value.startsWith('data:')||value.startsWith('blob:'))return null;
 try{
  const url=new URL(value,origin);
  if(url.origin!==origin)return null;
  return decodeURIComponent(url.pathname);
 }catch{return null;}
}
const knownFiles=new Set();
await walk(dist);
for(const item of assets)knownFiles.add(item.path);
for(const file of htmls){
 const html=await readFile(file,'utf8');
 const route='/'+relative(dist,file).replaceAll('\\','/').replace(/(?:index\.html)$/, '');
 const candidates=[];
 for(const tag of tags(html,'img')){
  candidates.push({url:attr(tag,'src'),kind:'img.src'});
  for(const part of attr(tag,'srcset').split(',')){
   const entry=part.trim().split(/\s+/)[0];if(entry)candidates.push({url:entry,kind:'img.srcset'});
  }
 }
 for(const tag of tags(html,'link')){
  if(attr(tag,'rel').toLowerCase()==='preload'&&attr(tag,'as').toLowerCase()==='image'){
   candidates.push({url:attr(tag,'href'),kind:'preload.href'});
   for(const part of (attr(tag,'imagesrcset')||attr(tag,'imageSrcSet')).split(',')){
    const entry=part.trim().split(/\s+/)[0];if(entry)candidates.push({url:entry,kind:'preload.imagesrcset'});
   }
  }
 }
 for(const tag of tags(html,'meta')){
  if(attr(tag,'property').toLowerCase()==='og:image' || attr(tag,'name').toLowerCase()==='twitter:image'){
   candidates.push({url:attr(tag,'content'),kind:'social image'});
  }
 }
 for(const {url,kind} of candidates){
  const path=localPath(url);
  if(!path)continue;
  if(!knownFiles.has(path))errors.push(route+': missing '+kind+' '+path);
  else checked.add(path);
 }
}
const biggest=assets.filter(x=>x.type!=='other').sort((a,b)=>b.size-a.size).slice(0,20);
const report={
 checkedAt:new Date().toISOString(),
 scope:'generated Astro dist output only; excludes network timings and CSS background images',
 counts:{htmlPages:htmls.length,localReferencedImages:checked.size,missing:errors.length,warningCount:warnings.length,shippedFiles:assets.length},
 bytes:sizeByType,
 top20ByBytes:biggest,
 errors,warnings
};
await writeFile(join(dist,'asset-integrity.json'),JSON.stringify(report,null,2)+'\n','utf8');
for(const issue of errors)console.error('ASSET ERROR '+issue);
for(const issue of warnings)console.warn('ASSET WARNING '+issue);
console.log('Asset integrity:',JSON.stringify(report.counts));
console.log('Shipped resource bytes:',JSON.stringify(report.bytes));
if(errors.length)process.exitCode=1;
