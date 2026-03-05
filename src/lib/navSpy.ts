import { qsa } from './dom';

export const initNavSpy = (): void => {
  const links = qsa<HTMLAnchorElement>('.desktop-nav a, .mobile-nav__panel a');
  const hrefs = links
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => Boolean(href && href.startsWith('#')));
  const sections = hrefs
    .map((href) => document.querySelector<HTMLElement>(href))
    .filter((section): section is HTMLElement => Boolean(section));

  if (!sections.length) return;

  let ticking = false;

  const setActive = () => {
    const anchorLine = window.scrollY + 120;
    let activeId = sections[0]?.id ?? '';

    for (const section of sections) {
      if (section.offsetTop <= anchorLine) {
        activeId = section.id;
      } else {
        break;
      }
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      const last = sections[sections.length - 1];
      if (last) activeId = last.id;
    }

    const targetHref = `#${activeId}`;
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === targetHref;
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      setActive();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  setActive();
};
