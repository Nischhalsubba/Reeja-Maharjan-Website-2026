import SplitType from 'split-type';
import { loadGSAP } from '../engines/gsap';

export const runHeroIntro = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const heroRoot = root.querySelector('[data-hero-root]');
  if (!(heroRoot instanceof HTMLElement)) return;

  const title = heroRoot.querySelector('[data-hero-title]');
  const subtitle = heroRoot.querySelector('[data-hero-subtitle]');
  const copy = heroRoot.querySelector('[data-hero-copy]');
  const actions = heroRoot.querySelector('[data-hero-actions]');
  const image = root.querySelector('[data-hero-image-wrap]');

  if (reduced) {
    [title, subtitle, copy, actions, image].forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    return;
  }

  const { gsap } = await loadGSAP();
  const elements = [subtitle, copy, actions, image].filter((el): el is HTMLElement => el instanceof HTMLElement);

  let split: SplitType | undefined;
  if (title instanceof HTMLElement) {
    split = new SplitType(title, { types: 'lines,words' });
  }

  const titleWords = split?.words ?? [];
  gsap.set([...titleWords, ...elements], { opacity: 0, y: 18, willChange: 'transform, opacity' });

  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
  if (titleWords.length) {
    timeline.to(titleWords, { opacity: 1, y: 0, duration: 0.65, stagger: 0.04 });
  } else if (title instanceof HTMLElement) {
    timeline.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 });
  }

  timeline.to(elements, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.35').eventCallback('onComplete', () => {
    [...titleWords, ...elements].forEach((el) => {
      if (el instanceof HTMLElement) el.style.willChange = 'auto';
    });
  });
};
