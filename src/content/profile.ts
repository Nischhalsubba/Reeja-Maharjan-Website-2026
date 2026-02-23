export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
};

export type CredentialItem = {
  title: string;
  issuer: string;
  date: string;
  details: string;
};

export type EducationItem = {
  level: string;
  institution: string;
  period: string;
  result: string;
};

export type SkillGroup = {
  area: string;
  items: string[];
};

export type ReferenceItem = {
  name: string;
  role: string;
  contact: string;
};

export type DocumentGalleryItem = {
  id: string;
  title: string;
  category: string;
  file: string;
  issuer: string;
  date: string;
  summary: string;
  alt: string;
  public: boolean;
  featured?: boolean;
  tags?: string[];
  previewAspect?: 'portrait' | 'landscape';
};

export type BrandInfo = {
  displayName: string;
  watermarkWord: string;
  monogram: string;
};

export type HeroConfig = {
  headline: string;
  subheadline: string;
  floatingTags: string[];
};

export type StatItem = {
  label: string;
  value: string;
  note?: string;
};

export type ProofSnippet = {
  id: string;
  title: string;
  text: string;
  source: string;
  type: 'experience-letter' | 'reference' | 'certificate';
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  resumePdfPath: string;
  headline: string;
  summary: string;
  carePhilosophy: string[];
  goals: string[];
  quickFacts: string[];
  practiceAreas: string[];
  experience: ExperienceItem[];
  credentials: CredentialItem[];
  education: EducationItem[];
  skillGroups: SkillGroup[];
  languages: string[];
  references: ReferenceItem[];
  documentGallery: DocumentGalleryItem[];
  privacyNotes: string[];
  brand: BrandInfo;
  hero: HeroConfig;
  stats: StatItem[];
  proofSnippets: ProofSnippet[];
};

export const profile: Profile = {
  name: 'Reeja Maharjan',
  role: 'Registered Nurse (Nepal)',
  location: 'Lalitpur Metropolitan-21, Khokana, Nepal',
  email: 'maharjanreeja88@gmail.com',
  phone: '9843704288',
  linkedin: 'https://www.linkedin.com',
  resumePdfPath: '/resume.pdf',
  headline:
    'Maternal and newborn care, pregnancy and postpartum counselling, and patient education in frontline hospital settings.',
  summary:
    'Registered nurse with practical experience across maternity, birthing ward, operation theatre support, and general ward service. Strong in counselling, health teaching, documentation, referral coordination, and continuity-focused handovers.',
  brand: {
    displayName: 'Reeja Maharjan',
    watermarkWord: 'REEJA',
    monogram: 'RM',
  },
  hero: {
    headline: 'Maternal & Newborn Care. Pregnancy & Postpartum Counselling. Patient Education.',
    subheadline:
      'Registered Nurse (Nepal) with hospital experience across maternity, general ward, OT support, counselling, and clinical documentation.',
    floatingTags: ['MATERNAL CARE', 'NEWBORN CARE', 'COUNSELLING', 'WARD NURSING', 'OT SUPPORT', 'EDUCATION'],
  },
  carePhilosophy: [
    'Safe, respectful, and confidentiality-focused care in every patient interaction.',
    'Clear counselling for mothers and families to improve home-care confidence.',
    'Structured documentation and responsible escalation for reliable clinical continuity.',
  ],
  goals: [
    'Continue delivering high-quality maternal and newborn nursing care.',
    'Contribute to counselling and IEC-focused nursing/public health roles.',
    'Strengthen referral and stakeholder coordination for patient follow-up support.',
  ],
  quickFacts: [
    'Nepal Nursing Council registered nurse (Reg. No. 65100).',
    '3+ years of continuous hospital nursing experience (2021-2025).',
    'BSc Nursing, Tribhuvan University, First Division.',
    'CNC Level II, OTTM, and CPR certified.',
  ],
  stats: [
    { label: 'Hospital Roles', value: '3', note: 'Sindhuli, MMMTH, TUTH' },
    { label: 'Years of Service', value: '3+', note: '2021-2025 clinical experience' },
    { label: 'Key Trainings', value: '3', note: 'CNC-II, OTTM, CPR' },
    { label: 'Nursing License', value: '65100', note: 'Nepal Nursing Council' },
    { label: 'Languages', value: '4', note: 'Nepali, Newari, English, Hindi' },
    { label: 'Public Documents', value: '10', note: 'Curated verification gallery' },
  ],
  proofSnippets: [
    {
      id: 'sindhuli-letter-performance',
      title: 'Professional discipline and responsibility',
      text: 'Experience letter notes strong regularity, responsibility, punctuality, discipline, sincerity, and dedication during service in Sindhuli Hospital.',
      source: 'Sindhuli Hospital experience letter (Dec 3, 2023)',
      type: 'experience-letter',
    },
    {
      id: 'sindhuli-letter-clinical-scope',
      title: 'Maternity and OT duty handling',
      text: 'Official service verification states she handled maternity responsibilities as well as OT department duties during her tenure.',
      source: 'Sindhuli Hospital experience letter (Dec 3, 2023)',
      type: 'experience-letter',
    },
    {
      id: 'mmmth-letter-assessment',
      title: 'Conscientious ward service',
      text: 'Manmohan Memorial letter describes Reeja as conscientious, serious in assigned duties, pleasant in manner, and able to work well with colleagues.',
      source: 'Manmohan Memorial Medical College & Teaching Hospital (Aug 20, 2024)',
      type: 'experience-letter',
    },
    {
      id: 'training-readiness',
      title: 'Advanced skill development',
      text: 'Documented completion of CNC Level II, OTTM, and CPR training supports readiness for newborn care, OT support, and emergency response situations.',
      source: 'Health Training Center / TUTH training certificates',
      type: 'certificate',
    },
    {
      id: 'reference-public-health',
      title: 'Public health reference available',
      text: 'Professional reference from a public health specialist is available for role verification and communication-related strengths.',
      source: 'Resume reference list',
      type: 'reference',
    },
  ],
  practiceAreas: [
    'Maternal and newborn care',
    'Pregnancy and postpartum counselling',
    'Breastfeeding counselling',
    'General ward nursing support',
    'OT readiness and aseptic routines',
    'Documentation and shift handover',
  ],
  experience: [
    {
      role: 'Staff Nurse',
      organization: 'Tribhuvan University Teaching Hospital (TUTH)',
      location: 'Maharajgunj, Kathmandu',
      period: 'Sep 10, 2024 - Nov 27, 2025',
      highlights: [
        'Delivered counselling and health education for pregnancy, postpartum care, and breastfeeding.',
        'Supported normal deliveries and provided newborn and postnatal mother care.',
        'Maintained structured charting and handovers for safe continuity of care.',
      ],
    },
    {
      role: 'Staff Nurse - General Ward',
      organization: 'Manmohan Memorial Medical College and Teaching Hospital',
      location: 'Swoyambhu, Kathmandu',
      period: 'Feb 20, 2024 - Aug 20, 2024',
      highlights: [
        'Provided inpatient nursing care and monitored patient status for timely escalation.',
        'Coordinated investigations and referrals with departments and duty teams.',
        'Delivered patient and family education with clear handover communication.',
      ],
    },
    {
      role: 'Nursing Officer',
      organization: 'Sindhuli Hospital',
      location: 'Sindhuli, Nepal',
      period: 'Dec 1, 2021 - Dec 3, 2023',
      highlights: [
        'Supported antenatal assessment, delivery care, newborn care, and postnatal counselling.',
        'Handled maternity and OT-related duties with safety and aseptic focus.',
        'Followed documentation and waste-segregation routines with team coordination.',
      ],
    },
  ],
  credentials: [
    {
      title: 'Registered Nurse (Licensure)',
      issuer: 'Nepal Nursing Council',
      date: 'Registered Sep 5, 2021',
      details: 'Professional nursing registration in Nepal (Reg. No. 65100).',
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      issuer: "Health Training Center / Paropakar Maternity and Women's Hospital",
      date: '2079/01/20 - 2079/02/03 (BS)',
      details: 'Advanced newborn and maternal care training completion.',
    },
    {
      title: 'Operation Theatre Techniques and Management (OTTM)',
      issuer: 'Health Training Center / Bharatpur Hospital',
      date: '2080/02/08 - 2080/03/17 (BS)',
      details: 'Practical OT technique and management workflow training.',
    },
    {
      title: 'Cardiopulmonary Resuscitation (CPR)',
      issuer: 'Nursing Inservice Education Unit, TUTH',
      date: 'May 30, 2025',
      details: 'Hands-on CPR training participation.',
    },
  ],
  education: [
    {
      level: 'Bachelor of Science in Nursing',
      institution: 'Manmohan Memorial Institute of Health Sciences / Tribhuvan University',
      period: 'Sep 2016 - Sep 2021',
      result: 'First Division, 77.92%',
    },
    {
      level: '+2 Science',
      institution: 'Pinnacle Academy, Lalitpur',
      period: 'Sep 2014 - Sep 2016',
      result: 'First Division, 74.70%',
    },
    {
      level: 'SLC',
      institution: 'Aadarsha Saula Yubak Higher Secondary School, Lalitpur',
      period: 'May 2010 - Jun 2014',
      result: 'First Division with Distinction, 83.25%',
    },
  ],
  skillGroups: [
    {
      area: 'Counselling and Health Education',
      items: [
        'Pregnancy and postpartum counselling',
        'Breastfeeding guidance',
        'Family-level health teaching',
        'IEC and public-facing communication',
      ],
    },
    {
      area: 'Maternal and Newborn Practice',
      items: [
        'Normal delivery assistance',
        'Postnatal mother care',
        'Newborn routine care',
        'Birthing ward support',
      ],
    },
    {
      area: 'Ward Documentation and Coordination',
      items: [
        'Structured shift handover',
        'Ward registers and charting',
        'Basic report writing',
        'Referral coordination',
      ],
    },
    {
      area: 'Professional Conduct',
      items: [
        'Confidentiality and patient dignity',
        'Teamwork and communication',
        'Safety-focused escalation',
        'Respectful service behavior',
      ],
    },
  ],
  languages: ['Nepali', 'Newari', 'English', 'Hindi'],
  references: [
    {
      name: 'Dr. Nawaraj Subba',
      role: 'Public Health Specialist (Freelance)',
      contact: '9842321955 | nrsubba@gmail.com',
    },
    {
      name: 'Elisha Thapa Magar',
      role: 'Ward Incharge, Sindhuli Hospital',
      contact: '9867497369 | alyesha.thp@gmail.com',
    },
  ],
  documentGallery: [
    {
      id: 'exp-letter',
      title: 'Experience Letter',
      category: 'Experience',
      file: '/documents/experience-letter.jpg',
      issuer: 'Sindhuli Hospital',
      date: 'Dec 3, 2023',
      summary: 'Service verification with professionalism and maternity/OT responsibility remarks.',
      alt: 'Experience letter issued by Sindhuli Hospital for Reeja Maharjan',
      public: true,
      featured: true,
      tags: ['experience', 'recommendation', 'hospital'],
      previewAspect: 'portrait',
    },
    {
      id: 'cnc-level-ii',
      title: 'Comprehensive Newborn Care Level II Certificate',
      category: 'Training',
      file: '/documents/cnc-level-ii-certificate.jpg',
      issuer: 'Health Training Center, Bagmati Province',
      date: '2079/02/03 (BS)',
      summary: 'Completion of structured maternal and newborn care training.',
      alt: 'Comprehensive Newborn Care Level II certificate',
      public: true,
      featured: true,
      tags: ['newborn', 'maternal', 'training'],
      previewAspect: 'landscape',
    },
    {
      id: 'ottm',
      title: 'Operation Theatre Techniques and Management Certificate',
      category: 'Training',
      file: '/documents/ottm-certificate.jpg',
      issuer: 'Health Training Center, Bagmati Province',
      date: '2080/03/17 (BS)',
      summary: 'Completion of operation theatre techniques and management training.',
      alt: 'Operation Theatre Techniques and Management certificate',
      public: true,
      featured: true,
      tags: ['ot', 'training'],
      previewAspect: 'landscape',
    },
    {
      id: 'cpr',
      title: 'Cardiopulmonary Resuscitation Certificate',
      category: 'Training',
      file: '/documents/cpr-certificate.jpg',
      issuer: 'Institute of Medicine, TUTH',
      date: '2082/02/16 (BS)',
      summary: 'Hands-on CPR training participation for emergency response readiness.',
      alt: 'CPR participation certificate from TUTH Nursing Inservice Education Unit',
      public: true,
      tags: ['cpr', 'emergency'],
      previewAspect: 'landscape',
    },
    {
      id: 'bsc-degree',
      title: 'BSc Nursing Degree Certificate',
      category: 'Education',
      file: '/documents/bsc-degree-certificate.jpg',
      issuer: 'Tribhuvan University',
      date: 'Dec 9, 2022',
      summary: 'Bachelor of Science in Nursing degree certificate (Tribhuvan University).',
      alt: 'Bachelor of Science in Nursing degree certificate issued by Tribhuvan University',
      public: true,
      featured: true,
      tags: ['bsc', 'degree'],
      previewAspect: 'portrait',
    },
    {
      id: 'bsc-character',
      title: 'Bachelor Character Certificate',
      category: 'Education',
      file: '/documents/bsc-character-certificate.jpg',
      issuer: 'Tribhuvan University',
      date: 'Issued after BSc Nursing completion',
      summary: 'Academic character and completion evidence at bachelor level.',
      alt: 'Bachelor character certificate related to BSc Nursing completion',
      public: true,
      tags: ['bsc', 'certificate'],
      previewAspect: 'portrait',
    },
    {
      id: 'plus2-provisional',
      title: '+2 Provisional Certificate',
      category: 'Education',
      file: '/documents/plus2-provisional-certificate.jpg',
      issuer: 'Higher Secondary Education Board',
      date: 'After +2 completion',
      summary: 'Provisional certificate for higher secondary education.',
      alt: 'Provisional certificate for higher secondary education',
      public: true,
      tags: ['plus2', 'education'],
      previewAspect: 'portrait',
    },
    {
      id: 'plus2-transcript',
      title: '+2 Transcript',
      category: 'Education',
      file: '/documents/plus2-transcript.jpg',
      issuer: 'Higher Secondary Education Board',
      date: 'After +2 completion',
      summary: 'Subject-wise academic transcript for higher secondary studies.',
      alt: 'Higher secondary transcript marksheet',
      public: true,
      tags: ['plus2', 'transcript'],
      previewAspect: 'portrait',
    },
    {
      id: 'slc-certificate',
      title: 'SLC Certificate',
      category: 'Education',
      file: '/documents/slc-certificate.jpg',
      issuer: 'Office of the Controller of Examinations',
      date: '2014 AD',
      summary: 'School leaving certificate completion record.',
      alt: 'School Leaving Certificate issued in 2014',
      public: true,
      tags: ['slc', 'certificate'],
      previewAspect: 'portrait',
    },
    {
      id: 'slc-marksheet',
      title: 'SLC Marksheet',
      category: 'Education',
      file: '/documents/slc-marksheet.jpg',
      issuer: 'Office of the Controller of Examinations',
      date: '2014 AD',
      summary: 'Subject-wise marksheet from SLC examinations.',
      alt: 'SLC marksheet document',
      public: true,
      tags: ['slc', 'marksheet'],
      previewAspect: 'portrait',
    },
  ],
  privacyNotes: [
    'Sensitive identity documents such as citizenship and national ID card are excluded from this public portfolio.',
    'Only professional certificates, training records, experience letters, and education proofs are included in the document gallery.',
  ],
};
