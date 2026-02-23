export type MotionFeature =
  | 'hero-intro'
  | 'medical-particles'
  | 'ecg-pulse'
  | 'heartbeat-accent'
  | 'floating-pills'
  | 'reveals'
  | 'timeline-progress'
  | 'skills-stagger'
  | 'scroll-to'
  | 'tilt-cards'
  | 'counters'
  | 'doc-gallery'
  | 'nav-spy';

const pageMap: Record<string, MotionFeature[]> = {
  home: [
    'hero-intro',
    'medical-particles',
    'ecg-pulse',
    'heartbeat-accent',
    'floating-pills',
    'reveals',
    'scroll-to',
    'nav-spy',
    'timeline-progress',
    'skills-stagger',
    'tilt-cards',
    'counters',
    'doc-gallery',
  ],
  'not-found': ['reveals'],
};

export const getFeaturesForPage = (page: string): MotionFeature[] => pageMap[page] ?? ['reveals'];
