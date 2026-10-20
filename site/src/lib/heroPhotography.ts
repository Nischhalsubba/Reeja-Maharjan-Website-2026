import { existsSync } from 'node:fs';

/**
 * True high-resolution photographs must be sourced from Reeja's original
 * camera/export files. Never upsample the 600px website thumbnail as if it
 * contained 4K detail. Add a genuine >=3840px wide WebP export at
 * public/images/reeja-lakeside-4k.webp and rebuild to enable it.
 */
export const hasVerifiedHeroFourKAsset = existsSync(
  new URL('../../public/images/reeja-lakeside-4k.webp', import.meta.url)
);

export const heroImageSrc = hasVerifiedHeroFourKAsset
  ? '/images/reeja-lakeside-4k.webp'
  : '/images/reeja-lakeside.webp';

export const heroImageSrcSet = hasVerifiedHeroFourKAsset
  ? '/images/reeja-lakeside.webp 600w, /images/reeja-lakeside-4k.webp 3840w'
  : undefined;
export const heroImageSizes = '(max-width: 790px) 100vw, 79vw';
