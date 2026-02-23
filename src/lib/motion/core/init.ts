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
    case 'medical-particles': {
      const { bindMedicalParticles } = await import('../features/medical-particles');
      await bindMedicalParticles(main, reduced);
      return;
    }
    case 'ecg-pulse': {
      const { bindEcgPulse } = await import('../features/ecg-pulse');
      await bindEcgPulse(main, reduced);
      return;
    }
    case 'heartbeat-accent': {
      const { bindHeartbeatAccent } = await import('../features/heartbeat-accent');
      await bindHeartbeatAccent(main, reduced);
      return;
    }
    case 'reveals': {
      const { bindScrollReveals } = await import('../features/reveals');
      await bindScrollReveals(main, reduced);
      return;
    }
    case 'floating-pills': {
      const { bindFloatingPills } = await import('../features/floating-pills');
      await bindFloatingPills(main, reduced);
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
    case 'tilt-cards': {
      const { bindTiltCards } = await import('../features/tilt-cards');
      await bindTiltCards(main, reduced);
      return;
    }
    case 'counters': {
      const { bindCounters } = await import('../features/counters');
      await bindCounters(main, reduced);
      return;
    }
    case 'doc-gallery': {
      const { bindDocGallery } = await import('../features/doc-gallery');
      await bindDocGallery(main, reduced);
      return;
    }
    case 'nav-spy': {
      const { bindNavSpy } = await import('../features/nav-spy');
      await bindNavSpy(main, reduced);
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
