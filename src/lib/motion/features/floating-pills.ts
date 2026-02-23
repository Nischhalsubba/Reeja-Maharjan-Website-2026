import { loadGSAP } from '../engines/gsap';

export const bindFloatingPills = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const pills = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-float]'));
  if (!pills.length) return;

  if (reduced) {
    pills.forEach((pill) => {
      pill.style.transform = 'none';
      pill.style.opacity = '1';
    });
    return;
  }

  const { gsap } = await loadGSAP();
  pills.forEach((pill, index) => {
    const y = index % 2 === 0 ? -6 : 6;
    gsap.to(pill, {
      y,
      duration: 2.4 + (index % 3) * 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
};
