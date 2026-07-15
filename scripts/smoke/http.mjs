import { origin } from './config.mjs';

const requestTimeoutMs = 15000;
const defaultHeaders = {
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'user-agent': 'reeja-portfolio-production-smoke/4.0'
};

export const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export function targetUrl(path, cacheBust = false) {
  const url = new URL(path, origin);
  if (cacheBust) url.searchParams.set('production-check', String(Date.now()));
  return url;
}

export const request = (path, options = {}) => {
  const headers = new Headers(defaultHeaders);
  for (const [name, value] of new Headers(options.headers ?? {}).entries()) headers.set(name, value);

  return fetch(targetUrl(path, options.cacheBust === true), {
    ...options,
    cacheBust: undefined,
    redirect: options.redirect ?? 'manual',
    headers,
    signal: options.signal ?? AbortSignal.timeout(requestTimeoutMs)
  });
};

export async function readBuildFingerprint() {
  try {
    const response = await request('/build.json', { cacheBust: true });
    if (!response.ok) return { ok: false, status: response.status, message: `/build.json returned ${response.status}.` };

    const payload = await response.json();
    if (!payload || typeof payload.commit !== 'string' || typeof payload.branch !== 'string') {
      return { ok: false, status: response.status, message: '/build.json is missing commit or branch metadata.' };
    }

    return { ok: true, status: response.status, payload, headers: Object.fromEntries(response.headers.entries()) };
  } catch (error) {
    return { ok: false, message: `/build.json request failed: ${error instanceof Error ? error.message : String(error)}` };
  }
}
