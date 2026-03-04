export type MotionFeature =
  | 'hero-intro'
  | 'parallax'
  | 'custom-cursor'
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
    'custom-cursor',
    'hero-intro',
    'parallax',
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
  'seo-landing': [
    'custom-cursor',
    'reveals',
    'scroll-to',
    'nav-spy',
    'doc-gallery',
  ],
  blog: [
    'custom-cursor',
    'reveals',
    'doc-gallery',
  ],
  'blog-detail': [
    'custom-cursor',
    'reveals',
    'doc-gallery',
  ],
  'not-found': ['reveals'],
};

export const getFeaturesForPage = (page: string): MotionFeature[] => pageMap[page] ?? ['custom-cursor', 'reveals'];
