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
  public: boolean;
  featured?: boolean;
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
    {
      title: 'Registered Nurse (Licensure)',
      issuer: 'Nepal Nursing Council',
      date: 'Registered Sep 5, 2021',
      details: 'Professional nursing registration in Nepal (Reg. No. 65100).',
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
      public: true,
      featured: true,
    },
    {
      id: 'cnc-level-ii',
      title: 'Comprehensive Newborn Care Level II Certificate',
      category: 'Training',
      file: '/documents/cnc-level-ii-certificate.jpg',
      issuer: 'Health Training Center, Bagmati Province',
      date: '2079/02/03 (BS)',
      summary: 'Completion of structured maternal and newborn care training.',
      public: true,
      featured: true,
    },
    {
      id: 'ottm',
      title: 'Operation Theatre Techniques and Management Certificate',
      category: 'Training',
      file: '/documents/ottm-certificate.jpg',
      issuer: 'Health Training Center, Bagmati Province',
      date: '2080/03/17 (BS)',
      summary: 'Completion of operation theatre techniques and management training.',
      public: true,
      featured: true,
    },
    {
      id: 'cpr',
      title: 'Cardiopulmonary Resuscitation Certificate',
      category: 'Training',
      file: '/documents/cpr-certificate.jpg',
      issuer: 'Institute of Medicine, TUTH',
      date: '2082/02/16 (BS)',
      summary: 'Hands-on CPR training participation for emergency response readiness.',
      public: true,
    },
    {
      id: 'bsc-degree',
      title: 'BSc Nursing Degree Certificate',
      category: 'Education',
      file: '/documents/bsc-degree-certificate.jpg',
      issuer: 'Tribhuvan University',
      date: 'Dec 9, 2022',
      summary: 'Bachelor of Science in Nursing degree certificate (Tribhuvan University).',
      public: true,
      featured: true,
    },
    {
      id: 'bsc-character',
      title: 'Bachelor Character Certificate',
      category: 'Education',
      file: '/documents/bsc-character-certificate.jpg',
      issuer: 'Tribhuvan University',
      date: 'Issued after BSc Nursing completion',
      summary: 'Academic character and completion evidence at bachelor level.',
      public: true,
    },
    {
      id: 'plus2-provisional',
      title: '+2 Provisional Certificate',
      category: 'Education',
      file: '/documents/plus2-provisional-certificate.jpg',
      issuer: 'Higher Secondary Education Board',
      date: 'After +2 completion',
      summary: 'Provisional certificate for higher secondary education.',
      public: true,
    },
    {
      id: 'plus2-transcript',
      title: '+2 Transcript',
      category: 'Education',
      file: '/documents/plus2-transcript.jpg',
      issuer: 'Higher Secondary Education Board',
      date: 'After +2 completion',
      summary: 'Subject-wise academic transcript for higher secondary studies.',
      public: true,
    },
    {
      id: 'slc-certificate',
      title: 'SLC Certificate',
      category: 'Education',
      file: '/documents/slc-certificate.jpg',
      issuer: 'Office of the Controller of Examinations',
      date: '2014 AD',
      summary: 'School leaving certificate completion record.',
      public: true,
    },
    {
      id: 'slc-marksheet',
      title: 'SLC Marksheet',
      category: 'Education',
      file: '/documents/slc-marksheet.jpg',
      issuer: 'Office of the Controller of Examinations',
      date: '2014 AD',
      summary: 'Subject-wise marksheet from SLC examinations.',
      public: true,
    },
  ],
  privacyNotes: [
    'Sensitive identity documents such as citizenship and national ID card are excluded from this public portfolio.',
    'Only professional certificates, training records, experience letters, and education proofs are included in the document gallery.',
  ],
};
