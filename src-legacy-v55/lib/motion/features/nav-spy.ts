export const bindNavSpy = async (root: ParentNode, _reduced: boolean): Promise<void> => {
  const sections = Array.from(root.querySelectorAll<HTMLElement>('section[id]'));
  const linkMap = new Map<string, HTMLElement>();

  document.querySelectorAll<HTMLElement>('[data-nav-spy-link]').forEach((link) => {
    const id = link.dataset.navSpyLink;
    if (id) linkMap.set(id, link);
  });
  if (!sections.length || !linkMap.size) return;

  const setActive = (id: string) => {
    linkMap.forEach((link, key) => {
      const active = key === id;
      link.dataset.navActive = active ? 'true' : 'false';
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = (visible.target as HTMLElement).id;
      if (id) setActive(id);
    },
    { rootMargin: '-25% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0]?.id ?? 'hero');
};
