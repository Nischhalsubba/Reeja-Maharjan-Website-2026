import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  '[data-ledger-reveal]',
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
        desktop: '(min-width: 900px)'
      },
      ({ conditions }) => {
        const { reduceMotion, desktop } = conditions as { reduceMotion: boolean; desktop: boolean };
        const ledgerHero = document.querySelector<HTMLElement>('.ledger-hero');
        const pageHero = document.querySelector<HTMLElement>('.site-page__hero');

        if (reduceMotion) {
          gsap.set(
            [
              '[data-ledger-stage]',
              '[data-ledger-title] > span',
              '[data-ledger-portrait]',
              '[data-ledger-proof]',
              REVEAL_SELECTOR,
              '.site-page__summary'
            ],
            { autoAlpha: 1, x: 0, y: 0, clipPath: 'none', clearProps: 'transform,opacity,visibility,clip-path' }
          );
          document.querySelector<HTMLElement>('[data-hero-scene]')?.dispatchEvent(new CustomEvent('care-ledger:reveal-thread'));
          return undefined;
        }

        if (ledgerHero) {
          const stages = ledgerHero.querySelectorAll<HTMLElement>('[data-ledger-stage]');
          const titleLines = ledgerHero.querySelectorAll<HTMLElement>('[data-ledger-title] > span');
          const portrait = ledgerHero.querySelector<HTMLElement>('[data-ledger-portrait]');
          const proof = ledgerHero.querySelector<HTMLElement>('[data-ledger-proof]');
          const thread = ledgerHero.querySelector<HTMLElement>('[data-hero-scene]');

          gsap.set(titleLines, { yPercent: 112 });
          if (portrait) gsap.set(portrait, { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', y: 22 });
          if (proof) gsap.set(proof.children, { autoAlpha: 0, y: 12 });

          const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
          heroTimeline
            .from(stages, { autoAlpha: 0, y: 14, duration: 0.34, stagger: 0.045 })
            .to(titleLines, { yPercent: 0, duration: 0.58, stagger: 0.07, ease: 'power4.out' }, 0.12)
            .to(
              portrait,
              {
                autoAlpha: 1,
                clipPath: 'inset(0 0 0% 0)',
                y: 0,
                duration: 0.66,
                ease: 'power3.inOut',
                clearProps: 'clip-path,transform,opacity,visibility'
              },
              0.2
            )
            .to(proof?.children ?? [], { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.04, clearProps: 'transform,opacity,visibility' }, 0.48)
            .call(() => {
              thread?.dispatchEvent(new CustomEvent('care-ledger:reveal-thread'));
            }, [], 0.28);
        } else if (pageHero) {
          const pageTimeline = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
          pageTimeline
            .from(pageHero.querySelector('.site-eyebrow'), { autoAlpha: 0, y: 10, duration: 0.28 })
            .from(pageHero.querySelector('h1'), { autoAlpha: 0, y: 28, duration: 0.58 }, 0.08)
            .from(pageHero.querySelector('.site-page__lede'), { autoAlpha: 0, y: 16, duration: 0.38 }, 0.22)
            .from(pageHero.querySelectorAll('.site-actions > *'), { autoAlpha: 0, y: 10, duration: 0.26, stagger: 0.04 }, 0.32)
            .from(
              pageHero.querySelector('.site-page__summary'),
              { autoAlpha: 0, x: desktop ? 24 : 0, y: desktop ? 0 : 16, duration: 0.46 },
              0.2
            );
        }

        const revealElements = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR).filter(
          (element) => !element.closest('.ledger-hero') && !element.closest('.site-page__hero')
        );

        revealElements.forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 18,
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

        const groupedEntries = gsap.utils.toArray<HTMLElement>('[data-ledger-group]');
        groupedEntries.forEach((group) => {
          const children = Array.from(group.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
          if (!children.length) return;
          gsap.from(children, {
            autoAlpha: 0,
            y: 16,
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
