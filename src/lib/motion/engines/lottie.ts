import { loadCached } from '../core/loader';

export const loadLottie = async () =>
  loadCached('engine:lottie', async () => {
    const mod = await import('lottie-web');
    return mod.default;
  });
