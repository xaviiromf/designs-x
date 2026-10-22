import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';

import { SECTIONS } from './sections';
export { SECTIONS, SECTION_NAMES, type Section } from './sections';

export const REPO = 'https://github.com/xaviiromf/designs-x';
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
/** Site-relative link, e.g. href('d/foo/') -> /designs-x/d/foo/ */
export const href = (p = '') => BASE + p;
/** Absolute URL, e.g. abs('llms.txt') -> https://xaviiromf.github.io/designs-x/llms.txt */
export const abs = (p = '') => new URL(href(p), import.meta.env.SITE).href;

export type Design = CollectionEntry<'designs'>;

export async function getDesigns(): Promise<Design[]> {
  const all = await getCollection('designs');
  return all.sort(
    (a, b) => SECTIONS.indexOf(a.data.section) - SECTIONS.indexOf(b.data.section) || a.data.title.localeCompare(b.data.title),
  );
}

/** Reads a sibling file of the design's design.md from the source folder (cwd is site/ during build). */
export const designFile = (d: Design, name: string) => resolve(dirname(d.filePath!), name);
export const readDesignFile = (d: Design, name: string) => {
  const f = designFile(d, name);
  return existsSync(f) ? readFileSync(f, 'utf8') : '';
};
export const hasPreview = (d: Design) => existsSync(designFile(d, 'preview.png'));

/** library: needs GSAP, Lenis or another non-vanilla library; vanilla: plain JS; none: HTML and CSS only. */
export const runtime = (d: Design) => (d.data.libraries.length ? 'library' : d.data.js.trim() === 'none' ? 'none' : 'vanilla');

export const urls = (d: Design) => ({
  page: abs(`d/${d.id}/`),
  html: abs(`designs/${d.id}/index.html`),
  notes: abs(`designs/${d.id}/design.md`),
  preview: abs(`designs/${d.id}/preview.png`),
  github: `${REPO}/tree/main/designs/${d.id}`,
});
