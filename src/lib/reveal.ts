import { gsap } from 'gsap';
import { qsa } from './dom';

const ITEM_SELECTOR = [
  '[data-reveal]',
  '.home-section__topline',
  '.site-section__head',
  '.site-page__split',
  '.home-experience-item',
  '.site-list__item'
].join(',');

const GROUP_SELECTOR = ['[data-reveal-group]', '.home-role-grid', '.site-grid', '.home-experience-list'].join(',');

const GROUP_CHILD_SELECTOR = ['[data-reveal]', '.home-role-card', '.site-card', '.home-experience-item'].join(',');

export const initReveal = (): void => {
  if (document.documentElement.dataset.revealInitialized === 'true') return;
  document.documentElement.dataset.revealInitialized = 'true';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = qsa<HTMLElement>(ITEM_SELECTOR);
  const groups = qsa<HTMLElement>(GROUP_SELECTOR);

  if (prefersReduced) {
    items.forEach((item) => item.classList.add('in-view'));
    groups.forEach((group) => qsa<HTMLElement>(GROUP_CHILD_SELECTOR, group).forEach((item) => item.classList.add('in-view')));
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
        el.classList.add('in-view');
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'opacity,visibility,transform'
          }
        );
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
        const children = qsa<HTMLElement>(GROUP_CHILD_SELECTOR, group).filter((el) => !seen.has(el));

        children.forEach((el) => {
          seen.add(el);
          el.classList.add('in-view');
          itemObserver.unobserve(el);
        });

        if (children.length) {
          gsap.fromTo(
            children,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.04,
              ease: 'power3.out',
              overwrite: 'auto',
              clearProps: 'opacity,visibility,transform'
            }
          );
        }

        groupObserver.unobserve(group);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach((item) => itemObserver.observe(item));
  groups.forEach((group) => groupObserver.observe(group));
};
