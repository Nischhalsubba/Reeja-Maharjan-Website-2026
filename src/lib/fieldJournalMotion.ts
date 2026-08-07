import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PAGE_HERO_SELECTOR = [
  '.site-page__hero .site-eyebrow',
  '.site-page__hero h1',
  '.site-page__hero .site-page__lede',
  '.site-page__hero .site-actions > *',
  '.site-page__hero .site-page__summary',
  '.contact-hero .site-eyebrow',
  '.contact-hero h1',
  '.contact-hero__copy > p:last-child',
  '.contact-hero__details',
  '.blog-article__header .site-back',
  '.blog-article__header .site-eyebrow',
  '.blog-article__header h1',
  '.blog-article__header .blog-article__dek',
  '.blog-article__header .blog-article__meta-panel'
].join(',');

const REVEAL_SELECTOR = [
  '[data-fj-reveal]',
  '[data-motion-reveal]',
  '.site-section__head',
  '.site-page__split',
  '.contact-sidebar__block',
  '.cv-profile-grid',
  '.cv-panel',
  '.blog-index__lead-card',
  '.blog-topic-panel',
  '.blog-toc',
  '.blog-article__body > section'
].join(',');

const GROUP_SELECTOR = [
  '[data-fj-group]',
  '[data-motion-group]',
  '.site-grid',
  '.site-list',
  '.cv-experience',
  '.cv-credentials',
  '.blog-grid',
  '.blog-related-grid'
].join(',');

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
        const homeHeroItems = gsap.utils.toArray<HTMLElement>('[data-fj-hero]');
        const pageHeroItems = gsap.utils.toArray<HTMLElement>(PAGE_HERO_SELECTOR);
        const portrait = document.querySelector<HTMLElement>('[data-fj-portrait]');
        const reveals = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR);
        const groups = gsap.utils.toArray<HTMLElement>(GROUP_SELECTOR);
        const groupedChildren = groups.flatMap((group) =>
          Array.from(group.children).filter((child): child is HTMLElement => child instanceof HTMLElement)
        );

        if (reduceMotion) {
          gsap.set([...homeHeroItems, ...pageHeroItems, portrait, ...reveals, ...groupedChildren], {
            opacity: 1,
            visibility: 'visible',
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

        const activeHeroItems = homeHeroItems.length ? homeHeroItems : pageHeroItems;
        if (activeHeroItems.length) {
          heroTimeline.from(activeHeroItems, {
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
          .filter(
            (element) =>
              !element.closest(GROUP_SELECTOR) &&
              !element.closest('.site-page__hero') &&
              !element.closest('.contact-hero') &&
              !element.closest('.blog-article__header')
          )
          .forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 16,
              duration: 0.42,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
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
            opacity: 0,
            y: 16,
            duration: 0.42,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
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
