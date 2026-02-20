import { loadCached } from '../core/loader';
import { loadGSAP } from './gsap';

let initialized = false;

export const setupLenis = async (): Promise<void> => {
  if (initialized) return;
  initialized = true;

  const Lenis = await loadCached('engine:lenis', async () => {
    const mod = await import('lenis');
    return mod.default;
  });

  const lenis = new Lenis({ autoRaf: false, duration: 1.1, smoothWheel: true });
  const { ScrollTrigger } = await loadGSAP();

  lenis.on('scroll', () => ScrollTrigger.update());

  const raf = (time: number) => {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  };
  window.requestAnimationFrame(raf);

  window.addEventListener(
    'load',
    () => {
      ScrollTrigger.refresh();
    },
    { once: true }
  );
};
