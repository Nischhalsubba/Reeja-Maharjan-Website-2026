import { qsa } from './dom';

export const initNavSpy = (): void => {
  const links = qsa<HTMLAnchorElement>('.desktop-nav a, .mobile-nav__panel a');
  const sections = links
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => Boolean(href && href.startsWith('#')))
    .map((href) => document.querySelector<HTMLElement>(href))
    .filter((section): section is HTMLElement => Boolean(section));

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible?.target.id) return;
      const targetHref = `#${visible.target.id}`;
      links.forEach((link) => {
        const isActive = link.getAttribute('href') === targetHref;
        if (isActive) {
          link.setAttribute('aria-current', 'page');
          return;
        }
        link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: [0.2, 0.35, 0.5, 0.7] }
  );

  sections.forEach((section) => observer.observe(section));
};
