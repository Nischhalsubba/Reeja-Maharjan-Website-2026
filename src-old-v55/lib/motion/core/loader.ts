type Loader<T> = () => Promise<T>;

const cache = new Map<string, Promise<unknown>>();

export const loadCached = async <T>(key: string, loader: Loader<T>): Promise<T> => {
  if (!cache.has(key)) {
    cache.set(key, loader());
  }
  return cache.get(key) as Promise<T>;
};
