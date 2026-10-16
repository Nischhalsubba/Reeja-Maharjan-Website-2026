import { qs, qsa } from './dom';

const initHeaderMenu = (): void => {
  const toggle = qs<HTMLButtonElement>('.menu-toggle');
  const nav = qs<HTMLElement>('.mobile-nav');
  if (!toggle || !nav) return;
  const closeButton = qs<HTMLButtonElement>('[data-mobile-nav-close]', nav);
  let isOpen = false;

  const closeMenu = (): void => {
    if (!isOpen) return;
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  const openMenu = (): void => {
    if (isOpen) return;
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');
  };

  toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  closeButton?.addEventListener('click', closeMenu);
  nav.addEventListener('click', (event) => {
    if (event.target === nav) closeMenu();
  });
  qsa<HTMLAnchorElement>('.mobile-nav__panel a', nav).forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
};

const initScrollProgress = (): void => {
  const bar = qs<HTMLElement>('.scroll-progress__bar');
  if (!bar) return;
  let frame = 0;

  const update = (): void => {
    frame = 0;
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
    bar.style.transform = `scaleX(${progress})`;
  };

  const requestUpdate = (): void => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
};

export const initMotion = (): void => {
  if (document.documentElement.dataset.motionInitialized === 'true') return;
  document.documentElement.dataset.motionInitialized = 'true';
  initHeaderMenu();
  initScrollProgress();
};
