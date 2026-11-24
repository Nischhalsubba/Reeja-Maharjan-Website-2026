import type { APIRoute, GetStaticPaths } from 'astro';
import { blogPosts } from '../../../content/blog';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] ?? character);

const wrapTitle = (title: string): string[] => {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = `${line} ${word}`.trim();
    if (candidate.length > 34 && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
};

export const getStaticPaths = (() => blogPosts.map((post) => ({
  params: { slug: post.slug },
  props: { title: post.title, category: post.tags[0] ?? 'Nursing article' }
}))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { title, category } = props as { title: string; category: string };
  const lines = wrapTitle(title);
  const titleMarkup = lines.map((line, index) => `<text x="92" y="${247 + index * 76}" font-family="'Public Sans',Arial,Helvetica,sans-serif" font-size="62" font-weight="800" letter-spacing="-2" fill="#111111">${escapeXml(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)} by Reeja Maharjan">
    <rect width="1200" height="630" fill="#FAF8E9"/>
    <rect x="0" y="0" width="26" height="630" fill="#FFDF00"/>
    <rect x="920" y="0" width="280" height="630" fill="#FFDF00"/>
    <rect x="972" y="84" width="206" height="206" fill="none" stroke="#151515" stroke-width="2"/>
    <circle cx="1150" cy="500" r="188" fill="none" stroke="#BBA300" stroke-width="2"/>
    <text x="92" y="102" font-family="'Public Sans',Arial,Helvetica,sans-serif" font-size="28" font-weight="800" fill="#111111">Reeja Maharjan</text>
    <text x="92" y="162" font-family="'Public Sans',Arial,Helvetica,sans-serif" font-size="22" letter-spacing="3" font-weight="700" fill="#555555">${escapeXml(category.toUpperCase())}</text>
    ${titleMarkup}
    <line x1="92" y1="500" x2="865" y2="500" stroke="#B4B19F" stroke-width="2"/>
    <text x="92" y="544" font-family="'Public Sans',Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="#111111">BY REEJA MAHARJAN · REGISTERED NURSE</text>
    <text x="92" y="580" font-family="'Public Sans',Arial,Helvetica,sans-serif" font-size="19" fill="#555555">reejamaharjan.com.np</text>
  </svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
