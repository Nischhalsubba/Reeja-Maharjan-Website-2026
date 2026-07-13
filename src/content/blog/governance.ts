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
  'essential-maternal-newborn-care-guide-2026': { audience: 'Parents and postnatal caregivers', userNeed: 'Prioritise safe daily care and recognise maternal or newborn danger signs.', practiceLens: 'Teach a short sequence first: feeding, warmth, hygiene, warning signs, and the exact follow-up plan.', sourcesAccessedAt, reviewDueAt },
  'top-10-postpartum-counselling-tips-new-nurses': { audience: 'New nurses providing postnatal education', userNeed: 'Deliver counselling that families can understand and act on after discharge.', practiceLens: 'Use teach-back and ask the family to repeat the warning signs and follow-up plan in their own words.', sourcesAccessedAt, reviewDueAt },
  'mastering-nursing-documentation-sbar-handover': { audience: 'Nurses and nursing students', userNeed: 'Structure handover and documentation so the next clinician can act safely.', practiceLens: 'Record the observed change, relevant measurements, action taken, response, and escalation without vague language.', sourcesAccessedAt, reviewDueAt },
  'general-care-nursing-common-challenges': { audience: 'Early-career bedside nurses', userNeed: 'Manage common ward pressures without losing safety, clarity, or escalation discipline.', practiceLens: 'When workload rises, protect identification, medication checks, documentation, and escalation before lower-risk tasks.', sourcesAccessedAt, reviewDueAt },
  'safeguarding-confidentiality-healthcare-nurses-protect-patient-rights': { audience: 'Nurses handling patient information', userNeed: 'Recognise everyday confidentiality risks and use safer communication habits.', practiceLens: 'Share only the minimum necessary information, through the approved channel, with the correct person.', sourcesAccessedAt, reviewDueAt },
  'comprehensive-newborn-care-level-ii-what-nurses-learn': { audience: 'Nurses interested in newborn-care training', userNeed: 'Understand the practical capabilities and limits of Level II newborn-care preparation.', practiceLens: 'Training supports recognition and stabilisation, but local protocols and escalation pathways still define practice.', sourcesAccessedAt, reviewDueAt },
  'mental-health-maternal-care-supporting-mothers-beyond-delivery': { audience: 'Families and maternal-care staff', userNeed: 'Notice emotional distress after birth and respond without blame or delay.', practiceLens: 'Ask directly about mood, sleep, fear, functioning, and safety rather than relying on appearance alone.', sourcesAccessedAt, reviewDueAt },
  'future-of-nursing-in-nepal-telehealth-community-care-post-covid': { audience: 'Nurses and health-programme teams in Nepal', userNeed: 'Understand where tele-follow-up adds value and where in-person assessment remains necessary.', practiceLens: 'Remote follow-up is strongest for education, trend review, adherence, and escalation, not for replacing physical assessment.', sourcesAccessedAt, reviewDueAt },
  'navigating-nurse-licensure-continuing-education-nepal': { audience: 'Nurses planning licensure and continuing education in Nepal', userNeed: 'Organise verification, renewal, and learning records without confusing credentials with work authorisation.', practiceLens: 'Keep regulator evidence, employer requirements, renewal dates, and education records as separate checklists.', sourcesAccessedAt, reviewDueAt },
  'from-nursing-student-to-registered-nurse-my-journey': { audience: 'Nursing students and newly registered nurses', userNeed: 'Prepare for the transition from supervised learning to accountable professional practice.', practiceLens: 'Confidence should grow from repeated safe routines, asking for help early, and reflecting on specific decisions.', sourcesAccessedAt, reviewDueAt }
};

export const getBlogGovernance = (slug: string): BlogGovernance => {
  const governance = blogGovernance[slug];
  if (!governance) throw new Error(`Missing blog governance metadata for ${slug}`);
  return governance;
};
