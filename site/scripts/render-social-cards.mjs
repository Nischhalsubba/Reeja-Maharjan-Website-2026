/**
 * Turn the site-owned SVG social designs into universally compatible PNG cards.
 * Astro brings Sharp as its standard optional image service. Fail the build if
 * PNG output cannot be generated: social previews must never silently break.
 */
import sharp from 'sharp';
import { readFile, readdir, mkdir, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
const dist = resolve('dist');
const source = [join(dist, 'og-default.svg')];
const articleDirectory = join(dist, 'og', 'articles');
for (const file of await readdir(articleDirectory)) {
  if (file.endsWith('.svg')) source.push(join(articleDirectory, file));
}
for (const file of source) {
  const output = file.replace(/\.svg$/, '.png');
  await mkdir(dirname(output), { recursive: true });
  const svg = await readFile(file);
  await sharp(svg, { density: 96 })
    .resize(1200, 630, { fit: 'fill' })
    .flatten({ background: '#f0f1ff' })
    .png({ compressionLevel: 9, palette: true, effort: 8 })
    .toFile(output);
  const result = await stat(output);
  if (result.size < 1000) throw new Error('Generated social card is missing or suspiciously small: ' + output);
  console.log('Social preview generated:', output.replace(dist, ''), result.size, 'bytes');
}
if (source.length < 2) throw new Error('Missing article social preview SVG sources');

/* Responsive self-hosted WebP variants for the approved real portrait. */
const portraitSource = resolve('public/reeja-headshot.jpg');
for (const width of [360, 720, 960]) {
  const output = join(dist, `reeja-headshot-${width}.webp`);
  await sharp(portraitSource)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(output);
  if ((await stat(output)).size < 1000) throw new Error('Invalid portrait variant ' + output);
}
console.log('Generated three responsive WebP portraits for the homepage.');
