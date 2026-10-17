import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import sharp from 'sharp';

const dist = new URL('../dist/', import.meta.url);
const root = new URL('../', import.meta.url);
const articleDir = new URL('og/articles/', dist);

async function rasterize(svgUrl, pngUrl) {
  const source = await readFile(svgUrl);
  await sharp(source, { density: 96, limitInputPixels: 20_000_000 })
    .resize(1200, 630, { fit: 'fill' })
    .png({ compressionLevel: 9, palette: true, quality: 95, effort: 9 })
    .toFile(pngUrl.pathname);
  const out = await stat(pngUrl);
  if (out.size < 1500) throw new Error(`OG PNG is unexpectedly small: ${pngUrl.pathname}`);
  console.log(`social image generated: ${pngUrl.pathname} (${out.size} bytes)`);
}

await rasterize(new URL('og-default.svg', dist), new URL('og-default.png', dist));
const files = (await readdir(articleDir)).filter((name) => name.endsWith('.svg'));
if (files.length < 5) throw new Error(`Expected article OG SVGs but found ${files.length}`);
await Promise.all(files.map((name) => rasterize(new URL(name, articleDir), new URL(name.replace(/\.svg$/, '.png'), articleDir))));
console.log(`Created ${files.length + 1} social PNG images.`);
