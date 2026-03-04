import { loadCached } from '../core/loader';

export const loadAnime = async () =>
  loadCached('engine:anime', async () => {
    const anime = await import('animejs');
    return anime;
  });
