export function initContactDelivery(): void {
  if (document.querySelector('.cf-turnstile') && !document.querySelector('script[data-contact-challenge]')) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.dataset.contactChallenge = 'true';
    document.head.append(script);
  }
  document.querySelectorAll<HTMLFormElement>('form[data-email-delivery]').forEach(form => {
    if (form.dataset.deliveryBound) return;
    form.dataset.deliveryBound = 'true';
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = button?.querySelector<HTMLElement>('[data-submit-label]');
    const status = form.querySelector<HTMLElement>('[data-delivery-status]');
    const challenge = form.querySelector<HTMLElement>('.cf-turnstile');
    if (!button || !label || !status) return;
    const initialLabel = label.textContent ?? 'Send enquiry';
    let busy = false;
    let previousPayload = '';
    let requestId = '';
    const show = (message: string, state: string) => {
      status.hidden = false;
      status.dataset.state = state;
      status.textContent = message;
    };
    if (!challenge) show('Online delivery is not configured yet. Please use the direct email link.', 'error');
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (busy || !form.reportValidity()) return;
      if (!challenge) return;
      const payload = Object.fromEntries(new FormData(form));
      if (!payload['cf-turnstile-response']) {
        show('Please wait for the spam verification to finish, then try again.', 'error');
        return;
      }
      const fingerprint = JSON.stringify(Object.entries(payload).filter(([key]) => key !== 'cf-turnstile-response'));
      if (fingerprint !== previousPayload || !requestId) {
        previousPayload = fingerprint;
        requestId = crypto.randomUUID();
      }
      payload.request_id = requestId;
      busy = true;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending…';
      show('Sending your message…', 'pending');
      try {
        const response = await fetch(form.action, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(25000)});
        const result = await response.json();
        if (!response.ok || result.success !== true) {
          show(typeof result.message === 'string' ? result.message : 'Could not confirm delivery. Your message is still here; please email Reeja directly if needed.', 'error');
          return;
        }
        form.reset();
        requestId = '';
        previousPayload = '';
        form.querySelectorAll('input[type="date"],input[type="time"]').forEach(input => {input.dispatchEvent(new Event('change'));input.dispatchEvent(new Event('input'));});
        show(form.id === 'call-request' ? 'Your call request was accepted for email delivery. Reeja will confirm the appointment separately.' : 'Your message was accepted for email delivery. Thank you!', 'success');
      } catch {
        show('Could not confirm delivery. Your message is still here. Please email Reeja directly before retrying.', 'error');
      } finally {
        busy = false;
        button.disabled = false;
        form.removeAttribute('aria-busy');
        label.textContent = initialLabel;
        (window as Window & {turnstile?: {reset: (widget: string)=>void}}).turnstile?.reset(`#${form.id} .cf-turnstile`);
      }
    });
  });
}
