import { animateWithWAAPI, isWAAPISupported } from '../engines/waapi';

export const bindScrollReveals = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-motion="reveal"]'));
  if (!targets.length) return;

  if (reduced) {
    targets.forEach((target) => {
      target.style.opacity = '1';
      target.style.transform = 'none';
    });
    return;
  }

  const runReveal = (element: HTMLElement) => {
    if (isWAAPISupported()) {
      animateWithWAAPI(
        element,
        [
          { opacity: 0, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0px)' },
        ],
        { duration: 540, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
      );
    } else {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'opacity 540ms ease, transform 540ms ease';
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target instanceof HTMLElement) {
          runReveal(target);
        }
        observer.unobserve(target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  );

  targets.forEach((target) => observer.observe(target));
};
