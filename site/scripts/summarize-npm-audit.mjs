import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
const path=process.argv[2] || 'npm-audit.json';
let audit;
try{audit=JSON.parse(await readFile(path,'utf8'));}
catch(error){console.error('Cannot read npm audit:',String(error));process.exit(2);}
if(audit.error || !audit.metadata?.vulnerabilities || !audit.vulnerabilities) {
 console.error('Incomplete npm audit report:',JSON.stringify(audit.error||Object.keys(audit)));process.exit(2);
}
const counts=audit.metadata.vulnerabilities;
const packages=Object.entries(audit.vulnerabilities).map(([name,v])=>({
 name, severity:v.severity, direct:v.isDirect===true,
 range:v.range, nodes:v.nodes||[], fixAvailable:v.fixAvailable??false,
 advisories:(v.via||[]).filter(x=>typeof x==='object').map(x=>({title:x.title,url:x.url,severity:x.severity,range:x.range}))
})).sort((a,b)=>['critical','high','moderate','low','info'].indexOf(a.severity)-['critical','high','moderate','low','info'].indexOf(b.severity));
const status=(counts.critical||counts.high)?'urgent-review':(counts.moderate||counts.low)?'known-advisories':'clear';
const result={timestamp:new Date().toISOString(),status,counts,packages};
await writeFile('npm-security-summary.json',JSON.stringify(result,null,2)+'\n');
const scrub=x=>String(x??'').replace(/\|/g,'\\|').replace(/[\r\n]+/g,' ');
const md=['# npm security audit','',result.timestamp,
'', 'Production and development dependencies; severity is advisory metadata, not confirmed exploitability.',
'', 'Counts: '+JSON.stringify(counts), '',
'| Package | Severity | Type | Fix available | Advisory |','|---|---|---|---|---|',
...packages.map(p=>'| '+[p.name,p.severity,p.direct?'direct':'transitive',typeof p.fixAvailable==='object'?JSON.stringify(p.fixAvailable):String(p.fixAvailable),p.advisories.map(x=>x.url).join(' ')].map(scrub).join(' | ')+' |'),
'', 'No packages were upgraded. Evaluate targeted fixes; never run npm audit fix --force without regression review.'].join('\n')+'\n';
await writeFile('npm-security-summary.md',md);
console.log('Dependency security:',JSON.stringify({status,counts,packages:packages.length}));
if(status==='urgent-review'){console.error('High/critical advisory gate failed.');process.exitCode=1;}
