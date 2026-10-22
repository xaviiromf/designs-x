import type { APIRoute } from 'astro';
import { abs, getDesigns, SECTIONS, SECTION_NAMES, urls } from '../lib/site';

const sentence = (s: string) => s.trim().replace(/\.$/, '') + '.';
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const GET: APIRoute = async () => {
  const designs = await getDesigns();
  const out = [
    '# designs-x',
    '',
    '> Original front-end sections (hero, features, pricing, testimonials, process, call to action, footer, portfolio, CRUD) as self-contained HTML and CSS files, each with a design.md that explains what it is for, why it works, what must not change, and how to adapt it.',
    '',
    'Pick a design by its section, then by the use_when and avoid_when lists in its design.md. Map the target brand onto the `:root` CSS custom properties first, replace the copy, and translate to the target stack last.',
    '',
    '## Principles',
    '',
    `- [Principles](${abs('PRINCIPLES.md')}): The taste behind the collection, the generated-design defaults it avoids, and the quality floor. Read it before using or making a design.`,
  ];
  for (const s of SECTIONS) {
    const items = designs.filter((d) => d.data.section === s);
    if (!items.length) continue;
    out.push('', `## ${SECTION_NAMES[s]}`, '');
    for (const d of items) {
      const u = urls(d);
      out.push(`- [${d.data.title}](${u.html}): ${sentence(d.data.subject)} ${cap(sentence(d.data.aesthetic))} ${cap(d.data.mode)} mode. Notes: ${u.notes}`);
    }
  }
  return new Response(out.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
