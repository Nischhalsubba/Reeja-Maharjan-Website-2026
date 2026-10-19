/** Accessible progressive enhancement for the article's sticky table of contents. */
export function initBlogScrollSpy(): void {
  const toc = document.querySelector<HTMLElement>('[data-blog-toc]');
  if (!toc) return;
  const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]'));
  const sections = links.map(link => ({ link, node: document.getElementById(link.hash.slice(1)) }))
    .filter((item): item is { link: HTMLAnchorElement; node: HTMLElement } => Boolean(item.node));
  if (!sections.length) return;
  let scheduled = false;
  let current = '';
  const update = () => {
    scheduled = false;
    // Use the position in the reading viewport, not the document's hash alone.
    const position = Math.min(Math.max(128, window.innerHeight * .24), 240);
    let active = sections[0].node.id;
    for (const { node } of sections) {
      if (node.getBoundingClientRect().top <= position) active = node.id;
      else break;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24) {
      active = sections.at(-1)?.node.id ?? active;
    }
    if (active === current) return;
    current = active;
    for (const { link, node } of sections) {
      const selected = node.id === active;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  };
  const request = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  window.addEventListener('hashchange', request);
  for (const { link } of sections) link.addEventListener('click', () => {
    current = '';
    requestAnimationFrame(request);
  });
  // Initial position also works for deep links loaded with #section.
  requestAnimationFrame(update);
}
