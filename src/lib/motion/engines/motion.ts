import { loadCached } from '../core/loader';

export const loadMotion = async () =>
  loadCached('engine:motion', async () => {
    const motion = await import('motion');
    return motion;
  });
