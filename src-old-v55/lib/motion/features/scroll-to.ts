import { loadGSAP } from '../engines/gsap';

export const bindScrollToTargets = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const links = Array.from(root.querySelectorAll<HTMLElement>('[data-scroll-target]'));
  if (!links.length) return;

  if (reduced) {
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetSelector = link.getAttribute('data-scroll-target');
        if (!targetSelector) return;
        const target = document.querySelector(targetSelector);
        if (!(target instanceof HTMLElement)) return;
        event.preventDefault();
        target.scrollIntoView();
      });
    });
    return;
  }

  const { gsap } = await loadGSAP();

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetSelector = link.getAttribute('data-scroll-target');
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      gsap.to(window, {
        duration: 0.9,
        ease: 'power2.out',
        scrollTo: { y: target, offsetY: 72 },
      });
    });
  });
};
