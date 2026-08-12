import process from 'node:process';

function positiveInteger(name, fallback) {
  const rawValue = process.env[name] ?? String(fallback);
  const value = Number(rawValue);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer; received ${rawValue}.`);
  }
  return value;
}

function normalizedOrigin(value) {
  const url = new URL(value);
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  if (!isLocal && url.protocol !== 'https:') {
    throw new Error(`SITE_ORIGIN must use HTTPS for remote deployments; received ${value}.`);
  }
  url.pathname = '/';
  url.search = '';
  url.hash = '';
  return url.toString().replace(/\/$/, '');
}

export const origin = normalizedOrigin(process.env.SITE_ORIGIN ?? 'https://reejamaharjan.com.np');
export const expectedCommit = process.env.EXPECTED_COMMIT?.trim();
export const maxAttempts = positiveInteger('SMOKE_ATTEMPTS', 20);
export const retryDelayMs = positiveInteger('SMOKE_DELAY_MS', 30000);

export const requiredHomepageText = [
  'Reeja Maharjan,',
  'Registered Nurse',
  'Hospital nursing and maternal-health research experience in Nepal',
  'Discuss a role',
  'View CV',
  'Open to suitable opportunities',
  'Hire Reeja'
];

export const forbiddenHomepageText = [
  '/resume.pdf',
  'Download CV',
  'Available for work',
  'Immediate availability',
  'Lalitpur Metropolitan-21',
  'Khokana, Lalitpur',
  'Clinical care, recorded with research discipline.',
  'Clinical care with a',
  'researcher’s eye',
  'working across clinical care and maternal-health research.'
];

export const requiredPublicFacts = [
  'Research Assistant',
  'Institute for Implementation Science and Health',
  'Biratnagar'
];

export const requiredRoutes = [
  '/',
  '/contact/',
  '/cv/',
  '/hire-reeja/',
  '/clinical-research/',
  '/maternal-health/',
  '/nursing-practice/',
  '/blog/',
  '/blog/essential-maternal-newborn-care-guide-2026/'
];

export const retiredPaths = [
  '/resume.pdf',
  '/documents/experience-letter.jpg',
  '/documents/bsc-degree-certificate.jpg',
  '/documents/cnc-level-ii-certificate.jpg',
  '/documents/ottm-certificate.jpg',
  '/documents/cpr-certificate.jpg'
];

export const requiredSecurityHeaders = {
  'content-security-policy': [
    "default-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    'https://formsubmit.co',
    'https://www.googletagmanager.com'
  ],
  'x-content-type-options': ['nosniff'],
  'referrer-policy': ['strict-origin-when-cross-origin'],
  'x-frame-options': ['DENY'],
  'permissions-policy': ['camera=()', 'microphone=()', 'geolocation=()', 'payment=()']
};
