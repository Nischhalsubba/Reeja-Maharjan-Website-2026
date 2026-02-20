export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type EducationItem = {
  program: string;
  institution: string;
  location: string;
  dates: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
};

export type SkillsGroup = {
  category: string;
  items: string[];
};

export type ReferenceItem = {
  name: string;
  role: string;
  contact: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  phone?: string;
  summary: {
    paragraph: string;
    bullets: string[];
  };
  highlights: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillsGroup[];
  languages: string[];
  resumePdfPath: string;
  references: ReferenceItem[];
  privacy: {
    showPhoneByDefault: boolean;
    showReferencesByDefault: boolean;
  };
};

export const profile: Profile = {
  name: 'Reeja Maharjan',
  title: 'Registered Nurse | Patient-Centered Care',
  location: 'Kathmandu, Nepal',
  email: 'reeja@example.com',
  linkedin: 'https://linkedin.com/in/reeja-maharjan',
  phone: '+977 9800-000-000',
  summary: {
    paragraph:
      'Compassionate registered nurse with experience in acute care, patient education, and multidisciplinary coordination. Focused on safe outcomes, clear communication, and dignity-first care across every stage of treatment.',
    bullets: [
      'Skilled in triage, medication administration, documentation, and discharge planning.',
      'Known for calm decision-making in high-pressure clinical settings.',
      'Committed to patient advocacy, family collaboration, and continuous quality improvement.',
    ],
  },
  highlights: [
    '5+ years in medical-surgical and outpatient nursing workflows.',
    'Led patient education initiatives that improved discharge adherence.',
    'Consistent high ratings in empathy, communication, and care quality.',
  ],
  experience: [
    {
      role: 'Senior Staff Nurse',
      org: 'CityCare Hospital',
      location: 'Kathmandu, Nepal',
      dates: '2023 - Present',
      bullets: [
        'Coordinate care plans with physicians, pharmacists, and allied health teams.',
        'Monitor high-acuity patients and perform timely escalation during clinical changes.',
        'Mentor junior nurses on protocol adherence, charting quality, and bedside communication.',
      ],
    },
    {
      role: 'Registered Nurse',
      org: 'Metro Health Center',
      location: 'Lalitpur, Nepal',
      dates: '2020 - 2023',
      bullets: [
        'Delivered medication, wound care, and post-operative support for inpatient units.',
        'Educated patients and caregivers on home recovery and preventive care plans.',
        'Maintained accurate EMR documentation and infection control compliance.',
      ],
    },
    {
      role: 'Junior Nurse',
      org: 'Sunrise Community Clinic',
      location: 'Bhaktapur, Nepal',
      dates: '2018 - 2020',
      bullets: [
        'Supported outpatient triage, vital monitoring, and routine procedure preparation.',
        'Assisted immunization and maternal health campaigns in community outreach programs.',
        'Improved patient intake flow by standardizing pre-visit checklist routines.',
      ],
    },
  ],
  education: [
    {
      program: 'Bachelor of Science in Nursing (BSc Nursing)',
      institution: 'Institute of Medicine',
      location: 'Kathmandu, Nepal',
      dates: '2014 - 2018',
    },
  ],
  certifications: [
    {
      name: 'Basic Life Support (BLS)',
      issuer: 'American Heart Association',
      year: '2025',
    },
    {
      name: 'Advanced Cardiac Life Support (ACLS)',
      issuer: 'American Heart Association',
      year: '2024',
    },
    {
      name: 'Infection Prevention and Control',
      issuer: 'Nursing Council',
      year: '2023',
    },
  ],
  skills: [
    {
      category: 'Clinical Care',
      items: [
        'Patient Assessment',
        'Medication Administration',
        'IV Therapy',
        'Wound Dressing',
        'Post-Operative Monitoring',
      ],
    },
    {
      category: 'Safety and Compliance',
      items: [
        'Infection Control',
        'Clinical Documentation',
        'Patient Safety Protocols',
        'Incident Reporting',
      ],
    },
    {
      category: 'Communication and Leadership',
      items: [
        'Patient Education',
        'Family Counseling',
        'Interdisciplinary Coordination',
        'Mentoring Junior Staff',
      ],
    },
    {
      category: 'Tools and Systems',
      items: ['EMR/EHR Systems', 'Digital Charting', 'Telehealth Coordination'],
    },
  ],
  languages: ['English', 'Nepali', 'Hindi'],
  resumePdfPath: '/resume.pdf',
  references: [
    {
      name: 'Dr. A. Shrestha',
      role: 'Consultant Physician, CityCare Hospital',
      contact: 'Available upon request',
    },
    {
      name: 'S. Thapa, RN',
      role: 'Nursing Supervisor, Metro Health Center',
      contact: 'Available upon request',
    },
  ],
  privacy: {
    showPhoneByDefault: false,
    showReferencesByDefault: false,
  },
};
