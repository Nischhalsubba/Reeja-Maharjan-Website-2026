import { loadGSAP } from '../engines/gsap';

export const bindSkillsStagger = async (root: ParentNode, reduced: boolean): Promise<void> => {
  const skillsGrid = root.querySelector('[data-skills-grid]');
  if (!(skillsGrid instanceof HTMLElement)) return;

  const cards = Array.from(skillsGrid.querySelectorAll<HTMLElement>('.card-surface'));
  const chips = Array.from(skillsGrid.querySelectorAll<HTMLElement>('[data-skill-chip]'));

  if (!cards.length && !chips.length) return;

  if (reduced) {
    [...cards, ...chips].forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const { gsap } = await loadGSAP();

  gsap.set(cards, { opacity: 0, y: 14, willChange: 'transform, opacity' });
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: skillsGrid,
      start: 'top 75%',
      once: true,
    },
    onComplete: () => {
      cards.forEach((card) => {
        card.style.willChange = 'auto';
      });
    },
  });

  chips.forEach((chip) => {
    chip.addEventListener('mouseenter', () => {
      gsap.to(chip, { y: -2, scale: 1.02, duration: 0.18, ease: 'power2.out' });
    });
    chip.addEventListener('mouseleave', () => {
      gsap.to(chip, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
};
