import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCinematicRain } from './cinematicRain.js';

export function initCinematicMotion(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const menu = header?.querySelector<HTMLDetailsElement>('.menupop');
  menu?.addEventListener('click', (event) => { if ((event.target as HTMLElement).closest('a')) menu.open = false; });
  document.addEventListener('click', (event) => { if (menu?.open && !menu.contains(event.target as Node)) menu.open = false; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu) menu.open = false; });
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.hero-track,.profile,.section,.orgs,.site-page__hero,.cv-page__hero,.contact-hero,.contact-section,.blog-index__hero,.blog-article__header,.site-section'));
  const updateHeader = () => {
    const active = sections.findLast(section => section.getBoundingClientRect().top <= 32) ?? sections[0];
    header?.classList.toggle('dark', !!active?.matches('.dark,.site-section--dark,.site-page__hero,.contact-hero,.blog-article__header'));
    header?.classList.toggle('yellow', !!active?.matches('.profile,.contact,.site-section--soft,.reference-story'));
    if (document.body.dataset.pageRoute === '/contact/') { header?.classList.add('dark'); header?.classList.remove('yellow'); }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  // Chapter navigation for long professional pages, with a live current section.
  const inner = document.querySelector<HTMLElement>('.inner-page .site-page');
  const chapters = Array.from(inner?.querySelectorAll<HTMLElement>(':scope > section:not(.site-page__hero):not(.contact-hero)') ?? []).filter(section => section.querySelector('h2'));
  if (inner && chapters.length >= 3 && !inner.querySelector('.reference-chapters')) {
    const nav = document.createElement('nav'); nav.className = 'reference-chapters'; nav.setAttribute('aria-label','Page chapters');
    chapters.forEach((section,index) => { if (!section.id) section.id = `chapter-${index+1}`; const link = document.createElement('a'); link.href = `#${section.id}`; link.textContent = section.querySelector('.site-eyebrow')?.textContent?.trim() || section.querySelector('h2')?.textContent?.trim() || `Chapter ${index+1}`; nav.append(link); });
    inner.querySelector('.site-page__hero')?.after(nav);
    const updateChapters = () => { const current = chapters.findLast(section=>section.getBoundingClientRect().top <= 150); nav.querySelectorAll('a').forEach(link => { if (link.hash === `#${current?.id}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); };
    window.addEventListener('scroll',updateChapters,{passive:true}); updateChapters();
  }
  // Every action is one accessible control with two independent visual tiles.
  // Keep the real label node (including the contact form's live submit label).
  const decorateAction = (control: HTMLElement) => {
    if (control.querySelector(':scope > .ref-action-label')) return;
    const label = control.querySelector<HTMLElement>(':scope > [data-submit-label], :scope > span:not(.form-spinner)');
    const textNode = Array.from(control.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
    if (!label && !textNode) return;
    const original = label ?? document.createElement('span');
    if (!label && textNode) { original.textContent = textNode.textContent?.trim().replace(/\s*[＋+−]$/, '') ?? ''; textNode.replaceWith(original); }
    original.classList.add('ref-action-original');
    const tile = document.createElement('span'); tile.className = 'ref-action-label';
    const window = document.createElement('span'); window.className = 'ref-action-window';
    const duplicate = document.createElement('span'); duplicate.className = 'ref-action-copy'; duplicate.setAttribute('aria-hidden','true');
    duplicate.textContent = original.textContent;
    original.replaceWith(tile); window.append(original, duplicate); tile.append(window);
    const legacyIcon = control.querySelector(':scope > i, :scope > svg');
    legacyIcon?.remove();
    const icon = document.createElement('span'); icon.className = 'ref-action-icon'; icon.setAttribute('aria-hidden','true');
    const plus = document.createElement('span'); plus.className = 'ref-action-plus'; plus.textContent = '+';
    icon.append(plus); control.append(icon);
    control.classList.add('ref-action');
    if (original.hasAttribute('data-submit-label')) {
      const observer = new MutationObserver(() => { duplicate.textContent = original.textContent; });
      observer.observe(original, { childList: true, characterData: true, subtree: true });
    }
  };
  document.querySelectorAll<HTMLElement>('a.btn,button.btn,a.site-button,button.site-button,a.care-footer__cta,a.care-button,button[data-submit-button],a.care-link,a.blog-index__read-link,#more').forEach(decorateAction);
  const more = document.querySelector<HTMLButtonElement>('#more');
  const extra = document.querySelector<HTMLElement>('#extra');
  if (more && extra) {
    more.hidden = false; extra.hidden = true;
    more.addEventListener('click', () => {
      extra.hidden = !extra.hidden;
      more.textContent = extra.hidden ? 'Load more ＋' : 'Show less −';
      more.setAttribute('aria-expanded', String(!extra.hidden));
      decorateAction(more);
      ScrollTrigger.refresh();
    });
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  menu?.addEventListener('toggle', () => {
    if (!menu.open) return;
    gsap.fromTo(menu.querySelector('.reference-mega'), { clipPath: 'inset(0 0 100% 0)', opacity: .6 }, { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: .42, ease: 'power3.out' });
    gsap.fromTo(menu.querySelectorAll('.mega-grid > a'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .38, stagger: .07, delay: .12, clearProps: 'transform,opacity' });
  });
  // Scan-line reveal for editorial headlines; text remains readable without JS.
  gsap.utils.toArray<HTMLElement>('main h1, .site-section__head h2, .cinematic-home .sticky h2, .reference-story-heading h2').forEach(heading => {
    heading.classList.add('reference-scan');
    const scan = document.createElement('span'); scan.className = 'reference-scan-bar'; scan.setAttribute('aria-hidden','true'); heading.append(scan);
    const timeline = gsap.timeline({ scrollTrigger: { trigger: heading, start: 'top 89%', once: true }});
    timeline.fromTo(heading, { y: 8 }, { y: 0, duration: .68, ease: 'power3.out', clearProps: 'transform' }, 0);
    timeline.fromTo(scan, { left: '0%', opacity: 1 }, { left: '100%', opacity: 0, duration: .68, ease: 'power3.inOut' }, 0);
  });
  // Reveal the introduction word-by-word against the yellow chapter.
  const intro = document.querySelector<HTMLElement>('.cinematic-home .intro');
  if (intro) {
    const walker = document.createTreeWalker(intro, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = []; while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach(node => { const fragment = document.createDocumentFragment(); node.textContent?.split(/(\s+)/).forEach(part => { if (!part.trim()) fragment.append(part); else { const word = document.createElement('span'); word.className = 'reference-word'; word.textContent = part; fragment.append(word); }}); node.replaceWith(fragment); });
    gsap.fromTo(intro.querySelectorAll('.reference-word'), { opacity: .22 }, { opacity: 1, stagger: .035, ease: 'none', scrollTrigger: { trigger: intro, start: 'top 84%', end: 'bottom 47%', scrub: .35 }});
  }
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
      track.style.setProperty('--hero-copy-shade', String(Math.min(.94, Math.sin(progress * Math.PI) * 1.2)));
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
  // Accordion panels expand from their actual content height; native semantics remain intact.
  document.querySelectorAll<HTMLDetailsElement>('main details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      const content = Array.from(detail.children).filter(child=>child.tagName !== 'SUMMARY');
      gsap.fromTo(content, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out', clearProps: 'opacity,transform', onComplete:()=>ScrollTrigger.refresh() });
    });
  });
  document.querySelectorAll<HTMLElement>('.cinematic-home .card').forEach(card => {
    const media = card.querySelector<HTMLElement>('.card-media'); const link = card.querySelector<HTMLAnchorElement>('.card-bottom a');
    if (!media || !link || media.querySelector('a')) return;
    const anchor = document.createElement('a'); anchor.href = link.href; anchor.className = 'reference-card-hit'; anchor.setAttribute('aria-label', card.querySelector('h3')?.textContent || 'View experience'); media.append(anchor);
  });

  // Site-wide motion: inner-page reveals, staggered groups and restrained parallax.
  const revealTargets = gsap.utils.toArray<HTMLElement>(
    '.inner-page .blog-card, .inner-page .blog-index__lead-card, .inner-page .blog-topic-panel, .inner-page .cv-experience__item, .inner-page .cv-credential, .reference-timeline > li, .inner-page .site-card'
  );
  revealTargets.forEach((element) => {
    if (element.closest('.hero-track')) return;
    gsap.fromTo(element,
      { opacity: 1, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out',
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: { trigger: element, start: 'top 91%', once: true }
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('.inner-page [data-motion-stagger]').forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[];
    if (!children.length) return;
    gsap.from(children, {
      autoAlpha: 0, y: 18, duration: 0.55, stagger: 0.09, ease: 'power2.out',
      clearProps: 'opacity,visibility,transform',
      scrollTrigger: { trigger: group, start: 'top 88%', once: true }
    });
  });

  gsap.utils.toArray<HTMLElement>('.inner-page [data-parallax]').forEach((element) => {
    const amount = Number(element.dataset.parallax) || 12;
    gsap.to(element, {
      yPercent: amount, ease: 'none',
      scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });

  // Keyboard, touch and pointer users receive the same press feedback.
  document.querySelectorAll<HTMLElement>('a.btn, button, .site-button, .care-footer__cta').forEach((control) => {
    control.addEventListener('pointerdown', () => control.classList.add('is-pressed'));
    const release = () => control.classList.remove('is-pressed');
    control.addEventListener('pointerup', release);
    control.addEventListener('pointercancel', release);
    control.addEventListener('pointerleave', release);
    control.addEventListener('blur', release);
  });
  ScrollTrigger.refresh();
}
