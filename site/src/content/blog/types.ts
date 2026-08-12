export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSource = {
  label: string;
  href: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  tags: string[];
  primaryKeyword: string;
  supportingKeywords: string[];
  quickAnswer: string[];
  intro: string[];
  sections: BlogSection[];
  faq: BlogFaq[];
  sources: BlogSource[];
  relatedSlugs: string[];
  cta: {
    title: string;
    text: string;
    label: string;
    href: string;
  };
  disclaimer: string;
};
