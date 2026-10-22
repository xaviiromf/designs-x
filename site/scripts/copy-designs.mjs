// Copies ../designs/<slug>/ (except "_*") and ../PRINCIPLES.md into public/ so the raw files are served as-is.
// DESIGNS_DIR overrides the source folder (used to test the build against fake designs).
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const site = resolve(import.meta.dirname, '..');
const src = resolve(site, process.env.DESIGNS_DIR ?? '../designs');
const out = resolve(site, 'public/designs');

rmSync(out, { recursive: true, force: true }); // drop designs that were removed or renamed
mkdirSync(out, { recursive: true });
const slugs = existsSync(src)
  ? readdirSync(src, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_')).map((d) => d.name)
  : [];
for (const slug of slugs) cpSync(resolve(src, slug), resolve(out, slug), { recursive: true });
cpSync(resolve(site, '../PRINCIPLES.md'), resolve(site, 'public/PRINCIPLES.md'));
console.log(`copy-designs: ${slugs.length} design(s) from ${src}`);
