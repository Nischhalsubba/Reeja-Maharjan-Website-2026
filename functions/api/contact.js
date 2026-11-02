/*
 * Optional Cloudflare Pages contact endpoint.
 * Not active until a public Turnstile sitekey is configured at build time and
 * the encrypted runtime TURNSTILE_SECRET_KEY and RESEND_API_KEY bindings exist.
 * Never log personal inquiry data, tokens, or provider credentials.
 */
const allowedHostname = 'reejamaharjan.com.np';
const messageLimit = 5000;
const fail = (status, message) => Response.json(
  { success: false, message },
  { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }
);
const clean = (value, max = 250) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = (email) => email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function onRequestPost({ request, env }) {
  if (!env?.TURNSTILE_SECRET_KEY || !env?.RESEND_API_KEY || !env?.CONTACT_FROM_EMAIL || !env?.CONTACT_TO_EMAIL) {
    return fail(503, 'Secure contact delivery is not configured. Please use the direct email link.');
  }
  const origin = request.headers.get('Origin');
  const host = new URL(request.url).hostname;
  if (host !== allowedHostname || origin !== 'https://' + allowedHostname) {
    return fail(403, 'Unrecognized contact origin.');
  }
  if (!(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
    return fail(415, 'Expected JSON submission.');
  }
  if (Number(request.headers.get('content-length') || 0) > 12000) {
    return fail(413, 'Message is too long.');
  }
  let payload;
  try {
    const body = await request.text();
    if (body.length > 12000) return fail(413, 'Message is too long.');
    payload = JSON.parse(body);
  } catch {
    return fail(400, 'Invalid message.');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return fail(400, 'Invalid message.');
  if (clean(payload._honey)) return fail(400, 'Unable to send this message.');
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254);
  const message = clean(payload.message, messageLimit);
  const organization = clean(payload.organization, 160);
  const role = clean(payload.role_type, 160);
  const location = clean(payload.location, 160);
  if (name.length < 2 || !validEmail(email) || message.length < 20 || message.length > messageLimit) {
    return fail(422, 'Please check your name, email and message length.');
  }
  const token = clean(payload['cf-turnstile-response'], 2049);
  if (!token || token.length > 2048) return fail(422, 'Please complete the verification and retry.');
  let verified;
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) return fail(503, 'Verification unavailable; please retry.');
    verified = await response.json();
  } catch {
    return fail(503, 'Verification unavailable; please retry.');
  }
  if (!verified || verified.success !== true || verified.hostname !== allowedHostname || verified.action !== 'professional_contact') {
    return fail(403, 'Verification failed or expired. Please retry.');
  }
  const text = [
    'New professional inquiry from reejamaharjan.com.np',
    'Name: ' + name,
    'Email: ' + email,
    'Organization: ' + organization,
    'Role: ' + role,
    'Location: ' + location,
    '',
    message
  ].join('\n');
  try {
    const outgoing = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: 'Professional inquiry for Reeja Maharjan',
        text
      }),
      signal: AbortSignal.timeout(10000)
    });
    if (!outgoing.ok) return fail(502, 'Mail provider did not accept the message. Please use direct email.');
    const result = await outgoing.json();
    if (!result || typeof result.id !== 'string' || !result.id) {
      return fail(502, 'Mail provider did not confirm acceptance. Please use direct email.');
    }
    return Response.json(
      { success: true, message: 'Mail provider accepted the message for delivery.' },
      { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }
    );
  } catch {
    return fail(502, 'Mail service unavailable. Please use direct email.');
  }
}

export function onRequestGet() {
  return fail(405, 'Method not allowed.');
}
