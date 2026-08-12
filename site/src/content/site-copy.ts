import { professionalFacts } from './professional-facts';

const facts = professionalFacts;

export const siteCopy = {
  updatedAt: '2026-08-07',
  siteName: facts.name,
  siteDescriptor: 'Registered Nurse · Maternal Health Research',
  websiteName: 'Reeja Maharjan | Nursing & Maternal Health Research',
  defaultTitle: `${facts.name} | Registered Nurse & Maternal Health Research Assistant`,
  defaultDescription: `Official professional portfolio of ${facts.name}, ${facts.credential}, ${facts.nepalLicense}, active Texas RN, and ${facts.currentEmployerShort} maternal-health ${facts.currentRole} in ${facts.currentLocation}.`,
  profileSummary: `${facts.name}, ${facts.credential}, is a ${facts.nepalLicense} with an ${facts.texasLicense}. Her experience includes hospital nursing at Tribhuvan University Teaching Hospital, Manmohan Memorial Medical College & Teaching Hospital, and Sindhuli Hospital, alongside current maternal-health research work with ${facts.currentEmployerShort} on the ${facts.currentProject}. Her work includes patient and participant education, BP/BG monitoring support, tele-follow-up, documentation, data-quality checks, handover, escalation support, and multidisciplinary coordination.`,
  seoTopics: [
    'Registered nursing',
    'Maternal health',
    'Maternal and newborn care',
    'Clinical documentation',
    'Patient education',
    'Telemonitoring',
    'Blood pressure monitoring',
    'Blood glucose monitoring',
    'Research participant follow-up',
    'Clinical research coordination',
    'Nursing handover',
    'Health programme support'
  ],
  navigation: [
    { href: '/#experience', label: 'Experience' },
    { href: '/clinical-research/', label: 'Research' },
    { href: '/maternal-health/', label: 'Maternal Health' },
    { href: '/nursing-practice/', label: 'Nursing' },
    { href: '/blog/', label: 'Writing' },
    { href: '/cv/', label: 'CV' }
  ],
  home: {
    title: `${facts.name} | Registered Nurse & Maternal Health Research Assistant`,
    description: `${facts.name} is an NNC licensed Registered Nurse, active Texas RN, and IISH MOM-HD Research Assistant with hospital nursing, maternal-health research, patient education, telemonitoring, and documentation experience in Nepal.`,
    hero: {
      kicker: `${facts.name} · ${facts.credential}`,
      titleBefore: `${facts.name} is a`,
      titleEmphasis: 'Registered Nurse',
      titleAfter: 'working across clinical care and maternal-health research.',
      intro: `Reeja combines hospital nursing experience in Nepal with current research work on the ${facts.currentEmployerShort} ${facts.currentProject}. Her day-to-day work includes participant education, BP/BG monitoring support, tele-follow-up, documentation, data-quality checks, and care coordination.`,
      primaryCta: 'Contact Reeja',
      secondaryCta: 'View Reeja’s CV',
      portraitTag: 'Reeja Maharjan · Professional portrait',
      portraitNote: 'Her hospital and research roles share the same priorities: clear communication, accurate records, timely follow-up, and safe escalation.'
    },
    focus: {
      kicker: '02 · What Reeja does',
      title: 'Nursing practice and research, connected by clear communication.',
      summary: 'Reeja’s experience spans hospital care and maternal-health implementation research, with a consistent focus on patient education, documentation, follow-up, and coordinated care.',
      areas: [
        {
          label: 'Maternal-health research',
          title: 'Participant support, telemonitoring, and careful follow-up.',
          summary: `In her current ${facts.currentEmployerShort} role, Reeja supports maternal-health research workflows that combine participant communication, home monitoring, digital records, and protocol-based escalation.`,
          evidence: [
            'ANC participant screening and consent-workflow support',
            'Home blood-pressure and blood-glucose monitoring education',
            'Tele-follow-up, warning-sign screening, and protocol-based escalation',
            'Study documentation and data-quality checks'
          ],
          scope: 'Research responsibilities are performed within the documented study role and clinical governance structure.',
          href: '/clinical-research/',
          cta: 'Explore Reeja’s research work'
        },
        {
          label: 'Hospital nursing',
          title: 'Patient care, communication, and dependable documentation.',
          summary: 'Reeja’s hospital experience includes maternal-newborn and general-care nursing, patient and family education, monitoring, structured handover, and day-to-day ward coordination.',
          evidence: [
            'Maternal-newborn and general-care hospital experience',
            'Clinical observation, monitoring, and documentation',
            'Structured handover and multidisciplinary communication',
            'Patient and family education'
          ],
          scope: 'Clinical practice remains subject to employer credentialing, local regulation, orientation, and assigned scope.',
          href: '/nursing-practice/',
          cta: 'Review Reeja’s nursing practice'
        },
        {
          label: 'Patient education & coordination',
          title: 'Clear guidance and follow-up across care settings.',
          summary: 'Reeja’s work repeatedly involves explaining care, reinforcing monitoring plans, maintaining confidential records, and coordinating next steps with patients, participants, families, and clinical teams.',
          evidence: [
            'Patient and participant education',
            'Remote follow-up and monitoring support',
            'Device distribution and tracking workflows',
            'Confidential documentation and team coordination'
          ],
          scope: 'International licensure is presented as a professional credential and does not represent work authorisation or independent practice authority.',
          href: '/contact/',
          cta: 'Discuss a role with Reeja'
        }
      ]
    },
    experience: {
      kicker: '03 · Experience',
      title: 'Reeja’s nursing and research experience.',
      summary: 'Her recent roles show a clear progression from hospital nursing to maternal-health research, while keeping patient communication, documentation, and safe follow-up at the centre.',
      cta: 'View Reeja’s full CV'
    },
    credentials: {
      kicker: '04 · Licenses & training',
      title: 'Reeja’s professional credentials.',
      summary: 'Public summaries show the credential, issuer, and status without publishing sensitive verification documents. Legitimate employers can request supporting records privately.'
    },
    writing: {
      kicker: '05 · Writing',
      title: 'Nursing and maternal-health articles by Reeja.',
      summary: 'Reeja writes practical, source-linked articles on maternal-newborn care, nursing communication, documentation, digital health, and professional development.',
      cta: 'Read all articles by Reeja'
    },
    contact: {
      kicker: '06 · Contact Reeja',
      title: 'Talk with Reeja about a nursing or research opportunity.',
      summary: 'Share the organisation, role or project, location, expected timing, and main responsibilities. Relevant credential verification can be provided privately when appropriate.',
      primaryCta: 'Send Reeja a message',
      linkedinCta: 'View Reeja on LinkedIn'
    }
  },
  hire: {
    title: `${facts.name} | Nursing & Maternal Health Research Profile`,
    description: `Review ${facts.name}'s nursing experience, maternal-health research work, NNC registration, active Texas RN license, hospital background, and availability for suitable clinical and research roles.`,
    eyebrow: 'Professional profile',
    heading: `${facts.name} for nursing, maternal-health research, and health-programme roles.`,
    lede: `Reeja combines hospital nursing experience with current research support on the ${facts.currentEmployerShort} ${facts.currentProject}. Her strengths include patient and participant education, monitoring, documentation, tele-follow-up, handover, and coordinated escalation.`,
    roleFitEyebrow: 'Where Reeja fits',
    roleFitHeading: 'Roles where Reeja’s experience is most relevant.',
    roleFitSummary: 'Her strongest fit is work that values patient safety, clear communication, accurate records, participant support, and dependable coordination.',
    experienceEyebrow: 'Experience',
    experienceHeading: 'Reeja’s clinical and research record.',
    experienceSummary: 'Her background includes hospital nursing, maternal-newborn support, patient education, structured handover, implementation-research support, home-monitoring education, and tele-follow-up.',
    credentialsEyebrow: 'Credentials',
    credentialsHeading: 'Reeja’s licenses and clinical training.',
    credentialsSummary: 'Sensitive documents are not published publicly. Verification can be shared privately with legitimate employers after an appropriate first conversation.',
    closingEyebrow: 'Next step',
    closingHeading: 'Have a role or project in mind for Reeja?',
    closingSummary: 'Send the organisation, position or project, location, expected timing, and main responsibilities through the contact page.'
  },
  research: {
    title: `${facts.name} | Maternal Health Research & Telemonitoring`,
    description: `${facts.name}'s maternal-health research experience includes ANC participant screening support, BP/BG monitoring education, tele-follow-up, study documentation, data-quality checks, and multidisciplinary coordination with IISH MOM-HD.`,
    eyebrow: 'Maternal-health research',
    heading: `${facts.name}’s maternal-health research work with IISH.`,
    lede: `As a ${facts.currentRole} on the ${facts.currentProject} in ${facts.currentLocation}, Reeja supports participant screening, home BP/BG education, tele-follow-up, documentation, data review, device workflows, and protocol-based coordination.`,
    summary: [
      ['Current role', `${facts.currentRole}, ${facts.currentEmployerShort}`],
      ['Project', facts.currentProjectShort],
      ['Research focus', 'Hypertension and diabetes in pregnancy'],
      ['Location', facts.currentLocation]
    ],
    responsibilitiesEyebrow: 'Research responsibilities',
    responsibilitiesHeading: 'How Reeja supports the MOM-HD research workflow.',
    responsibilitiesSummary: 'Her role connects participant communication with careful records, monitoring support, and timely escalation to the appropriate clinical or research team.',
    responsibilities: [
      ['Participant screening', 'Supports ANC participant screening, eligibility workflows, consent-process support, and organised study records.'],
      ['Home monitoring education', 'Supports participant and family education on home blood-pressure and blood-glucose measurement, device use, and mobile reporting.'],
      ['Tele-follow-up', 'Reviews uploaded readings, supports scheduled follow-up, screens warning symptoms, reinforces adherence, and escalates concerns according to protocol.'],
      ['Data quality', 'Maintains digital study records and supports data-quality checks while following confidentiality requirements.'],
      ['Device coordination', 'Supports distribution, participant use, tracking, and return workflows for monitoring devices.'],
      ['Team communication', 'Coordinates with nurses, obstetricians, researchers, hospital staff, and technical teams around participant follow-up and study operations.']
    ],
    relevanceEyebrow: 'Role relevance',
    relevanceHeading: 'Experience relevant to maternal-health research and health programmes.',
    relevanceSummary: 'Reeja’s current work is especially relevant to roles that need participant education, accurate documentation, digital-health support, follow-up, logistics, and multidisciplinary coordination.',
    closingEyebrow: 'Contact Reeja',
    closingHeading: 'Discuss maternal-health research or programme work with Reeja.',
    closingSummary: 'Share the organisation, study or programme, location, expected contract period, responsibilities, and preferred next step.'
  },
  maternalHealth: {
    title: `${facts.name} | Maternal Health Nursing & Newborn Care`,
    description: `Explore ${facts.name}'s maternal-health nursing and research focus, including maternal-newborn hospital experience, IISH MOM-HD telemonitoring work, patient education, and source-linked care articles.`,
    eyebrow: 'Maternal health',
    heading: `Maternal health is central to ${facts.name}’s nursing and research work.`,
    lede: 'Reeja’s background combines maternal-newborn hospital care with current maternal-health research, participant education, home monitoring support, tele-follow-up, and practical public education for families and nurses.',
    summary: [
      ['Clinical background', 'Maternal-newborn and general-care hospital nursing'],
      ['Current research', facts.currentProjectShort],
      ['Education focus', 'Postnatal care, newborn support, feeding, warning signs, and follow-up']
    ],
    guidesEyebrow: 'Articles by Reeja',
    guidesHeading: 'Maternal-health and newborn-care articles.',
    guidesSummary: 'These articles are written for general education, cite external sources, show editorial review information, and keep medical-safety boundaries visible.',
    closingEyebrow: 'Reeja’s professional work',
    closingHeading: 'Explore Reeja’s maternal-health research experience.',
    closingSummary: 'Review her current IISH MOM-HD work, hospital nursing background, licenses, and contact information.'
  },
  nursing: {
    title: `${facts.name} | Nursing Practice, Documentation & Patient Education`,
    description: `Explore ${facts.name}'s nursing practice focus, including patient education, documentation, SBAR-style handover, confidentiality, clinical communication, maternal-newborn care, and professional development.`,
    eyebrow: 'Nursing practice',
    heading: `How ${facts.name} approaches nursing practice.`,
    lede: 'Reeja’s hospital and research work is grounded in clear patient communication, accurate documentation, structured handover, careful monitoring, timely escalation, and practical education for patients and families.',
    summary: [
      ['Patient communication', 'Education, counselling, handover, and escalation'],
      ['Documentation', 'Clear, timely records that support continuity of care'],
      ['Professional development', 'Licensure, clinical training, ethics, and continuing learning']
    ],
    guidesEyebrow: 'Articles by Reeja',
    guidesHeading: 'Nursing-practice articles and career notes.',
    guidesSummary: 'Reeja’s writing focuses on practical habits that support patient safety, continuity of care, professional accountability, and clearer clinical communication.',
    closingEyebrow: 'Professional profile',
    closingHeading: 'Review Reeja’s nursing experience and credentials.',
    closingSummary: 'See her hospital roles, current research work, licenses, clinical training, and availability for suitable nursing and health-programme opportunities.'
  },
  contact: {
    title: `Contact ${facts.name} | Nursing & Research Opportunities`,
    description: `Contact ${facts.name} about hospital nursing, maternal-health research, clinical research, NGO/INGO health programmes, patient education, telemonitoring, or care-coordination opportunities.`,
    eyebrow: 'Contact Reeja',
    heading: `Contact ${facts.name} about nursing or maternal-health research work.`,
    intro: 'A clear first message is enough. Share the organisation, role or project, location, expected timing, and the main responsibilities so Reeja can understand the opportunity before any private documents are exchanged.',
    guidanceEyebrow: 'A useful first message',
    guidanceHeading: 'What helps Reeja respond quickly',
    guidanceItems: [
      'Organisation, hospital, research team, NGO, or INGO',
      'Role, project, or programme title',
      'Location and working arrangement',
      'Expected start date or contract period',
      'Main responsibilities and preferred next step'
    ],
    recordsEyebrow: 'Credentials & records',
    recordsHeading: 'Need to review Reeja’s background first?',
    recordsText: 'The public CV summarises Reeja’s licensure, clinical training, education, hospital experience, and current research role. Sensitive verification documents are shared privately where appropriate.',
    channelsEyebrow: 'Other ways to reach Reeja'
  },
  cv: {
    title: `${facts.name} CV | Registered Nurse & Research Assistant`,
    description: `Professional CV of ${facts.name}, ${facts.credential}, NNC licensed Registered Nurse, active Texas RN, and IISH maternal-health Research Assistant with hospital nursing and telemonitoring experience.`,
    eyebrow: `${facts.name} · Professional CV`,
    lede: `${facts.name}, ${facts.credential}, is a ${facts.nepalLicense} with an ${facts.texasLicense} and current maternal-health research experience with ${facts.currentEmployerShort} in ${facts.currentLocation}.`,
    profileEyebrow: 'Professional profile',
    profileHeading: 'Registered Nurse with hospital and maternal-health research experience.',
    experienceEyebrow: 'Professional experience',
    experienceHeading: 'Reeja’s nursing and research experience.',
    credentialsEyebrow: 'Licenses & clinical training',
    credentialsHeading: 'Reeja’s professional credentials.',
    credentialsSummary: 'Verification documents are available privately to legitimate employers. Sensitive records are not published on the public site.',
    educationHeading: 'Nursing education and academic background.',
    closingEyebrow: 'Contact Reeja',
    closingHeading: 'Interested in Reeja’s nursing or research experience?',
    closingSummary: 'Send the role, organisation, location, expected timing, and responsibilities through the contact page.'
  },
  blog: {
    title: `Nursing & Maternal Health Articles by ${facts.name}`,
    description: `Read nursing and maternal-health articles by ${facts.name}, Registered Nurse and maternal-health Research Assistant in Nepal, covering maternal-newborn care, documentation, SBAR handover, confidentiality, telehealth, and nursing careers.`,
    eyebrow: 'Writing by Reeja Maharjan',
    heading: `Nursing and maternal-health articles by ${facts.name}.`,
    lede: 'Reeja writes practical, source-linked articles for nurses, students, patients, and families. Each clinical article includes its audience, sources, update date, safety note, and review status.',
    hubEyebrow: 'Featured & topic guides',
    hubHeading: 'Start with a featured article or browse Reeja’s writing by topic.',
    hubSummary: 'The library is organised around maternal health, nursing practice, and research or digital-health topics rather than publishing unrelated search-driven content.',
    allEyebrow: 'All writing',
    allHeading: 'All articles by Reeja.'
  },
  footer: {
    eyebrow: 'Reeja Maharjan · Registered Nurse',
    statement: `${facts.name} is a ${facts.credential} graduate, ${facts.nepalLicense}, active Texas RN, and maternal-health ${facts.currentRole} with ${facts.currentEmployerShort} in ${facts.currentLocation}.`,
    exploreLabel: 'Explore Reeja’s work',
    contactLabel: 'Contact Reeja',
    legal: 'Professional portfolio for nursing, maternal-health research, and health-programme opportunities.'
  },
  notFound: {
    title: `Page Not Found | ${facts.name}`,
    description: `The requested page on ${facts.name}'s nursing and maternal-health research portfolio could not be found.`,
    eyebrow: 'Page not found',
    heading: 'That page is not part of Reeja’s current portfolio.',
    lede: 'The link may be outdated or the page may have moved. Return to Reeja’s profile or browse her nursing and maternal-health articles.'
  }
} as const;
