import { loadGSAP } from '../engines/gsap';

export const bindHeartbeatAccent = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const accents = Array.from(root.querySelectorAll<HTMLElement>('[data-heartbeat-accent]'));
  if (!accents.length) return;

  accents.forEach((accent) => {
    accent.style.opacity = '1';
  });

  if (reduced) return;

  const { gsap } = await loadGSAP();

  accents.forEach((accent, index) => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.15 + index * 0.1 })
      .to(accent, { scale: 1.18, duration: 0.22, ease: 'power1.out' })
      .to(accent, { scale: 0.96, duration: 0.16, ease: 'power1.inOut' })
      .to(accent, { scale: 1.08, duration: 0.18, ease: 'power1.out' })
      .to(accent, { scale: 1, duration: 0.38, ease: 'sine.out' });
  });
};

