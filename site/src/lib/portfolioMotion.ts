import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  '[data-motion-reveal]',
  '.site-section__head',
  '.site-card',
  '.site-list__item',
  '.cv-experience__item',
  '.blog-index__lead-card',
  '.blog-topic-panel',
  '.blog-card',
  '.blog-article__body > section'
].join(',');

export const initPortfolioMotion = (): (() => void) => {
  if (document.documentElement.dataset.portfolioMotionInitialized === 'true') return () => undefined;
  document.documentElement.dataset.portfolioMotionInitialized = 'true';

  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    media.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        desktop: '(min-width: 920px)'
      },
      ({ conditions }) => {
        const { reduceMotion, desktop } = conditions as { reduceMotion: boolean; desktop: boolean };
        const homeHero = document.querySelector<HTMLElement>('.care-hero');
        const pageHero = document.querySelector<HTMLElement>('.site-page__hero, .contact-hero');

        if (reduceMotion) {
          gsap.set(
            [
              '[data-hero-kicker]',
              '[data-hero-name]',
              '[data-hero-statement]',
              '[data-hero-copy]',
              '[data-hero-actions] > *',
              '[data-hero-portrait]',
              '[data-hero-proof] > *',
              REVEAL_SELECTOR,
              '.site-page__summary',
              '.contact-hero__details'
            ],
            { autoAlpha: 1, x: 0, y: 0, clearProps: 'transform,opacity,visibility' }
          );
          return undefined;
        }

        if (homeHero) {
          const kicker = homeHero.querySelector<HTMLElement>('[data-hero-kicker]');
          const name = homeHero.querySelector<HTMLElement>('[data-hero-name]');
          const statement = homeHero.querySelector<HTMLElement>('[data-hero-statement]');
          const copy = homeHero.querySelectorAll<HTMLElement>('[data-hero-copy]');
          const actions = homeHero.querySelectorAll<HTMLElement>('[data-hero-actions] > *');
          const portrait = homeHero.querySelector<HTMLElement>('[data-hero-portrait]');
          const proof = homeHero.querySelectorAll<HTMLElement>('[data-hero-proof] > *');

          const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
          if (kicker) heroTimeline.from(kicker, { autoAlpha: 0, y: 10, duration: 0.3 });
          if (name) heroTimeline.from(name, { autoAlpha: 0, y: 18, duration: 0.55 }, 0.06);
          if (statement) heroTimeline.from(statement, { autoAlpha: 0, y: 14, duration: 0.44 }, 0.15);
          if (copy.length) heroTimeline.from(copy, { autoAlpha: 0, y: 12, duration: 0.36, stagger: 0.04 }, 0.24);
          if (actions.length) heroTimeline.from(actions, { autoAlpha: 0, y: 10, duration: 0.3, stagger: 0.04 }, 0.32);
          if (portrait) {
            heroTimeline.from(
              portrait,
              { autoAlpha: 0, x: desktop ? 18 : 0, y: desktop ? 0 : 14, duration: 0.56, clearProps: 'transform,opacity,visibility' },
              0.14
            );
          }
          if (proof.length) {
            heroTimeline.from(proof, { autoAlpha: 0, y: 10, duration: 0.3, stagger: 0.04, clearProps: 'transform,opacity,visibility' }, 0.42);
          }
        } else if (pageHero) {
          const pageTimeline = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
          const eyebrow = pageHero.querySelector<HTMLElement>('.site-eyebrow');
          const heading = pageHero.querySelector<HTMLElement>('h1');
          const lede = pageHero.querySelector<HTMLElement>('.site-page__lede, .contact-hero__copy > p:last-child');
          const actions = pageHero.querySelectorAll<HTMLElement>('.site-actions > *');
          const summary = pageHero.querySelector<HTMLElement>('.site-page__summary, .contact-hero__details');

          if (eyebrow) pageTimeline.from(eyebrow, { autoAlpha: 0, y: 8, duration: 0.28 });
          if (heading) pageTimeline.from(heading, { autoAlpha: 0, y: 18, duration: 0.5 }, 0.06);
          if (lede) pageTimeline.from(lede, { autoAlpha: 0, y: 12, duration: 0.36 }, 0.18);
          if (actions.length) pageTimeline.from(actions, { autoAlpha: 0, y: 8, duration: 0.26, stagger: 0.04 }, 0.26);
          if (summary) {
            pageTimeline.from(summary, { autoAlpha: 0, x: desktop ? 18 : 0, y: desktop ? 0 : 12, duration: 0.4 }, 0.16);
          }
        }

        const revealElements = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR).filter(
          (element) =>
            !element.closest('.care-hero') &&
            !element.closest('.site-page__hero') &&
            !element.closest('.contact-hero') &&
            !element.closest('[data-motion-group]')
        );

        revealElements.forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 14,
            duration: 0.38,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true
            }
          });
        });

        const groupedEntries = gsap.utils.toArray<HTMLElement>('[data-motion-group]');
        groupedEntries.forEach((group) => {
          const children = Array.from(group.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
          if (!children.length) return;

          gsap.from(children, {
            autoAlpha: 0,
            y: 14,
            duration: 0.36,
            stagger: 0.04,
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
    document.documentElement.removeAttribute('data-portfolio-motion-initialized');
  };

  window.addEventListener('pagehide', cleanup, { once: true });
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  return cleanup;
};
