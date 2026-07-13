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
  const background = [document.querySelector<HTMLElement>('main'), document.querySelector<HTMLElement>('footer')].filter(
    (element): element is HTMLElement => Boolean(element)
  );

  if (!toggle || !nav || !panel) return;

  let previousFocus: HTMLElement | null = null;

  const isOpen = (): boolean => toggle.getAttribute('aria-expanded') === 'true';

  const setBackgroundInert = (value: boolean): void => {
    for (const element of background) element.inert = value;
  };

  const controls = (): HTMLElement[] =>
    Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true'
    );

  const focusFirstControl = (): void => {
    controls().at(0)?.focus();
  };

  const restoreFocus = (): void => {
    const target = previousFocus ?? toggle;
    requestAnimationFrame(() => target.focus());
    previousFocus = null;
  };

  toggle.addEventListener(
    'click',
    () => {
      const opening = toggle.getAttribute('aria-expanded') === 'false';
      if (opening) previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;

      requestAnimationFrame(() => {
        if (isOpen()) {
          setBackgroundInert(true);
          focusFirstControl();
        } else {
          setBackgroundInert(false);
          restoreFocus();
        }
      });
    },
    { capture: true }
  );

  nav.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      toggle.click();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = controls();
    if (focusable.length === 0) {
      event.preventDefault();
      panel.tabIndex = -1;
      panel.focus();
      return;
    }

    const first = focusable.at(0);
    const last = focusable.at(-1);
    if (!first || !last) return;

    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  nav.addEventListener('click', () => {
    requestAnimationFrame(() => {
      if (!isOpen()) {
        setBackgroundInert(false);
        restoreFocus();
      }
    });
  });
};
