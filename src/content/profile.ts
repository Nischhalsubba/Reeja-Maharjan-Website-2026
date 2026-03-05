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
  credential?: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
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
  preview: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
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
  links?: Array<{ label: string; href: string }>;
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
  instagram?: string;
  resumeUrl: string;
  formEndpoint?: string;
};

export type EvidenceItem = {
  title: string;
  category: string;
  description: string;
  src: string;
  alt: string;
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
  evidenceIntro: SectionIntro;
  evidence: EvidenceItem[];
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
    title: 'Registered Nurse for Maternal, Newborn, and General Ward Care',
    role: 'Reeja Maharjan | Nepal Nursing Council Licensed Registered Nurse',
    tagline:
      'Nursing professional transitioning toward hospital, NGO, and INGO care-support roles with strong ward and counselling experience.',
    primaryCta: { label: 'Send Email', href: 'mailto:maharjanreeja88@gmail.com' },
    secondaryCta: { label: 'Download CV', href: '/resume.pdf' },
    portrait: { src: '/reeja-hero-cutout.png', alt: 'Portrait of Reeja Maharjan' },
    meta: [
      { label: 'Based in', value: 'Lalitpur, Nepal' },
      { label: 'Availability', value: 'Immediate' }
    ]
  },
  profileIntro: {
    id: 'profile',
    eyebrow: 'Profile',
    title: 'Professional Nursing Profile',
    summary: 'Recruiter-ready summary of clinical scope, care quality, and role fit in Nepal.'
  },
  profileSummary:
    'NNC-licensed registered nurse with verified experience in teaching and regional hospitals in Nepal. Brings practical strength in maternal-newborn support, general ward care, counselling, documentation, and coordinated handover. Now preparing for hospital, NGO, and INGO nursing opportunities.',
  competenciesIntro: {
    id: 'competencies',
    eyebrow: 'Core Competencies',
    title: 'Core Nursing Competencies',
    summary: 'Practical competencies aligned to hospital, NGO, and INGO nursing requirements.'
  },
  competencies: [
    'Patient counselling and health education (IEC)',
    'Maternal and newborn nursing support',
    'General ward nursing (Surgery / Gyn & Obs exposure)',
    'Clinical documentation and reporting',
    'Shift handover and team coordination',
    'Safeguarding and professional conduct',
    'Community-health and NGO programme support readiness'
  ],
  experienceIntro: {
    id: 'experience',
    eyebrow: 'Experience',
    title: 'Clinical Experience Timeline',
    summary: 'Recent nursing roles with concise, evidence-based responsibilities and outcomes.'
  },
  experience: [
    {
      role: 'Staff Nurse',
      organization: 'Tribhuvan University Teaching Hospital (TUTH)',
      type: 'Hospital',
      location: 'Maharajgunj, Kathmandu',
      period: 'Sep 2024 - Nov 2025',
      bullets: [
        'Supported maternal and newborn care routines with counselling for patients and families.',
        'Maintained ward documentation and structured shift handover for continuity of care.',
        'Contributed to coordinated nursing support in a teaching-hospital setting.'
      ],
      credential: {
        src: '/documents/san-token-of-appreciation.jpg',
        alt: 'SAN token of appreciation certificate',
        title: 'TUTH Recognition: SAN Token of Appreciation',
        description:
          'Recognition for technical nursing assistance in a TUTH blood donation programme on World Anesthesia Day 2024.'
      }
    },
    {
      role: 'Staff Nurse (General Ward)',
      organization: 'Manmohan Memorial Medical College & Teaching Hospital (MMTH)',
      type: 'Hospital',
      location: 'Swoyambhu, Kathmandu',
      period: 'Feb 2024 - Aug 2024',
      bullets: [
        'Worked in the general ward with Surgery and Gynaecology & Obstetrics exposure.',
        'Monitored patients, supported escalation, and coordinated with duty teams.',
        'Delivered patient and family education with clear communication.'
      ],
      credential: {
        src: '/documents/mmth-experience-letter.jpg',
        alt: 'MMTH experience letter',
        title: 'MMTH Experience Letter',
        description:
          'Official experience letter confirming staff nurse service at MMTH General Ward from February 2024 to August 2024.'
      }
    },
    {
      role: 'Nursing Officer',
      organization: 'Sindhuli Hospital',
      type: 'Hospital',
      location: 'Sindhuli, Nepal',
      period: 'Dec 2021 - Dec 2023',
      bullets: [
        'Handled maternity-related support including antenatal and postnatal routines.',
        'Supported OT-related duties with aseptic and workflow discipline.',
        'Managed documentation and ward coordination in daily operations.'
      ],
      credential: {
        src: '/documents/experience-letter.jpg',
        alt: 'Sindhuli Hospital experience letter',
        title: 'Sindhuli Hospital Experience Letter',
        description:
          'Experience letter documenting nursing officer service at Sindhuli Hospital with maternity and OT support responsibilities.'
      }
    }
  ],
  educationIntro: {
    id: 'education',
    eyebrow: 'Education',
    title: 'Nursing Education and Academic Results',
    summary: 'Verified education history with degree progression and final academic scores.'
  },
  education: [
    {
      level: 'B.Sc. Nursing',
      institution: 'Manmohan Memorial Institute of Health Sciences / Tribhuvan University',
      period: 'Sep 2016 - Sep 2021',
      result: 'First Division, 77.92%'
    },
    {
      level: '+2 Science',
      institution: 'Pinnacle Academy, Lalitpur',
      period: 'Sep 2014 - Sep 2016',
      result: 'First Division, 74.70%'
    },
    {
      level: 'SLC',
      institution: 'Aadarsha Saula Yubak Higher Secondary School, Lalitpur',
      period: 'May 2010 - Jun 2014',
      result: 'First Division with Distinction, 83.25%'
    }
  ],
  certificationsIntro: {
    id: 'certifications',
    eyebrow: 'Licenses & Certifications',
    title: 'Nursing License and Clinical Certifications',
    summary: 'Current RN registration and key competency-based training credentials.'
  },
  certifications: [
    {
      title: 'Registered Nurse (RN), Nepal Nursing Council',
      issuer: 'Nepal Nursing Council',
      date: 'Registered Sep 5, 2021',
      note: 'License No. 65100, valid for six years from decision date.',
      credentialUrl: '/resume.pdf',
      preview: {
        src: '/resume.pdf',
        alt: 'Nepal Nursing Council RN license record',
        title: 'Nepal Nursing Council RN License',
        description:
          'Registered Nurse licensure record for Reeja Maharjan (Registration No. 65100) issued by Nepal Nursing Council.'
      }
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      issuer: "Health Training Center / Paropakar Maternity and Women's Hospital",
      date: '2079/01/20 - 2079/02/03 (BS)',
      note: 'Structured newborn-care training exposure for hospital practice.',
      credentialUrl: '/documents/cnc-level-ii-certificate.jpg',
      preview: {
        src: '/documents/cnc-level-ii-certificate.jpg',
        alt: 'Comprehensive Newborn Care Level II certificate',
        title: 'Comprehensive Newborn Care Level II Certificate',
        description:
          "Training certificate from Health Training Center and Paropakar Maternity and Women's Hospital focused on newborn care practice."
      }
    },
    {
      title: 'Operation Theatre Techniques and Management (OTTM)',
      issuer: 'Health Training Center / Bharatpur Hospital',
      date: '2080/02/08 - 2080/03/17 (BS)',
      note: 'OT workflow readiness and perioperative support training.',
      credentialUrl: '/documents/ottm-certificate.jpg',
      preview: {
        src: '/documents/ottm-certificate.jpg',
        alt: 'Operation Theatre Techniques and Management certificate',
        title: 'OTTM Certificate',
        description:
          'Operation Theatre Techniques and Management training certificate from Health Training Center and Bharatpur Hospital.'
      }
    },
    {
      title: 'CPR Training Participation',
      issuer: 'Nursing Inservice Education Unit, TUTH',
      date: 'May 30, 2025',
      note: 'Hands-on CPR training for emergency-response preparedness.',
      credentialUrl: '/documents/cpr-certificate.jpg',
      preview: {
        src: '/documents/cpr-certificate.jpg',
        alt: 'CPR training certificate',
        title: 'CPR Training Certificate',
        description:
          'CPR participation certificate from TUTH Nursing Inservice Education Unit confirming practical emergency response training.'
      }
    },
    {
      title: 'National Nursing Conference Delegate Participation',
      issuer: 'Society of Cardiothoracic Vascular Nurses of Nepal',
      date: 'May 31, 2025',
      note: 'Delegate participation in national conference on cardiothoracic vascular nursing.',
      credentialUrl: '/documents/vascular-nursing-conference-certificate.jpg',
      preview: {
        src: '/documents/vascular-nursing-conference-certificate.jpg',
        alt: 'National nursing conference participation certificate',
        title: 'National Nursing Conference Certificate',
        description:
          'Certificate of participation for the First National Conference of the Society of Cardiothoracic Vascular Nurses of Nepal.'
      }
    }
  ],
  skillsIntro: {
    id: 'skills',
    eyebrow: 'Skills',
    title: 'Professional Nursing Skills',
    summary: 'Day-to-day capabilities used in direct care, teamwork, and patient safety.'
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
      title: 'NGO & INGO Role Readiness',
      items: ['Community-health programme support', 'Case coordination', 'Patient education outreach']
    },
    {
      title: 'OT & Emergency Readiness',
      items: ['OTTM exposure', 'Aseptic workflow', 'CPR participation']
    }
  ],
  skillDetailsIntro: {
    id: 'skill-details',
    eyebrow: 'Skill Details',
    title: 'Detailed Skill Coverage',
    summary: 'Role-level details for each nursing skill group and practical application.'
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
      description:
        'Delivers clear counselling so patients and families understand care plans, follow-up actions, and referral pathways.',
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
    },
    {
      title: 'NGO and INGO Care Coordination Readiness',
      description:
        'Prepared to support programme-based nursing care with structured communication, reporting, and beneficiary-focused follow-up.',
      focus: ['Case follow-up', 'Field-team coordination', 'Community care communication']
    }
  ],
  languagesIntro: {
    id: 'languages',
    eyebrow: 'Languages',
    title: 'Languages for Clinical Communication',
    summary: 'Language coverage used for patient communication and multidisciplinary coordination.'
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
    title: 'Honors and Professional Recognition',
    summary: 'Verified recognition relevant to nursing professionalism and service contribution.'
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
    summary: 'Short reference endorsements reflecting reliability, discipline, and communication.'
  },
  recommendations: [
    {
      name: 'Dr. Nawaraj Subba',
      title: 'Public Health Professional',
      quote:
        'Reeja demonstrates reliable nursing discipline, respectful communication, and steady coordination in clinical settings.',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dr-nawa-raj-subba-93994860/' },
        { label: 'Website', href: 'https://nrsubba.com.np/' }
      ]
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
    title: 'Personal Details (Public-Safe)',
    summary: 'Public-safe details for recruiter screening and role matching.'
  },
  personalDetails: [
    { key: 'Date of Birth', value: '1998 (year only)' },
    { key: 'Gender', value: 'Available on request' },
    { key: 'Marital Status', value: 'Available on request' },
    { key: 'Permanent Address', value: 'Lalitpur, Nepal' },
    { key: 'Current Address', value: 'Biratnagar, Nepal (relocation target)' }
  ],
  evidenceIntro: {
    id: 'evidence',
    eyebrow: 'Verification Library',
    title: 'Credentials and Supporting Evidence',
    summary:
      'Verified documents for licensure, training, education, experience, scholarship, and research records.'
  },
  evidence: [
    {
      title: 'RN License Certificate',
      category: 'Licensure',
      description: 'Nepal Nursing Council registration certificate (RN).',
      src: '/resume.pdf',
      alt: 'RN license certificate record'
    },
    {
      title: 'MMTH Experience Letter',
      category: 'Experience',
      description: 'Official MMTH staff nurse experience letter.',
      src: '/documents/mmth-experience-letter.jpg',
      alt: 'MMTH experience letter'
    },
    {
      title: 'Sindhuli Hospital Experience Letter',
      category: 'Experience',
      description: 'Official experience letter from Sindhuli Hospital.',
      src: '/documents/experience-letter.jpg',
      alt: 'Sindhuli Hospital experience letter'
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      category: 'Training',
      description: 'CNC Level II training credential.',
      src: '/documents/cnc-level-ii-certificate.jpg',
      alt: 'Comprehensive Newborn Care Level II certificate'
    },
    {
      title: 'OTTM Training Certificate',
      category: 'Training',
      description: 'Operation Theatre Techniques and Management credential.',
      src: '/documents/ottm-certificate.jpg',
      alt: 'OTTM training certificate'
    },
    {
      title: 'CPR Training Certificate',
      category: 'Training',
      description: 'TUTH CPR participation certificate.',
      src: '/documents/cpr-certificate.jpg',
      alt: 'CPR training certificate'
    },
    {
      title: 'National Nursing Conference Certificate',
      category: 'Conference',
      description: 'Delegate participation certificate.',
      src: '/documents/vascular-nursing-conference-certificate.jpg',
      alt: 'National nursing conference participation certificate'
    },
    {
      title: 'SAN Token of Appreciation',
      category: 'Recognition',
      description: 'World Anesthesia Day 2024 recognition certificate.',
      src: '/documents/san-token-of-appreciation.jpg',
      alt: 'SAN token of appreciation certificate'
    },
    {
      title: 'B.Sc Character Certificate',
      category: 'Education',
      description: 'B.Sc character certificate.',
      src: '/documents/bsc-character-certificate.jpg',
      alt: 'BSc character certificate'
    },
    {
      title: 'B.Sc Degree Certificate',
      category: 'Education',
      description: 'B.Sc nursing degree certificate.',
      src: '/documents/bsc-degree-certificate.jpg',
      alt: 'BSc degree certificate'
    },
    {
      title: '+2 Provisional Certificate',
      category: 'Education',
      description: 'Higher secondary provisional certificate.',
      src: '/documents/plus2-provisional-certificate.jpg',
      alt: '+2 provisional certificate'
    },
    {
      title: '+2 Transcript',
      category: 'Education',
      description: 'Higher secondary transcript.',
      src: '/documents/plus2-transcript.jpg',
      alt: '+2 transcript'
    },
    {
      title: 'SLC Certificate',
      category: 'Education',
      description: 'School Leaving Certificate.',
      src: '/documents/slc-certificate.jpg',
      alt: 'SLC certificate'
    },
    {
      title: 'SLC Marksheet',
      category: 'Education',
      description: 'School Leaving marksheet.',
      src: '/documents/slc-marksheet.jpg',
      alt: 'SLC marksheet'
    },
    {
      title: 'MMIHS IRC Ethical Approval',
      category: 'Research',
      description: 'Institutional review committee ethical approval letter.',
      src: '/documents/mmihs-irc-ethical-approval.jpg',
      alt: 'Institutional ethical approval letter'
    }
  ],
  keywordsIntro: {
    id: 'keywords',
    eyebrow: 'Keywords',
    title: 'Recruiter Keywords',
    summary: 'Role-relevant keywords for nursing search visibility and recruiter filtering.'
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
    title: 'Contact Reeja for Nursing Opportunities',
    summary:
      'Open to hospital, NGO, and INGO nursing interviews, including relocation-ready opportunities in Nepal.'
  },
  contact: {
    email: 'maharjanreeja88@gmail.com',
    phone: 'Available on request',
    location: 'Lalitpur, Nepal',
    linkedin: 'https://www.linkedin.com/in/reejamaharjan/',
    instagram: 'https://www.instagram.com/maharjan_reeja/',
    resumeUrl: '/resume.pdf',
    formEndpoint: 'https://formsubmit.co/ajax/maharjanreeja88@gmail.com'
  }
};

