import type { SeoPageContent } from '../../content/profile';

export function normalizeTitle(title: string): string {
  return title.trim();
}

export function normalizeDescription(description: string): string {
  return description.replace(/\s+/g, ' ').trim();
}

export function seoPageMeta(page: SeoPageContent) {
  return {
    title: normalizeTitle(page.title),
    description: normalizeDescription(page.description),
    keywords: page.keywords,
  };
}

