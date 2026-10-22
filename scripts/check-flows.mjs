#!/usr/bin/env node
// Flow and link tester for designs (PRINCIPLES.md "No dead ends"). Node >=26 built-ins + system chromium.
//   node scripts/check-flows.mjs [slug ...] [--json]   check designs/<slug> (default: all except _*); exit 1 on failure
//   node scripts/check-flows.mjs --self-test           assert scripts/fixtures/bad fails and fixtures/good passes
// Serves designs/ like GitHub Pages (GET/HEAD only), then per design fails on: console errors or exceptions;
// href="#"; #fragment or aria-controls ids that do not exist; same-origin href/src outside the design folder or
// to missing files; external <a> without target="_blank" rel="noopener"; any visible link/button/summary click
// or sample-filled form submit that leaves the document, gets an HTTP >= 400 document, or logs an error;
// and, when the script defines runSelfTest, loading #selftest without a "SELFTEST PASS" log within 3s.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './lib/cdp.mjs';
import { serve } from './lib/serve.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const CLICKABLE = `[...document.querySelectorAll('a[href], button, [role=button], summary, input[type=submit], input[type=button]')].filter(e => e.checkVisibility())`;

// Collected in the live DOM so ids and links created by the page script count too.
const LINKS = `[...document.querySelectorAll('[href], [src], [aria-controls]')].map(el => {
  const raw = el.getAttribute('href') ?? el.getAttribute('src');
  const ids = (el.getAttribute('aria-controls') || '').split(/\\s+/);
  if (raw?.startsWith('#') && raw.length > 1) ids.push(decodeURIComponent(raw.slice(1)));
  let abs = null; try { abs = raw === null ? null : new URL(raw, document.baseURI).href; } catch {}
  return { tag: el.tagName.toLowerCase(), raw, abs, target: el.getAttribute('target'), rel: el.getAttribute('rel') || '',
    missing: ids.filter(id => id && !document.getElementById(id)) };
})`;

// Fills every empty or invalid field with a valid sample for its type, then submits like a user would.
const FILL = i => `(() => { const f = document.forms[${i}];
  for (const el of f.elements) {
    const t = (el.type || '').toLowerCase();
    if (el.disabled || el.readOnly || ['submit','button','reset','hidden','file','image','fieldset','output','select-multiple'].includes(t)) continue;
    if (t === 'checkbox' || t === 'radio') { if (el.required && !el.checked) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); } continue; }
    if (el.value && el.checkValidity()) continue;
    el.value = t === 'select-one' ? [...el.options].find(o => o.value)?.value ?? '' : { email: 'sam@example.com', tel: '+1 555 0100', url: 'https://example.com/', number: el.min || el.max || '1', range: el.min || '1',
      date: el.min || '2026-11-14', time: '10:30', 'datetime-local': '2026-11-14T10:30', month: '2026-11', week: '2026-W46', color: '#336699',
      password: 'Sample-pass-1', textarea: 'Sample note' }[t] ?? 'Sample text';
    el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const valid = f.noValidate || f.checkValidity(); f.requestSubmit(); return valid; })()`;

const sameDoc = u => { const x = new URL(u); return x.origin + x.pathname.replace(/index\.html$/, '') + x.search; };
const firstLine = s => String(s).split('\n')[0].slice(0, 160);

async function checkDesign(page, base, root, slug) {
  const url = `${base}/${slug}/index.html`, fails = [], notes = [], external = [];
  const fresh = async (hash = '') => { await page.goto('about:blank'); page.reset(); await page.goto(url + hash); };
  const errs = () => page.errors.filter(e => !e.url || e.url.startsWith(base)).map(e => `console error: ${firstLine(e.text)}`);
  const verdict = () => [
    ...page.navs.filter(u => sameDoc(u) !== sameDoc(url)).map(u => `left the page for ${u.replace(base, '')}`),
    ...page.docs.filter(d => d.status >= 400).map(d => `HTTP ${d.status} for ${d.url.replace(base, '')}`), ...errs()];

  await fresh();
  fails.push(...errs().map(e => `on load: ${e}`));

  for (const l of await page.evaluate(LINKS)) {
    const where = `<${l.tag}> ${l.raw ?? ''}`.trim();
    if (l.raw === '#') fails.push(`<${l.tag}> href="#" placeholder`);
    for (const id of l.missing) fails.push(`${where}: no element with id "${id}"`);
    if (!l.abs || l.raw.startsWith('#')) continue;
    const u = new URL(l.abs);
    if (u.protocol === 'javascript:') fails.push(`${where}: javascript: URL`);
    else if (u.origin === base) {
      const path = decodeURIComponent(u.pathname);
      let file = join(root, path);
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
      if (!path.startsWith(`/${slug}/`)) fails.push(`${where}: points outside the design folder`);
      else if (!existsSync(file)) fails.push(`${where}: missing file ${path}`);
    } else if (l.tag === 'a') {
      external.push(l.raw);
      if (/^https?:$/.test(u.protocol) && (l.target !== '_blank' || !/\bnoopener\b/.test(l.rel)))
        fails.push(`${where}: external link needs target="_blank" rel="noopener"`);
    }
  }

  const clickables = await page.evaluate(`${CLICKABLE}.map(e => ({
    label: (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().replace(/\\s+/g, ' ').slice(0, 50),
    tag: e.tagName.toLowerCase(), follow: e.target !== '_blank' && (typeof e.href !== 'string' || e.href.startsWith(location.origin)) }))`);
  for (const [i, c] of clickables.entries()) {
    if (!c.follow) continue; // external, mailto:, tel:, wa.me and new-tab links are recorded above, not followed
    await fresh(); page.reset();
    try { await page.evaluate(`${CLICKABLE}[${i}]?.click()`); } catch (e) { fails.push(`click <${c.tag}> "${c.label}": ${firstLine(e.message)}`); continue; }
    await page.waitFor(300);
    for (const v of new Set(verdict())) fails.push(`click <${c.tag}> "${c.label}": ${v}`);
  }

  const forms = await page.evaluate('document.forms.length');
  for (let i = 0; i < forms; i++) {
    await fresh(); page.reset();
    const label = await page.evaluate(`document.forms[${i}].id || document.forms[${i}].getAttribute('aria-label') || '#${i}'`);
    try { if (!await page.evaluate(FILL(i))) notes.push(`form ${label}: still invalid after sample fill, submit not exercised`); }
    catch (e) { fails.push(`form ${label}: ${firstLine(e.message)}`); continue; }
    await page.waitFor(300);
    for (const v of new Set(verdict())) fails.push(`submit form ${label}: ${v}`);
  }

  if (readFileSync(join(root, slug, 'index.html'), 'utf8').includes('runSelfTest')) {
    await fresh('#selftest');
    for (let t = 0; t < 30 && !page.logs.some(l => /SELFTEST (PASS|FAIL)/.test(l)); t++) await page.waitFor(100);
    if (!page.logs.some(l => l.includes('SELFTEST PASS'))) fails.push('#selftest did not log SELFTEST PASS within 3s');
    fails.push(...errs().map(e => `#selftest: ${e}`));
  }
  return { ok: fails.length === 0, fails: [...new Set(fails)], notes, external: [...new Set(external)], clicked: clickables.filter(c => c.follow).length, forms };
}

async function checkAll(root, slugs) {
  const server = await serve(root), page = await launch(), results = {};
  try { for (const slug of slugs) results[slug] = await checkDesign(page, server.url, root, slug); }
  finally { await page.close(); server.close(); }
  return results;
}

function report(results) {
  for (const [slug, r] of Object.entries(results)) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${slug}  (${r.clicked} clicks, ${r.forms} forms, ${r.external.length} external)`);
    for (const f of r.fails) console.log(`  x ${f}`);
    for (const n of r.notes) console.log(`  ? ${n}`);
  }
  const failed = Object.values(results).filter(r => !r.ok).length;
  console.log(`\n${Object.keys(results).length - failed} passed, ${failed} failed`);
}

const args = process.argv.slice(2);
if (args.includes('--self-test')) {
  const { bad, good } = await checkAll(join(here, 'fixtures'), ['bad', 'good']);
  report({ bad, good });
  const expect = { 'POST form gets 405': /submit form .*HTTP 405/, 'href="#"': /href="#"/, 'missing relative page': /missing file/,
    'console error': /console error: boom/, 'external link without rel': /external link needs/ };
  const missed = Object.entries(expect).filter(([, re]) => !bad.fails.some(f => re.test(f))).map(([k]) => k);
  if (missed.length || bad.ok || !good.ok) {
    console.error(`\nSELF-TEST FAILED${missed.length ? `: bad fixture not caught for ${missed.join(', ')}` : ''}${good.ok ? '' : '; good fixture failed'}`);
    process.exit(1);
  }
  console.log('\nSELF-TEST OK');
} else {
  const root = join(here, '..', 'designs');
  const slugs = args.filter(a => !a.startsWith('--'));
  if (!slugs.length) slugs.push(...readdirSync(root).filter(d => !d.startsWith('_') && existsSync(join(root, d, 'index.html'))).sort());
  const results = await checkAll(root, slugs);
  args.includes('--json') ? console.log(JSON.stringify(results, null, 2)) : report(results);
  process.exitCode = Object.values(results).every(r => r.ok) ? 0 : 1;
}
