import gsap from 'gsap';
import { qs, qsa } from './dom';
import { initNavSpy } from './navSpy';
import { initReveal } from './reveal';

const initHeaderMenu = (): void => {
  const toggle = qs<HTMLButtonElement>('.menu-toggle');
  const nav = qs<HTMLElement>('.mobile-nav');
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });

  qsa<HTMLAnchorElement>('.mobile-nav__panel a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
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

const initLightbox = (): void => {
  const lightbox = qs<HTMLElement>('#image-lightbox');
  const image = qs<HTMLImageElement>('[data-lightbox-image]', lightbox ?? document);
  const title = qs<HTMLElement>('[data-lightbox-title]', lightbox ?? document);
  if (!lightbox || !image || !title) return;

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
    title: el.dataset.lightboxTitle ?? 'Image preview'
  }));

  if (!items.length) return;

  let currentIndex = 0;
  let rotation = 0;

  const render = () => {
    const item = items[currentIndex];
    if (!item) return;
    image.src = item.src;
    image.alt = item.alt;
    title.textContent = item.title;
    image.style.transform = `rotate(${rotation}deg)`;
  };

  const setOpen = (open: boolean) => {
    lightbox.hidden = !open;
    lightbox.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('lightbox-open', open);
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      currentIndex = index;
      rotation = 0;
      render();
      setOpen(true);
    });
  });

  closeButtons.forEach((btn) => btn.addEventListener('click', () => setOpen(false)));
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
    if (event.key === 'Escape') setOpen(false);
    if (event.key === 'ArrowLeft') prevBtn?.click();
    if (event.key === 'ArrowRight') nextBtn?.click();
  });
};

export const initMotion = (): void => {
  initHeaderMenu();
  initNavSpy();
  initHeroIntro();
  initReveal();
  initLightbox();
};
