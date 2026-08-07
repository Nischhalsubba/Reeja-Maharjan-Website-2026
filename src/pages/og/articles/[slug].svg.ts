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
  const titleMarkup = lines.map((line, index) => `<text x="96" y="${250 + index * 82}" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#1C1917">${escapeXml(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)} by Reeja Maharjan"><rect width="1200" height="630" fill="#F4EFE6"/><rect x="52" y="52" width="1096" height="526" fill="#FBF8F2" stroke="#1C1917" stroke-width="2"/><text x="96" y="130" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="#8F3D32">${escapeXml(category.toUpperCase())}</text>${titleMarkup}<line x1="96" y1="500" x2="1104" y2="500" stroke="#C9B9A2" stroke-width="2"/><text x="96" y="548" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#263653">BY REEJA MAHARJAN · REGISTERED NURSE</text></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
