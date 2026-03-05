import gsap from 'gsap';
import { qsa } from './dom';

export const initReveal = (): void => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = qsa<HTMLElement>('[data-reveal]');
  const groups = qsa<HTMLElement>('[data-reveal-group]');

  if (prefersReduced) {
    items.forEach((item) => item.classList.add('in-view'));
    return;
  }

  const seen = new WeakSet<HTMLElement>();
  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (seen.has(el)) return;
        seen.add(el);
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
        );
        el.classList.add('in-view');
        itemObserver.unobserve(el);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  const groupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target as HTMLElement;
        const children = qsa<HTMLElement>('[data-reveal]', group).filter((el) => !seen.has(el));
        if (!children.length) return;

        children.forEach((el) => {
          seen.add(el);
          el.classList.add('in-view');
          itemObserver.unobserve(el);
        });

        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.09,
            ease: 'power2.out',
            clearProps: 'all'
          }
        );
        groupObserver.unobserve(group);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach((item) => itemObserver.observe(item));
  groups.forEach((group) => groupObserver.observe(group));
};
