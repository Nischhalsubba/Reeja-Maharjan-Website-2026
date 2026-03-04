import { loadGSAP } from '../engines/gsap';

export const bindParallaxAccents = async (root: ParentNode, reduced: boolean): Promise<void> => {
  if (reduced) return;
  const target = root.querySelector('[data-hero-image-wrap]');
  if (!(target instanceof HTMLElement)) return;

  const { gsap } = await loadGSAP();
  gsap.to(target, {
    yPercent: -4,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};
