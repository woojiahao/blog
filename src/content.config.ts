import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts/blog" }),
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    pinned: z.boolean().optional().default(false),
  })
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts/notes" }),
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    pinned: z.boolean().optional().default(false),
    url: z.string().url(),
  })
});

const recommendations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts/recommendations" }),
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional().default([]),
    pinned: z.boolean().optional().default(false),
    url: z.string().url(),
  })
});

const shorts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts/shorts" }),
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional().default([]),
    pinned: z.boolean().optional().default(false),
  })
});

const talks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts/talks" }),
  schema: z.object({
    draft: z.boolean().optional().default(true),
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    pinned: z.boolean().optional().default(false),
    url: z.string().url(),
  })
});

export const collections = { blog, notes, recommendations, shorts, talks };
