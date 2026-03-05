import gsap from 'gsap';
import { qs, qsa } from './dom';
import { initNavSpy } from './navSpy';
import { initReveal } from './reveal';

const initHeaderMenu = (): void => {
  const toggle = qs<HTMLButtonElement>('.menu-toggle');
  const nav = qs<HTMLElement>('.mobile-nav');
  const panel = qs<HTMLElement>('.mobile-nav__panel');
  if (!toggle || !nav || !panel) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isOpen = false;

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');

    if (prefersReduced) {
      nav.hidden = true;
      nav.style.opacity = '';
      panel.style.opacity = '';
      panel.style.transform = '';
      return;
    }

    gsap.to(panel, {
      x: 24,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        nav.hidden = true;
        nav.style.opacity = '';
        panel.style.opacity = '';
        panel.style.transform = '';
      }
    });
    gsap.to(nav, { opacity: 0, duration: 0.2, ease: 'power2.in' });
  };

  const openMenu = () => {
    if (isOpen) return;
    isOpen = true;
    nav.hidden = false;
    nav.style.opacity = '1';
    panel.style.opacity = '1';
    panel.style.transform = 'none';
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');

    if (prefersReduced) return;
    gsap.set(nav, { opacity: 0 });
    gsap.set(panel, { x: 24, opacity: 0 });
    gsap.to(nav, { opacity: 1, duration: 0.22, ease: 'power2.out' });
    gsap.to(panel, { x: 0, opacity: 1, duration: 0.24, ease: 'power2.out' });
  };

  toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  nav.addEventListener('click', (event) => {
    if (event.target === nav) closeMenu();
  });
  qsa<HTMLAnchorElement>('.mobile-nav__panel a', nav).forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
};

const initHeroIntro = (): void => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.from('.hero .badge', { opacity: 0, y: 10, duration: 0.3 })
    .from('.hero h1', { opacity: 0, y: 14, duration: 0.4 }, '-=0.1')
    .from('.hero__role, .hero__tagline', { opacity: 0, y: 12, duration: 0.35, stagger: 0.08 }, '-=0.15')
    .from('.hero__actions .btn', { opacity: 0, y: 8, duration: 0.25, stagger: 0.08 }, '-=0.2')
    .from('.hero__media', { opacity: 0, y: 14, duration: 0.45 }, '-=0.25');
};

const initGlobalGsapInteractions = (): void => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const hoverTargets = qsa<HTMLElement>('.btn, .card, .section-shell');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { y: -1, duration: 0.18, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { y: 0, duration: 0.18, ease: 'power2.out' });
    });
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
    gsap.fromTo('.lightbox__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
    gsap.fromTo(
      '.lightbox__dialog',
      { opacity: 0, y: 22, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
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
    gsap.to('.lightbox__backdrop', { opacity: 0, duration: 0.18, ease: 'power2.in' });
    gsap.to('.lightbox__dialog', {
      opacity: 0,
      y: 14,
      scale: 0.99,
      duration: 0.22,
      ease: 'power2.in',
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
  initHeaderMenu();
  initNavSpy();
  initHeroIntro();
  initReveal();
  initGlobalGsapInteractions();
  initCardLinks();
  initScrollProgress();
  initLightbox();
};
