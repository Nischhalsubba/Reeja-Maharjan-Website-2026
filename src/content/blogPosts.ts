export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'maternal-newborn-care-practice-notes',
    title: 'Maternal and Newborn Care: Practical Notes from Ward Experience',
    description:
      'A concise field note on maternal and newborn care routines, counselling priorities, and continuity practices in hospital nursing settings.',
    publishedAt: '2026-03-03',
    body: [
      'Maternal and newborn care requires structured communication, timely escalation, and consistent documentation.',
      'In clinical practice, the most reliable outcomes come from steady monitoring, family counselling, and clean handover discipline.',
      'This note summarizes practical patterns from hospital exposure in Nepal and how they map to recruiter expectations for patient-safe nursing support.',
    ],
  },
  {
    slug: 'documentation-and-handover-discipline',
    title: 'Clinical Documentation and Handover Discipline in General Ward Nursing',
    description:
      'Why accurate charting and handover quality remain core to safe ward operations and coordinated patient care.',
    publishedAt: '2026-03-03',
    body: [
      'General ward nursing relies on predictable workflow, clear charting, and coordinated communication with duty teams.',
      'Good documentation protects patient continuity and helps each shift act on complete, reliable information.',
      'Recruiters often evaluate this capability early because it directly affects handover quality, escalation speed, and patient safety outcomes.',
    ],
  },
];

