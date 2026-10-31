/**
 * Post-build, dependency-free SEO contract for published Astro routes.
 * Checks source-independent rendered HTML and the actual generated sitemap.
 * Live indexing and real-world CWV require separate Search Console/CrUX evidence.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = 'https://reejamaharjan.com.np';
const errors = [], warnings = [];
const pages = [];
const titleSeen = new Map();
const files = [];
const ignored = new Set(['/design-system/', '/palette-studio/', '/404/', '/404.html']);

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes:true })) {
    const path = join(dir,entry.name);
    if(entry.isDirectory()) await walk(path);
    else if(entry.name.endsWith('.html')) files.push(path);
  }
}
function attr(markup, name) {
  return markup.match(new RegExp('(?:\\s|^)'+name+'\\s*=\\s*["\\x27]([^"\\x27]*)["\\x27]','i'))?.[1] ?? '';
}
function tags(html, tag) {
  return [...html.matchAll(new RegExp('<'+tag+'\\b[^>]*>','gi'))].map(m=>m[0]);
}
function byAttr(html,tag,name,value) {return tags(html,tag).find(t=>attr(t,name).toLowerCase()===value.toLowerCase())||''}
function pathFor(file){
  let path='/'+relative(dist,file).replaceAll('\\','/');
  if(path==='/index.html')return '/';
  if(path==='/404.html')return '/404/';
  return path.replace(/\/index\.html$/,'/');
}
function rootPath(link, origin) {
  try { const url=new URL(link,origin); return url.origin===base?url.pathname:null; }
  catch{return null;}
}
function normalize(p){return p==='/' ? '/' : p.replace(/\/?$/,'/');}
await walk(dist);
for(const file of files){
 const html=await readFile(file,'utf8');
 const urlPath=pathFor(file);
 const shouldIndex=!ignored.has(urlPath);
 const title=html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()||'';
 const meta=byAttr(html,'meta','name','description');
 const description=attr(meta,'content');
 const robots=attr(byAttr(html,'meta','name','robots'),'content').toLowerCase();
 const canonical=attr(byAttr(html,'link','rel','canonical'),'href');
 const social=attr(byAttr(html,'meta','property','og:image'),'content');
 const headings=[...html.matchAll(/<h1\b[^>]*>/gi)].length;
 const schema=[];
 for(const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
   try{schema.push(JSON.parse(match[1]));}
   catch(e){errors.push(urlPath+': invalid JSON-LD: '+String(e));}
 }
 if(!title)errors.push(urlPath+': missing title');
 if(!description)errors.push(urlPath+': missing meta description');
 if(headings!==1)errors.push(urlPath+': expected one H1; found '+headings);
 if(!canonical)errors.push(urlPath+': missing canonical');
 else if(canonical!==new URL(urlPath,base).toString())warnings.push(urlPath+': canonical differs from configured URL: '+canonical);
 if(shouldIndex&&robots.includes('noindex'))errors.push(urlPath+': unexpected noindex');
 if(!shouldIndex&&!robots.includes('noindex'))errors.push(urlPath+': internal page missing noindex');
 if(shouldIndex&&!social)errors.push(urlPath+': no OG image');
 if(shouldIndex&&!schema.length)errors.push(urlPath+': no structured data');
 if(shouldIndex&&title){
  if(titleSeen.has(title))errors.push(urlPath+': duplicate title with '+titleSeen.get(title));
  titleSeen.set(title,urlPath);
 }
 const imageTags=tags(html,'img');
 for(const img of imageTags){
  if(!/\balt\s*=/.test(img))errors.push(urlPath+': img missing alt attribute');
  if(!attr(img,'width')||!attr(img,'height'))warnings.push(urlPath+': image missing explicit dimensions');
 }
 pages.push({urlPath,title,description,robots,canonical,h1Count:headings,structuredDataCount:schema.length,imageCount:imageTags.length,indexable:shouldIndex});
}
const paths=new Set(pages.map(p=>p.urlPath));
for(const file of files) {
 const urlPath=pathFor(file);
 if(!paths.has(urlPath))continue;
 const html=await readFile(file,'utf8');
 for(const link of tags(html,'a')){
  const href=attr(link,'href');
  if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))continue;
  const target=rootPath(href,new URL(urlPath,base));
  if(!target)continue;
  const normalized=normalize(target);
  if(!paths.has(normalized)&&!paths.has(target) && !/\.[a-z0-9]{2,5}$/i.test(target)){
   errors.push(urlPath+': internal link has no built HTML route: '+href);
  }
 }
}
const sitemapIndex=await readFile(join(dist,'sitemap-index.xml'),'utf8');
const indexSitemaps=[...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
if(!indexSitemaps.length)errors.push('Sitemap index has no entries');
const sitemapUrls=[];
for(const item of indexSitemaps){
 let name;
 try {name=new URL(item).pathname.split('/').filter(Boolean).pop();}
 catch {errors.push('Invalid sitemap index URL: '+item);continue;}
 if(!name||!/\.xml$/.test(name)){errors.push('Invalid sitemap filename '+item);continue;}
 const xml=await readFile(join(dist,name),'utf8');
 sitemapUrls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&')));
}
const sitemapPaths=new Set();
for(const item of sitemapUrls) {
 let path;try{const x=new URL(item);if(x.origin!==base){errors.push('Noncanonical sitemap URL: '+item);continue;}path=normalize(x.pathname);}
 catch{errors.push('Invalid sitemap URL: '+item);continue;}
 if(sitemapPaths.has(path))errors.push('Duplicate sitemap path: '+path);
 sitemapPaths.add(path);
 if(ignored.has(path)||path.startsWith('/og/'))errors.push('Excluded page/asset in sitemap: '+path);
 if(!paths.has(path))warnings.push('Sitemap URL is not an HTML page in build: '+item);
}
for(const p of pages)if(p.indexable && !sitemapPaths.has(p.urlPath))errors.push('Indexable page absent from sitemap: '+p.urlPath);
const report={checkedAt:new Date().toISOString(),scope:'Built Astro output, not live Google index',counts:{htmlPages:pages.length,sitemapUrls:sitemapUrls.length,errors:errors.length,warnings:warnings.length},pages,errors,warnings};
await writeFile(join(dist,'seo-audit.json'),JSON.stringify(report,null,2)+'\n','utf8');
for(const w of warnings)console.warn('SEO WARNING: '+w);
for(const e of errors)console.error('SEO ERROR: '+e);
console.log('SEO output verification:',JSON.stringify(report.counts));
if(errors.length)process.exitCode=1;
