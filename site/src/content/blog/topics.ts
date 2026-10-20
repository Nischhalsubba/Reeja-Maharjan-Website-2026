/**
 * Single source of truth for editorial topic archives.
 * Matching is descriptive, not a clinical classification or medical recommendation.
 */
export const blogTopics = [
  {
    slug: 'maternal-health',
    label: 'Maternal health',
    summary: 'Maternal recovery, newborn care, postpartum counselling, feeding support and warning signs.',
    relatedHref: '/maternal-health/',
    relatedLabel: 'Explore maternal-health practice',
    pattern: /maternal|newborn|postnatal|postpartum|breastfeeding|pregnan|mother/i
  },
  {
    slug: 'nursing-practice',
    label: 'Nursing practice',
    summary: 'Documentation, SBAR handover, confidentiality, ward communication and professional nursing.',
    relatedHref: '/nursing-practice/',
    relatedLabel: 'Explore clinical nursing',
    pattern: /nursing|documentation|sbar|handover|confidential|clinical communication/i
  },
  {
    slug: 'research-and-digital-health',
    label: 'Research & digital health',
    summary: 'Telehealth, maternal-health research, licensure, community care and professional development.',
    relatedHref: '/clinical-research/',
    relatedLabel: 'Explore Reeja’s research',
    pattern: /career|license|licensure|telehealth|digital|research|community|monitoring/i
  }
] as const;

export type BlogTopic = (typeof blogTopics)[number];

export function articleMatchesBlogTopic(
  post: { primaryKeyword: string; supportingKeywords: readonly string[]; tags: readonly string[]; title: string },
  topic: BlogTopic
): boolean {
  return topic.pattern.test([post.primaryKeyword, ...post.supportingKeywords, ...post.tags, post.title].join(' '));
}
