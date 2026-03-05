export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'maternal-newborn-counselling-basics',
    title: 'Maternal and Newborn Counselling Guide for Ward Nurses',
    excerpt:
      'A practical counselling framework for antenatal, postnatal, and newborn support in hospital and community-linked care.',
    publishedAt: '2026-02-10',
    readMinutes: 4,
    tags: ['Maternal Care', 'Newborn Care', 'Counselling'],
    body: [
      'Counselling works best when communication is short, clear, and repeatable across shifts. In daily ward rounds, the priority is to explain care steps in plain language and verify understanding before discharge or handover.',
      'For maternal support, focus on warning signs, medication adherence, hydration, nutrition, and follow-up timing. For newborn support, focus on feeding frequency, temperature monitoring, hygiene, and early escalation indicators.',
      'Use one-page prompts for consistency: what to do, when to return, and who to contact. Repeat the same framework at each touchpoint so families hear a stable message from every provider.',
      'Document key counselling points in the nursing note. Good documentation protects continuity and reduces confusion during shift changes.'
    ]
  },
  {
    slug: 'safe-documentation-and-sbar-handover',
    title: 'Safe Nursing Documentation and SBAR Handover Best Practices',
    excerpt:
      'How structured notes and SBAR handover improve patient safety and continuity in busy nursing environments.',
    publishedAt: '2026-01-20',
    readMinutes: 5,
    tags: ['Documentation', 'SBAR', 'Clinical Safety'],
    body: [
      'In high-volume settings, incomplete notes are a major source of delay and risk. A structured documentation approach keeps updates clear for the next nurse and the wider team.',
      'SBAR-style handover helps prioritise critical information: Situation, Background, Assessment, and Recommendation. Even simple use of this sequence improves clarity and response time.',
      'Keep handover focused on current status, recent changes, pending actions, and escalation triggers. Avoid long narratives and ambiguous language.',
      'A short checklist before shift-end can prevent most missed details: vital updates, medication changes, pending labs, patient education status, and follow-up tasks.'
    ]
  },
  {
    slug: 'general-ward-readiness-for-hospital-and-ngo-roles',
    title: 'General Ward Readiness for Hospital, NGO, and INGO Nursing Roles',
    excerpt:
      'Key readiness indicators recruiters screen for in ward-based nursing candidates across hospital, NGO, and INGO settings.',
    publishedAt: '2025-12-15',
    readMinutes: 4,
    tags: ['General Ward', 'Career', 'Recruitment'],
    body: [
      'Recruiters usually screen for three things first: clinical reliability, communication quality, and documentation discipline. These are visible in both interviews and reference feedback.',
      'Clinical reliability means consistent monitoring, timely escalation, and safe routine support. Communication quality means clear patient counselling and practical coordination with team members.',
      'Documentation discipline means concise records, structured handover, and traceable continuity between shifts. This is often the difference between average and high-trust candidates.',
      'For applicants, present evidence in a compact format: role scope, duration, key responsibilities, and relevant credentials. Keep examples specific and measurable where possible.'
    ]
  }
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
