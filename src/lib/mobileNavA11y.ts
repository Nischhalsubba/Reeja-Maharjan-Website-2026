const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export const initMobileNavA11y = (): void => {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#mobile-nav');
  const panel = nav?.querySelector<HTMLElement>('.mobile-nav__panel');

  if (!toggle || !nav || !panel) return;

  let previousFocus: HTMLElement | null = null;

  const isOpen = (): boolean => toggle.getAttribute('aria-expanded') === 'true';

  const focusFirstControl = (): void => {
    const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();
  };

  const restoreFocus = (): void => {
    const target = previousFocus ?? toggle;
    requestAnimationFrame(() => target.focus());
    previousFocus = null;
  };

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'false') {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;
      requestAnimationFrame(focusFirstControl);
    }
  });

  nav.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      toggle.click();
      restoreFocus();
      return;
    }

    if (event.key !== 'Tab') return;

    const controls = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true'
    );

    if (controls.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  nav.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest('a') || target.matches('[data-mobile-nav-close]') || target === nav) {
      requestAnimationFrame(() => {
        if (!isOpen()) restoreFocus();
      });
    }
  });
};
