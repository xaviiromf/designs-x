import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SECTIONS } from './lib/sections';

const designs = defineCollection({
  // DESIGNS_DIR overrides the source folder (used to test the build against fake designs).
  loader: glob({
    base: process.env.DESIGNS_DIR ?? '../designs',
    pattern: ['*/design.md', '!_*/**'],
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    section: z.enum(SECTIONS),
    subject: z.string(),
    aesthetic: z.string(),
    mode: z.enum(['light', 'dark']),
    fonts: z.array(z.string()),
    js: z.string(),
    libraries: z.array(z.string()).default([]),
    tags: z.array(z.string()),
    use_when: z.array(z.string()),
    avoid_when: z.array(z.string()),
  }),
});

const principles = defineCollection({
  loader: glob({ base: '..', pattern: 'PRINCIPLES.md' }),
});

export const collections = { designs, principles };
