import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initPortfolioMotion = (): (() => void) => {
  if (document.documentElement.dataset.portfolioMotionInitialized === 'true') return () => undefined;
  document.documentElement.dataset.portfolioMotionInitialized = 'true';

  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    media.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        desktop: '(min-width: 960px)'
      },
      ({ conditions }) => {
        const { reduceMotion, desktop } = conditions as { reduceMotion: boolean; desktop: boolean };
        const hero = document.querySelector<HTMLElement>('.portfolio-hero');
        if (!hero) return undefined;

        const staged = hero.querySelectorAll<HTMLElement>('[data-hero-stage]');
        const visual = hero.querySelector<HTMLElement>('[data-hero-visual]');
        const ambient = hero.querySelector<HTMLElement>('[data-hero-ambient]');

        if (reduceMotion) {
          gsap.set(staged, { autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: 'transform,opacity,visibility' });
          gsap.set([visual, ambient], { clearProps: 'transform' });
          return undefined;
        }

        const heroTimeline = gsap.timeline({
          defaults: { ease: 'power3.out', overwrite: 'auto' }
        });

        heroTimeline
          .from(staged, {
            autoAlpha: 0,
            y: 24,
            duration: 0.64,
            stagger: 0.07,
            clearProps: 'opacity,visibility,transform'
          })
          .from(
            visual,
            {
              autoAlpha: 0,
              x: desktop ? 36 : 0,
              y: desktop ? 0 : 24,
              scale: 0.975,
              duration: 0.78,
              clearProps: 'opacity,visibility,transform'
            },
            0.16
          );

        if (desktop && visual) {
          gsap.to(visual, {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          });
        }

        if (desktop && ambient) {
          gsap.to(ambient, {
            yPercent: -10,
            xPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true
            }
          });
        }

        return undefined;
      }
    );
  }, document.body);

  const cleanup = (): void => {
    context.revert();
    media.revert();
    document.documentElement.removeAttribute('data-portfolio-motion-initialized');
  };

  window.addEventListener('pagehide', cleanup, { once: true });
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  return cleanup;
};
