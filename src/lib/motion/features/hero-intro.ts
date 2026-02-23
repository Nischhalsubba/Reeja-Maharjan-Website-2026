import SplitType from 'split-type';
import { loadGSAP } from '../engines/gsap';

export const runHeroIntro = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const isHome = root.querySelector('main[data-page="home"]') instanceof HTMLElement;
  const heroRoot = root.querySelector('[data-hero-root]');
  if (!(heroRoot instanceof HTMLElement)) return;

  const title = heroRoot.querySelector('[data-hero-title]');
  const subtitle = heroRoot.querySelector('[data-hero-subtitle]');
  const copy = heroRoot.querySelector('[data-hero-copy]');
  const actions = heroRoot.querySelector('[data-hero-actions]');
  const image = root.querySelector('[data-hero-device]');
  const pills = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-float]'));
  const watermark = root.querySelector('[data-hero-watermark]');

  if (reduced) {
    [title, subtitle, copy, actions, image, watermark, ...pills].forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    return;
  }

  const { gsap } = await loadGSAP();
  const elements = [subtitle, copy, actions, image, watermark, ...pills].filter(
    (el): el is HTMLElement => el instanceof HTMLElement
  );

  let split: SplitType | undefined;
  if (title instanceof HTMLElement) {
    split = new SplitType(title, { types: 'lines,words' });
  }

  const titleWords = split?.words ?? [];
  gsap.set([...titleWords, ...elements], { opacity: 0, y: 14, willChange: 'transform, opacity' });

  const timeline = gsap.timeline({ defaults: { ease: isHome ? 'power1.out' : 'power2.out' } });
  if (titleWords.length) {
    timeline.to(titleWords, {
      opacity: 1,
      y: 0,
      duration: isHome ? 0.86 : 0.74,
      stagger: isHome ? 0.05 : 0.045,
    });
  } else if (title instanceof HTMLElement) {
    timeline.fromTo(title, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: isHome ? 0.86 : 0.74 });
  }

  timeline
    .to(
      watermark instanceof HTMLElement ? [watermark] : [],
      { opacity: 1, y: 0, duration: isHome ? 1.02 : 0.92, ease: 'power1.out' },
      isHome ? '-=0.56' : '-=0.45'
    )
    .to(
      [subtitle, copy, actions].filter((el): el is HTMLElement => el instanceof HTMLElement),
      { opacity: 1, y: 0, duration: isHome ? 0.92 : 0.8, stagger: isHome ? 0.11 : 0.09 },
      isHome ? '-=0.34' : '-=0.25'
    )
    .to(
      pills,
      { opacity: 1, y: 0, duration: isHome ? 0.76 : 0.62, stagger: isHome ? 0.05 : 0.04 },
      isHome ? '-=0.48' : '-=0.42'
    )
    .to(
      image instanceof HTMLElement ? [image] : [],
      { opacity: 1, y: 0, duration: isHome ? 0.96 : 0.82 },
      isHome ? '-=0.58' : '-=0.46'
    )
    .eventCallback('onComplete', () => {
      [...titleWords, ...elements].forEach((el) => {
        if (el instanceof HTMLElement) el.style.willChange = 'auto';
      });
    });
};
