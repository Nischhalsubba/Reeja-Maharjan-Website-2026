import process from 'node:process';

const origin = process.env.SITE_ORIGIN ?? 'https://reejamaharjan.com.np';
const requiredText = [
  'Registered nurse.',
  'Research ready.',
  'View CV'
];
const forbiddenText = [
  '/resume.pdf',
  'Lalitpur Metropolitan-21',
  'Khokana, Lalitpur'
];
const retiredPaths = [
  '/resume.pdf',
  '/documents/experience-letter.jpg',
  '/documents/bsc-degree-certificate.jpg'
];

const failures = [];

async function request(path, options = {}) {
  const response = await fetch(new URL(path, origin), {
    redirect: 'manual',
    headers: { 'user-agent': 'reeja-portfolio-production-smoke/1.0' },
    ...options
  });
  return response;
}

const homepage = await request('/');
if (!homepage.ok) {
  failures.push(`Homepage returned ${homepage.status}.`);
} else {
  const html = await homepage.text();
  for (const value of requiredText) {
    if (!html.includes(value)) failures.push(`Homepage is missing required production fingerprint: ${value}`);
  }
  for (const value of forbiddenText) {
    if (html.includes(value)) failures.push(`Homepage contains retired or unsafe content: ${value}`);
  }
}

const cv = await request('/cv/');
if (!cv.ok) failures.push(`/cv/ returned ${cv.status}.`);

for (const path of retiredPaths) {
  const response = await request(path);
  if (response.status === 200) failures.push(`${path} is still publicly available.`);
}

if (failures.length > 0) {
  console.error('\nProduction smoke verification failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(`Production smoke verification passed for ${origin}.`);
