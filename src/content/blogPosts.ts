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
      'A practical note on maternal-newborn routines and care continuity.',
    publishedAt: '2026-03-03',
    body: [
      'Maternal and newborn care requires structured communication, timely escalation, and consistent documentation.',
      'In clinical practice, the most reliable outcomes come from steady monitoring, family counselling, and clean handover discipline.',
      'This note summarizes ward patterns that support safe, consistent care.',
    ],
  },
  {
    slug: 'documentation-and-handover-discipline',
    title: 'Clinical Documentation and Handover Discipline in General Ward Nursing',
    description:
      'Why clear charting and handovers are core to safe ward care.',
    publishedAt: '2026-03-03',
    body: [
      'General ward nursing relies on predictable workflow, clear charting, and coordinated communication with duty teams.',
      'Good documentation protects patient continuity and helps each shift act on complete, reliable information.',
      'This capability directly affects handover quality and patient safety.',
    ],
  },
];
