export const qs = <T extends Element>(selector: string, parent: ParentNode = document): T | null =>
  parent.querySelector<T>(selector);

export const qsa = <T extends Element>(selector: string, parent: ParentNode = document): T[] =>
  Array.from(parent.querySelectorAll<T>(selector));
