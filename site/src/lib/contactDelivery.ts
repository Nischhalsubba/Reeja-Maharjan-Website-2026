import { professionalFacts } from '../content/professional-facts';

export function initContactDelivery(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-email-delivery]').forEach(form => {
    if (form.dataset.deliveryBound) return;
    form.dataset.deliveryBound = 'true';
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = button?.querySelector<HTMLElement>('[data-submit-label]');
    const status = form.querySelector<HTMLElement>('[data-delivery-status]');
    const fallback = form.querySelector<HTMLAnchorElement>('[data-delivery-fallback]');
    if (!button || !label || !status || !fallback) return;
    const initialLabel = label.textContent ?? 'Send enquiry';
    let busy = false;
    const show = (message: string, state: string) => {
      status.hidden = false;
      status.dataset.state = state;
      status.textContent = message;
      fallback.hidden = state !== 'error';
    };
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (busy || !form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form));
      if (values._honey) {show('Unable to send. Please use the direct email link.', 'error'); return;}
      const call = form.id === 'call-request';
      const subject = call ? 'Professional call request for Reeja Maharjan' : 'New website enquiry for Reeja Maharjan';
      const body = [
        'Name: ' + values.name, 'Email: ' + values.email,
        ...(call ? ['Preferred date: ' + values.date, 'Preferred time: ' + values.time + ' (Nepal time, UTC+05:45)', '', String(values.topic || 'No topic specified.')] : [...[values.organization && 'Organisation: ' + values.organization, values.role_type && 'Role: ' + values.role_type, values.location && 'Location: ' + values.location].filter(Boolean), '', String(values.message)]),
      ].join('\n');
      fallback.href = 'mailto:' + professionalFacts.professionalEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      const payload = new URLSearchParams({name:String(values.name), email:String(values.email), message:body, _subject:subject, _template:'basic', _honey:''});
      busy = true;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending…';
      show('Sending your message…', 'pending');
      try {
        const response = await fetch(professionalFacts.contactAjaxEndpoint, {method:'POST', headers:{Accept:'application/json'},body:payload,signal:AbortSignal.timeout(30000)});
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Delivery not confirmed');
        form.reset();
        form.querySelectorAll('input[type="date"],input[type="time"]').forEach(input => {input.dispatchEvent(new Event('change'));input.dispatchEvent(new Event('input'));});
        show(call ? 'Your call request was accepted for email delivery. Reeja will confirm the appointment separately.' : 'Your message was accepted for email delivery. Thank you!', 'success');
      } catch {
        show('We could not confirm delivery. Your details are still here. If you do not receive a reply, use the email option below to send your completed message directly.', 'error');
      } finally {
        busy = false;
        button.disabled = false;
        form.removeAttribute('aria-busy');
        label.textContent = initialLabel;
      }
    });
  });
}
