import { loadGSAP } from '../engines/gsap';

const prefersFinePointer = () =>
  typeof window !== 'undefined'
  && window.matchMedia('(pointer:fine)').matches
  && !window.matchMedia('(any-pointer:coarse)').matches;

const isReduced = () =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const bindCustomCursor = async (root: ParentNode, reduced: boolean): Promise<void> => {
  if (reduced || isReduced() || !prefersFinePointer()) return;
  if (!(root instanceof Document || root instanceof HTMLElement)) return;
  if (!root.querySelector('[data-home-figma]')) return;

  const body = document.body;
  const cursor = document.createElement('div');
  const ring = document.createElement('div');
  cursor.className = 'custom-cursor custom-cursor--dot';
  ring.className = 'custom-cursor custom-cursor--ring';
  cursor.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  body.append(cursor, ring);
  body.classList.add('has-custom-cursor');

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;
  let visible = false;
  let rafId = 0;

  const classify = (target: EventTarget | null): string => {
    if (!(target instanceof Element)) return 'default';
    const explicit = target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor;
    if (explicit) return explicit;
    if (target.closest('[data-lightbox-trigger], [data-doc-trigger], img')) return 'media';
    if (target.closest('button, [role="button"], .btn-inline-primary, .btn-inline-secondary')) return 'cta';
    if (target.closest('a, [data-scroll-target]')) return 'link';
    if (target.closest('.card-surface, [data-tilt-card], .doc-card')) return 'card';
    return 'default';
  };

  const applyState = (state: string) => {
    ring.dataset.state = state;
    cursor.dataset.state = state;
  };

  const animate = () => {
    rx += (x - rx) * 0.16;
    ry += (y - ry) * 0.16;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    rafId = requestAnimationFrame(animate);
  };

  const onMove = (event: PointerEvent) => {
    x = event.clientX;
    y = event.clientY;
    if (!visible) {
      visible = true;
      cursor.dataset.visible = 'true';
      ring.dataset.visible = 'true';
    }
    applyState(classify(event.target));
  };

  const onDown = () => applyState('drag');
  const onUp = (event: PointerEvent) => applyState(classify(event.target));
  const onLeave = () => {
    visible = false;
    cursor.dataset.visible = 'false';
    ring.dataset.visible = 'false';
    applyState('default');
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  document.addEventListener('mouseleave', onLeave);

  const { gsap } = await loadGSAP();
  gsap.set([cursor, ring], { xPercent: -50, yPercent: -50 });
  animate();

  const cleanup = () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    document.removeEventListener('mouseleave', onLeave);
    cursor.remove();
    ring.remove();
    body.classList.remove('has-custom-cursor');
  };

  window.addEventListener('beforeunload', cleanup, { once: true });
};

