import type { ClinicalReviewer } from '../editorial-policy';

export type BlogGovernance = {
  audience: string;
  userNeed: string;
  practiceLens: string;
  sourcesAccessedAt: string;
  reviewDueAt: string;
  reviewer?: ClinicalReviewer;
};

const reviewDueAt = '2027-03-11';
const sourcesAccessedAt = '2026-03-11';

export const blogGovernance: Record<string, BlogGovernance> = {
  'pre-eclampsia-pregnancy-warning-signs-monitoring-2026': {
    audience: 'Pregnant people, families, nurses and maternal-health staff',
    userNeed: 'Understand warning signs of pre-eclampsia, routine screening, urgent referral and the 2026 WHO hypertensive disorders roadmap.',
    practiceLens: 'A safety-focused explanation of observation, documentation, clear communication and escalation rather than patient-specific diagnosis or medication advice.',
    sourcesAccessedAt: '2026-10-17',
    reviewDueAt: '2027-04-17'
  },
  'gestational-diabetes-in-pregnancy-2026-monitoring-care': {
    audience: 'Pregnant people, families, nursing students and maternal-health teams',
    userNeed: 'Understand the 2025 WHO diabetes-in-pregnancy guidance, what monitoring means and how to discuss care with clinicians.',
    practiceLens: 'Emphasises personalised monitoring, teach-back, coordinated follow-up and local protocols without giving glucose targets or treatment prescriptions.',
    sourcesAccessedAt: '2026-10-17',
    reviewDueAt: '2027-04-17'
  },
  'postpartum-haemorrhage-2026-nursing-recognition-response': {
    audience: 'Nurses, midwives, nursing students and families learning about maternal safety',
    userNeed: 'Understand the updated PPH detection and response framework, multidisciplinary roles and urgent danger signs.',
    practiceLens: 'Centres on reliable observations, prompt escalation and structured handover, never an unsupervised clinical procedure.',
    sourcesAccessedAt: '2026-10-17',
    reviewDueAt: '2027-04-17'
  },
  'nursing-careers-2026-who-workforce-report-nepal': {
    audience: 'Nurses, nursing students and early-career clinicians in Nepal',
    userNeed: 'Interpret WHO workforce evidence without confusing global trends with current Nepal job or licensing requirements.',
    practiceLens: 'Highlights professional growth, documented competence, team support and verification through Nepal-specific official sources.',
    sourcesAccessedAt: '2026-10-17',
    reviewDueAt: '2027-04-17'
  },
  'essential-maternal-newborn-care-guide-2026': {
    audience: 'Parents, caregivers, nurses, and people preparing for postnatal care',
    userNeed: 'Understand the practical priorities after birth and recognise maternal or newborn symptoms that need prompt assessment.',
    practiceLens: 'Reeja prioritises a short sequence families can remember: maternal recovery, feeding, warmth, hygiene, warning signs, and follow-up.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'top-10-postpartum-counselling-tips-new-nurses': {
    audience: 'Nurses and nursing students providing postnatal education',
    userNeed: 'Structure postpartum counselling so families understand the plan and can act on warning signs after discharge.',
    practiceLens: 'Reeja emphasises plain language, teach-back, realistic home plans, documentation, and escalation when education is no longer enough.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'mastering-nursing-documentation-sbar-handover': {
    audience: 'Nurses and nursing students',
    userNeed: 'Create nursing records and handovers that make the patient’s current condition, actions, and next steps clear.',
    practiceLens: 'Reeja focuses on factual observations, timely charting, structured handover, documented escalation, and a clear recommendation.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'general-care-nursing-common-challenges': {
    audience: 'Nurses and nursing students working in ward or general-care settings',
    userNeed: 'Manage changing priorities, workload, documentation, handover, and patient communication without losing safety or clarity.',
    practiceLens: 'Reeja’s approach is to reassess risk when the shift changes, communicate early, keep records usable, and ask for help before uncertainty becomes delay.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'safeguarding-confidentiality-healthcare-nurses-protect-patient-rights': {
    audience: 'Nurses, nursing students, and healthcare staff handling patient information',
    userNeed: 'Understand everyday privacy and safeguarding responsibilities and know when concerns need authorised escalation.',
    practiceLens: 'Reeja emphasises minimum-necessary disclosure, approved communication channels, factual documentation, patient dignity, and clear escalation pathways.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'comprehensive-newborn-care-level-ii-what-nurses-learn': {
    audience: 'Nurses, nursing students, parents, and families interested in newborn-care training',
    userNeed: 'Understand what additional newborn-care training can support and where local scope, protocol, and medical escalation still apply.',
    practiceLens: 'Reeja presents training as additional preparation for observation, education, routine support, and escalation, not as authority beyond assigned clinical scope.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'mental-health-maternal-care-supporting-mothers-beyond-delivery': {
    audience: 'Mothers, families, nurses, and maternal-care staff',
    userNeed: 'Recognise emotional distress after birth, understand supportive nursing actions, and identify symptoms that need urgent professional assessment.',
    practiceLens: 'Reeja includes mood, sleep, anxiety, coping, support, and safety in maternal conversations rather than judging recovery by physical appearance alone.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'future-of-nursing-in-nepal-telehealth-community-care-post-covid': {
    audience: 'Nurses, students, researchers, and health-programme teams interested in nursing in Nepal',
    userNeed: 'Understand where telehealth and community follow-up can extend nursing support without replacing necessary in-person assessment.',
    practiceLens: 'Reeja’s current telemonitoring work illustrates a practical role for remote education, trend review, documentation, follow-up, and escalation.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'navigating-nurse-licensure-continuing-education-nepal': {
    audience: 'Nurses and nursing students planning registration, renewal, and professional development in Nepal',
    userNeed: 'Organise licensure records and continuing education while relying on official regulator information for current requirements.',
    practiceLens: 'Reeja separates registration, licence status, training, employer credentialing, and work authorisation rather than presenting them as one interchangeable credential.',
    sourcesAccessedAt,
    reviewDueAt
  },
  'from-nursing-student-to-registered-nurse-my-journey': {
    audience: 'Recruiters, nursing students, early-career nurses, and readers learning about Reeja Maharjan',
    userNeed: 'Understand how Reeja’s education, registration, hospital roles, clinical training, international licensure, and current research work connect over time.',
    practiceLens: 'Reeja’s career progression shows continuity between bedside care and research through communication, documentation, monitoring, follow-up, and coordination.',
    sourcesAccessedAt,
    reviewDueAt
  }
};

export const getBlogGovernance = (slug: string): BlogGovernance => {
  const governance = blogGovernance[slug];
  if (!governance) throw new Error(`Missing blog governance metadata for ${slug}`);
  return governance;
};
