import { loadGSAP } from '../engines/gsap';

export const bindEcgPulse = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const path = root.querySelector<SVGPathElement>('[data-ecg-line]');
  if (!(path instanceof SVGPathElement)) return;

  path.style.opacity = '1';

  if (reduced) {
    path.style.strokeDasharray = 'none';
    path.style.strokeDashoffset = '0';
    return;
  }

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;

  const { gsap } = await loadGSAP();
  gsap.timeline({ repeat: -1, repeatDelay: 1.25 })
    .to(path, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: 'power1.inOut',
    })
    .to(path, {
      opacity: 0.55,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut',
    }, '-=0.35')
    .to(path, {
      strokeDashoffset: -length * 0.08,
      opacity: 0.35,
      duration: 0.65,
      ease: 'sine.out',
    });
};

