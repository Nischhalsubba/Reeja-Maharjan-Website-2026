import { origin } from './config.mjs';

export const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const request = (path, options = {}) => fetch(new URL(path, origin), {
  redirect: 'manual',
  headers: {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'user-agent': 'reeja-portfolio-production-smoke/3.0'
  },
  ...options
});

export async function readBuildFingerprint() {
  const response = await request(`/build.json?check=${Date.now()}`);
  if (!response.ok) return { ok: false, message: `/build.json returned ${response.status}.` };
  try {
    return { ok: true, payload: await response.json() };
  } catch (error) {
    return { ok: false, message: `/build.json returned invalid JSON: ${error.message}` };
  }
}