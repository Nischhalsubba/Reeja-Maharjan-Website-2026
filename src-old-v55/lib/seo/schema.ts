import type { FaqItem, Profile, SeoPageContent } from '../../content/profile';

type BreadcrumbItem = {
  name: string;
  path: string;
};

function absUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildPersonSchema(profile: Profile, siteUrl: string) {
  const facts = profile.entityFacts;
  const personId = `${absUrl(siteUrl, '/') }#person`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: facts.fullName,
    jobTitle: facts.jobTitle,
    url: absUrl(siteUrl, '/'),
    sameAs: facts.sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: facts.baseLocation,
      addressCountry: facts.country,
    },
    knowsLanguage: facts.languages,
    alumniOf: facts.alumni.map((name) => ({ '@type': 'EducationalOrganization', name })),
    knowsAbout: facts.knowsAbout,
    award: facts.awards,
  };
}

export function buildProfilePageSchema(input: {
  url: string;
  title: string;
  description: string;
  personId: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: input.url,
    name: input.title,
    description: input.description,
    about: { '@id': input.personId },
    mainEntity: { '@id': input.personId },
  };
}

export function buildWebSiteSchema(input: { siteUrl: string; name: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: absUrl(input.siteUrl, '/'),
    name: input.name,
  };
}

export function buildBreadcrumbSchema(input: { items: BreadcrumbItem[]; siteUrl: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: input.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absUrl(input.siteUrl, item.path),
    })),
  };
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildSeoLandingProfileSchema(input: {
  page: SeoPageContent;
  profile: Profile;
  url: string;
  siteUrl: string;
  faqs?: FaqItem[];
}) {
  const person = buildPersonSchema(input.profile, input.siteUrl);
  const personId = String(person['@id']);

  const schemas: Record<string, unknown>[] = [
    person,
    buildProfilePageSchema({
      url: input.url,
      title: input.page.title,
      description: input.page.description,
      personId,
    }),
    buildBreadcrumbSchema({
      siteUrl: input.siteUrl,
      items: input.page.breadcrumbs,
    }),
  ];

  if (input.faqs && input.faqs.length > 0) {
    schemas.push(buildFaqSchema(input.faqs));
  }

  return schemas;
}

