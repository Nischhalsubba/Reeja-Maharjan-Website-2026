import { autoAnimate } from '@formkit/auto-animate';

export const applyAutoAnimate = (targets: Iterable<Element>): void => {
  for (const target of targets) {
    if (target instanceof HTMLElement) {
      autoAnimate(target, { duration: 180, easing: 'ease-out' });
    }
  }
};
