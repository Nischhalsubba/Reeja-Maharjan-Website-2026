import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = new URL('../public/images/reeja-lakeside-4k.webp', import.meta.url);
const outputBase = new URL('../public/images/', import.meta.url);
const sizes = [960, 1440, 1920, 2560, 3840];

if (!existsSync(source)) {
  console.info('Original 4K lakeside photo not supplied. Keeping the existing approved 600px fallback.');
} else {
  const src = fileURLToPath(source);
  const metadata = await sharp(src).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 3840 || metadata.height < 2160) {
    throw new Error(
      `Lakeside 4K source is only ${metadata.width ?? '?'}×${metadata.height ?? '?'} pixels. Please upload the genuine full-resolution photo.`
    );
  }

  for (const width of sizes) {
    const output = fileURLToPath(new URL(`reeja-lakeside-${width}.webp`, outputBase));
    await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width >= 2560 ? 85 : 82, effort: 5 })
      .toFile(output);
    console.info(`Generated responsive lakeside photo ${width}px`);
  }
}
