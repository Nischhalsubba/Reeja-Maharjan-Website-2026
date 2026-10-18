import { access, readFile } from 'node:fs/promises';
import process from 'node:process';

const failures = [];
const retired = [
  'src/styles/portfolio-v4.css',
  'src/styles/contact-flow.css',
  'src/styles/home-recruiter.css',
  'src/styles/home-redesign.css',
  'src/styles/home-seo.css',
  'src/styles/layout.css',
  'src/styles/components.css',
  'src/styles/pages.css',
  'src/styles/blog.css',
  'src/styles/cv.css',
  'src/styles/care-ledger.css',
  'src/styles/care-ledger-refinements.css',
  'src/styles/care-practice.css',
  'src/styles/care-practice-audit.css',
  'src/styles/traffic-pages.css',
  'src/lib/portfolioMotion.ts',
  'src/lib/navSpy.ts',
  'src/lib/reveal.ts',
  'src/components/RecruiterHomepage.astro',
  'src/components/ImageLightbox.astro',
  'public/reeja-hero-cutout.png',
  'public/hero-bottom-overlay.svg',
  'public/og-image.png'
];
for (const file of retired) {
  try {
    await access(new URL('../' + file, import.meta.url));
    failures.push('Obsolete source/asset returned: ' + file);
  } catch {
    // Expected: confirmed unreferenced legacy artifact has been removed.
  }
}
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
for (const library of ['react', 'react-dom', '@astrojs/react', 'animejs', 'lenis', 'lottie-web', 'popmotion', 'motion', 'three', '@fontsource/source-serif-4']) {
  if (pkg.dependencies?.[library]) failures.push('Unused dependency reintroduced: ' + library);
}
for (const library of ['gsap', 'sharp', '@fontsource/public-sans']) {
  if (!pkg.dependencies?.[library]) failures.push('Required rendering dependency missing: ' + library);
}
const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
if (!layout.includes('class="care-personal-site"')) failures.push('Old page root class reintroduced.');
if (layout.includes('fonts.googleapis.com')) failures.push('External Google Fonts request reintroduced.');
if (!layout.includes("image = '/og-default.png'")) failures.push('Default social card must use raster PNG.');
const article = await readFile(new URL('../src/pages/blog/[slug].astro', import.meta.url), 'utf8');
if (!article.includes('/og/articles/${post.slug}.png')) failures.push('Article social card must use PNG.');
const renderer = await readFile(new URL('./render-social-cards.mjs', import.meta.url), 'utf8');
if (!renderer.includes('sharp') || !renderer.includes('reeja-headshot-')) failures.push('Responsive portrait/social raster generator missing.');
if (failures.length) {
  failures.forEach((failure) => console.error('- ' + failure));
  process.exit(1);
}
console.log('Care is Personal cleanup contract passed: retired UI code, unused packages, and obsolete visual assets remain absent.');
