import { professionalFacts } from './professional-facts';

const facts = professionalFacts;

export const recruiterCopy = {
  hero: {
    kicker: 'Registered Nurse · Maternal Health Research',
    titleBefore: 'Reeja Maharjan,',
    titleEmphasis: 'Registered Nurse',
    titleAfter: '',
    intro: 'Hospital nursing and maternal-health research experience in Nepal, with strengths in patient education, telemonitoring, documentation, and care coordination.',
    primaryCta: 'Discuss a role',
    secondaryCta: 'View CV',
    portraitTag: 'Reeja Maharjan'
  },
  focus: {
    kicker: '02 · Why Reeja',
    title: 'Clinical experience. Research discipline. Clear communication.',
    summary: 'A practical fit for hospitals, research teams, NGOs, INGOs, and health programmes.',
    areas: [
      {
        label: 'Maternal-health research',
        title: 'Participant support and telemonitoring.',
        summary: `Current ${facts.currentEmployerShort} experience on ${facts.currentProjectShort}.`,
        evidence: [
          'ANC screening and consent-workflow support',
          'Home BP/BG education and tele-follow-up'
        ],
        href: '/clinical-research/',
        cta: 'Research experience'
      },
      {
        label: 'Hospital nursing',
        title: 'Maternal-newborn and general care.',
        summary: 'Hospital experience across TUTH, MMTH, and Sindhuli Hospital.',
        evidence: [
          'Patient monitoring, education, and documentation',
          'Structured handover and team coordination'
        ],
        href: '/nursing-practice/',
        cta: 'Nursing experience'
      },
      {
        label: 'Communication & coordination',
        title: 'Clear guidance and dependable follow-up.',
        summary: 'Patient education, confidential records, follow-up, and multidisciplinary communication.',
        evidence: [
          'Patient and participant education',
          'Documentation, logistics, and care coordination'
        ],
        href: '/hire-reeja/',
        cta: 'Hire Reeja'
      }
    ]
  },
  experience: {
    kicker: '03 · Experience',
    title: 'Recent nursing and research work.',
    summary: 'A concise view of Reeja’s most relevant recent roles.',
    cta: 'View full CV'
  },
  credentials: {
    kicker: '04 · Credentials',
    title: 'Licenses and training employers can verify.',
    summary: 'Key credentials first. Supporting records are available privately to legitimate employers.'
  },
  writing: {
    kicker: '05 · Selected writing',
    title: 'Practical nursing and maternal-health writing.',
    summary: 'A small sample of Reeja’s professional writing.',
    cta: 'View all writing'
  },
  contact: {
    kicker: '06 · Work with Reeja',
    title: 'Have a role that fits Reeja?',
    summary: 'Send the role, location, timeline, and main responsibilities.',
    primaryCta: 'Discuss an opportunity',
    linkedinCta: 'LinkedIn'
  },
  hire: {
    eyebrow: 'Hire Reeja',
    heading: 'Hire Reeja Maharjan.',
    lede: 'Registered Nurse with hospital and maternal-health research experience in patient education, monitoring, documentation, tele-follow-up, and care coordination.',
    roleFitEyebrow: 'Best fit',
    roleFitHeading: 'Where Reeja can add value.',
    roleFitSummary: 'Strongest fit: teams that value safe care, clear communication, accurate records, and dependable follow-up.',
    experienceEyebrow: 'Experience',
    experienceHeading: 'Clinical and research experience.',
    experienceSummary: 'Hospital nursing plus current maternal-health research.',
    credentialsEyebrow: 'Credentials',
    credentialsHeading: 'Licenses and clinical training.',
    credentialsSummary: 'Verification is available privately to legitimate employers.',
    closingEyebrow: 'Next step',
    closingHeading: 'Have an opportunity for Reeja?',
    closingSummary: 'Share the role, location, timeline, and responsibilities.'
  }
} as const;
