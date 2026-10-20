import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { resolve } from 'node:path';

const originalFourK = resolve(process.cwd(), 'public/images/reeja-lakeside-4k.webp');

/**
 * Original source photo must be supplied by the photographer. The site does
 * not generate missing pixels by merely resizing its 600×338 thumbnail.
 * If a replacement asset is provided, validate its actual encoded dimensions.
 */
export const hasVerifiedHeroFourKAsset = existsSync(originalFourK);

if (hasVerifiedHeroFourKAsset) {
  const meta = await sharp(originalFourK).metadata();
  if (!meta.width || !meta.height || meta.width < 3840 || meta.height < 2160) {
    throw new Error(
      `The new hero image is ${meta.width ?? '?'}×${meta.height ?? '?'}; a 4K hero requires at least 3840×2160 pixels. Provide the original high-resolution photograph.`
    );
  }
}

export const heroImageSrc = hasVerifiedHeroFourKAsset
  ? '/images/reeja-lakeside-1920.webp'
  : '/images/reeja-lakeside.webp';

export const heroImageSrcSet = hasVerifiedHeroFourKAsset
  ? [
      '/images/reeja-lakeside.webp 600w',
      ...[960, 1440, 1920, 2560, 3840].map(width => `/images/reeja-lakeside-${width}.webp ${width}w`)
    ].join(', ')
  : undefined;
export const heroImageSizes = '(max-width: 790px) 100vw, 79vw';
