import { loadGSAP } from '../engines/gsap';

export const bindTimelineProgress = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const timelineRoots = Array.from(root.querySelectorAll<HTMLElement>('[data-timeline-root]'));
  if (!timelineRoots.length) return;

  if (reduced) {
    timelineRoots.forEach((timelineRoot) => {
      const progress = timelineRoot.querySelector<HTMLElement>('[data-timeline-progress]');
      if (progress) progress.style.height = '100%';
    });
    return;
  }

  const { gsap } = await loadGSAP();

  timelineRoots.forEach((timelineRoot) => {
    const progress = timelineRoot.querySelector<HTMLElement>('[data-timeline-progress]');
    if (!progress) return;

    gsap.fromTo(
      progress,
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRoot,
          start: 'top 72%',
          end: 'bottom 22%',
          scrub: true,
        },
      }
    );
  });
};
