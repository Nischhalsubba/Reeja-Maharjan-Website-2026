export type HeroData = {
  available: boolean;
  title: string;
  role: string;
  tagline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  portrait: { src: string; alt: string };
  meta: Array<{ label: string; value: string }>;
};

export type SectionIntro = {
  id: string;
  eyebrow?: string;
  title: string;
  summary: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  type: string;
  location: string;
  period: string;
  bullets: string[];
};

export type EducationItem = {
  level: string;
  institution: string;
  period: string;
  result: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  note: string;
  credentialUrl: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type SkillDetail = {
  title: string;
  description: string;
  focus: string[];
};

export type Recommendation = {
  name: string;
  title: string;
  quote: string;
};

export type PersonalDetail = {
  key: string;
  value: string;
};

export type ContactData = {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  resumeUrl: string;
};

export type ProfileContent = {
  name: string;
  role: string;
  hero: HeroData;
  profileIntro: SectionIntro;
  profileSummary: string;
  competenciesIntro: SectionIntro;
  competencies: string[];
  experienceIntro: SectionIntro;
  experience: ExperienceItem[];
  educationIntro: SectionIntro;
  education: EducationItem[];
  certificationsIntro: SectionIntro;
  certifications: CertificationItem[];
  skillsIntro: SectionIntro;
  skills: SkillGroup[];
  skillDetailsIntro: SectionIntro;
  skillDetails: SkillDetail[];
  languagesIntro: SectionIntro;
  languages: Array<{ name: string; level: string }>;
  awardsIntro: SectionIntro;
  awards: Array<{ title: string; note: string }>;
  recommendationsIntro: SectionIntro;
  recommendations: Recommendation[];
  personalDetailsIntro: SectionIntro;
  personalDetails: PersonalDetail[];
  keywordsIntro: SectionIntro;
  keywords: string[];
  contactIntro: SectionIntro;
  contact: ContactData;
};

export const profile: ProfileContent = {
  name: 'Reeja Maharjan',
  role: 'Registered Nurse (Nepal Nursing Council)',
  hero: {
    available: true,
    title: 'Reeja Maharjan',
    role: 'Registered Nurse',
    tagline:
      'Maternal, newborn, and general ward nurse with verified hospital experience in counselling, documentation, and safe handover support.',
    primaryCta: { label: 'Send Email', href: 'mailto:maharjanreeja88@gmail.com' },
    secondaryCta: { label: 'Download CV', href: '/resume.pdf' },
    portrait: { src: '/reeja-hero-cutout.png', alt: 'Portrait of Reeja Maharjan' },
    meta: [
      { label: 'Location', value: 'Lalitpur, Nepal' },
      { label: 'Open to', value: 'Nepal and relocation to Biratnagar' },
      { label: 'License', value: 'NNC RN 65100' },
      { label: 'Availability', value: 'Immediate' }
    ]
  },
  profileIntro: {
    id: 'profile',
    eyebrow: 'Profile',
    title: 'Professional Profile',
    summary: 'A concise overview of clinical background, care values, and work focus.'
  },
  profileSummary:
    'NNC-licensed nurse with practical service in teaching and regional hospitals. Experience includes maternal-newborn support, general ward nursing exposure, patient counselling, ward documentation, and continuity-focused communication.',
  competenciesIntro: {
    id: 'competencies',
    eyebrow: 'Core Competencies',
    title: 'Core Competencies',
    summary: 'Key strengths mapped directly from résumé responsibilities.'
  },
  competencies: [
    'Patient counselling and health education (IEC)',
    'Maternal and newborn nursing support',
    'General ward nursing (Surgery / Gyn & Obs exposure)',
    'Clinical documentation and reporting',
    'Shift handover and team coordination',
    'Safeguarding and professional conduct'
  ],
  experienceIntro: {
    id: 'experience',
    eyebrow: 'Experience',
    title: 'Clinical Experience',
    summary: 'Three recent roles with focused responsibilities and outcomes.'
  },
  experience: [
    {
      role: 'Staff Nurse',
      organization: 'Tribhuvan University Teaching Hospital (TUTH)',
      type: 'Hospital',
      location: 'Maharajgunj, Kathmandu',
      period: 'Sep 2024 – Nov 2025',
      bullets: [
        'Supported maternal and newborn care routines with counselling for patients and families.',
        'Maintained ward documentation and structured shift handover for continuity of care.',
        'Contributed to coordinated nursing support in a teaching-hospital setting.'
      ]
    },
    {
      role: 'Staff Nurse (General Ward)',
      organization: 'Manmohan Memorial Medical College & Teaching Hospital (MMTH)',
      type: 'Hospital',
      location: 'Swoyambhu, Kathmandu',
      period: 'Feb 2024 – Aug 2024',
      bullets: [
        'Worked in the general ward with Surgery and Gynaecology & Obstetrics exposure.',
        'Monitored patients, supported escalation, and coordinated with duty teams.',
        'Delivered patient and family education with clear communication.'
      ]
    },
    {
      role: 'Nursing Officer',
      organization: 'Sindhuli Hospital',
      type: 'Hospital',
      location: 'Sindhuli, Nepal',
      period: 'Dec 2021 – Dec 2023',
      bullets: [
        'Handled maternity-related support including antenatal and postnatal routines.',
        'Supported OT-related duties with aseptic and workflow discipline.',
        'Managed documentation and ward coordination in daily operations.'
      ]
    }
  ],
  educationIntro: {
    id: 'education',
    eyebrow: 'Education',
    title: 'Academic Background',
    summary: 'Formal education history with documented performance.'
  },
  education: [
    {
      level: 'B.Sc. Nursing',
      institution: 'Manmohan Memorial Institute of Health Sciences / Tribhuvan University',
      period: 'Sep 2016 – Sep 2021',
      result: 'First Division, 77.92%'
    },
    {
      level: '+2 Science',
      institution: 'Pinnacle Academy, Lalitpur',
      period: 'Sep 2014 – Sep 2016',
      result: 'First Division, 74.70%'
    },
    {
      level: 'SLC',
      institution: 'Aadarsha Saula Yubak Higher Secondary School, Lalitpur',
      period: 'May 2010 – Jun 2014',
      result: 'First Division with Distinction, 83.25%'
    }
  ],
  certificationsIntro: {
    id: 'certifications',
    eyebrow: 'Licenses & Certifications',
    title: 'Licenses and Certifications',
    summary: 'Current RN registration and professional training records.'
  },
  certifications: [
    {
      title: 'Registered Nurse (RN), Nepal Nursing Council',
      issuer: 'Nepal Nursing Council',
      date: 'Registered Sep 5, 2021',
      note: 'License No. 65100, valid for six years from decision date.',
      credentialUrl: '/resume.pdf'
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      issuer: "Health Training Center / Paropakar Maternity and Women's Hospital",
      date: '2079/01/20 – 2079/02/03 (BS)',
      note: 'Structured newborn-care training exposure for hospital practice.',
      credentialUrl: '/documents/cnc-level-ii-certificate.jpg'
    },
    {
      title: 'Operation Theatre Techniques and Management (OTTM)',
      issuer: 'Health Training Center / Bharatpur Hospital',
      date: '2080/02/08 – 2080/03/17 (BS)',
      note: 'OT workflow readiness and perioperative support training.',
      credentialUrl: '/documents/ottm-certificate.jpg'
    },
    {
      title: 'CPR Training Participation',
      issuer: 'Nursing Inservice Education Unit, TUTH',
      date: 'May 30, 2025',
      note: 'Hands-on CPR training for emergency-response preparedness.',
      credentialUrl: '/documents/cpr-certificate.jpg'
    }
  ],
  skillsIntro: {
    id: 'skills',
    eyebrow: 'Skills',
    title: 'Professional Skills',
    summary: 'Practical strengths used in day-to-day clinical service.'
  },
  skills: [
    {
      title: 'Clinical Nursing',
      items: ['Maternal-newborn support', 'General ward care', 'Patient monitoring']
    },
    {
      title: 'Counselling & Education',
      items: ['Patient counselling', 'Family guidance', 'Breastfeeding support']
    },
    {
      title: 'Documentation & Reporting',
      items: ['Clinical records', 'Shift handover', 'Routine reporting']
    },
    {
      title: 'Coordination & Safeguarding',
      items: ['Team coordination', 'Referral communication', 'Professional conduct']
    },
    {
      title: 'OT & Emergency Readiness',
      items: ['OTTM exposure', 'Aseptic workflow', 'CPR participation']
    }
  ],
  skillDetailsIntro: {
    id: 'skill-details',
    eyebrow: 'Skill Details',
    title: 'Skill Group Details',
    summary: 'Short, role-focused descriptions for each skill area.'
  },
  skillDetails: [
    {
      title: 'Maternal and Newborn Care',
      description: 'Supports antenatal, postnatal, and newborn-care routines with patient-centred communication.',
      focus: ['Breastfeeding counselling', 'Postpartum support', 'Mother/newborn monitoring']
    },
    {
      title: 'General Ward Practice',
      description: 'Provides ward-based nursing support with Surgery and Gyn/Obs exposure.',
      focus: ['Ward rounds support', 'Condition monitoring', 'Escalation coordination']
    },
    {
      title: 'Counselling and Education',
      description: 'Delivers clear counselling so patients and families understand care plans and follow-up.',
      focus: ['IEC support', 'Family counselling', 'Adherence communication']
    },
    {
      title: 'Documentation and Handover',
      description: 'Maintains accurate records and structured handover to ensure safe continuity of care.',
      focus: ['Nursing notes', 'SBAR-style handover', 'Routine reporting']
    },
    {
      title: 'Safety and Professional Discipline',
      description: 'Works with safeguarding awareness, aseptic discipline, and reliable team communication.',
      focus: ['Safeguarding awareness', 'PSEAH awareness', 'Referral support']
    }
  ],
  languagesIntro: {
    id: 'languages',
    eyebrow: 'Languages',
    title: 'Languages',
    summary: 'Communication strengths used in clinical and community settings.'
  },
  languages: [
    { name: 'Nepali', level: 'Fluent' },
    { name: 'Newari', level: 'Fluent' },
    { name: 'English', level: 'Professional working proficiency' },
    { name: 'Hindi', level: 'Working proficiency' }
  ],
  awardsIntro: {
    id: 'awards',
    eyebrow: 'Honors',
    title: 'Honors and Awards',
    summary: 'Recognition records relevant to clinical professionalism.'
  },
  awards: [
    {
      title: 'SAN Token of Appreciation (World Anesthesia Day 2024)',
      note: 'Recognized for technical assistance in a TUTH blood donation programme.'
    }
  ],
  recommendationsIntro: {
    id: 'recommendations',
    eyebrow: 'Recommendations',
    title: 'Professional Recommendations',
    summary: 'Short endorsements from professional references.'
  },
  recommendations: [
    {
      name: 'Dr. Nawaraj Subba',
      title: 'Public Health Professional',
      quote:
        'Reeja demonstrates reliable nursing discipline, respectful communication, and steady coordination in clinical settings.'
    },
    {
      name: 'Elisha Thapa Magar',
      title: 'Nursing Professional',
      quote:
        'Reeja works with strong patient focus and maintains consistent documentation and handover quality.'
    }
  ],
  personalDetailsIntro: {
    id: 'personal-details',
    eyebrow: 'Personal Details',
    title: 'Personal Details',
    summary: 'Conservative public profile details for recruiter context.'
  },
  personalDetails: [
    { key: 'Date of Birth', value: '1998 (year)' },
    { key: 'Gender', value: 'Available on request' },
    { key: 'Marital Status', value: 'Available on request' },
    { key: 'Permanent Address', value: 'Lalitpur, Nepal' },
    { key: 'Current Address', value: 'Biratnagar, Nepal (relocation target)' }
  ],
  keywordsIntro: {
    id: 'keywords',
    eyebrow: 'Keywords',
    title: 'Clinical Keywords',
    summary: 'Targeted terms aligned with service focus and documentation.'
  },
  keywords: [
    'counselling',
    'IEC',
    'breastfeeding',
    'postpartum care',
    'maternity ward',
    'newborn care',
    'documentation',
    'SBAR handover',
    'safeguarding',
    'PSEAH awareness',
    'referral support'
  ],
  contactIntro: {
    id: 'contact',
    eyebrow: 'Contact',
    title: 'Reach Out',
    summary: 'Open to hospital, NGO, and INGO nursing opportunities.'
  },
  contact: {
    email: 'maharjanreeja88@gmail.com',
    phone: '+977 9843704288',
    location: 'Lalitpur, Nepal',
    linkedin: 'https://www.linkedin.com/in/reejamaharjan/',
    resumeUrl: '/resume.pdf'
  }
};
