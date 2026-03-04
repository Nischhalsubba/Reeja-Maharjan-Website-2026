export type MotionPreference = 'system' | 'on' | 'off';

const STORAGE_KEY = 'reeja-motion-preference';

const getSystemReduced = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getMotionPreference = (): MotionPreference => {
  if (typeof window === 'undefined') return 'system';
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === 'on' || value === 'off' || value === 'system') return value;
  return 'system';
};

export const setMotionPreference = (value: MotionPreference): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, value);
};

export const shouldReduceMotion = (): boolean => {
  const preference = getMotionPreference();
  if (preference === 'off') return true;
  if (preference === 'on') return false;
  return getSystemReduced();
};

export const applyMotionClassState = (): boolean => {
  const reduced = shouldReduceMotion();
  document.documentElement.classList.toggle('reduce-motion', reduced);
  return reduced;
};
