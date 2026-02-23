import { loadGSAP } from '../engines/gsap';

export const bindMedicalParticles = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const layer = root.querySelector<HTMLElement>('[data-medical-particles-layer]');
  if (!(layer instanceof HTMLElement)) return;

  const particles = Array.from(layer.querySelectorAll<HTMLElement>('span'));
  if (!particles.length) return;

  if (reduced) {
    particles.forEach((particle) => {
      particle.style.transform = 'none';
      particle.style.opacity = '';
    });
    return;
  }

  const { gsap } = await loadGSAP();

  particles.forEach((particle, index) => {
    const driftY = (index % 2 === 0 ? -1 : 1) * (4 + (index % 3) * 2);
    const driftX = (index % 3) - 1;

    gsap.to(particle, {
      x: driftX * 4,
      y: driftY,
      opacity: 0.25 + (index % 4) * 0.12,
      duration: 3.8 + index * 0.22,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  });
};

