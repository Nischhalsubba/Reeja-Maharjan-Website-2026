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

export type EvidenceItem = {
  document: string;
  issuedBy: string;
  date: string;
  insight: string;
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
  goals: string[];
  quickFacts: string[];
  practiceAreas: string[];
  experience: ExperienceItem[];
  credentials: CredentialItem[];
  education: EducationItem[];
  evidence: EvidenceItem[];
  skillGroups: SkillGroup[];
  languages: string[];
  references: ReferenceItem[];
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
    'Maternal and newborn care, pregnancy and postpartum counselling, and patient education in hospital frontline settings.',
  summary:
    'Registered nurse with frontline maternity, birthing, OT-readiness, and inpatient ward experience across Sindhuli, Swoyambhu, and Maharajgunj clinical settings. Strong in counselling, health teaching, structured charting, interdepartmental referral support, and safe handover continuity.',
  goals: [
    'Transition into advocacy-focused nursing and IEC-led public health support roles.',
    'Strengthen community referral coordination and evidence-based patient follow-up.',
    'Contribute to safeguarding-aligned practice with confidentiality and respectful care.',
  ],
  quickFacts: [
    'Nepal Nursing Council Registered Nurse (Reg. No. 65100, valid through 5 Sep 2027).',
    '3+ years continuous hospital experience in maternity, OT, and general ward workflows.',
    'BSc Nursing (Tribhuvan University, First Division, 2021).',
    'CPR, Comprehensive Newborn Care Level II, and OTTM certified.',
  ],
  practiceAreas: [
    'Maternal and newborn care',
    'Pregnancy and postpartum counselling',
    'Breastfeeding counselling and family education',
    'OT readiness and aseptic support routines',
    'Ward documentation and shift handovers',
    'Interdepartmental referral coordination',
  ],
  experience: [
    {
      role: 'Staff Nurse',
      organization: 'Tribhuvan University Teaching Hospital (TUTH)',
      location: 'Maharajgunj, Kathmandu',
      period: 'Sep 10, 2024 - Nov 27, 2025',
      highlights: [
        'Delivered counselling and health education for pregnancy, postpartum recovery, and breastfeeding.',
        'Supported normal deliveries and provided newborn plus postnatal mother care with a safety-first approach.',
        'Maintained structured documentation and reliable shift handovers for continuity of care.',
      ],
    },
    {
      role: 'Staff Nurse - General Ward',
      organization: 'Manmohan Memorial Medical College and Teaching Hospital',
      location: 'Swoyambhu, Kathmandu',
      period: 'Feb 20, 2024 - Aug 20, 2024',
      highlights: [
        'Provided inpatient nursing care and monitored condition changes for timely escalation.',
        'Coordinated tests and referrals while maintaining accurate ward records.',
        'Delivered patient and family health education with clear handover communication.',
      ],
    },
    {
      role: 'Nursing Officer',
      organization: 'Sindhuli Hospital',
      location: 'Sindhuli, Nepal',
      period: 'Dec 1, 2021 - Dec 3, 2023',
      highlights: [
        'Supported antenatal assessment, delivery care, newborn support, and postnatal counselling.',
        'Handled maternity and OT department responsibilities, including aseptic and safety routines.',
        'Maintained ward-level documentation, waste segregation routines, and interdisciplinary coordination.',
      ],
    },
  ],
  credentials: [
    {
      title: 'Registered Nurse Certificate (Reg. No. 65100)',
      issuer: 'Nepal Nursing Council',
      date: 'Sep 5, 2021 - Sep 5, 2027',
      details: 'National licensure registration for nursing practice in Nepal.',
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      issuer: "Health Training Center / Paropakar Maternity and Women's Hospital",
      date: '2079/01/20 - 2079/02/03 (BS)',
      details: 'Focused training on newborn and maternal care standards in hospital setting.',
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
      details: 'Hands-on half-day CPR training participation.',
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
  evidence: [
    {
      document: 'Service Letter - Sindhuli Hospital',
      issuedBy: 'Acting Medical Superintendent, Sindhuli Hospital',
      date: 'Dec 3, 2023',
      insight:
        'Confirms strong professionalism, punctuality, discipline, and maternity plus OT handling during 2021-2023 tenure.',
    },
    {
      document: 'Service Letter - Manmohan Memorial Medical College & Teaching Hospital',
      issuedBy: 'Nursing Chief, Department of Nursing',
      date: 'Aug 20, 2024',
      insight:
        'Confirms general ward service in surgery and gynecology/obstetrics with conscientious team conduct.',
    },
    {
      document: 'CNC Level II Certificate',
      issuedBy: 'Health Training Center, Bagmati Province',
      date: '2079/02/03 (BS)',
      insight: 'Validates advanced newborn and maternal care training completion.',
    },
    {
      document: 'OTTM Certificate',
      issuedBy: 'Health Training Center, Bagmati Province',
      date: '2080/03/17 (BS)',
      insight: 'Validates operation theatre techniques and management training completion.',
    },
    {
      document: 'CPR Training Certificate',
      issuedBy: 'Institute of Medicine, Tribhuvan University Teaching Hospital',
      date: '2082/02/16 (BS)',
      insight: 'Validates practical CPR upskilling through nursing inservice education.',
    },
  ],
  skillGroups: [
    {
      area: 'Counselling and Patient Education',
      items: [
        'Pregnancy and postpartum counselling',
        'Breastfeeding guidance',
        'IEC and public-facing communication',
        'Family-level health teaching',
      ],
    },
    {
      area: 'Maternal and Newborn Clinical Support',
      items: [
        'Birthing ward support',
        'Normal delivery assistance',
        'Postnatal mother care',
        'Newborn routine care',
      ],
    },
    {
      area: 'Documentation and Reporting',
      items: [
        'Structured shift handover',
        'Ward register and charting',
        'Basic report writing',
        'MS Word / Excel / PowerPoint',
      ],
    },
    {
      area: 'Coordination and Professional Standards',
      items: [
        'Referral coordination',
        'Interdisciplinary teamwork',
        'Confidentiality and safeguarding awareness',
        'Professional conduct and respectful service',
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
};
