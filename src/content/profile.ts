import { professionalFacts } from './professional-facts';
import { profile as sourceProfile } from './profile.raw';
import type { ProfileContent } from './profile.raw';
import { siteCopy } from './site-copy';

export type * from './profile.raw';

const experienceBullets: string[][] = [
  [
    'Supports the IISH MOM-HD maternal-health telemonitoring trial for pregnancies complicated by hypertension and/or diabetes.',
    'Supports ANC participant screening, eligibility checks, consent workflows, and organised screening and follow-up records.',
    'Educates participants and family members on home blood-pressure and blood-glucose monitoring, device use, mobile reporting, and adherence.',
    'Reviews uploaded BP/BG readings, supports scheduled tele-follow-up, screens warning symptoms, and escalates concerns according to protocol.',
    'Maintains study documentation and data-quality checks while supporting device logistics and coordination with obstetric, nursing, research, hospital, and technical teams.'
  ],
  [
    'Supported maternal-newborn nursing care and practical counselling for patients and families in a teaching-hospital setting.',
    'Maintained ward documentation and structured shift handover to support continuity of care.',
    'Worked with nursing and multidisciplinary teams around monitoring, communication, follow-up, and appropriate escalation.'
  ],
  [
    'Provided general-care nursing with Surgery and Gynaecology & Obstetrics exposure.',
    'Monitored patients, documented care, supported escalation of clinical concerns, and coordinated with duty teams.',
    'Provided patient and family education using clear, practical communication.'
  ],
  [
    'Worked as a Nursing Officer with maternity-related responsibilities, including antenatal and postnatal nursing support.',
    'Supported operation-theatre-related duties with attention to aseptic practice and organised workflow.',
    'Maintained nursing documentation and supported day-to-day ward coordination.'
  ]
];

const currentExperience = sourceProfile.experience.map((item, index) => ({
  ...item,
  ...(index === 0
    ? {
        role: professionalFacts.currentRole,
        organization: `${professionalFacts.currentEmployer} - ${professionalFacts.currentProject}`,
        location: professionalFacts.currentLocation,
        period: professionalFacts.currentRolePeriod
      }
    : {}),
  bullets: experienceBullets[index] ?? item.bullets
}));

const credentialNotes = [
  'Nepal Nursing Council Registered Nurse credential. The public portfolio shows a summary only; supporting verification can be shared privately with a legitimate employer when appropriate.',
  'Active, unencumbered Texas RN single-state license. The portfolio separates licensure from work authorisation and employer credentialing; supporting verification can be shared privately when appropriate.',
  'NCLEX-RN pathway status is represented through Reeja’s active Texas RN licensure rather than by publishing a separate exam-result document.',
  'Structured Comprehensive Newborn Care Level II training relevant to newborn observation, family education, routine nursing support, and appropriate escalation within local clinical scope.',
  'Hands-on CPR training participation supporting emergency-response preparedness within the requirements and protocols of the employing clinical setting.',
  'Operation Theatre Techniques and Management training relevant to organised perioperative workflow and nursing support within assigned scope.',
  'Delegate participation in a national cardiothoracic vascular nursing conference as part of ongoing professional learning.'
];

const currentCertifications = sourceProfile.certifications.map((item, index) => ({
  ...item,
  note: credentialNotes[index] ?? item.note
}));

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
  certifications: currentCertifications,
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
