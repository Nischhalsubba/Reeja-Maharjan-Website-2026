import gsap from 'gsap';
import { qsa } from './dom';

export const initReveal = (): void => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = qsa<HTMLElement>('[data-reveal]');

  if (prefersReduced) {
    items.forEach((item) => item.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
        );
        el.classList.add('in-view');
        observer.unobserve(el);
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((item) => observer.observe(item));
};
