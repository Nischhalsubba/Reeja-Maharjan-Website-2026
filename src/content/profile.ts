export type ExperienceEvidenceLink = {
  title: string;
  file: string;
  type: 'document' | 'photo' | 'award';
  alt: string;
  note?: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
  outcomeLine?: string;
  evidence?: ExperienceEvidenceLink[];
};

export type CredentialItem = {
  title: string;
  issuer: string;
  date: string;
  details: string;
  kind?: 'licensure' | 'training' | 'conference';
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
  publicSummary?: string;
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
  usedIn?: string[];
  lightboxRotateDeg?: 0 | 90 | 180 | 270;
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
  microProofLine: string;
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
  evidence?: ExperienceEvidenceLink[];
};

export type SeoContent = {
  homeTitle: string;
  homeDescription: string;
  keywords?: string[];
};

export type WorkPreference = {
  geography: string[];
  sectors: string[];
  arrangements: string[];
  availability: string;
  relocation: boolean;
};

export type RecognitionItem = {
  title: string;
  issuer: string;
  date?: string;
  summary: string;
  evidence?: ExperienceEvidenceLink[];
};

export type ResearchItem = {
  title: string;
  organization: string;
  summary: string;
  status?: string;
  evidence?: ExperienceEvidenceLink[];
};

export type ImageAsset = {
  id: string;
  file: string;
  alt: string;
  usage: 'hero' | 'experience' | 'proof' | 'about';
  public: boolean;
  featured?: boolean;
};

export type SeoIntentTag =
  | 'registered-rn-nepal'
  | 'maternal-newborn'
  | 'general-ward'
  | 'nursing-officer'
  | 'relocation-biratnagar'
  | 'ngo-ingo';

export type SeoCtaVariant = 'contact' | 'documents' | 'credentials';

export type SeoBreadcrumb = {
  name: string;
  path: string;
};

export type SeoPageContent = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intent: SeoIntentTag;
  keywords: string[];
  intro: string;
  relatedExperienceIndexes: number[];
  relatedCredentialIndexes: number[];
  relatedDocumentIds: string[];
  relatedProofSnippetIds: string[];
  relatedSkillGroupIndexes: number[];
  faqKeys: string[];
  ctaLabel: string;
  ctaTarget: string;
  ctaVariant?: SeoCtaVariant;
  breadcrumbs: SeoBreadcrumb[];
  relocationDisclosure?: string;
};

export type FaqItem = {
  key: string;
  question: string;
  answer: string;
  appliesTo: Array<'home' | string>;
};

export type KeywordTarget = {
  query: string;
  intent: string;
  priority: 'high' | 'medium' | 'low';
  truthfulLocationMode: 'local' | 'relocation' | 'national';
};

export type StructuredEntityFacts = {
  fullName: string;
  jobTitle: string;
  licenseName: string;
  licenseAuthority: string;
  licenseNumber: string;
  baseLocation: string;
  country: string;
  languages: string[];
  sameAs: string[];
  availability: string;
  relocationAccepted: boolean;
  sectors: string[];
  arrangements: string[];
  alumni: string[];
  knowsAbout: string[];
  awards: string[];
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
  seo: SeoContent;
  workPreferences: WorkPreference;
  recognition: RecognitionItem[];
  research: ResearchItem[];
  images?: ImageAsset[];
  seoPages: SeoPageContent[];
  faqItems: FaqItem[];
  keywordTargets: KeywordTarget[];
  entityFacts: StructuredEntityFacts;
  locationTargeting: {
    currentBase: string;
    relocationTargets: string[];
    wordingRule: string;
  };
  recruiterQuickAnswers: Array<{ question: string; answer: string }>;
};

const evidence = {
  sindhuliExperienceLetter: {
    title: 'Sindhuli Hospital Experience Letter',
    file: '/documents/experience-letter.jpg',
    type: 'document' as const,
    alt: 'Experience letter issued by Sindhuli Hospital for Reeja Maharjan',
    note: 'Supports maternity and OT duty responsibility claims.',
  },
  mmthExperienceLetter: {
    title: 'MMTH Experience Letter',
    file: '/documents/mmth-experience-letter.jpg',
    type: 'document' as const,
    alt: 'Manmohan Memorial Medical College and Teaching Hospital experience letter',
    note: 'Verifies Staff Nurse service in General Ward including Surgery and Gynaecology & Obstetrics.',
  },
  cprCertificate: {
    title: 'CPR Training Certificate',
    file: '/documents/cpr-certificate.jpg',
    type: 'document' as const,
    alt: 'CPR certificate from TUTH Nursing Inservice Education Unit',
    note: 'Participation certificate supporting emergency-response training exposure.',
  },
  ottmCertificate: {
    title: 'OTTM Training Certificate',
    file: '/documents/ottm-certificate.jpg',
    type: 'document' as const,
    alt: 'Operation Theatre Techniques and Management certificate',
    note: 'Supports OT readiness and workflow familiarity.',
  },
  cncCertificate: {
    title: 'Comprehensive Newborn Care Level II Certificate',
    file: '/documents/cnc-level-ii-certificate.jpg',
    type: 'document' as const,
    alt: 'Comprehensive Newborn Care Level II certificate',
    note: 'Supports maternal-newborn clinical learning exposure.',
  },
  sanToken: {
    title: 'SAN Token of Appreciation',
    file: '/documents/san-token-of-appreciation.jpg',
    type: 'award' as const,
    alt: 'Token of appreciation from Society of Anesthesiologists of Nepal for blood donation program support',
    note: 'World Anesthesia Day 2024, TUTH technical assistance recognition.',
  },
  mmihsResearchApproval: {
    title: 'MMIHS IRC Ethical Approval Letter',
    file: '/documents/mmihs-irc-ethical-approval.jpg',
    type: 'document' as const,
    alt: 'MMIHS Institutional Review Committee ethical approval letter for research proposal',
    note: 'Supports research and academic involvement.',
  },
  vascularConference: {
    title: 'Vascular Nursing Conference Delegate Certificate',
    file: '/documents/vascular-nursing-conference-certificate.jpg',
    type: 'document' as const,
    alt: 'Certificate of participation for national conference of cardiothoracic vascular nurses',
    note: 'Conference participation in nursing professional development event.',
  },
} as const;

export const profile: Profile = {
  name: 'Reeja Maharjan',
  role: 'Licensed Registered Nurse (Nepal)',
  location: 'Lalitpur Metropolitan-21, Khokana, Lalitpur, Nepal',
  email: 'maharjanreeja88@gmail.com',
  phone: '9843704288',
  linkedin: 'https://www.linkedin.com/in/reejamaharjan/',
  resumePdfPath: '/resume.pdf',
  headline:
    'Licensed Registered Nurse (Nepal) with hospital-based experience in maternal and newborn care, general ward nursing, patient counselling, and clinical coordination.',
  summary:
    'Reeja Maharjan is a licensed Registered Nurse with Nepal Nursing Council (NNC) who has built practical clinical experience across teaching and regional hospital settings in Nepal. Her work spans maternal and newborn care support, general ward nursing (including Surgery and Gynaecology & Obstetrics exposure), patient and family counselling, ward documentation, and continuity-focused handover communication.',
  seo: {
    homeTitle:
      'Reeja Maharjan | Registered Nurse Portfolio Nepal | Maternal, Newborn & General Ward Nursing',
    homeDescription:
      'Licensed Registered Nurse (Nepal) portfolio of Reeja Maharjan with TUTH, MMTH, and Sindhuli Hospital experience. Maternal and newborn care, general ward nursing, counselling, OT readiness, CPR training, and verified credentials for hospital/NGO/INGO roles.',
    keywords: [
      'Registered Nurse Nepal portfolio',
      'Maternal and newborn care nurse Nepal',
      'Staff Nurse TUTH MMTH Sindhuli',
      'Nepal Nursing Council licensed RN',
      'General ward nurse surgery gynecology obstetrics',
      'Nursing officer Nepal',
      'NGO INGO nurse Nepal',
    ],
  },
  workPreferences: {
    geography: ['Nepal', 'Abroad / International'],
    sectors: ['Hospital', 'NGO', 'INGO'],
    arrangements: ['Full-time', 'Contract'],
    availability: 'Immediate',
    relocation: true,
  },
  brand: {
    displayName: 'Reeja Maharjan',
    watermarkWord: 'REEJA',
    monogram: 'RM',
  },
  hero: {
    headline: 'Licensed RN for Maternal, Newborn, and General Ward Nursing Care',
    subheadline:
      'NNC-licensed nurse with experience across TUTH, MMTH, and Sindhuli Hospital, offering patient counselling, ward support, maternal-newborn care exposure, and clinical coordination for hospital, NGO, and INGO opportunities.',
    floatingTags: [
      'NNC LICENSED RN',
      'MATERNAL CARE',
      'NEWBORN CARE',
      'GENERAL WARD',
      'COUNSELLING',
      'OT READINESS',
    ],
    microProofLine: 'Licensed RN (NNC) · Immediate availability · Open to Nepal & international roles',
  },
  carePhilosophy: [
    'Deliver safe, respectful, and confidentiality-focused nursing care in every patient interaction.',
    'Provide clear counselling and health education so patients and families can make informed care decisions.',
    'Maintain accurate documentation, responsible escalation, and structured handover for continuity of care.',
  ],
  goals: [
    'Contribute to maternal and newborn care, ward nursing, and patient education roles in high-trust clinical settings.',
    'Support hospitals, NGOs, and INGOs with reliable nursing service, communication, and clinical coordination.',
    'Continue strengthening emergency preparedness, OT readiness, and evidence-informed nursing practice.',
  ],
  quickFacts: [
    'Licensed RN with Nepal Nursing Council after National Licensure Examination for Nurses.',
    'Experience across teaching and regional hospital settings in Nepal.',
    'Immediate availability with relocation accepted.',
    'Open to hospital, NGO, INGO, full-time, and contract opportunities.',
  ],
  stats: [
    { label: 'Hospital Settings', value: '3', note: 'Teaching and regional hospitals' },
    { label: 'Clinical Service', value: '3+', note: '2021-2025 across nursing roles' },
    { label: 'Training & Recognition', value: '6+', note: 'CNC, OTTM, CPR, SAN, conference, research' },
    { label: 'NNC RN License', value: '65100', note: 'Licensed Registered Nurse (Nepal)' },
    { label: 'Languages', value: '4', note: 'Nepali, Newari, English, Hindi' },
    { label: 'Public Evidence Files', value: '14', note: 'Curated credentials and supporting documents' },
  ],
  proofSnippets: [
    {
      id: 'mmth-letter-general-ward',
      title: 'General ward service verified in Surgery and Gynaecology & Obstetrics',
      text: 'MMTH experience letter confirms service as Staff Nurse in the General Ward and specifically references Surgery and Gynaecology & Obstetrics responsibilities.',
      source: 'Manmohan Memorial Medical College & Teaching Hospital experience letter (Aug 20, 2024)',
      type: 'experience-letter',
      evidence: [evidence.mmthExperienceLetter],
    },
    {
      id: 'sindhuli-letter-professionalism',
      title: 'Strong professional discipline and adaptability in a Nursing Officer role',
      text: 'Sindhuli Hospital service verification describes disciplined, sincere, and responsible performance, including maternity and OT-related duties in a broader Nursing Officer role.',
      source: 'Sindhuli Hospital experience letter (Dec 3, 2023)',
      type: 'experience-letter',
      evidence: [evidence.sindhuliExperienceLetter],
    },
    {
      id: 'san-recognition',
      title: 'Recognized by SAN for technical assistance during a TUTH blood donation programme',
      text: 'Received a Token of Appreciation from the Society of Anesthesiologists of Nepal (SAN) for technical assistance in a blood donation programme at TUTH during World Anesthesia Day 2024.',
      source: 'SAN Token of Appreciation (Oct 20, 2024)',
      type: 'certificate',
      evidence: [evidence.sanToken],
    },
    {
      id: 'training-readiness',
      title: 'Clinical readiness strengthened by newborn care, OTTM, and CPR training exposure',
      text: 'Documented training evidence supports readiness in maternal-newborn care learning, OT-related workflow support, and emergency-response preparedness through CPR/BLS participation.',
      source: 'CNC Level II, OTTM, and CPR training records',
      type: 'certificate',
      evidence: [evidence.cncCertificate, evidence.ottmCertificate, evidence.cprCertificate],
    },
    {
      id: 'research-involvement',
      title: 'Academic and research participation with ethical approval process exposure',
      text: 'Participated in an MMIHS IRC ethically approved research project on awareness of urinary incontinence among elderly women in Lalitpur, demonstrating academic engagement and research process exposure.',
      source: 'MMIHS IRC ethical approval letter',
      type: 'certificate',
      evidence: [evidence.mmihsResearchApproval],
    },
  ],
  recognition: [
    {
      title: 'Token of Appreciation for Technical Assistance (Blood Donation Programme)',
      issuer: 'Society of Anesthesiologists of Nepal (SAN) / TUTH collaboration',
      date: 'Oct 20, 2024',
      summary:
        'Recognized for technical assistance in a blood donation programme organized by SAN at Tribhuvan University Teaching Hospital on the occasion of World Anesthesia Day 2024.',
      evidence: [evidence.sanToken],
    },
    {
      title: 'Government of Nepal Scholarship Nomination Pathway for B.Sc. Nursing',
      issuer: 'Ministry of Education / Government of Nepal (documented nomination support)',
      date: 'B.Sc. Nursing admission period (2016)',
      summary:
        'Documented nomination/support under a Government of Nepal scholarship pathway for B.Sc. Nursing study at Manmohan Memorial Institute of Health Sciences, reflecting merit and formal academic trust.',
    },
    {
      title: 'National Nursing Conference Participation',
      issuer: 'Society of Cardiothoracic Vascular Nurses of Nepal',
      date: 'May 31, 2025',
      summary:
        'Participated as a delegate in the First National Conference focused on cardiothoracic vascular nursing challenges, opportunities, and role development.',
      evidence: [evidence.vascularConference],
    },
  ],
  research: [
    {
      title: 'Awareness on Urinary Incontinence among Elderly Women in a Metropolitan City of Lalitpur',
      organization: 'Manmohan Memorial Institute of Health Sciences (Institutional Review Committee)',
      status: 'IRC ethically approved research proposal participation',
      summary:
        'Participated in an MMIHS IRC ethically approved research project, showing academic involvement, research collaboration experience, and engagement with ethical review processes.',
      evidence: [evidence.mmihsResearchApproval],
    },
  ],
  practiceAreas: [
    'Maternal and newborn care support',
    'Pregnancy and postpartum counselling',
    'General ward nursing (Surgery / Gyn & Obs exposure)',
    'Patient and family health education',
    'OT readiness and aseptic workflow support',
    'Documentation, reporting, and shift handover',
  ],
  experience: [
    {
      role: 'Staff Nurse',
      organization: 'Tribhuvan University Teaching Hospital (TUTH)',
      location: 'Maharajgunj, Kathmandu',
      period: 'Sep 10, 2024 - Nov 27, 2025',
      outcomeLine: 'Strengthened maternal-newborn support, counselling practice, and clinical coordination in a teaching hospital environment.',
      highlights: [
        'Contributed to maternal and newborn care support, including patient counselling and education for pregnancy, postpartum care, and breastfeeding.',
        'Supported normal delivery-related care processes and postnatal mother/newborn nursing routines.',
        'Maintained structured charting and handovers to support safe continuity of care.',
      ],
      evidence: [evidence.sanToken, evidence.cprCertificate, evidence.vascularConference],
    },
    {
      role: 'Staff Nurse (General Ward)',
      organization: 'Manmohan Memorial Medical College & Teaching Hospital (MMTH)',
      location: 'Swoyambhu, Kathmandu',
      period: 'Feb 20, 2024 - Aug 20, 2024',
      outcomeLine: 'Built strong adaptability in inpatient ward care with Surgery and Gynaecology & Obstetrics exposure.',
      highlights: [
        'Worked as Staff Nurse in the General Ward with service exposure including Surgery and Gynaecology & Obstetrics.',
        'Monitored patient condition, supported timely escalation, and coordinated with duty teams and departments.',
        'Delivered patient and family education with clear communication and handover support.',
      ],
      evidence: [evidence.mmthExperienceLetter],
    },
    {
      role: 'Nursing Officer',
      organization: 'Sindhuli Hospital',
      location: 'Sindhuli, Nepal',
      period: 'Dec 1, 2021 - Dec 3, 2023',
      outcomeLine: 'Demonstrated broader responsibility and adaptability across maternity and OT-related nursing duties in a regional hospital setting.',
      highlights: [
        'Handled maternity-related duties including antenatal, delivery support, newborn care exposure, and postnatal counselling support.',
        'Supported OT-related responsibilities with safety and aseptic focus, strengthened further by OTTM training.',
        'Maintained documentation, coordination, and workflow discipline in routine ward operations.',
      ],
      evidence: [evidence.sindhuliExperienceLetter, evidence.ottmCertificate, evidence.cncCertificate],
    },
  ],
  credentials: [
    {
      title: 'Licensed Registered Nurse (RN) - Nepal Nursing Council',
      issuer: 'Nepal Nursing Council (NNC)',
      date: 'Licensure registered Sep 5, 2021',
      details:
        'Licensed Registered Nurse in Nepal after passing the National Licensure Examination for Nurses (Reg. No. 65100). Full certificate scan is intentionally not displayed publicly due personal identifiers.',
      kind: 'licensure',
    },
    {
      title: 'Comprehensive Newborn Care Level II (CNC Level II)',
      issuer: "Health Training Center / Paropakar Maternity and Women's Hospital",
      date: '2079/01/20 - 2079/02/03 (BS)',
      details:
        'Completed newborn care training exposure supporting maternal-newborn clinical capability and practical readiness in hospital-based care settings.',
      kind: 'training',
    },
    {
      title: 'Operation Theatre Techniques & Management (OTTM)',
      issuer: 'Health Training Center / Bharatpur Hospital',
      date: '2080/02/08 - 2080/03/17 (BS)',
      details:
        'Completed OTTM training to strengthen OT-related workflow readiness, technique familiarity, and coordination in perioperative support settings.',
      kind: 'training',
    },
    {
      title: 'CPR / BLS Training Participation',
      issuer: 'Nursing Inservice Education Unit, TUTH',
      date: 'May 30, 2025',
      details:
        'Completed/attended hands-on CPR training participation, supporting emergency-response preparedness and clinical confidence in urgent care situations.',
      kind: 'training',
    },
    {
      title: 'National Nursing Conference Delegate Participation',
      issuer: 'Society of Cardiothoracic Vascular Nurses of Nepal',
      date: 'May 31, 2025',
      details:
        'Participated as a delegate in a national nursing conference focused on cardiothoracic vascular health nursing challenges, opportunities, and professional role development.',
      kind: 'conference',
    },
  ],
  education: [
    {
      level: 'Bachelor of Science in Nursing (B.Sc. Nursing)',
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
      area: 'Maternal & Newborn Care Support',
      items: [
        'Maternal and newborn care support',
        'Postnatal mother and newborn care routines',
        'Pregnancy and postpartum counselling',
        'Breastfeeding counselling support',
      ],
    },
    {
      area: 'General Ward & Clinical Exposure',
      items: [
        'General ward nursing support',
        'Surgery ward exposure',
        'Gynaecology & Obstetrics exposure',
        'Patient status monitoring and escalation',
      ],
    },
    {
      area: 'OT & Emergency Readiness',
      items: [
        'OTTM training exposure',
        'Aseptic and safety-focused workflow support',
        'CPR/BLS participation exposure',
        'Technical assistance in clinical programme settings',
      ],
    },
    {
      area: 'Documentation, Education & Coordination',
      items: [
        'Structured charting and shift handover',
        'Patient and family health education',
        'Referral and departmental coordination',
        'Communication and teamwork in ward settings',
      ],
    },
  ],
  languages: ['Nepali', 'Newari', 'English', 'Hindi'],
  references: [
    {
      name: 'Dr. Nawaraj Subba',
      role: 'Public Health Specialist (Freelance)',
      contact: '9842321955 | nrsubba@gmail.com',
      publicSummary: 'Professional reference available (Public Health Specialist).',
    },
    {
      name: 'Elisha Thapa Magar',
      role: 'Ward Incharge, Sindhuli Hospital',
      contact: '9867497369 | alyesha.thp@gmail.com',
      publicSummary: 'Clinical reference available (Ward Incharge, Sindhuli Hospital).',
    },
  ],
  images: [
    {
      id: 'hero-headshot',
      file: '/reeja-headshot.jpg',
      alt: 'Portrait of Reeja Maharjan, Registered Nurse',
      usage: 'hero',
      public: true,
      featured: true,
    },
  ],
  documentGallery: [
    {
      id: 'exp-letter',
      title: 'Experience Letter (Sindhuli Hospital)',
      category: 'Experience',
      file: '/documents/experience-letter.jpg',
      issuer: 'Sindhuli Hospital',
      date: 'Dec 3, 2023',
      summary: 'Service verification highlighting professionalism and maternity/OT-related duties in a Nursing Officer role.',
      alt: 'Experience letter issued by Sindhuli Hospital for Reeja Maharjan',
      public: true,
      featured: true,
      tags: ['experience', 'hospital', 'maternity', 'ot'],
      previewAspect: 'portrait',
      usedIn: ['highlights', 'proof'],
    },
    {
      id: 'mmth-exp-letter',
      title: 'Experience Letter (MMTH General Ward)',
      category: 'Experience',
      file: '/documents/mmth-experience-letter.jpg',
      issuer: 'Manmohan Memorial Medical College & Teaching Hospital',
      date: 'Aug 20, 2024',
      summary: 'Verifies Staff Nurse role and General Ward responsibilities including Surgery and Gynaecology & Obstetrics.',
      alt: 'MMTH experience letter for Staff Nurse role',
      public: true,
      featured: true,
      tags: ['experience', 'mmth', 'general ward', 'surgery', 'gyn-obs'],
      previewAspect: 'portrait',
      usedIn: ['highlights', 'proof'],
    },
    {
      id: 'cnc-level-ii',
      title: 'Comprehensive Newborn Care Level II Certificate',
      category: 'Training',
      file: '/documents/cnc-level-ii-certificate.jpg',
      issuer: 'Health Training Center, Bagmati Province',
      date: '2079/02/03 (BS)',
      summary: 'Evidence of comprehensive newborn care training exposure supporting maternal-newborn capability.',
      alt: 'Comprehensive Newborn Care Level II certificate',
      public: true,
      featured: true,
      tags: ['newborn', 'maternal', 'training'],
      previewAspect: 'landscape',
      usedIn: ['highlights', 'proof', 'credentials'],
    },
    {
      id: 'ottm',
      title: 'Operation Theatre Techniques and Management Certificate',
      category: 'Training',
      file: '/documents/ottm-certificate.jpg',
      issuer: 'Health Training Center, Bagmati Province',
      date: '2080/03/17 (BS)',
      summary: 'OTTM completion supporting OT workflow readiness and perioperative coordination support.',
      alt: 'Operation Theatre Techniques and Management certificate',
      public: true,
      featured: true,
      tags: ['ot', 'training'],
      previewAspect: 'landscape',
      usedIn: ['highlights', 'proof', 'credentials'],
    },
    {
      id: 'cpr',
      title: 'CPR Training Certificate',
      category: 'Training',
      file: '/documents/cpr-certificate.jpg',
      issuer: 'Institute of Medicine, TUTH',
      date: '2082/02/16 (BS)',
      summary: 'Hands-on CPR training participation record supporting emergency-response preparedness.',
      alt: 'CPR participation certificate from TUTH Nursing Inservice Education Unit',
      public: true,
      tags: ['cpr', 'emergency', 'tuth'],
      previewAspect: 'landscape',
      usedIn: ['highlights', 'proof', 'credentials'],
    },
    {
      id: 'san-token',
      title: 'SAN Token of Appreciation',
      category: 'Recognition',
      file: '/documents/san-token-of-appreciation.jpg',
      issuer: 'Society of Anesthesiologists of Nepal (SAN)',
      date: 'Oct 20, 2024',
      summary: 'Recognition for technical assistance in a blood donation programme at TUTH on World Anesthesia Day 2024.',
      alt: 'SAN token of appreciation certificate for technical assistance at TUTH blood donation program',
      public: true,
      featured: true,
      tags: ['recognition', 'tuth', 'san', 'blood donation'],
      previewAspect: 'landscape',
      usedIn: ['highlights', 'proof'],
    },
    {
      id: 'vascular-conference',
      title: 'National Nursing Conference Delegate Certificate',
      category: 'Recognition',
      file: '/documents/vascular-nursing-conference-certificate.jpg',
      issuer: 'Society of Cardiothoracic Vascular Nurses of Nepal',
      date: 'May 31, 2025',
      summary: 'Delegate participation in a national nursing conference focused on cardiothoracic vascular health nursing.',
      alt: 'Certificate of participation in national cardiothoracic vascular nurses conference',
      public: true,
      tags: ['conference', 'nursing', 'professional development'],
      previewAspect: 'landscape',
      usedIn: ['proof', 'credentials'],
    },
    {
      id: 'mmihs-irc-approval',
      title: 'MMIHS IRC Ethical Approval Letter',
      category: 'Research',
      file: '/documents/mmihs-irc-ethical-approval.jpg',
      issuer: 'Manmohan Memorial Institute of Health Sciences - IRC',
      date: '2077/08/10 (BS)',
      summary: 'Ethical approval evidence supporting participation in an MMIHS IRC-approved research project.',
      alt: 'MMIHS Institutional Review Committee ethical approval letter',
      public: true,
      featured: true,
      tags: ['research', 'ethics', 'mmihs'],
      previewAspect: 'portrait',
      usedIn: ['proof'],
    },
    {
      id: 'bsc-degree',
      title: 'B.Sc. Nursing Degree Certificate',
      category: 'Education',
      file: '/documents/bsc-degree-certificate.jpg',
      issuer: 'Tribhuvan University',
      date: 'Dec 9, 2022',
      summary: 'Bachelor of Science in Nursing degree certificate (Tribhuvan University).',
      alt: 'Bachelor of Science in Nursing degree certificate issued by Tribhuvan University',
      public: true,
      featured: true,
      tags: ['bsc', 'degree', 'nursing'],
      previewAspect: 'portrait',
      usedIn: ['credentials'],
    },
    {
      id: 'bsc-character',
      title: 'Bachelor Character Certificate',
      category: 'Education',
      file: '/documents/bsc-character-certificate.jpg',
      issuer: 'Tribhuvan University',
      date: 'Issued after B.Sc. Nursing completion',
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
      alt: 'School leaving certificate issued in 2014',
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
  entityFacts: {
    fullName: 'Reeja Maharjan',
    jobTitle: 'Licensed Registered Nurse (Nepal)',
    licenseName: 'Registered Nurse',
    licenseAuthority: 'Nepal Nursing Council',
    licenseNumber: '65100',
    baseLocation: 'Lalitpur, Nepal',
    country: 'NP',
    languages: ['Nepali', 'Newari', 'English', 'Hindi'],
    sameAs: ['https://www.linkedin.com/in/reejamaharjan/'],
    availability: 'Immediate',
    relocationAccepted: true,
    sectors: ['Hospital', 'NGO', 'INGO'],
    arrangements: ['Full-time', 'Contract'],
    alumni: [
      'Tribhuvan University',
      'Manmohan Memorial Institute of Health Sciences',
      'Pinnacle Academy, Lalitpur',
    ],
    knowsAbout: [
      'Maternal and newborn care support',
      'General ward nursing',
      'Patient counselling',
      'Gynaecology and obstetrics exposure',
      'OTTM training',
      'CPR/BLS training participation',
      'Nursing documentation and handover',
      'Hospital nursing in Nepal',
    ],
    awards: [
      'SAN Token of Appreciation (World Anesthesia Day 2024)',
      'Government of Nepal scholarship nomination pathway support for B.Sc. Nursing',
    ],
  },
  locationTargeting: {
    currentBase: 'Lalitpur, Nepal',
    relocationTargets: ['Biratnagar', 'Kathmandu Valley', 'Across Nepal', 'International roles'],
    wordingRule:
      'Location-targeted pages describe relocation readiness only and do not claim current residence outside Lalitpur unless verified.',
  },
  recruiterQuickAnswers: [
    {
      question: 'Is Reeja licensed to practice nursing in Nepal?',
      answer:
        'Yes. Reeja Maharjan is a Licensed Registered Nurse (RN) with Nepal Nursing Council (Reg. No. 65100) after passing the National Licensure Examination for Nurses.',
    },
    {
      question: 'What kinds of roles is she open to?',
      answer:
        'She is open to hospital, NGO, and INGO nursing opportunities in Nepal and abroad, including full-time and contract roles.',
    },
    {
      question: 'Is relocation possible?',
      answer: 'Yes. Reeja is available immediately and accepts relocation for suitable nursing opportunities.',
    },
    {
      question: 'What evidence is available for verification?',
      answer:
        'The site includes public experience letters, training certificates, recognition records, and education documents, with sensitive identity documents excluded for privacy.',
    },
  ],
  keywordTargets: [
    { query: 'Reeja Maharjan', intent: 'brand', priority: 'high', truthfulLocationMode: 'national' },
    {
      query: 'registered nurse nepal portfolio',
      intent: 'role portfolio',
      priority: 'high',
      truthfulLocationMode: 'national',
    },
    {
      query: 'maternal newborn nurse nepal',
      intent: 'maternal-newborn',
      priority: 'high',
      truthfulLocationMode: 'national',
    },
    {
      query: 'general ward nurse nepal',
      intent: 'general-ward',
      priority: 'high',
      truthfulLocationMode: 'national',
    },
    {
      query: 'nursing officer nepal',
      intent: 'nursing-officer',
      priority: 'high',
      truthfulLocationMode: 'national',
    },
    {
      query: 'nurse in biratnagar',
      intent: 'relocation targeting',
      priority: 'medium',
      truthfulLocationMode: 'relocation',
    },
    {
      query: 'nurse for ngo nepal',
      intent: 'ngo/ingo',
      priority: 'medium',
      truthfulLocationMode: 'national',
    },
  ],
  faqItems: [
    {
      key: 'nnc-license',
      question: 'Is Reeja Maharjan a licensed registered nurse in Nepal?',
      answer:
        'Yes. Reeja Maharjan is a Licensed Registered Nurse (RN) in Nepal with Nepal Nursing Council registration number 65100 after passing the National Licensure Examination for Nurses.',
      appliesTo: ['home', 'registered-nurse-nepal', 'nursing-officer-nepal', 'maternal-newborn-nurse-nepal'],
    },
    {
      key: 'maternal-newborn-exposure',
      question: 'Does Reeja have maternal and newborn care experience?',
      answer:
        'Yes. Her experience and training records show maternal and newborn care support exposure, including counselling, postnatal routines, and newborn care learning with supporting certificates in the portfolio.',
      appliesTo: ['home', 'maternal-newborn-nurse-nepal', 'nursing-officer-nepal'],
    },
    {
      key: 'general-ward-exposure',
      question: 'Does Reeja have general ward nursing experience in Surgery and Gynaecology & Obstetrics?',
      answer:
        'Yes. The MMTH experience letter verifies Staff Nurse service in the General Ward, including Surgery and Gynaecology & Obstetrics service areas.',
      appliesTo: ['home', 'general-ward-nurse-nepal', 'registered-nurse-nepal'],
    },
    {
      key: 'nursing-officer-role',
      question: 'Has Reeja worked in a Nursing Officer role?',
      answer:
        'Yes. Reeja served as a Nursing Officer at Sindhuli Hospital, with documented responsibilities across maternity and OT-related duties in a regional hospital setting.',
      appliesTo: ['home', 'nursing-officer-nepal', 'registered-nurse-nepal'],
    },
    {
      key: 'ngo-ingo-fit',
      question: 'Is Reeja available for NGO and INGO nursing roles in Nepal?',
      answer:
        'Yes. She is open to hospital, NGO, and INGO opportunities and brings strengths in patient counselling, health education, documentation, communication, and research participation.',
      appliesTo: ['home', 'nurse-for-ngo-ingo-nepal'],
    },
    {
      key: 'availability',
      question: 'Is Reeja Maharjan available immediately for nursing opportunities?',
      answer:
        'Yes. Reeja is available immediately for interviews and nursing role discussions, including full-time and contract opportunities.',
      appliesTo: ['home', 'registered-nurse-nepal', 'nurse-for-ngo-ingo-nepal', 'nurse-biratnagar-nepal-relocation'],
    },
    {
      key: 'relocation',
      question: 'Is Reeja available for relocation within Nepal, including Biratnagar?',
      answer:
        'Yes. Reeja is currently based in Lalitpur, Nepal and accepts relocation for suitable opportunities, including positions in Biratnagar and other locations.',
      appliesTo: ['home', 'nurse-biratnagar-nepal-relocation'],
    },
    {
      key: 'document-verification',
      question: 'Can employers review supporting documents and credentials?',
      answer:
        'Yes. The portfolio includes a public verification gallery with experience letters, training certificates, recognition records, and education documents. Sensitive identity documents are intentionally excluded.',
      appliesTo: ['home', 'registered-nurse-nepal', 'maternal-newborn-nurse-nepal', 'general-ward-nurse-nepal', 'nursing-officer-nepal'],
    },
  ],
  seoPages: [
    {
      slug: 'registered-nurse-nepal',
      title: 'Registered Nurse Nepal Portfolio - Reeja Maharjan',
      description:
        'Registered Nurse Nepal portfolio of Reeja Maharjan (NNC licensed RN) with hospital experience across TUTH, MMTH and Sindhuli Hospital, verified documents, and immediate availability.',
      h1: 'Registered Nurse in Nepal - Reeja Maharjan',
      intent: 'registered-rn-nepal',
      keywords: [
        'registered nurse nepal',
        'registered nurse nepal portfolio',
        'licensed rn nepal',
        'reeja maharjan nurse',
        'nepal nursing council rn',
      ],
      intro:
        'This page summarizes Reeja Maharjan’s NNC-licensed Registered Nurse profile for hospitals, NGOs, INGOs, and recruiters seeking a verified nurse portfolio in Nepal.',
      relatedExperienceIndexes: [0, 1, 2],
      relatedCredentialIndexes: [0, 1, 2, 3],
      relatedDocumentIds: ['mmth-exp-letter', 'exp-letter', 'cnc-level-ii', 'ottm', 'cpr', 'san-token'],
      relatedProofSnippetIds: ['mmth-letter-general-ward', 'sindhuli-letter-professionalism', 'training-readiness'],
      relatedSkillGroupIndexes: [0, 1, 2, 3],
      faqKeys: ['nnc-license', 'general-ward-exposure', 'nursing-officer-role', 'availability', 'document-verification'],
      ctaLabel: 'Contact for RN Opportunities',
      ctaTarget: '/#contact',
      ctaVariant: 'contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Registered Nurse Nepal', path: '/registered-nurse-nepal/' },
      ],
    },
    {
      slug: 'maternal-newborn-nurse-nepal',
      title: 'Maternal and Newborn Nurse Nepal - Reeja Maharjan',
      description:
        'Maternal and newborn nursing profile in Nepal: Reeja Maharjan, NNC-licensed RN with TUTH experience, newborn care training exposure, counselling support, and verified documents.',
      h1: 'Maternal and Newborn Nurse Profile (Nepal) - Reeja Maharjan',
      intent: 'maternal-newborn',
      keywords: [
        'maternal newborn nurse nepal',
        'newborn care nurse nepal',
        'postpartum counselling nurse nepal',
        'tuth nurse maternal newborn',
        'reeja maharjan maternal newborn nurse',
      ],
      intro:
        'This page focuses on Reeja Maharjan’s maternal and newborn care support experience, counselling strengths, and related training evidence relevant to maternity-focused roles in Nepal.',
      relatedExperienceIndexes: [0, 2],
      relatedCredentialIndexes: [1, 3],
      relatedDocumentIds: ['cnc-level-ii', 'cpr', 'san-token', 'exp-letter'],
      relatedProofSnippetIds: ['san-recognition', 'training-readiness'],
      relatedSkillGroupIndexes: [0, 3],
      faqKeys: ['nnc-license', 'maternal-newborn-exposure', 'availability', 'document-verification'],
      ctaLabel: 'Discuss Maternal/Newborn Roles',
      ctaTarget: '/#contact',
      ctaVariant: 'contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Maternal / Newborn Nurse Nepal', path: '/maternal-newborn-nurse-nepal/' },
      ],
    },
    {
      slug: 'general-ward-nurse-nepal',
      title: 'General Ward Nurse Nepal (Surgery, Gyn & Obs Exposure) - Reeja Maharjan',
      description:
        'General ward nurse profile in Nepal with MMTH experience in Surgery and Gynaecology & Obstetrics service areas. Verified experience letter and nursing credentials for recruiter review.',
      h1: 'General Ward Nurse in Nepal - Reeja Maharjan',
      intent: 'general-ward',
      keywords: [
        'general ward nurse nepal',
        'staff nurse general ward nepal',
        'surgery ward nurse nepal',
        'gynaecology obstetrics ward nurse nepal',
        'mmth staff nurse portfolio',
      ],
      intro:
        'This page highlights Reeja Maharjan’s verified general ward nursing service at MMTH, including Surgery and Gynaecology & Obstetrics exposure, with supporting documentation for recruiters.',
      relatedExperienceIndexes: [1],
      relatedCredentialIndexes: [0, 3],
      relatedDocumentIds: ['mmth-exp-letter', 'cpr', 'san-token'],
      relatedProofSnippetIds: ['mmth-letter-general-ward'],
      relatedSkillGroupIndexes: [1, 3],
      faqKeys: ['general-ward-exposure', 'nnc-license', 'availability', 'document-verification'],
      ctaLabel: 'Contact for General Ward Roles',
      ctaTarget: '/#contact',
      ctaVariant: 'contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'General Ward Nurse Nepal', path: '/general-ward-nurse-nepal/' },
      ],
    },
    {
      slug: 'nursing-officer-nepal',
      title: 'Nursing Officer Nepal Profile - Reeja Maharjan',
      description:
        'Nursing Officer profile in Nepal: Reeja Maharjan with Sindhuli Hospital experience, maternity and OT-related duties, OTTM training, and verified experience evidence.',
      h1: 'Nursing Officer in Nepal - Reeja Maharjan',
      intent: 'nursing-officer',
      keywords: [
        'nursing officer nepal',
        'nursing officer portfolio nepal',
        'sindhuli hospital nursing officer',
        'ot readiness nurse nepal',
        'reeja maharjan nursing officer',
      ],
      intro:
        'This page focuses on Reeja Maharjan’s Nursing Officer experience at Sindhuli Hospital, including maternity and OT-related duties supported by experience and training documents.',
      relatedExperienceIndexes: [2],
      relatedCredentialIndexes: [0, 1, 2],
      relatedDocumentIds: ['exp-letter', 'ottm', 'cnc-level-ii'],
      relatedProofSnippetIds: ['sindhuli-letter-professionalism', 'training-readiness'],
      relatedSkillGroupIndexes: [0, 2, 3],
      faqKeys: ['nursing-officer-role', 'nnc-license', 'maternal-newborn-exposure', 'document-verification'],
      ctaLabel: 'Contact for Nursing Officer Opportunities',
      ctaTarget: '/#contact',
      ctaVariant: 'contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Nursing Officer Nepal', path: '/nursing-officer-nepal/' },
      ],
    },
    {
      slug: 'nurse-biratnagar-nepal-relocation',
      title: 'Nurse for Biratnagar, Nepal (Relocation Ready) - Reeja Maharjan',
      description:
        'Reeja Maharjan is an NNC-licensed Registered Nurse currently based in Lalitpur and open to relocation to Biratnagar, Nepal for hospital, NGO, and INGO roles.',
      h1: 'Relocation-Ready Nurse for Biratnagar, Nepal - Reeja Maharjan',
      intent: 'relocation-biratnagar',
      keywords: [
        'nurse in biratnagar',
        'nurse biratnagar nepal',
        'relocation ready nurse nepal',
        'registered nurse biratnagar opportunity',
        'reeja maharjan nurse biratnagar',
      ],
      intro:
        'This page is for employers in Biratnagar and nearby areas who are looking for a relocation-ready nurse with verified hospital experience in Nepal.',
      relatedExperienceIndexes: [0, 1, 2],
      relatedCredentialIndexes: [0, 1, 2, 3],
      relatedDocumentIds: ['mmth-exp-letter', 'exp-letter', 'cnc-level-ii', 'ottm', 'cpr'],
      relatedProofSnippetIds: ['mmth-letter-general-ward', 'sindhuli-letter-professionalism', 'training-readiness'],
      relatedSkillGroupIndexes: [0, 1, 2, 3],
      faqKeys: ['relocation', 'availability', 'nnc-license', 'document-verification'],
      ctaLabel: 'Contact for Biratnagar Opportunities',
      ctaTarget: '/#contact',
      ctaVariant: 'contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Nurse in Biratnagar (Relocation)', path: '/nurse-biratnagar-nepal-relocation/' },
      ],
      relocationDisclosure:
        'Reeja is currently based in Lalitpur, Nepal. This page targets Biratnagar hiring searches only to indicate relocation readiness, not current residence.',
    },
    {
      slug: 'nurse-for-ngo-ingo-nepal',
      title: 'Nurse for NGO and INGO Roles in Nepal - Reeja Maharjan',
      description:
        'Nurse portfolio for NGO/INGO opportunities in Nepal: Reeja Maharjan, NNC-licensed RN with counselling, patient education, documentation, research participation, and hospital-based experience.',
      h1: 'Nurse for NGO / INGO Roles in Nepal - Reeja Maharjan',
      intent: 'ngo-ingo',
      keywords: [
        'nurse for ngo nepal',
        'nurse for ingo nepal',
        'community health nurse nepal portfolio',
        'patient counselling nurse nepal',
        'reeja maharjan ngo ingo nurse',
      ],
      intro:
        'This page presents Reeja Maharjan’s nursing strengths relevant to NGO and INGO roles in Nepal, including counselling, patient education, documentation, communication, and research participation.',
      relatedExperienceIndexes: [0, 1, 2],
      relatedCredentialIndexes: [0, 1, 3, 4],
      relatedDocumentIds: ['mmihs-irc-approval', 'san-token', 'vascular-conference', 'cpr'],
      relatedProofSnippetIds: ['research-involvement', 'san-recognition', 'training-readiness'],
      relatedSkillGroupIndexes: [0, 3],
      faqKeys: ['ngo-ingo-fit', 'availability', 'relocation', 'document-verification'],
      ctaLabel: 'Contact for NGO / INGO Opportunities',
      ctaTarget: '/#contact',
      ctaVariant: 'contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Nurse for NGO / INGO Nepal', path: '/nurse-for-ngo-ingo-nepal/' },
      ],
    },
  ],
  privacyNotes: [
    'Sensitive identity documents such as citizenship and national ID card are excluded from this public portfolio.',
    'Full Nepal Nursing Council certificate scan is not publicly displayed because it contains personal identifiers.',
    'Only professional certificates, training records, experience letters, recognition records, and education proofs are included in the document gallery.',
  ],
};
