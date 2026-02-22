export type MotionFeature =
  | 'hero-intro'
  | 'reveals'
  | 'timeline-progress'
  | 'skills-stagger'
  | 'scroll-to';

const pageMap: Record<string, MotionFeature[]> = {
  home: ['hero-intro', 'reveals', 'timeline-progress', 'skills-stagger', 'scroll-to'],
  'not-found': ['reveals'],
};

export const getFeaturesForPage = (page: string): MotionFeature[] => pageMap[page] ?? ['reveals'];
