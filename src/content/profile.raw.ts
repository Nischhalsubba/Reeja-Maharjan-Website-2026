export type HeroData = {
  available: boolean;
  title: string;
  role: string;
  tagline: string;
  proof: string[];
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

export type CredentialPreview = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  type: string;
  location: string;
  period: string;
  bullets: string[];
  tags?: string[];
  credential?: CredentialPreview;
};

export type EducationItem = {
  level: string;
  institution: string;
  period: string;
  result: string;
  credential?: CredentialPreview;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  note: string;
  credentialUrl?: string;
  credentialLabel?: string;
  preview?: CredentialPreview;
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

export type RoleFitItem = {
  title: string;
  summary: string;
  evidence: string[];
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
  whatsappNumber?: string;
  resumeUrl: string;
  formEndpoint?: string;
};

export type EvidenceItem = {
  title: string;
  category: string;
  description: string;
  src?: string;
  alt?: string;
  actionLabel?: string;
};

export type ProfileContent = {
  name: string;
  role: string;
  hero: HeroData;
  profileIntro: SectionIntro;
  profileSummary: string;
  roleFitIntro: SectionIntro;
  roleFit: RoleFitItem[];
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
  awards: Array<{
    title: string;
    note: string;
    credential?: CredentialPreview;
  }>;
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
  role: 'NNC Licensed Registered Nurse, Texas RN, and Research Assistant',
  hero: {
    available: true,
    title: 'Registered Nurse and Maternal Health Research Assistant',
    role: 'Reeja Maharjan | NNC Licensed RN | Texas RN | IISH Research Assistant',
    tagline:
      'NNC-licensed nurse and Texas RN now serving as a Research Assistant with IISH on the MOM-HD maternal health telemonitoring trial, combining hospital nursing, BP/BG monitoring, participant education, data quality, and safe clinical coordination.',
    proof: [
      'IISH MOM-HD Research Assistant',
      'NNC Licensed RN',
      'Texas RN Active',
      'NCLEX-RN Cleared',
      'BP/BG Telemonitoring',
      'REDCap Data Quality',
      'Maternal & Newborn Care'
    ],
    primaryCta: { label: 'Contact for Nursing or Research Role', href: '#contact' },
    secondaryCta: { label: 'View Credentials', href: '#certifications' },
    portrait: { src: '/reeja-hero-cutout.png', alt: 'Portrait of Reeja Maharjan' },
    meta: [
      { label: 'Current role', value: 'Research Assistant, IISH' },
      { label: 'Project focus', value: 'MOM-HD maternal telemonitoring' },
      { label: 'Duty station', value: 'Biratnagar, Nepal' },
      { label: 'License scope', value: 'NNC RN + Texas RN' }
    ]
  },
  profileIntro: {
    id: 'profile',
    eyebrow: 'Profile',
    title: 'Professional Nursing and Research Profile',
    summary: 'Recruiter-ready summary of clinical scope, current research role, verified license status, and role fit.'
  },
  profileSummary:
    'NNC-licensed Registered Nurse and Texas RN with verified hospital experience across TUTH, MMTH, and Sindhuli Hospital, now working as a Research Assistant with the Institute for Implementation Science and Health (IISH) on the MOM-HD maternal health telemonitoring trial in Biratnagar. Brings practical strength in maternal-newborn support, ANC screening, HDP/GDM study workflows, BP/BG monitoring, participant counselling, tele-follow-up, REDCap-style data quality, documentation, safe handover, escalation coordination, and ethical participant communication.',
  roleFitIntro: {
    id: 'role-fit',
    eyebrow: 'Role Fit',
    title: 'Where Reeja Fits Best',
    summary: 'Clear role-fit cards for recruiters screening hospital, research, NGO, INGO, and care-coordination opportunities.'
  },
  roleFit: [
    {
      title: 'Maternal Health Research Assistant',
      summary:
        'Strong current fit for implementation research and clinical-study roles involving participant screening, consent support, telemonitoring, data entry, and site coordination.',
      evidence: ['IISH MOM-HD Research Assistant', 'HDP/GDM participant screening', 'BP/BG telemonitoring and follow-up']
    },
    {
      title: 'Hospital Staff Nurse',
      summary: 'Strong fit for ward-based nursing roles requiring safe documentation, patient monitoring, counselling, and handover.',
      evidence: ['TUTH staff nurse exposure', 'MMTH general care experience', 'Sindhuli Hospital nursing officer role']
    },
    {
      title: 'Maternal & Newborn Care Support',
      summary: 'Relevant experience and training for antenatal, postnatal, breastfeeding, newborn-care, and family counselling support.',
      evidence: ['Maternal-newborn care routines', 'Comprehensive Newborn Care Level II', 'Breastfeeding counselling']
    },
    {
      title: 'NGO / INGO Health Programme Support',
      summary:
        'Prepared for programme-based care support where communication, documentation, beneficiary follow-up, device logistics, and safeguarding awareness matter.',
      evidence: ['Participant education', 'Reporting and coordination', 'Ethics and confidentiality awareness']
    },
    {
      title: 'International Nursing Readiness',
      summary: 'Texas RN license status supports international nursing credibility and NCLEX-RN pathway readiness.',
      evidence: ['Texas RN active and unencumbered', 'Single-state license status', 'English clinical communication']
    }
  ],
  competenciesIntro: {
    id: 'competencies',
    eyebrow: 'Clinical Strengths',
    title: 'Core Nursing and Research Strengths',
    summary: 'Practical strengths aligned to direct care, patient safety, documentation, telemonitoring, and programme-support roles.'
  },
  competencies: [
    'Maternal-newborn support',
    'ANC screening and participant enrolment support',
    'HDP/GDM study workflow support',
    'Home-based BP and BG monitoring education',
    'Telemonitoring follow-up and warning-symptom screening',
    'Clinical documentation and REDCap-style data quality',
    'Escalation coordination and team communication',
    'Adverse event documentation and reporting support',
    'Device logistics and study-record confidentiality'
  ],
  experienceIntro: {
    id: 'experience',
    eyebrow: 'Experience',
    title: 'Clinical and Research Experience Timeline',
    summary: 'Recent nursing and research roles with concise, evidence-based responsibilities and care settings.'
  },
  experience: [
    {
      role: 'Research Assistant',
      organization: 'Institute for Implementation Science and Health (IISH) - MOM-HD Trial',
      type: 'Implementation Research / Maternal Health',
      location: 'Biratnagar, Nepal',
      period: 'May 2026 - Present (contract through Nov 2026)',
      bullets: [
        'Supports the MOM-HD project focused on mobile-based obstetric monitoring for pregnancies complicated by hypertension and/or diabetes.',
        'Screens ANC participants for HDP/GDM eligibility, supports informed-consent workflows, and maintains study screening and follow-up documentation.',
        'Trains participants and family members on home BP/BG monitoring, glucometer use, mobile/web-app reporting, and monitoring adherence.',
        'Reviews uploaded BP/BG data, supports bi-weekly tele-follow-ups, screens warning symptoms, and escalates concerns according to protocol.',
        'Maintains study data quality across digital platforms, supports device logistics, and coordinates with obstetricians, nurses, hospital staff, and technical teams.'
      ],
      tags: ['Research assistant', 'MOM-HD', 'HDP/GDM', 'BP/BG monitoring', 'REDCap', 'Telemonitoring']
    },
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
      tags: ['Maternal-newborn', 'Teaching hospital', 'Counselling', 'Handover']
    },
    {
      role: 'Staff Nurse (General Care)',
      organization: 'Manmohan Memorial Medical College & Teaching Hospital (MMTH)',
      type: 'Hospital',
      location: 'Swoyambhu, Kathmandu',
      period: 'Feb 2024 - Aug 2024',
      bullets: [
        'Provided general care nursing support with Surgery and Gynaecology & Obstetrics exposure.',
        'Monitored patients, supported escalation, and coordinated with duty teams.',
        'Delivered patient and family education with clear communication.'
      ],
      tags: ['General care', 'Surgery exposure', 'Gyn/Obs exposure', 'Escalation']
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
      tags: ['Maternity', 'Antenatal', 'Postnatal', 'OT support']
    }
  ],
  educationIntro: {
    id: 'education',
    eyebrow: 'Education',
    title: 'Nursing Education',
    summary: 'Verified education history with degree progression and final academic scores. Full documents are available on request.'
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
    title: 'Priority Licenses and Clinical Certifications',
    summary: 'Highest-value credentials are shown first. Sensitive documents are not published publicly and can be shared with recruiters on request.'
  },
  certifications: [
    {
      title: 'Registered Nurse (RN), Nepal Nursing Council',
      issuer: 'Nepal Nursing Council',
      date: 'Registered Sep 5, 2021',
      note: 'Nepal Nursing Council RN registration. Full verification document is available on request after recruiter screening.',
      credentialLabel: 'Verification available on request'
    },
    {
      title: 'Texas RN License - Active, Unencumbered',
      issuer: 'Texas Board of Nursing / Nursys QuickConfirm',
      date: 'Original issue Sep 8, 2025; expires Oct 31, 2026',
      note:
        'Active, unencumbered Texas RN single-state license. Public summary only; full Nursys QuickConfirm verification can be shared on request.',
      credentialLabel: 'Nursys verification available on request'
    },
    {
      title: 'NCLEX-RN Cleared',
      issuer: 'NCLEX-RN pathway / Texas RN licensure',
      date: 'Texas RN license active from Sep 8, 2025',
      note:
        'Listed as NCLEX-RN cleared based on active Texas RN licensure. This is intentionally framed as credential status, not a public exam-result document.',
      credentialLabel: 'Status supported by Texas RN verification'
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      issuer: "Health Training Center / Paropakar Maternity and Women's Hospital",
      date: '2079/01/20 - 2079/02/03 (BS)',
      note: 'Structured newborn-care training exposure for hospital practice.',
      credentialLabel: 'Certificate available on request'
    },
    {
      title: 'CPR Training Participation',
      issuer: 'Nursing Inservice Education Unit, TUTH',
      date: 'May 30, 2025',
      note: 'Hands-on CPR training for emergency-response preparedness.',
      credentialLabel: 'Certificate available on request'
    },
    {
      title: 'Operation Theatre Techniques and Management (OTTM)',
      issuer: 'Health Training Center / Bharatpur Hospital',
      date: '2080/02/08 - 2080/03/17 (BS)',
      note: 'OT workflow readiness and perioperative support training.',
      credentialLabel: 'Certificate available on request'
    },
    {
      title: 'National Nursing Conference Delegate Participation',
      issuer: 'Society of Cardiothoracic Vascular Nurses of Nepal',
      date: 'May 31, 2025',
      note: 'Delegate participation in a national conference on cardiothoracic vascular nursing.',
      credentialLabel: 'Certificate available on request'
    }
  ],
  skillsIntro: {
    id: 'skills',
    eyebrow: 'Clinical Strengths',
    title: 'Clinical and Research Strengths with Evidence',
    summary: 'A consolidated skill section connecting direct nursing care, telemonitoring, and research documentation strengths to practical evidence.'
  },
  skills: [
    {
      title: 'Research & Telemonitoring',
      items: ['Participant screening', 'HDP/GDM eligibility support', 'BP/BG data review', 'Bi-weekly tele-follow-up']
    },
    {
      title: 'Maternal & Newborn Care',
      items: ['Antenatal and postnatal routines', 'Breastfeeding counselling', 'Comprehensive Newborn Care Level II']
    },
    {
      title: 'Data & Documentation',
      items: ['REDCap-style data entry', 'Consent and source-document support', 'Teleconsultation notes', 'Progress reporting']
    },
    {
      title: 'Participant Education',
      items: ['Home BP/BG monitoring training', 'Glucometer use', 'Mobile/web-app guidance', 'Adherence reinforcement']
    },
    {
      title: 'Safety & Coordination',
      items: ['Warning-symptom screening', 'Escalation/referral support', 'AE/SAE reporting support', 'Multidisciplinary coordination']
    },
    {
      title: 'General Ward and OT Readiness',
      items: ['Patient monitoring', 'Surgery and Gyn/Obs exposure', 'OTTM exposure', 'CPR participation']
    }
  ],
  skillDetailsIntro: {
    id: 'skill-details',
    eyebrow: 'Skill Details',
    title: 'Detailed Skill Coverage',
    summary: 'Archived detailed skill coverage retained in content, but not shown on the homepage to keep the page recruiter-focused.'
  },
  skillDetails: [
    {
      title: 'Maternal Health Research Support',
      description:
        'Supports MOM-HD study activities including ANC screening, informed-consent workflows, BP/BG monitoring education, tele-follow-up, and study documentation.',
      focus: ['HDP/GDM screening', 'BP/BG telemonitoring', 'REDCap-style documentation']
    },
    {
      title: 'Maternal and Newborn Care',
      description: 'Supports antenatal, postnatal, and newborn-care routines with patient-centred communication.',
      focus: ['Breastfeeding counselling', 'Postpartum support', 'Mother/newborn monitoring']
    },
    {
      title: 'General Care Practice',
      description: 'Provides general care nursing support with Surgery and Gyn/Obs exposure.',
      focus: ['Ward rounds support', 'Condition monitoring', 'Escalation coordination']
    },
    {
      title: 'Counselling and Education',
      description:
        'Delivers clear counselling so patients and families understand care plans, follow-up actions, and referral pathways.',
      focus: ['IEC support', 'Family counselling', 'Adherence communication']
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
      note: 'Recognized for technical assistance in a TUTH blood donation programme. Credential available on request.'
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
    eyebrow: 'Screening Details',
    title: 'Public-Safe Screening Details',
    summary: 'Only role-relevant public details are retained. Sensitive personal details are intentionally not published.'
  },
  personalDetails: [
    { key: 'Professional status', value: 'NNC Licensed RN, Texas RN, and IISH Research Assistant' },
    { key: 'Current role', value: 'Research Assistant, MOM-HD project' },
    { key: 'Location', value: 'Biratnagar, Nepal' },
    { key: 'Open to', value: 'Maternal health, research, hospital, NGO, INGO, and care-coordination roles' }
  ],
  evidenceIntro: {
    id: 'evidence',
    eyebrow: 'Verification',
    title: 'Selected Credential Evidence',
    summary:
      'Public-safe credential summaries are shown here. Full documents, contracts, transcripts, signatures, and license reports are not published publicly.'
  },
  evidence: [
    {
      title: 'IISH Research Assistant Appointment',
      category: 'Research Role',
      description:
        'Signed contract and terms of reference confirm Research Assistant role for the MOM-HD maternal health telemonitoring project in Biratnagar. Full document is private.',
      actionLabel: 'Private verification available'
    },
    {
      title: 'NNC RN License',
      category: 'Licensure',
      description: 'Nepal Nursing Council RN registration summary. Full document available on request after recruiter screening.',
      actionLabel: 'Available on request'
    },
    {
      title: 'Texas RN License Verification',
      category: 'International License',
      description:
        'Nursys QuickConfirm summary confirms active, unencumbered Texas RN single-state license. Full verification report available on request.',
      actionLabel: 'Available on request'
    },
    {
      title: 'Comprehensive Newborn Care Level II',
      category: 'Training',
      description: 'Newborn-care training credential summary. Redacted certificate can be shared when needed.',
      actionLabel: 'Available on request'
    },
    {
      title: 'CPR Training',
      category: 'Emergency Readiness',
      description: 'CPR training participation summary from TUTH Nursing Inservice Education Unit.',
      actionLabel: 'Available on request'
    },
    {
      title: 'Experience Letters',
      category: 'Experience',
      description: 'Experience verification summaries for TUTH, MMTH, Sindhuli Hospital, and current research role. Full letters/contracts are not public.',
      actionLabel: 'Available on request'
    },
    {
      title: 'Education Records',
      category: 'Education',
      description: 'B.Sc Nursing, +2 Science, and SLC records are summarized publicly. Full transcripts are not public.',
      actionLabel: 'Available on request'
    }
  ],
  keywordsIntro: {
    id: 'keywords',
    eyebrow: 'Keywords',
    title: 'Recruiter Keywords',
    summary: 'Role-relevant keywords for nursing search visibility and recruiter filtering.'
  },
  keywords: [
    'NNC licensed registered nurse',
    'Texas RN license',
    'NCLEX-RN cleared',
    'research assistant',
    'MOM-HD trial',
    'implementation science',
    'maternal health telemonitoring',
    'HDP GDM screening',
    'blood pressure blood glucose monitoring',
    'REDCap data entry',
    'ANC participant enrolment',
    'maternal newborn care',
    'general ward care',
    'patient counselling',
    'clinical documentation',
    'SBAR handover',
    'CPR training',
    'NGO INGO nursing'
  ],
  contactIntro: {
    id: 'contact',
    eyebrow: 'Contact',
    title: 'Contact Reeja for Nursing or Research Opportunities',
    summary:
      'For hospital, research, NGO, INGO, maternal-health, or clinical care roles, send the role details, location, and expected start date.'
  },
  contact: {
    email: 'maharjanreeja88@gmail.com',
    phone: 'Available on request',
    location: 'Biratnagar, Nepal',
    linkedin: 'https://www.linkedin.com/in/reejamaharjan/',
    instagram: 'https://www.instagram.com/maharjan_reeja/',
    resumeUrl: '/resume.pdf',
    formEndpoint: 'https://formsubmit.co/ajax/maharjanreeja88@gmail.com'
  }
};
