import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each project is one Markdown file in src/content/projects/.
// Astro checks every file's frontmatter against this schema at build time,
// so a missing title or a misspelled field fails loudly instead of silently.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tools: z.array(z.string()).min(1),
    // Featured ("star") projects are shown first.
    featured: z.boolean().default(false),
    demoUrl: z.url().optional(),
    codeUrl: z.url().optional(),
  }),
});

export const collections = { projects };
