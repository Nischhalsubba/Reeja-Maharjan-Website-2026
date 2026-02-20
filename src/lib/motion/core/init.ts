import { applyMotionClassState, getMotionPreference, setMotionPreference } from './env';
import { getFeaturesForPage, type MotionFeature } from './registry';

const bindMotionPreferenceToggle = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-motion-pref-toggle]');
  if (!buttons.length) return;

  const syncLabels = () => {
    const pref = getMotionPreference();
    const isReduced = pref === 'off';
    buttons.forEach((button) => {
      button.textContent = isReduced ? 'Enable motion' : 'Reduce motion';
      button.setAttribute('aria-pressed', isReduced ? 'true' : 'false');
    });
  };

  syncLabels();
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const pref = getMotionPreference();
      setMotionPreference(pref === 'off' ? 'on' : 'off');
      applyMotionClassState();
      syncLabels();
      window.location.reload();
    });
  });
};

const runFeature = async (feature: MotionFeature, main: HTMLElement, reduced: boolean): Promise<void> => {
  switch (feature) {
    case 'hero-intro': {
      const { runHeroIntro } = await import('../features/hero-intro');
      await runHeroIntro(main, reduced);
      return;
    }
    case 'reveals': {
      const { bindScrollReveals } = await import('../features/reveals');
      await bindScrollReveals(main, reduced);
      return;
    }
    case 'timeline-progress': {
      const { bindTimelineProgress } = await import('../features/timeline-progress');
      await bindTimelineProgress(main, reduced);
      return;
    }
    case 'skills-stagger': {
      const { bindSkillsStagger } = await import('../features/skills-stagger');
      await bindSkillsStagger(main, reduced);
      return;
    }
    case 'scroll-to': {
      const { bindScrollToTargets } = await import('../features/scroll-to');
      await bindScrollToTargets(main, reduced);
      return;
    }
    case 'parallax': {
      const { bindParallaxAccents } = await import('../features/parallax');
      await bindParallaxAccents(main, reduced);
      return;
    }
    case 'motion-lab': {
      if (!import.meta.env.DEV) return;
      const { runMotionLab } = await import('../features/motion-lab');
      await runMotionLab(main, reduced);
      return;
    }
  }
};

export const initMotion = async (root: ParentNode = document): Promise<void> => {
  if (typeof window === 'undefined') return;

  bindMotionPreferenceToggle();
  const main = root.querySelector('main[data-page]');
  if (!(main instanceof HTMLElement) || main.dataset.motionInit === 'true') return;
  main.dataset.motionInit = 'true';

  const reduced = applyMotionClassState();
  const page = main.dataset.page ?? 'home';

  if (!reduced) {
    const { setupLenis } = await import('../engines/lenis');
    await setupLenis();
  }

  const { applyAutoAnimate } = await import('../engines/autoanimate');
  applyAutoAnimate(main.querySelectorAll('[data-auto-animate]'));

  const features = getFeaturesForPage(page);
  for (const feature of features) {
    await runFeature(feature, main, reduced);
  }
};
