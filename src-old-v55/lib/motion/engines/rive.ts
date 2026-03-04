import { loadCached } from '../core/loader';

export const loadRive = async () =>
  loadCached('engine:rive', async () => {
    const rive = await import('@rive-app/canvas');
    return rive;
  });
