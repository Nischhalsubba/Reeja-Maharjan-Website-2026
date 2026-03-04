import type { Profile, SeoPageContent } from '../../content/profile';

export function getHomepageKeywords(profile: Profile): string[] {
  return profile.seo.keywords ?? [];
}

export function getSeoPageKeywords(page: SeoPageContent): string[] {
  return page.keywords;
}

export function keywordCatalog(profile: Profile) {
  return profile.keywordTargets;
}

