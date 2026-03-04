const parseCounterTarget = (value: string) => {
  const numeric = Number(value.replace(/[^\d]/g, ''));
  const suffix = value.replace(/[\d,\s]/g, '');
  return { numeric: Number.isFinite(numeric) ? numeric : NaN, suffix };
};

export const bindCounters = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-counter]'));
  if (!nodes.length) return;

  if (reduced) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (!(el instanceof HTMLElement)) return;
        observer.unobserve(el);

        const raw = el.dataset.counter ?? el.textContent ?? '';
        const { numeric, suffix } = parseCounterTarget(raw);
        if (!Number.isFinite(numeric)) return;

        const start = performance.now();
        const duration = 900;
        const from = 0;
        const to = numeric;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = Math.round(from + (to - from) * eased);
          el.textContent = `${current.toLocaleString()}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = raw;
        };

        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.35 }
  );

  nodes.forEach((node) => observer.observe(node));
};
