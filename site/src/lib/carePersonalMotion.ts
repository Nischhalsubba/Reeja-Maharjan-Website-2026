import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A single lightweight motion layer shared by homepage and supporting pages.
 * Content stays visible without JavaScript and for reduced-motion preferences.
 * Existing Field Journal animation owns inner-page headings/cards; this module
 * owns the new photographs, microinteractions and homepage-specific sections.
 */
export function initCarePersonalMotion(): () => void {
  if (document.documentElement.dataset.carePersonalMotion === 'true') return () => {};
  document.documentElement.dataset.carePersonalMotion = 'true';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduceMotion) {
    return () => { delete document.documentElement.dataset.carePersonalMotion; };
  }

  const listeners: Array<() => void> = [];
  const ctx = gsap.context(() => {
    const hero = document.querySelector<HTMLElement>('.cip-hero, .rm-hero');
    if (hero) {
      const elements = Array.from(hero.querySelectorAll<HTMLElement>(
        '.cip-hero__copy .cip-eyebrow, .cip-hero h1, .cip-hero__lead, .cip-actions, .cip-hero__index, .cip-hero__portrait, .slate-hero__content .slate-eyebrow, .slate-hero h1, .slate-hero__lede, .slate-hero .slate-actions, .slate-hero__bottom, .rm-hero .rm-eyebrow, .rm-hero__actions'
      ));
      gsap.from(elements, {
        y: 24,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.095,
        clearProps: 'all',
      });
    }

    const reveals = gsap.utils.toArray<HTMLElement>(
      '.cip-home .cip-about__grid > *, .cip-home .cip-sectionhead, .cip-home .cip-pathway, ' +
      '.cip-home .cip-research__copy, .cip-home .cip-journey__item, .cip-home .cip-article, ' +
      '.cip-home .cip-contact__grid > *, .cip-photo-band__caption, ' +
      '.care-footer__intro, .care-footer__invite-actions, ' +
      '.slate-heading, .slate-focus__card, .slate-about__copy, .slate-experience__item, .slate-research__steps li, .slate-writing__card, .slate-contact__grid, ' +
      '.rm-experience__body, .rm-research__content, .rm-focus__grid > *, .rm-writing__article, .rm-contact__inner'
    );
    reveals.forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 24,
        duration: .7,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: element,
          start: 'top 92%',
          once: true,
        }
      });
    });

    // Small photo-motion accents. Never pin sections or hide meaningful text.
    document.querySelectorAll<HTMLElement>('.cip-photo-band').forEach((container) => {
      const image = container.querySelector<HTMLImageElement>('img');
      if (!image) return;
      gsap.fromTo(image,
        { yPercent: -4, scale: 1.07 },
        {
          yPercent: 4,
          scale: 1.07,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: .6,
          }
        }
      );
    });
    // Gentle photo parallax; disabled for reduced motion and coarse pointers.
    const slatePhoto = document.querySelector<HTMLImageElement>('.slate-hero__photograph');
    if (slatePhoto && pointerFine && window.matchMedia('(min-width: 790px)').matches) {
      gsap.to(slatePhoto,{
        yPercent:4,ease:'none',
        scrollTrigger:{trigger:'.slate-hero',start:'top top',end:'bottom top',scrub:0.65}
      });
    }

    if (!pointerFine) return;

    const interactive = Array.from(document.querySelectorAll<HTMLElement>(
      '.cip-button, .site-button, .care-button, .nav-cta, .cip-textlink, .cip-link, ' +
      '.blog-card a, .contact-sidebar__social, .care-footer__cta, ' +
      '.slate-button, .slate-link, .slate-writing__read, ' +
      '.rm-button, .rm-inline-link, .rm-focus__link, .rm-writing__card-body a, ' +
      '.desktop-nav a, .mobile-nav__panel a, .professional-contact-form button'
    ));

    interactive.forEach((element) => {
      const onEnter = () => gsap.to(element, { y: -3, duration: .22, ease: 'power2.out', overwrite: true });
      const onLeave = () => gsap.to(element, { y: 0, scale: 1, duration: .24, ease: 'power2.out', overwrite: true });
      const onDown = () => gsap.to(element, { scale: .977, duration: .1, overwrite: true });
      const onUp = () => gsap.to(element, { scale: 1, duration: .18, overwrite: true });
      element.addEventListener('pointerenter', onEnter);
      element.addEventListener('pointerleave', onLeave);
      element.addEventListener('pointerdown', onDown);
      element.addEventListener('pointerup', onUp);
      element.addEventListener('pointercancel', onUp);
      listeners.push(() => {
        element.removeEventListener('pointerenter', onEnter);
        element.removeEventListener('pointerleave', onLeave);
        element.removeEventListener('pointerdown', onDown);
        element.removeEventListener('pointerup', onUp);
        element.removeEventListener('pointercancel', onUp);
      });
    });

    // Focus feedback for enquiry fields, while preserving the CSS focus outline.
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      '.professional-contact-form input:not([type="hidden"]):not(.form-honeypot), ' +
      '.professional-contact-form textarea, .professional-contact-form select'
    ).forEach((field) => {
      const onFocus = () => gsap.to(field, { borderColor:'#39403F', duration:.2, ease:'power2.out', overwrite:true });
      const onBlur = () => gsap.to(field, { clearProps:'borderColor', duration:.16, overwrite:true });
      field.addEventListener('focus',onFocus);
      field.addEventListener('blur',onBlur);
      listeners.push(() => {
        field.removeEventListener('focus',onFocus);
        field.removeEventListener('blur',onBlur);
      });
    });
  }, document.body);

  const cleanup = () => {
    listeners.forEach((dispose) => dispose());
    ctx.revert();
    delete document.documentElement.dataset.carePersonalMotion;
  };
  window.addEventListener('pagehide', cleanup, { once: true });
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  return cleanup;
}
