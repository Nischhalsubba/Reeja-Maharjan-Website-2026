import { loadCached } from '../core/loader';

export const loadPopmotion = async () =>
  loadCached('engine:popmotion', async () => {
    const popmotion = await import('popmotion');
    return popmotion;
  });
