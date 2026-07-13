import { professionalFacts } from './professional-facts';

export type ClinicalReviewer = {
  name: string;
  qualification: string;
  role: string;
  reviewedAt: string;
};

export const editorialPolicy = {
  author: {
    name: professionalFacts.name,
    qualification: `${professionalFacts.credential}, RN`,
    profileUrl: '/hire-reeja/'
  },
  correctionEmail: professionalFacts.professionalEmail,
  reviewIntervalMonths: 12,
  safetyNote:
    'This article provides general education and does not replace individual assessment, diagnosis, or treatment. Seek urgent medical care for severe, sudden, or rapidly worsening