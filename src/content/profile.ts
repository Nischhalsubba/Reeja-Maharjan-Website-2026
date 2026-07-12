import { professionalFacts } from './professional-facts';
import { profile as sourceProfile } from './profile.raw';
import type { ProfileContent } from './profile.raw';

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
    meta: [
      { label: 'Current role', value: `${professionalFacts.currentRole}, ${professionalFacts.currentEmployerShort}` },
      { label: 'Project focus', value: professionalFacts.currentProjectShort },
      { label: 'Duty station', value: professionalFacts.currentLocation },
      { label: 'License scope', value: `${professionalFacts.nepalLicenseShort} + ${professionalFacts.texasLicenseShort}` }
    ]
  },
  experience: currentExperience,
  personalDetails: [
    { key: 'Professional status', value: professionalFacts.publicRoleLabel },
    { key: 'Current role', value: `${professionalFacts.currentRole}, ${professionalFacts.currentProjectShort}` },
    { key: 'Location', value: professionalFacts.currentLocation },
    { key: 'Open to', value: professionalFacts.availability }
  ],
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
