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
  authorProfileUrl: '/',
  correctionEmail: professionalFacts.professionalEmail,
  reviewIntervalMonths: 12,
  safetyNote: 'Reeja’s clinical articles are written for general education and do not replace individual assessment, diagnosis, treatment, local clinical policy, or emergency care. Seek qualified medical help for personal symptoms or urgent concerns.'
} as const;

export const formatEditorialDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
