import { loadCached } from '../core/loader';

export const loadVelocity = async () =>
  loadCached('engine:velocity', async () => {
    const velocity = await import('velocity-animate');
    return velocity.default;
  });
