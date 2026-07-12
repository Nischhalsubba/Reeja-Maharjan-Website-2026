import { defineCollection } from 'astro:content';

const blog = defineCollection({
  loader: async () => [],
});

export const collections = { blog };
