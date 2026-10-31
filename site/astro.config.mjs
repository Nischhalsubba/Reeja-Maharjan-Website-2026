// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
    filter: (page) => {
      const pathname = new URL(page).pathname;
      return !['/404/', '/404.html', '/design-system/', '/palette-studio/'].includes(pathname)
        && !pathname.startsWith('/og/');
    }
  })]
});
