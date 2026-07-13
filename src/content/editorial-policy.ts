import { professionalFacts } from './professional-facts';

export type ClinicalReviewer = {
  name: string;
  qualification: string;
  role: string;
  reviewedAt: string;
};

export const editorialPolicy = {
  authorName: professionalFacts.name,
  authorQualification: `${professionalFacts.credential}, RN`,
  authorProfileUrl: '/hire-reeja/',
  correctionEmail: professionalFacts.professionalEmail,
  reviewIntervalMonths: 12,
  safetyNote: 'This article provides general education and does not replace individual assessment, diagnosis, or treatment. Seek urgent medical care for severe, sudden, or rapidly worsening symptoms.'
} as const;

export const formatEditorialDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
