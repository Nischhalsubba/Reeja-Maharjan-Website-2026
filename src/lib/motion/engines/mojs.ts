import { loadCached } from '../core/loader';

export const loadMojs = async () =>
  loadCached('engine:mojs', async () => {
    const mojs = await import('@mojs/core');
    return mojs;
  });
