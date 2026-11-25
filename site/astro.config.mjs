// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { blogPosts } from './src/content/blog/index.ts';

// Only claim a modification date when supported by an editorial revision or
// the 25 November portfolio release. Do not use the build time as lastmod.
const revisedRoutes = new Set(['/', '/about/', '/education/', '/experience/', '/clinical-research/', '/maternal-health/', '/maternity-care/', '/nursing-practice/', '/cv/', '/hire-reeja/', '/contact/', '/blog/']);
const articleUpdates = new Map(blogPosts.map(post => [`/blog/${post.slug}/`, post.updatedAt]));

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://reejamaharjan.com.np',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap({
    // A sitemap is a list of canonical URLs intended for indexing. Internal
    // design previews and the custom 404 page are deliberately excluded.
    serialize: (item) => {
      const pathname = new URL(item.url).pathname;
      const lastmod = articleUpdates.get(pathname) ?? (revisedRoutes.has(pathname) ? '2026-11-25' : undefined);
      return lastmod ? { ...item, lastmod } : item;
    },
    filter: (page) => {
      const pathname = new URL(page).pathname;
      return !['/404/', '/404.html', '/design-system/', '/palette-studio/'].includes(pathname)
        && !pathname.startsWith('/og/');
    }
  })]
});
