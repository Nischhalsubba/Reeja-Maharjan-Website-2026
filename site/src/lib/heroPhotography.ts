import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const originalFourK = new URL('../../public/images/reeja-lakeside-4k.webp', import.meta.url);

/**
 * Original source photo must be supplied by the photographer. The site does
 * not generate missing pixels by merely resizing its 600×338 thumbnail.
 * If a replacement asset is provided, validate its actual encoded dimensions.
 */
export const hasVerifiedHeroFourKAsset = existsSync(originalFourK);

if (hasVerifiedHeroFourKAsset) {
  const meta = await sharp(fileURLToPath(originalFourK)).metadata();
  if (!meta.width || !meta.height || meta.width < 3840 || meta.height < 2160) {
    throw new Error(
      `The new hero image is ${meta.width ?? '?'}×${meta.height ?? '?'}; a 4K hero requires at least 3840×2160 pixels. Provide the original high-resolution photograph.`
    );
  }
}

export const heroImageSrc = hasVerifiedHeroFourKAsset
  ? '/images/reeja-lakeside-4k.webp'
  : '/images/reeja-lakeside.webp';

export const heroImageSrcSet = hasVerifiedHeroFourKAsset
  ? '/images/reeja-lakeside.webp 600w, /images/reeja-lakeside-4k.webp 3840w'
  : undefined;
export const heroImageSizes = '(max-width: 790px) 100vw, 79vw';
