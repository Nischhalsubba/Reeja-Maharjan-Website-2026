export type MotionFeature =
  | 'hero-intro'
  | 'reveals'
  | 'timeline-progress'
  | 'skills-stagger'
  | 'scroll-to'
  | 'parallax'
  | 'motion-lab';

const pageMap: Record<string, MotionFeature[]> = {
  home: ['hero-intro', 'reveals', 'timeline-progress', 'scroll-to', 'parallax'],
  about: ['reveals'],
  experience: ['reveals', 'timeline-progress'],
  credentials: ['reveals'],
  skills: ['reveals', 'skills-stagger', 'motion-lab'],
  contact: ['reveals'],
  'not-found': ['reveals'],
};

export const getFeaturesForPage = (page: string): MotionFeature[] => pageMap[page] ?? ['reveals'];
