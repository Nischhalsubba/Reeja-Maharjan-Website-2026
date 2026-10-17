import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Inner-page GSAP ownership. Homepage/photo interactions live in carePersonalMotion.
 * No selectors from the retired Field Journal theme are required.
 */
const heroSelectors = [
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

const sectionSelectors = [
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

const groupSelectors = [
  '.site-grid', '.site-list', '.cv-experience',
  '.cv-credentials', '.blog-grid', '.blog-related-grid'
].join(',');

export function initCareInnerMotion(): () => void {
  if (document.documentElement.dataset.careInnerMotion === 'true') return () => {};
  document.documentElement.dataset.careInnerMotion = 'true';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => { delete document.documentElement.dataset.careInnerMotion; };

  const context = gsap.context(() => {
    const hero = gsap.utils.toArray<HTMLElement>(heroSelectors);
    if (hero.length) gsap.from(hero, {
      opacity: 0, y: 16, duration: .52, stagger: .045, ease: 'power2.out',
      clearProps: 'transform,opacity,visibility'
    });

    gsap.utils.toArray<HTMLElement>(sectionSelectors)
      .filter((element) => !element.closest(groupSelectors)
        && !element.closest('.site-page__hero')
        && !element.closest('.contact-hero')
        && !element.closest('.blog-article__header'))
      .forEach((element) => gsap.from(element, {
        opacity: 0, y: 18, duration: .5, ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      }));

    gsap.utils.toArray<HTMLElement>(groupSelectors).forEach((group) => {
      const items = Array.from(group.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement
      );
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0, y: 14, duration: .45, stagger: .045, ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: group, start: 'top 87%', once: true }
      });
    });
  }, document.body);
  requestAnimationFrame(() => ScrollTrigger.refresh());

  const cleanup = () => {
    context.revert();
    delete document.documentElement.dataset.careInnerMotion;
  };
  window.addEventListener('pagehide', cleanup, { once: true });
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  return cleanup;
}
