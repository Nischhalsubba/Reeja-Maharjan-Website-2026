import { gsap } from 'gsap';
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

const initLightbox = (): void => {
  const lightbox = qs<HTMLElement>('#image-lightbox');
  const image = qs<HTMLImageElement>('[data-lightbox-image]', lightbox ?? document);
  const frame = qs<HTMLIFrameElement>('[data-lightbox-frame]', lightbox ?? document);
  const title = qs<HTMLElement>('[data-lightbox-title]', lightbox ?? document);
  const description = qs<HTMLElement>('[data-lightbox-description]', lightbox ?? document);
  if (!lightbox || !image || !title || !frame) return;

  const closeButtons = qsa<HTMLElement>('[data-lightbox-close]', lightbox);
  const prevButton = qs<HTMLButtonElement>('[data-lightbox-prev]', lightbox);
  const nextButton = qs<HTMLButtonElement>('[data-lightbox-next]', lightbox);
  const rotateLeft = qs<HTMLButtonElement>('[data-rotate-left]', lightbox);
  const rotateRight = qs<HTMLButtonElement>('[data-rotate-right]', lightbox);
  const rotateReset = qs<HTMLButtonElement>('[data-rotate-reset]', lightbox);
  const triggers = qsa<HTMLElement>('[data-lightbox-src]');
  const items = triggers.map((element) => ({
    src: element.dataset.lightboxSrc ?? '',
    alt: element.dataset.lightboxAlt ?? 'Image',
    title: element.dataset.lightboxTitle ?? 'Image preview',
    description: element.dataset.lightboxDescription ?? ''
  }));
  if (!items.length) return;

  let currentIndex = 0;
  let rotation = 0;
  let closing = false;
  let previousFocus: HTMLElement | null = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = (): void => {
    const item = items[currentIndex];
    if (!item) return;
    title.textContent = item.title;
    if (description) description.textContent = item.description;

    const isPdf = item.src.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      image.hidden = true;
      frame.hidden = false;
      frame.src = item.src;
      frame.setAttribute('title', item.title);
      rotateLeft?.setAttribute('disabled', 'true');
      rotateRight?.setAttribute('disabled', 'true');
      rotateReset?.setAttribute('disabled', 'true');
    } else {
      frame.hidden = true;
      frame.src = '';
      image.hidden = false;
      image.src = item.src;
      image.alt = item.alt;
      rotateLeft?.removeAttribute('disabled');
      rotateRight?.removeAttribute('disabled');
      rotateReset?.removeAttribute('disabled');
    }
    image.style.transform = `rotate(${rotation}deg)`;
  };

  const finishClose = (): void => {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    previousFocus?.focus();
    previousFocus = null;
    closing = false;
  };

  const openLightbox = (): void => {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButtons.at(0)?.focus();

    if (reducedMotion) return;
    gsap.killTweensOf(['.lightbox__backdrop', '.lightbox__dialog']);
    gsap.fromTo('.lightbox__backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: 'power2.out' });
    gsap.fromTo(
      '.lightbox__dialog',
      { autoAlpha: 0, y: 18, scale: 0.99 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: 'power3.out', overwrite: 'auto' }
    );
  };

  const closeLightbox = (): void => {
    if (closing || lightbox.hidden) return;
    if (reducedMotion) {
      finishClose();
      return;
    }
    closing = true;
    gsap.killTweensOf(['.lightbox__backdrop', '.lightbox__dialog']);
    gsap.to('.lightbox__backdrop', { autoAlpha: 0, duration: 0.14, ease: 'power2.in', overwrite: 'auto' });
    gsap.to('.lightbox__dialog', {
      autoAlpha: 0,
      y: 12,
      duration: 0.18,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: finishClose
    });
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      currentIndex = index;
      rotation = 0;
      render();
      openLightbox();
    });
  });
  closeButtons.forEach((button) => button.addEventListener('click', closeLightbox));
  prevButton?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    rotation = 0;
    render();
  });
  nextButton?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    rotation = 0;
    render();
  });
  rotateLeft?.addEventListener('click', () => {
    rotation -= 90;
    render();
  });
  rotateRight?.addEventListener('click', () => {
    rotation += 90;
    render();
  });
  rotateReset?.addEventListener('click', () => {
    rotation = 0;
    render();
  });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') prevButton?.click();
    if (event.key === 'ArrowRight') nextButton?.click();
  });
};

const initCardLinks = (): void => {
  qsa<HTMLElement>('[data-card-link]').forEach((card) => {
    const href = card.dataset.cardHref;
    const target = card.dataset.cardTarget ?? '_self';
    if (!href) return;
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    const isInteractiveChild = (targetElement: EventTarget | null): boolean =>
      targetElement instanceof Element && Boolean(targetElement.closest('a, button, input, textarea, select, label'));

    const open = (): void => {
      if (target === '_blank') window.open(href, '_blank', 'noopener,noreferrer');
      else window.location.href = href;
    };

    card.addEventListener('click', (event) => {
      if (!isInteractiveChild(event.target)) open();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
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
  initCardLinks();
  initScrollProgress();
  initLightbox();
};
