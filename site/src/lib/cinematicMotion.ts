import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCinematicRain } from './cinematicRain.js';

export function initCinematicMotion(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const menu = header?.querySelector<HTMLDetailsElement>('.menupop');
  menu?.addEventListener('click', (event) => { if ((event.target as HTMLElement).closest('a')) menu.open = false; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu) menu.open = false; });
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.hero-track,.profile,.section,.orgs,.site-page__hero,.cv-page__hero,.contact-hero,.blog-index__hero,.blog-article__header,.site-section'));
  const updateHeader = () => {
    const active = sections.findLast(section => section.getBoundingClientRect().top <= 32);
    header?.classList.toggle('dark', !!active?.matches('.dark,.site-section--dark'));
    header?.classList.toggle('yellow', !!active?.matches('.profile,.contact,.site-section--soft'));
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  const more = document.querySelector<HTMLButtonElement>('#more');
  const extra = document.querySelector<HTMLElement>('#extra');
  if (more && extra) {
    more.hidden = false; extra.hidden = true;
    more.addEventListener('click', () => {
      extra.hidden = !extra.hidden;
      more.textContent = extra.hidden ? 'Load more ＋' : 'Show less −';
      more.setAttribute('aria-expanded', String(!extra.hidden));
      ScrollTrigger.refresh();
    });
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const video = document.querySelector<HTMLVideoElement>('.hero-portrait video');
  const poster = document.querySelector<HTMLImageElement>('.hero-portrait img');
  const track = document.querySelector<HTMLElement>('.hero-track');
  if (video && poster && track) {
    let frame = 0;
    let active = false;
    let progress = 0;
    const updateFilm = () => {
      frame = 0;
      if (!active) return;
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      progress = gsap.utils.clamp(0, 1, -track.getBoundingClientRect().top / distance);
      const target = progress * Math.max(0, video.duration - 1 / 24);
      if (Math.abs(video.currentTime - target) > 0.025) video.currentTime = target;
      if (progress <= 0.005) { video.hidden = true; poster.hidden = false; }
      else if (video.readyState >= 2 && !video.seeking) { video.hidden = false; poster.hidden = true; }
    };
    const requestFilm = () => { if (!frame && active) frame = requestAnimationFrame(updateFilm); };
    const fallback = () => { active = false; video.hidden = true; poster.hidden = false; track.classList.remove('has-film'); ScrollTrigger.refresh(); };
    const setup = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      track.classList.add('has-film');
      active = true;
      window.addEventListener('scroll', requestFilm, { passive: true });
      window.addEventListener('resize', requestFilm, { passive: true });
      video.addEventListener('seeked', () => { if (active && progress > 0.005 && video.readyState >= 2) { video.hidden = false; poster.hidden = true; } });
      requestFilm();
      ScrollTrigger.refresh();
    };
    video.addEventListener('error', fallback, { once: true });
    if (video.readyState >= 1) setup(); else video.addEventListener('loadedmetadata', setup, { once: true });
    initCinematicRain();
  }
  gsap.utils.toArray<HTMLElement>('.cinematic-home .card,.cinematic-home .section h2,.cinematic-home .profile .intro,.inner-page [data-motion-reveal]').forEach(el => {
    gsap.from(el, { y: 24, opacity: .65, duration: .65, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('.cinematic-home .card-media img').forEach(el => {
    gsap.fromTo(el, { scale: 1.04, yPercent: -1.5 }, { scale: 1.04, yPercent: 1.5, ease: 'none', scrollTrigger: { trigger: el.closest('.card-media'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}
