import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost, onRequestGet } from '../../../functions/api/contact.js';

const env = {
  TURNSTILE_SECRET_KEY: 'test-secret',
  RESEND_API_KEY: 'test-mail-token',
  CONTACT_FROM_EMAIL: 'verified-sender@example.com',
  CONTACT_TO_EMAIL: 'mailbox@example.com'
};
const payload = {
  name: 'Example Recruiter',
  email: 'recruiter@example.com',
  organization: 'Example Health Research',
  role_type: 'Research assistant',
  location: 'Kathmandu',
  message: 'Please contact us regarding a professional research opportunity.',
  'cf-turnstile-response': 'valid-test-token'
};
const req = (data = payload, opts = {}) => new Request('https://reejamaharjan.com.np/api/contact', {
  method: 'POST',
  headers: {
    Origin: opts.origin ?? 'https://reejamaharjan.com.np',
    'Content-Type': opts.contentType ?? 'application/json'
  },
  body: opts.raw ?? JSON.stringify(data)
});
const withFetch = async (mock, fn) => {
  const before = globalThis.fetch;
  globalThis.fetch = mock;
  try { await fn(); } finally { globalThis.fetch = before; }
};
const okSiteverify = { success: true, hostname: 'reejamaharjan.com.np', action: 'professional_contact' };
const setupFetch = ({ verify = okSiteverify, providerStatus = 200, providerId = 'accepted-id' } = {}) => {
  const calls = [];
  const mock = async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).includes('/siteverify')) return Response.json(verify);
    if (String(url).includes('api.resend.com/emails')) {
      return Response.json({ id: providerId }, { status: providerStatus });
    }
    throw new Error('Unexpected outbound request');
  };
  return { mock, calls };
};

test('fail-closed when email or Turnstile secrets are missing', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req(), env: {} });
    assert.equal(res.status, 503);
    assert.equal((await res.json()).success, false);
    assert.equal(calls.length, 0);
  });
});

test('reject untrusted origin before any external calls', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req(payload, { origin: 'https://attacker.test' }), env });
    assert.equal(res.status, 403);
    assert.equal(calls.length, 0);
  });
});

test('reject invalid input without calling providers', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req({ ...payload, message: 'short' }), env });
    assert.equal(res.status, 422);
    assert.equal(calls.length, 0);
  });
});

test('reject missing challenge without dispatching email', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req({ ...payload, 'cf-turnstile-response': '' }), env });
    assert.equal(res.status, 422);
    assert.equal(calls.length, 0);
  });
});

test('reject token with incorrect hostname or action before email dispatch', async () => {
  for (const verify of [
    { success: false, hostname: 'reejamaharjan.com.np', action: 'professional_contact' },
    { success: true, hostname: 'attacker.test', action: 'professional_contact' },
    { success: true, hostname: 'reejamaharjan.com.np', action: 'other' }
  ]) {
    const { mock, calls } = setupFetch({ verify });
    await withFetch(mock, async () => {
      const res = await onRequestPost({ request: req(), env });
      assert.equal(res.status, 403);
      assert.equal(calls.length, 1);
      assert.match(calls[0].url, /siteverify/);
    });
  }
});

test('does not claim success when mail provider rejects submission', async () => {
  const { mock, calls } = setupFetch({ providerStatus: 503 });
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req(), env });
    assert.equal(res.status, 502);
    assert.equal((await res.json()).success, false);
    assert.equal(calls.length, 2);
  });
});

test('success follows verified Turnstile and actual email-provider acceptance', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req(), env });
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.success, true);
    assert.match(json.message, /accepted.*delivery/i);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].options.body.get('secret'), 'test-secret');
    assert.equal(calls[0].options.body.get('response'), 'valid-test-token');
    const sent = JSON.parse(calls[1].options.body);
    assert.equal(sent.reply_to, 'recruiter@example.com');
    assert.equal(sent.to[0], 'mailbox@example.com');
  });
});

test('reject oversized message without truncating or contacting providers', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({ request: req({ ...payload, message: 'X'.repeat(5001) }), env });
    assert.equal(res.status, 422);
    assert.equal(calls.length, 0);
  });
});

test('reject oversized optional fields and invalid types before verification', async () => {
  const cases = [
    { ...payload, organization: 'A'.repeat(161) },
    { ...payload, location: { city: 'Kathmandu' } },
    { ...payload, name: 'A'.repeat(121) },
    { ...payload, 'cf-turnstile-response': 'T'.repeat(2049) }
  ];
  for (const candidate of cases) {
    const { mock, calls } = setupFetch();
    await withFetch(mock, async () => {
      const res = await onRequestPost({ request: req(candidate), env });
      assert.equal(res.status, 422);
      assert.equal(calls.length, 0);
    });
  }
});

test('strip header-style line breaks from contact metadata without changing message paragraph breaks', async () => {
  const { mock, calls } = setupFetch();
  await withFetch(mock, async () => {
    const res = await onRequestPost({
      request: req({
        ...payload,
        name: 'Example Recruiter\\nInjected: Test',
        organization: 'Example Health\\r\\nExtra: Hidden',
        message: 'A professional inquiry about the opportunity.\\nSecond paragraph with details.'
      }),
      env
    });
    assert.equal(res.status, 200);
    const sent = JSON.parse(calls[1].options.body);
    assert.match(sent.text, /Name: Example Recruiter Injected: Test/);
    assert.match(sent.text, /Organization: Example Health  Extra: Hidden/);
    assert.match(sent.text, /details/);
  });
});

test('GET endpoint never sends or exposes private configuration', async () => {
  const response = onRequestGet();
  assert.equal(response.status, 405);
});
