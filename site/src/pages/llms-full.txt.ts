import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import { getDesigns, readDesignFile, urls } from '../lib/site';

// A fence longer than any backtick run inside the content, so nested fences never close it early.
const fence = (body: string, lang: string) => {
  const longest = Math.max(2, ...(body.match(/`+/g) ?? []).map((m) => m.length));
  const f = '`'.repeat(longest + 1);
  return `${f}${lang}\n${body.replace(/\n$/, '')}\n${f}`;
};

export const GET: APIRoute = async () => {
  const designs = await getDesigns();
  const parts = [readFileSync('../PRINCIPLES.md', 'utf8').trim(), '', '# Designs', ''];
  for (const d of designs) {
    const u = urls(d);
    parts.push(
      `## ${d.data.title} (${d.id})`,
      '',
      `Source: ${u.html}`,
      `Notes: ${u.notes}`,
      '',
      `### ${d.id}/design.md`,
      '',
      fence(readDesignFile(d, 'design.md'), 'markdown'),
      '',
      `### ${d.id}/index.html`,
      '',
      fence(readDesignFile(d, 'index.html'), 'html'),
      '',
    );
  }
  return new Response(parts.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
