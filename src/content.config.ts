import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      client: z.string(),
      year: z.number(),
      role: z.string(),
      summary: z.string(),
      heroImage: image(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };
