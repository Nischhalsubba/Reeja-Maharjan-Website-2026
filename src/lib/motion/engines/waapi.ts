type KeyframeSet = Keyframe[] | PropertyIndexedKeyframes;

export const isWAAPISupported = (): boolean =>
  typeof Element !== 'undefined' && 'animate' in Element.prototype;

export const animateWithWAAPI = (
  element: Element,
  keyframes: KeyframeSet,
  options: KeyframeAnimationOptions
): Animation | null => {
  if (!isWAAPISupported()) return null;
  return element.animate(keyframes, options);
};
