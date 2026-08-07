import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initFieldJournalMotion = (): (() => void) => {
  if (!document.body.classList.contains('field-journal')) return () => undefined;
  if (document.documentElement.dataset.fieldJournalMotionInitialized === 'true') return () => undefined;
  document.documentElement.dataset.fieldJournalMotionInitialized = 'true';

  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    media.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        desktop: '(min-width: 900px)'
      },
      ({ conditions }) => {
        const { reduceMotion, desktop } = conditions as { reduceMotion: boolean; desktop: boolean };
        const heroItems = gsap.utils.toArray<HTMLElement>('[data-fj-hero]');
        const portrait = document.querySelector<HTMLElement>('[data-fj-portrait]');
        const reveals = gsap.utils.toArray<HTMLElement>('[data-fj-reveal]');
        const groups = gsap.utils.toArray<HTMLElement>('[data-fj-group]');

        if (reduceMotion) {
          gsap.set([...heroItems, portrait, ...reveals, ...groups.flatMap((group) => Array.from(group.children))], {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            clearProps: 'transform,opacity,visibility'
          });
          return undefined;
        }

        const heroTimeline = gsap.timeline({
          defaults: { ease: 'power3.out', overwrite: 'auto' }
        });

        if (heroItems.length) {
          heroTimeline.from(heroItems, {
            autoAlpha: 0,
            y: 18,
            duration: 0.62,
            stagger: 0.05,
            clearProps: 'transform,opacity,visibility'
          });
        }

        if (portrait) {
          heroTimeline.from(
            portrait,
            {
              autoAlpha: 0,
              x: desktop ? 18 : 0,
              y: desktop ? 0 : 18,
              rotation: desktop ? 0.5 : 0,
              duration: 0.62,
              clearProps: 'transform,opacity,visibility'
            },
            0.14
          );
        }

        reveals
          .filter((element) => !element.closest('[data-fj-group]'))
          .forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: 16,
              duration: 0.42,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true
              }
            });
          });

        groups.forEach((group) => {
          const children = Array.from(group.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
          if (!children.length) return;

          gsap.from(children, {
            autoAlpha: 0,
            y: 16,
            duration: 0.42,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
              once: true
            }
          });
        });

        return undefined;
      }
    );
  }, document.body);

  window.requestAnimationFrame(() => ScrollTrigger.refresh());

  const cleanup = (): void => {
    context.revert();
    media.revert();
    document.documentElement.removeAttribute('data-field-journal-motion-initialized');
  };

  window.addEventListener('pagehide', cleanup, { once: true });
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  return cleanup;
};
