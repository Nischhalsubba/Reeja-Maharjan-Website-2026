import { professionalFacts } from './professional-facts';
import { profile as sourceProfile } from './profile.raw';
import type { ProfileContent } from './profile.raw';
import { siteCopy } from './site-copy';

export type * from './profile.raw';

const currentExperience = sourceProfile.experience.map((item, index) =>
  index === 0
    ? {
        ...item,
        role: professionalFacts.currentRole,
        organization: `${professionalFacts.currentEmployer} - ${professionalFacts.currentProject}`,
        location: professionalFacts.currentLocation,
        period: professionalFacts.currentRolePeriod
      }
    : item
);

export const profile: ProfileContent = {
  ...sourceProfile,
  name: professionalFacts.name,
  role: professionalFacts.publicRoleLabel,
  hero: {
    ...sourceProfile.hero,
    title: professionalFacts.primaryRole,
    role: `${professionalFacts.name} | ${professionalFacts.nepalLicenseShort} | ${professionalFacts.texasLicenseShort} | ${professionalFacts.currentEmployerShort} ${professionalFacts.currentRole}`,
    tagline: siteCopy.home.description,
    primaryCta: { label: 'Contact Reeja', href: '/contact/' },
    secondaryCta: { label: 'View Reeja’s CV', href: professionalFacts.publicCvPath },
    portrait: { src: '/reeja-headshot.jpg', alt: 'Reeja Maharjan, Registered Nurse and maternal-health Research Assistant' },
    meta: [
      { label: 'Current role', value: `${professionalFacts.currentRole}, ${professionalFacts.currentEmployerShort}` },
      { label: 'Project', value: professionalFacts.currentProjectShort },
      { label: 'Based in', value: professionalFacts.currentLocation },
      { label: 'Licensure', value: `${professionalFacts.nepalLicenseShort} · ${professionalFacts.texasLicenseShort}` }
    ]
  },
  profileIntro: {
    id: 'profile',
    eyebrow: 'About Reeja',
    title: 'Reeja Maharjan: Registered Nurse and Maternal Health Research Assistant',
    summary: 'A concise professional overview of Reeja’s nursing background, current research role, licensure, clinical training, and areas of experience.'
  },
  profileSummary: siteCopy.profileSummary,
  roleFitIntro: {
    id: 'role-fit',
    eyebrow: 'Professional fit',
    title: 'Nursing and research roles aligned with Reeja’s experience',
    summary: 'Role fit is based on documented hospital nursing, maternal-health research, patient education, monitoring, documentation, and coordination experience.'
  },
  competenciesIntro: {
    id: 'competencies',
    eyebrow: 'Core experience',
    title: 'Clinical, research, and communication strengths',
    summary: 'Practical areas that appear repeatedly across Reeja’s hospital and maternal-health research work.'
  },
  experienceIntro: {
    id: 'experience',
    eyebrow: 'Professional experience',
    title: 'Reeja’s nursing and research experience',
    summary: 'A chronological record of current research work and previous hospital nursing roles in Nepal.'
  },
  experience: currentExperience,
  educationIntro: {
    id: 'education',
    eyebrow: 'Education',
    title: 'Nursing education and academic background',
    summary: 'Reeja’s education history, including her B.Sc. Nursing degree and prior academic qualifications.'
  },
  certificationsIntro: {
    id: 'certifications',
    eyebrow: 'Licenses & clinical training',
    title: 'Reeja’s professional credentials',
    summary: 'Public credential summaries are provided for recruiter review. Sensitive verification documents remain private and are available to legitimate employers when appropriate.'
  },
  skillsIntro: {
    id: 'skills',
    eyebrow: 'Skills',
    title: 'Clinical and research skills',
    summary: 'Skills drawn from Reeja’s documented nursing, patient-education, monitoring, documentation, and research-support experience.'
  },
  languagesIntro: {
    id: 'languages',
    eyebrow: 'Languages',
    title: 'Languages used in professional and everyday communication',
    summary: 'Language information is presented as part of Reeja’s professional profile.'
  },
  personalDetailsIntro: {
    id: 'personal-details',
    eyebrow: 'Current status',
    title: 'Reeja’s current professional status',
    summary: 'Current role, location, licensure, and opportunity preferences for recruiter and employer review.'
  },
  personalDetails: [
    { key: 'Professional status', value: professionalFacts.publicRoleLabel },
    { key: 'Current role', value: `${professionalFacts.currentRole}, ${professionalFacts.currentProjectShort}` },
    { key: 'Based in', value: professionalFacts.currentLocation },
    { key: 'Open to', value: professionalFacts.availability }
  ],
  keywords: [...siteCopy.seoTopics],
  contactIntro: {
    id: 'contact',
    eyebrow: 'Contact Reeja',
    title: 'Discuss a nursing or maternal-health research opportunity',
    summary: 'Share the organisation, role or project, location, timing, and responsibilities through the dedicated contact page.'
  },
  contact: {
    ...sourceProfile.contact,
    email: professionalFacts.professionalEmail,
    phone: professionalFacts.publicPhone,
    location: professionalFacts.currentLocation,
    linkedin: professionalFacts.linkedin,
    instagram: professionalFacts.instagram,
    resumeUrl: professionalFacts.publicCvPath,
    formEndpoint: professionalFacts.contactFormEndpoint
  }
};
