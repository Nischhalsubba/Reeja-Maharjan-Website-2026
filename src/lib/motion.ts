import { gsap } from 'gsap';
import { qs, qsa } from './dom';
import { initNavSpy } from './navSpy';
import { initReveal } from './reveal';

const initHeaderMenu = (): void => {
  const toggle = qs<HTMLButtonElement>('.menu-toggle');
  const nav = qs<HTMLElement>('.mobile-nav');
  if (!toggle || !nav) return;
  const closeButton = qs<HTMLButtonElement>('[data-mobile-nav-close]', nav);

  let isOpen = false;

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (isOpen) return;
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');
  };

  toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  nav.addEventListener('click', (event) => {
    if (event.target === nav) closeMenu();
  });
  qsa<HTMLAnchorElement>('.mobile-nav__panel a', nav).forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });
  closeButton?.addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
};

const initHeroIntro = (): void => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (qs<HTMLElement>('.home-hero')) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
    tl.from('.home-hero .home-kicker, .home-hero .home-hero__name', {
      autoAlpha: 0,
      y: 10,
      duration: 0.24,
      stagger: 0.04
    })
      .from('.home-hero h1', { autoAlpha: 0, y: 14, duration: 0.38 }, '-=0.12')
      .from('.home-hero__intro, .home-proof', { autoAlpha: 0, y: 12, duration: 0.28, stagger: 0.04 }, '-=0.24')
      .from('.home-actions .home-button', { autoAlpha: 0, y: 8, duration: 0.22, stagger: 0.04 }, '-=0.18')
      .from('.home-hero__summary', { autoAlpha: 0, y: 12, duration: 0.34 }, '-=0.18');
    return;
  }

  if (qs<HTMLElement>('.site-page__hero')) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
    tl.from('.site-page__hero .site-eyebrow', { autoAlpha: 0, y: 10, duration: 0.24 })
      .from('.site-page__hero h1', { autoAlpha: 0, y: 14, duration: 0.38 }, '-=0.12')
      .from('.site-page__hero .site-page__lede', { autoAlpha: 0, y: 12, duration: 0.28 }, '-=0.22')
      .from('.site-page__hero .site-actions .site-button', {
        autoAlpha: 0,
        y: 8,
        duration: 0.22,
        stagger: 0.04
      }, '-=0.16')
      .from('.site-page__hero .site-page__summary', { autoAlpha: 0, y: 12, duration: 0.34 }, '-=0.18');
    return;
  }

  if (qs<HTMLElement>('.hero')) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
    tl.from('.hero .badge', { autoAlpha: 0, y: 10, duration: 0.24 })
      .from('.hero h1', { autoAlpha: 0, y: 14, duration: 0.38 }, '-=0.12')
      .from('.hero__role, .hero__tagline', { autoAlpha: 0, y: 12, duration: 0.28, stagger: 0.04 }, '-=0.22')
      .from('.hero__actions .btn', { autoAlpha: 0, y: 8, duration: 0.22, stagger: 0.04 }, '-=0.16')
      .from('.hero__media', { autoAlpha: 0, y: 12, duration: 0.34 }, '-=0.18');
  }
};

const initLightbox = (): void => {
  const lightbox = qs<HTMLElement>('#image-lightbox');
  const image = qs<HTMLImageElement>('[data-lightbox-image]', lightbox ?? document);
  const frame = qs<HTMLIFrameElement>('[data-lightbox-frame]', lightbox ?? document);
  const title = qs<HTMLElement>('[data-lightbox-title]', lightbox ?? document);
  const description = qs<HTMLElement>('[data-lightbox-description]', lightbox ?? document);
  if (!lightbox || !image || !title || !frame) return;

  const closeButtons = qsa<HTMLElement>('[data-lightbox-close]', lightbox);
  const prevBtn = qs<HTMLButtonElement>('[data-lightbox-prev]', lightbox);
  const nextBtn = qs<HTMLButtonElement>('[data-lightbox-next]', lightbox);
  const rotateLeft = qs<HTMLButtonElement>('[data-rotate-left]', lightbox);
  const rotateRight = qs<HTMLButtonElement>('[data-rotate-right]', lightbox);
  const rotateReset = qs<HTMLButtonElement>('[data-rotate-reset]', lightbox);

  const triggers = qsa<HTMLElement>('[data-lightbox-src]');
  const items = triggers.map((el) => ({
    src: el.dataset.lightboxSrc ?? '',
    alt: el.dataset.lightboxAlt ?? 'Image',
    title: el.dataset.lightboxTitle ?? 'Image preview',
    description: el.dataset.lightboxDescription ?? ''
  }));

  if (!items.length) return;

  let currentIndex = 0;
  let rotation = 0;
  let closing = false;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = () => {
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

  const openLightbox = () => {
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');

    if (prefersReduced) return;
    gsap.killTweensOf(['.lightbox__backdrop', '.lightbox__dialog']);
    gsap.fromTo(
      '.lightbox__backdrop',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }
    );
    gsap.fromTo(
      '.lightbox__dialog',
      { autoAlpha: 0, y: 22, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
    );
  };

  const closeLightbox = () => {
    if (closing) return;
    if (prefersReduced) {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      return;
    }

    closing = true;
    gsap.killTweensOf(['.lightbox__backdrop', '.lightbox__dialog']);
    gsap.to('.lightbox__backdrop', {
      autoAlpha: 0,
      duration: 0.18,
      ease: 'power2.in',
      overwrite: 'auto'
    });
    gsap.to('.lightbox__dialog', {
      autoAlpha: 0,
      y: 14,
      scale: 0.99,
      duration: 0.22,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        lightbox.hidden = true;
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        closing = false;
      }
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

  closeButtons.forEach((btn) => btn.addEventListener('click', () => closeLightbox()));
  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    rotation = 0;
    render();
  });
  nextBtn?.addEventListener('click', () => {
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
    if (event.key === 'ArrowLeft') prevBtn?.click();
    if (event.key === 'ArrowRight') nextBtn?.click();
  });
};

const initCardLinks = (): void => {
  const cards = qsa<HTMLElement>('[data-card-link]');
  cards.forEach((card) => {
    const href = card.dataset.cardHref;
    const target = card.dataset.cardTarget ?? '_self';
    if (!href) return;

    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    const canOpenFromTarget = (targetEl: EventTarget | null): boolean => {
      if (!(targetEl instanceof Element)) return true;
      return !Boolean(targetEl.closest('a, button, input, textarea, select, label'));
    };

    card.addEventListener('click', (event) => {
      if (!canOpenFromTarget(event.target)) return;
      if (target === '_blank') window.open(href, '_blank', 'noopener,noreferrer');
      else window.location.href = href;
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      if (target === '_blank') window.open(href, '_blank', 'noopener,noreferrer');
      else window.location.href = href;
    });
  });
};

const initScrollProgress = (): void => {
  const bar = qs<HTMLElement>('.scroll-progress__bar');
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${progress})`;
    bar.style.opacity = String(0.45 + progress * 0.55);
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
};

export const initMotion = (): void => {
  if (document.documentElement.dataset.motionInitialized === 'true') return;
  document.documentElement.dataset.motionInitialized = 'true';

  initHeaderMenu();
  initNavSpy();
  initHeroIntro();
  initReveal();
  initCardLinks();
  initScrollProgress();
  initLightbox();
};
