import process from 'node:process';

const origin = process.env.SITE_ORIGIN ?? 'https://reejamaharjan.com.np';
const expectedCommit = process.env.EXPECTED_COMMIT?.trim();
const maxAttempts = Number(process.env.SMOKE_ATTEMPTS ?? 20);
const retryDelayMs = Number(process.env.SMOKE_DELAY_MS ?? 30000);

const requiredText = ['Registered nurse.', 'Research ready.', 'View CV'];
const forbiddenText = ['/resume.pdf', 'Lalitpur Metropolitan-21', 'Khokana, Lalitpur'];
const retiredPaths = [
  '/resume.pdf',
  '/documents/experience-letter.jpg',
  '/documents/bsc-degree-certificate.jpg'
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function request(path, options = {}) {
  return fetch(new URL(path, origin), {
    redirect: 'manual',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'user-agent': 'reeja-portfolio-production-smoke/2.0'
    },
    ...options
  });
}

async function readBuildFingerprint() {
  const response = await request(`/build.json?check=${Date.now()}`);
  if (!response.ok) return { ok: false, message: `/build.json returned ${response.status}.` };

  try {
    const payload = await response.json();
    return { ok: true, payload };
  } catch (error) {
    return { ok: false, message: `/build.json returned invalid JSON: ${error.message}` };
  }
}

async function waitForExpectedDeployment() {
  if (!expectedCommit) return;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const fingerprint = await readBuildFingerprint();
    const deployedCommit = fingerprint.ok ? fingerprint.payload?.commit : undefined;

    if (deployedCommit === expectedCommit) {
      console.log(`Production is serving expected commit ${expectedCommit}.`);
      return;
    }

    const detail = fingerprint.ok
      ? `currently serving ${deployedCommit ?? 'an unknown commit'}`
      : fingerprint.message;

    if (attempt === maxAttempts) {
      throw new Error(
        `Production did not reach expected commit ${expectedCommit} after ${maxAttempts} attempts; ${detail}`
      );
    }

    console.log(
      `Attempt ${attempt}/${maxAttempts}: production is not ready (${detail}). Retrying in ${retryDelayMs}ms.`
    );
    await sleep(retryDelayMs);
  }
}

async function verifyProduction() {
  await waitForExpectedDeployment();

  const failures = [];
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
}

try {
  await verifyProduction();
} catch (error) {
  console.error(`\nProduction deployment verification failed:\n\n- ${error.message}\n`);
  process.exit(1);
}
