import type { BlogPost } from './types';
import { essentialMaternalNewbornCareGuide2026 } from './essential-maternal-newborn-care-guide-2026';
import { top10PostpartumCounsellingTipsNewNurses } from './top-10-postpartum-counselling-tips-new-nurses';
import { masteringNursingDocumentationSbarHandover } from './mastering-nursing-documentation-sbar-handover';
import { generalCareNursingCommonChallenges } from './general-care-nursing-common-challenges';
import { safeguardingConfidentialityHealthcareNursesProtectPatientRights } from './safeguarding-confidentiality-healthcare-nurses-protect-patient-rights';
import { comprehensiveNewbornCareLevelIiWhatNursesLearn } from './comprehensive-newborn-care-level-ii-what-nurses-learn';
import { mentalHealthMaternalCareSupportingMothersBeyondDelivery } from './mental-health-maternal-care-supporting-mothers-beyond-delivery';
import { futureOfNursingInNepalTelehealthCommunityCarePostCovid } from './future-of-nursing-in-nepal-telehealth-community-care-post-covid';
import { navigatingNurseLicensureContinuingEducationNepal } from './navigating-nurse-licensure-continuing-education-nepal';
import { fromNursingStudentToRegisteredNurseMyJourney } from './from-nursing-student-to-registered-nurse-my-journey';

export type { BlogFaq, BlogPost, BlogSection, BlogSource } from './types';

export const blogPosts: BlogPost[] = [
  essentialMaternalNewbornCareGuide2026,
  top10PostpartumCounsellingTipsNewNurses,
  masteringNursingDocumentationSbarHandover,
  generalCareNursingCommonChallenges,
  safeguardingConfidentialityHealthcareNursesProtectPatientRights,
  comprehensiveNewbornCareLevelIiWhatNursesLearn,
  mentalHealthMaternalCareSupportingMothersBeyondDelivery,
  futureOfNursingInNepalTelehealthCommunityCarePostCovid,
  navigatingNurseLicensureContinuingEducationNepal,
  fromNursingStudentToRegisteredNurseMyJourney
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
