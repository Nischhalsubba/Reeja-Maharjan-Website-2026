import type { BlogPost } from './types';
import { kangarooMotherCareWho2025GuideParentsNurses } from './kangaroo-mother-care-who-2025-guide-parents-nurses';
import { hpvVaccineNepal2026CervicalCancerPrevention } from './hpv-vaccine-nepal-2026-cervical-cancer-prevention';
import { postpartumInfectionWarningSignsNursingGuide2026 } from './postpartum-infection-warning-signs-nursing-guide-2026';

import { preEclampsiaPregnancyWarningSignsMonitoring2026 } from './pre-eclampsia-pregnancy-warning-signs-monitoring-2026';
import { gestationalDiabetesInPregnancy2026MonitoringCare } from './gestational-diabetes-in-pregnancy-2026-monitoring-care';
import { postpartumHaemorrhage2026NursingRecognitionResponse } from './postpartum-haemorrhage-2026-nursing-recognition-response';
import { nursingCareers2026WhoWorkforceReportNepal } from './nursing-careers-2026-who-workforce-report-nepal';
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
  kangarooMotherCareWho2025GuideParentsNurses,
  hpvVaccineNepal2026CervicalCancerPrevention,
  postpartumInfectionWarningSignsNursingGuide2026,
  preEclampsiaPregnancyWarningSignsMonitoring2026,
  gestationalDiabetesInPregnancy2026MonitoringCare,
  postpartumHaemorrhage2026NursingRecognitionResponse,
  nursingCareers2026WhoWorkforceReportNepal,
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
