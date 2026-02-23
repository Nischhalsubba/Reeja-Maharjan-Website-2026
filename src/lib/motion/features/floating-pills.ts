import { loadGSAP } from '../engines/gsap';

export const bindFloatingPills = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const pills = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-float]'));
  if (!pills.length) return;
  const isHome = root.querySelector('main[data-page="home"]') instanceof HTMLElement;

  if (reduced) {
    pills.forEach((pill) => {
      pill.style.transform = 'none';
      pill.style.opacity = '1';
    });
    return;
  }

  const { gsap } = await loadGSAP();
  pills.forEach((pill, index) => {
    const amp = isHome ? 4 : 6;
    const y = index % 2 === 0 ? -amp : amp;
    gsap.to(pill, {
      y,
      duration: (isHome ? 3.1 : 2.4) + (index % 3) * (isHome ? 0.42 : 0.35),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
};
