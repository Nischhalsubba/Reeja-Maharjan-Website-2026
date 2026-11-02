/**
 * Static integrity contract for all typed blog articles.
 * This validates published metadata and cross references; it does NOT claim
 * to independently review clinical recommendations or fetch external sources.
 */
import ts from 'typescript';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';

const directory=new URL('../src/content/blog/',import.meta.url);
const exclusions=new Set(['types.ts','index.ts','governance.ts','topics.ts','imagery.ts']);
const filenames=(await readdir(directory)).filter(x=>x.endsWith('.ts')&&!exclusions.has(x)).sort();
const issues=[],warnings=[],articles=[];
const ids=new Set(),titles=new Set();
function parseLiteral(node){
 if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return node.text;
 if(ts.isNumericLiteral(node))return Number(node.text);
 if(node.kind===ts.SyntaxKind.TrueKeyword)return true;
 if(node.kind===ts.SyntaxKind.FalseKeyword)return false;
 if(ts.isArrayLiteralExpression(node))return node.elements.map(parseLiteral);
 if(ts.isObjectLiteralExpression(node)) {
  const out={};
  for(const p of node.properties){
   if(!ts.isPropertyAssignment(p))continue;
   const k=ts.isIdentifier(p.name)||ts.isStringLiteral(p.name)?p.name.text:null;
   if(k)out[k]=parseLiteral(p.initializer);
  }
  return out;
 }
 return null; // Dynamic expression: no unsupported code execution.
}
function staticPost(source,file){
 const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 const declarations=[];
 function visit(node){
  if(ts.isVariableDeclaration(node)&&ts.isObjectLiteralExpression(node.initializer))declarations.push(node.initializer);
  ts.forEachChild(node,visit);
 }
 visit(ast);
 const objects=declarations.map(parseLiteral);
 const item=objects.find(x=>x&&typeof x.slug==='string'&&typeof x.title==='string');
 if(!item)throw new Error(file+': unable to parse static BlogPost object');
 return item;
}
function isDate(v){return typeof v==='string'&&/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(v)&&!Number.isNaN(Date.parse(v+'T00:00:00Z'));}
for(const file of filenames){
 const data=staticPost(await readFile(new URL(file,directory),'utf8'),file);
 const slug=file.slice(0,-3);
 const problems=[];
 const push=(v)=>{issues.push(slug+': '+v);problems.push(v);};
 if(data.slug!==slug)push('slug differs from filename');
 if(ids.has(data.slug))push('duplicate slug');ids.add(data.slug);
 if(titles.has(data.title))push('duplicate title');titles.add(data.title);
 if(typeof data.title!=='string'||data.title.trim().length<20)push('missing or vague title');
 if(typeof data.metaDescription!=='string'||data.metaDescription.trim().length<80||data.metaDescription.trim().length>220)push('metaDescription missing or unreasonable length');
 if(!isDate(data.publishedAt)||!isDate(data.updatedAt))push('invalid publish/modified date');
 else {
  if(data.updatedAt<data.publishedAt)push('updatedAt precedes publishedAt');
  if(Date.parse(data.publishedAt+'T00:00:00Z')>Date.now())push('future publication date');
 }
 if(!Array.isArray(data.quickAnswer)||!data.quickAnswer.length)push('missing key answer');
 if(!Array.isArray(data.intro)||!data.intro.length)push('missing introduction');
 if(!Array.isArray(data.sections)||data.sections.length<2)push('fewer than two structured sections');
 if(!Array.isArray(data.faq)||!data.faq.length)push('missing FAQ content');
 if(!Array.isArray(data.sources)||!data.sources.length)push('no editorial sources');
 if(!Array.isArray(data.relatedSlugs))push('missing relatedSlugs');
 if(!Number.isFinite(data.readMinutes)||data.readMinutes<=0)push('invalid reading-time estimate');
 if(typeof data.disclaimer!=='string'||data.disclaimer.trim().length<50)push('missing educational/medical disclaimer');
 const sectionIds=new Set();
 for(const section of data.sections||[]){
  if(!section||typeof section.title!=='string'||!section.title.trim())push('empty section title');
  if(!section?.id||sectionIds.has(section.id))push('missing/duplicate section ID');sectionIds.add(section?.id);
  if(!Array.isArray(section?.paragraphs)||!section.paragraphs.length)warnings.push(slug+': section '+section?.id+' has no paragraphs');
 }
 const sourceUrls=new Set();
 for(const source of data.sources||[]){
  const href=source?.href;
  if(!source?.label||!href||typeof href!=='string') {push('source missing label/URL');continue;}
  if(sourceUrls.has(href))push('duplicate source: '+href);sourceUrls.add(href);
  if(href.startsWith('/'))continue;
  try {
   const u=new URL(href);
   if(u.protocol!=='https:')push('source is not HTTPS: '+href);
   if(u.hostname==='www.nnc.org.np')push('source uses inaccessible legacy NNC www host');
  }catch {push('invalid source URL: '+href);}
 }
 articles.push({slug,title:data.title,publishedAt:data.publishedAt,updatedAt:data.updatedAt,
  primaryKeyword:data.primaryKeyword,sections:data.sections?.length??0,faq:data.faq?.length??0,
  sources:data.sources?.length??0,related:data.relatedSlugs??[],problems});
}
const slugs=new Set(articles.map(x=>x.slug));
for(const x of articles)for(const related of x.related){
 if(related===x.slug)issues.push(x.slug+': self-related article');
 else if(!slugs.has(related))issues.push(x.slug+': missing related article '+related);
}
if(articles.length!==17)issues.push('Expected 17 governed articles; got '+articles.length);
const report={timestamp:new Date().toISOString(),scope:'static metadata/cross-reference validity only; not clinical source approval or live link verification',
 counts:{articles:articles.length,issues:issues.length,warnings:warnings.length},articles,issues,warnings};
const dir=new URL('../reports/',import.meta.url);
await mkdir(dir,{recursive:true});
await writeFile(new URL('article-integrity.json',dir),JSON.stringify(report,null,2)+'\n','utf8');
const table=articles.map(x=>'| '+[x.slug,x.sections,x.faq,x.sources,x.updatedAt,x.problems.length?'Needs correction':'Structure valid'].join(' | ')+' |');
await writeFile(new URL('article-integrity.md',dir),[
 '# Blog article integrity audit','',
 'This checks structural validity. Clinical guidance and external source freshness require independent review.',
 '', 'Checked: '+report.timestamp,
 '', '| Slug | Sections | FAQs | Sources | Updated | Structure |','|---|---:|---:|---:|---|---|',...table,
 '', 'Problems:',...issues.map(x=>'- '+x),'', 'Warnings:',...warnings.map(x=>'- '+x),''
].join('\n')+'\n','utf8');
for(const x of warnings)console.warn('EDITORIAL WARNING '+x);
for(const x of issues)console.error('EDITORIAL ERROR '+x);
console.log('Article integrity:',JSON.stringify(report.counts));
if(issues.length)process.exitCode=1;
