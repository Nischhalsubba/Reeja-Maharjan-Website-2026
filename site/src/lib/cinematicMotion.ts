import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCinematicRain, initFooterRain } from './cinematicRain.js';

export function initCinematicMotion(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const menu = header?.querySelector<HTMLDetailsElement>('.menupop');
  menu?.addEventListener('click', (event) => { if ((event.target as HTMLElement).closest('a')) menu.open = false; });
  document.addEventListener('click', (event) => { if (menu?.open && !menu.contains(event.target as Node)) menu.open = false; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu?.open) { menu.open = false; menu.querySelector('summary')?.focus(); } });
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.hero-track,.profile,.section,.orgs,.site-page__hero,.cv-page__hero,.contact-hero,.contact-section,.blog-index__hero,.blog-article__header,.site-section'));
  const updateHeader = () => {
    const active = sections.findLast(section => section.getBoundingClientRect().top <= 32) ?? sections[0];
    header?.classList.toggle('hero-active', !!active?.matches('.hero-track'));
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
  // Every action is one accessible control with three independent visual tiles.
  // Keep the real label node (including the contact form's live submit label).
  const decorateAction = (control: HTMLElement) => {
    if (control.querySelector(':scope > .ref-action-label')) return;
    const textNode = Array.from(control.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
    const label = control.querySelector<HTMLElement>(':scope > [data-submit-label]') ?? (!textNode ? control.querySelector<HTMLElement>(':scope > span:not(.form-spinner):not([aria-hidden="true"])') : null);
    if (!label && !textNode) return;
    const original = label ?? document.createElement('span');
    if (!label && textNode) { original.textContent = textNode.textContent?.trim().replace(/\s*[＋+−]$/, '') ?? ''; textNode.replaceWith(original); }
    original.classList.add('ref-action-original');
    const tile = document.createElement('span'); tile.className = 'ref-action-label';
    const window = document.createElement('span'); window.className = 'ref-action-window';
    const duplicate = document.createElement('span'); duplicate.className = 'ref-action-copy'; duplicate.setAttribute('aria-hidden','true');
    duplicate.textContent = original.textContent;
    original.replaceWith(tile); window.append(original, duplicate); tile.append(window);
    control.querySelectorAll(':scope > i, :scope > svg, :scope > span[aria-hidden="true"]:not(.form-spinner)').forEach(icon => icon.remove());
    const createIcon = (position: 'leading' | 'trailing') => {
      const icon = document.createElement('span'); icon.className = `ref-action-icon ref-action-icon--${position}`; icon.setAttribute('aria-hidden','true');
      const plus = document.createElement('span'); plus.className = 'ref-action-plus'; plus.textContent = control.id === 'more' && control.getAttribute('aria-expanded') === 'true' ? '−' : '+';
      icon.append(plus); return icon;
    };
    control.prepend(createIcon('leading')); control.append(createIcon('trailing'));
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
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) ScrollTrigger.refresh();
    });
  }
  document.querySelectorAll<HTMLElement>('[data-reference-tabs]').forEach(group => {
    const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const activate = (index: number, focus = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls') ?? ''); if (panel) { panel.hidden = i !== index; if (i === index && !matchMedia('(prefers-reduced-motion: reduce)').matches) panel.animate([{opacity:.65,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'}); }
      });
      if (focus) tabs[index]?.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => {
        const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
        if (next >= 0) { event.preventDefault(); activate(next, true); }
      });
    });
  });
  document.querySelectorAll<HTMLElement>('[data-reference-gallery]').forEach(gallery => {
    const track = gallery.querySelector<HTMLElement>('.reference-gallery-track');
    if (!track) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const move = (direction: number) => {
      const item = track.querySelector<HTMLElement>('figure, article');
      const step = (item?.getBoundingClientRect().width ?? track.clientWidth) + 16;
      const limit = Math.max(0, track.scrollWidth - track.clientWidth);
      const next = direction > 0 && track.scrollLeft >= limit - 3 ? 0 : direction < 0 && track.scrollLeft <= 3 ? limit : track.scrollLeft + direction * step;
      track.scrollTo({left:next,behavior:reduced.matches?'instant':'smooth'});
    };
    gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-direction]').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.galleryDirection))));
    const pause = gallery.querySelector<HTMLButtonElement>('[data-gallery-pause]');
    let paused = true;
    let visible = false;
    let hovering = false;
    if (pause) {
      const sync = () => {pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-pressed',String(!paused));};
      sync(); pause.addEventListener('click',()=>{paused=!paused;sync();});
      new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);}).observe(gallery);
      gallery.addEventListener('pointerenter',()=>{hovering=true;});gallery.addEventListener('pointerleave',()=>{hovering=false;});
      window.setInterval(()=>{if(!paused&&visible&&!hovering&&!gallery.contains(document.activeElement)&&!reduced.matches&&!document.hidden)move(1);},4000);
    }
  });
  document.querySelectorAll<HTMLElement>('[data-media-slideshow]').forEach(card=>{
    const slides=[...card.querySelectorAll<HTMLElement>('[data-media-slide]')];
    const toggle=card.querySelector<HTMLButtonElement>('[data-media-toggle]');
    const next=card.querySelector<HTMLButtonElement>('[data-media-next]');
    if(slides.length<2||!toggle||!next)return;
    let index=0,playing=false,visible=false;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const advance=()=>{index=(index+1)%slides.length;slides.forEach((slide,i)=>{slide.hidden=i!==index;if(i===index&&!reduced.matches)slide.animate([{opacity:.4},{opacity:1}],{duration:550,easing:'ease-out'});});};
    const sync=()=>{toggle.textContent=playing?'Pause':'Play';toggle.setAttribute('aria-pressed',String(playing));toggle.setAttribute('aria-label',`${playing?'Pause':'Play'} ${card.querySelector('h2')?.textContent?.trim()||'experience'} photographs`);};
    toggle.addEventListener('click',()=>{playing=!playing;sync();});next.addEventListener('click',advance);
    new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);}).observe(card);
    window.setInterval(()=>{if(playing&&visible&&!card.hidden&&!document.hidden&&!reduced.matches)advance();},4200);
  });
  const journal=document.querySelector<HTMLElement>('.cinematic-home .journal');
  if(journal){
    const entries=[...journal.querySelectorAll<HTMLElement>(':scope > a')];
    if(entries.length>1){
      const controls=document.createElement('div');controls.className='journal-carousel-controls';
      const status=document.createElement('span');status.setAttribute('aria-live','polite');
      const prev=document.createElement('button');prev.type='button';prev.textContent='←';prev.setAttribute('aria-label','Previous journal articles');
      const next=document.createElement('button');next.type='button';next.textContent='→';next.setAttribute('aria-label','Next journal articles');
      let index=0;
      const update=()=>{entries.forEach((entry,i)=>{entry.hidden=i<index||i>=index+3;});status.textContent=`${index+1}–${Math.min(index+3,entries.length)} / ${entries.length}`;prev.disabled=index===0;next.disabled=index+3>=entries.length;};
      prev.addEventListener('click',()=>{index=Math.max(0,index-3);update();});next.addEventListener('click',()=>{index=Math.min(entries.length-1,index+3);update();});controls.append(prev,status,next);journal.after(controls);update();
    }
  }
  const clock = document.querySelector<HTMLElement>('[data-nepal-clock]');
  if (clock) {
    const format = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kathmandu',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
    const tick = () => { clock.textContent=format.format(new Date()); };
    tick(); window.setInterval(tick,1000);
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const wave=document.querySelector<HTMLCanvasElement>('.reference-footer-wave');
  const waveCtx=wave?.getContext('2d');
  if(wave&&waveCtx){
    let waveFrame=0,visible=false, lastFrame=0;
    let pointerX=.5,pointerY=.5, pointerPower=0, targetPower=0;
    const scene=wave.closest<HTMLElement>('.reference-footer-contact');
    scene?.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const rect=scene.getBoundingClientRect();pointerX=(event.clientX-rect.left)/rect.width;pointerY=(event.clientY-rect.top)/rect.height;targetPower=1;},{passive:true});
    scene?.addEventListener('pointerleave',()=>{targetPower=0;});
    const paint=(time:number)=>{
      waveFrame=0;if(!visible||document.hidden)return;
      if(time-lastFrame<30){waveFrame=requestAnimationFrame(paint);return;}lastFrame=time;
      const w=wave.clientWidth,h=wave.clientHeight,d=Math.min(devicePixelRatio||1,1.75);
      if(wave.width!==Math.round(w*d)||wave.height!==Math.round(h*d)){wave.width=Math.round(w*d);wave.height=Math.round(h*d);}
      waveCtx.setTransform(d,0,0,d,0,0);waveCtx.clearRect(0,0,w,h);
      pointerPower+=(targetPower-pointerPower)*.055;
      const t=time*.00028;
      // Project a regular 3D grid onto the screen, with broad, intersecting dunes.
      // Each row is a depth plane: rear points are compact and dim, near points spread.
      const cols=w<700?92:148,rows=w<700?45:66;
      for(let row=0;row<rows;row++){
        const z=row/(rows-1), perspective=.46+z*1.44;
        for(let col=0;col<cols;col++){
          const u=(col/(cols-1)-.5)*2.15;
          const x=w*(.5+u*perspective*.77);
          if(x<-2||x>w+2)continue;
          const ridge=Math.sin(u*4.7-z*5.2+t)*.071+Math.sin(u*8.2+z*6.3-t*.68)*.034;
          const dunes=Math.exp(-Math.pow((u+.23)*2.6,2))*(.09+.12*Math.sin(z*8.4+t*.7))+
            Math.exp(-Math.pow((u-.63)*3.1,2))*(.10+.12*Math.cos(z*7.2-t));
          const base=h*(.48+z*.42), displacement=h*(ridge+dunes)*perspective;
          const y0=base-displacement;
          const dx=(x/w-pointerX)*2,dy=y0/h-pointerY;
          const ripple=pointerPower*Math.exp(-(dx*dx+dy*dy)*13)*Math.sin(Math.sqrt(dx*dx+dy*dy)*22-t*6)*h*.025;
          const y=y0-ripple;
          if(y<0||y>h)continue;
          const edge=Math.max(0,1-Math.pow(Math.abs(x/w-.5)*2,2)*.65);
          const fade=Math.min(1,z*8)*(1-Math.pow(z,3)*.88);
          const crest=.65+.35*Math.sin(u*12-z*8+t);
          const alpha=edge*fade*(.22+crest*.30);
          const size=.58+z*.78;
          waveCtx.fillStyle=`rgba(255,224,0,${alpha})`;waveCtx.beginPath();waveCtx.arc(x,y,size*.58,0,Math.PI*2);waveCtx.fill();
        }
      }
      waveFrame=requestAnimationFrame(paint);
    };
    new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);cancelAnimationFrame(waveFrame);if(visible)waveFrame=requestAnimationFrame(paint);},{threshold:0}).observe(wave);
    document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(waveFrame);if(visible&&!document.hidden)waveFrame=requestAnimationFrame(paint);});
  }
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (pointer.matches) {
    const cursor = document.createElement('span'); cursor.className = 'reference-cursor'; cursor.setAttribute('aria-hidden','true'); document.body.append(cursor);
    const hide = () => { cursor.classList.remove('is-visible', 'is-pressed'); document.documentElement.classList.remove('cursor-active'); };
    document.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !pointer.matches) { hide(); return; }
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) { hide(); return; }
      let light = true;
      for (let el: HTMLElement | null = target; el; el = el.parentElement) {
        const color = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)?.map(Number);
        if (!color || color.length < 3 || (color[3] ?? 1) < .5) continue;
        const [r = 0, g = 0, b = 0] = color;
        light = r * .2126 + g * .7152 + b * .0722 > 140; break;
      }
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      cursor.classList.toggle('on-light', light); cursor.classList.toggle('is-action', !!target.closest('a,button,summary,[role="button"]'));
      cursor.classList.add('is-visible'); document.documentElement.classList.add('cursor-active');
    }, { passive: true });
    document.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
    document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
    document.addEventListener('pointercancel', hide); document.documentElement.addEventListener('pointerleave', hide); window.addEventListener('blur', hide); pointer.addEventListener('change', hide);
  }
  gsap.registerPlugin(ScrollTrigger);
  initFooterRain();
  gsap.utils.toArray<HTMLElement>('.reference-story .reference-timeline').forEach(timeline=>{
    timeline.classList.add('is-scroll-timeline');
    gsap.fromTo(timeline,{'--timeline-progress':0},{'--timeline-progress':1,ease:'none',scrollTrigger:{trigger:timeline,start:'top 65%',end:'bottom 55%',scrub:true}});
    timeline.querySelectorAll<HTMLElement>(':scope > li').forEach(entry=>{
      ScrollTrigger.create({trigger:entry,start:'top 65%',onEnter:()=>entry.classList.add('is-active'),onLeaveBack:()=>entry.classList.remove('is-active')});
      gsap.fromTo(Array.from(entry.children),{opacity:0,y:14},{opacity:1,y:0,duration:.65,stagger:.075,ease:'power3.out',clearProps:'opacity,transform',scrollTrigger:{trigger:entry,start:'top 84%',once:true}});
    });
  });
  menu?.addEventListener('toggle', () => {
    if (!menu.open) return;
    gsap.fromTo(menu.querySelector('.reference-mega'), { clipPath: 'inset(0 0 100% 0)', opacity: .6 }, { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: .42, ease: 'power3.out' });
    gsap.fromTo(menu.querySelectorAll('.mega-grid > a'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .38, stagger: .07, delay: .12, clearProps: 'transform,opacity' });
  });
  // Measure the natural text layout first, then reveal each authored line with
  // two full-width covers. No sliding scan line or persistent text hiding.
  gsap.utils.toArray<HTMLElement>('main h1, main h2, .reference-footer-contact h2').forEach(heading => {
    if (heading.closest('.visually-hidden')) return;
    const lines: HTMLElement[] = [];
    let line = document.createElement('span'); line.className = 'reference-reveal-line';
    const finish = () => { if (line.childNodes.length) { lines.push(line); heading.append(line); } line = document.createElement('span'); line.className = 'reference-reveal-line'; };
    const nodes = Array.from(heading.childNodes);
    nodes.forEach(node => {
      if (node instanceof HTMLElement && node.classList.contains('visually-hidden')) { heading.append(node); return; }
      if (node instanceof HTMLBRElement) { node.remove(); finish(); heading.append(document.createElement('br')); }
      else line.append(node);
    });
    finish();
    lines.forEach((item,index) => {
      const base = document.createElement('span'); base.className = 'reference-reveal-ink'; base.append(...Array.from(item.childNodes)); item.append(base);
      const cover = (name: string) => { const el = document.createElement('span'); el.className = `reference-reveal-cover ${name}`; el.setAttribute('aria-hidden','true'); item.append(el); return el; };
      const gold = cover('reference-reveal-gold'), paper = cover('reference-reveal-paper');
      // Paint the decorative duplicate with CSS so the heading remains a single
      // text node sequence for selection, search and assistive technology.
      const highlight=document.createElement('span');highlight.className='reference-reveal-highlight';highlight.setAttribute('aria-hidden','true');highlight.dataset.revealText=base.textContent ?? '';item.append(highlight);
      const layer = (name:string) => { const el=document.createElement('span');el.className=`reference-reveal-highlight ${name}`;el.setAttribute('aria-hidden','true');el.dataset.revealText=base.textContent??'';item.append(el);return el; };
      const paperInk=layer('reference-reveal-paper-ink'), shine=layer('reference-reveal-shine');
      const timeline=gsap.timeline({paused:true});
      const initialVisible=!!heading.closest('.hero-track');
      gsap.set(base,{opacity:initialVisible?1:0});
      gsap.set([highlight,paperInk,shine],{opacity:0});
      timeline.set([gold,paper],{scaleX:0,transformOrigin:'left center'},0);
      timeline.to(gold,{scaleX:1,duration:.34,ease:'power3.inOut'},0).to(paper,{scaleX:1,duration:.32,ease:'power3.inOut'},.09);
      timeline.set(base,{opacity:1},.41).set([gold,paper],{transformOrigin:'right center'},.41);
      timeline.to(gold,{scaleX:0,duration:.44,ease:'power3.inOut'},.41).to(paper,{scaleX:0,duration:.42,ease:'power3.inOut'},.48);
      timeline.set([highlight,paperInk],{opacity:1},.43);
      timeline.fromTo(highlight,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.32,ease:'power3.inOut'},.43).to(highlight,{clipPath:'inset(0 0 0 100%)',duration:.40,ease:'power3.inOut'},.75);
      timeline.fromTo(paperInk,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)',duration:.4,ease:'power3.inOut'},.57).to(paperInk,{opacity:0,duration:.25},.95);
      timeline.set(shine,{opacity:1,clipPath:'none',backgroundPosition:'-100% 0'},.63).to(shine,{backgroundPosition:'150% 0',duration:.7,ease:'power2.out'},.63).set([shine,highlight],{opacity:0},1.33);
      ScrollTrigger.create({trigger:heading,start:'top 90%',once:true,onEnter:()=>timeline.delay(index*.10).play()});
    });
  });
  // Supporting copy arrives behind the headline, with a smaller vertical travel
  // than the editorial cards. Keep the pinned homepage copy outside this group.
  gsap.utils.toArray<HTMLElement>('.inner-page .site-page__hero, .inner-page .site-section__head, .contact-hero, .blog-article__header, .reference-footer-contact').forEach(section => {
    const copy = Array.from(section.querySelectorAll<HTMLElement>('.site-eyebrow,.site-page__lede,.site-actions,.reference-footer-actions,.site-section__head > p'));
    if (!copy.length) return;
    gsap.fromTo(copy,{opacity:0,y:12},{opacity:1,y:0,duration:.58,delay:.28,stagger:.07,ease:'power2.out',clearProps:'opacity,transform',scrollTrigger:{trigger:section,start:'top 91%',once:true}});
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
    let localVideoUrl: string | undefined;
    let recovering = false;
    const isSeekable = () => video.seekable.length > 0 && video.seekable.end(video.seekable.length - 1) > .1;
    // Some static CDN responses buffer the whole MP4 but expose a zero-length
    // seekable range. Load the exact same film into an in-memory media URL once.
    const recoverSeekability = async () => {
      if (recovering || localVideoUrl) return;
      recovering = true;
      try {
        const response = await fetch(video.currentSrc || video.src);
        if (!response.ok) throw new Error('Film download failed');
        localVideoUrl = URL.createObjectURL(await response.blob());
        video.src = localVideoUrl;
        video.load();
      } catch { fallback(); }
      finally { recovering = false; }
    };
    const updateFilm = () => {
      frame = 0;
      if (!active) return;
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      progress = gsap.utils.clamp(0, 1, -track.getBoundingClientRect().top / distance);
      header?.classList.toggle('hero-closeup', progress > .88);
      // The copy belongs to the scrolling document, not to the pinned film.
      // Both the copy and the closing yellow wash follow the same reversible progress.
      const copyFade=1-gsap.utils.clamp(0,1,(progress-.24)/.42);
      const wash=gsap.utils.clamp(0,1,(progress-.77)/.23);
      track.style.setProperty('--hero-copy-opacity',String(copyFade));
      track.style.setProperty('--hero-copy-y',`${-progress*distance}px`);
      track.style.setProperty('--hero-wash',String(wash*wash*(3-2*wash)));
      track.style.setProperty('--hero-copy-shade',String(Math.min(.22,progress*.4)));
      track.classList.toggle('hero-copy-out',copyFade<.04);
      const filmProgress = progress <= .65 ? progress / .65 * .44 : .44 + (progress - .65) / .35 * .56;
      const target = filmProgress * Math.max(0, video.duration - 1 / 24);
      if (progress <= 0.005) { video.classList.remove('film-visible'); poster.classList.remove('film-hidden'); }
      if (!isSeekable()) { if (progress > .005 && video.readyState >= 2) void recoverSeekability(); return; }
      if (!video.seeking && Math.abs(video.currentTime - target) > 0.025) video.currentTime = target;
    };
    const requestFilm = () => { if (!frame && active) frame = requestAnimationFrame(updateFilm); };
    const fallback = () => { active = false; video.hidden = true; poster.classList.remove('film-hidden'); track.classList.remove('has-film','hero-copy-out'); ['--hero-copy-opacity','--hero-copy-y','--hero-wash','--hero-copy-shade'].forEach(name=>track.style.removeProperty(name)); header?.classList.remove('hero-closeup'); ScrollTrigger.refresh(); };
    const setup = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      video.hidden = false;
      track.classList.add('has-film');
      active = true;
      window.addEventListener('scroll', requestFilm, { passive: true });
      window.addEventListener('resize', requestFilm, { passive: true });
      video.addEventListener('seeked', () => {
        if (active && progress > 0.005 && video.readyState >= 2 && video.currentTime > .01) { video.classList.add('film-visible'); poster.classList.add('film-hidden'); }
        requestFilm();
      });
      requestFilm();
      ScrollTrigger.refresh();
    };
    video.addEventListener('error', fallback, { once: true });
    video.addEventListener('loadeddata', requestFilm);
    window.addEventListener('pagehide', event => { if (!event.persisted && localVideoUrl) URL.revokeObjectURL(localVideoUrl); });
    if (video.readyState >= 1) setup(); else video.addEventListener('loadedmetadata', setup, { once: true });
    initCinematicRain();
  }
  gsap.utils.toArray<HTMLElement>('.cinematic-home .card,.cinematic-home .profile .intro,.inner-page [data-motion-reveal]').forEach(el => {
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
