// Capture how a page moves: frames during load, wheel-scroll and hover, composed into contact sheets.
// Usage: node scripts/motion.mjs <url | design-slug> <out-dir> [--width 1440] [--height 900] [--steps 10]
// Writes <out-dir>/load.png, scroll.png, hover.png (grids of labelled frames) and report.json (libraries, errors).
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launch } from './lib/cdp.mjs';
import { serve } from './lib/serve.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? Number(args[i + 1]) : d; };
const [target, outArg] = args;
if (!target || !outArg) { console.error('usage: node scripts/motion.mjs <url|slug> <out-dir>'); process.exit(2); }
const W = opt('width', 1440), H = opt('height', 900), STEPS = opt('steps', 10);
const out = resolve(outArg); mkdirSync(out, { recursive: true });

let server, url = target;
if (!/^https?:\/\//.test(target)) {
  if (!existsSync(resolve('designs', target, 'index.html'))) { console.error(`no design ${target}`); process.exit(2); }
  server = await serve(resolve('designs')); url = `${server.url}/${target}/index.html`;
}

const page = await launch({ width: W, height: H });
const shot = async () => (await page.send('Page.captureScreenshot', { format: 'jpeg', quality: 60 })).data;
const sheet = async (name, frames) => {
  // Compose frames into one image by rendering a grid page in the same browser.
  const html = `<body style="margin:0;background:#222;font:14px sans-serif;color:#fff;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px">${frames.map(f => `<figure style="margin:0"><img style="width:100%;display:block" src="data:image/jpeg;base64,${f.img}"><figcaption>${f.label}</figcaption></figure>`).join('')}</body>`;
  const file = join(out, `${name}.html`); writeFileSync(file, html);
  const rows = Math.ceil(frames.length / 3);
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1500, height: Math.ceil(rows * (1500 / 3) * (H / W) + rows * 26 + 12), deviceScaleFactor: 1, mobile: false });
  await page.goto(pathToFileURL(file).href);
  writeFileSync(join(out, `${name}.png`), Buffer.from((await page.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
  await page.send('Emulation.clearDeviceMetricsOverride');
};

const report = { url, errors: [], libraries: [] };
try {
  await page.goto(url, 30000).catch(e => report.errors.push(String(e)));
  const load = [];
  for (const t of [0, 300, 800, 1600, 3000]) { await page.waitFor(t - (load.at(-1)?.t ?? 0)); load.push({ t, label: `load +${t}ms`, img: await shot() }); }

  report.libraries = await page.evaluate(`[
    window.gsap && 'gsap ' + gsap.version, window.ScrollTrigger && 'ScrollTrigger', window.Lenis && 'Lenis',
    window.lenis && 'lenis instance', window.barba && 'barba', window.THREE && 'three', window.Swiper && 'swiper',
    window.LocomotiveScroll && 'locomotive', window.Splitting && 'splitting', window.SplitType && 'split-type',
    window.Webflow && 'webflow', [...document.scripts].some(s => /framer/.test(s.src)) && 'framer',
  ].filter(Boolean)`).catch(() => []);
  const height = await page.evaluate('document.documentElement.scrollHeight').catch(() => H);

  const scroll = [];
  const step = Math.max(H * 0.6, (height - H) / STEPS);
  for (let i = 1; i <= STEPS; i++) {
    await page.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: W / 2, y: H / 2, deltaX: 0, deltaY: step });
    await page.waitFor(450);
    const y = await page.evaluate('Math.round(scrollY)').catch(() => '?');
    scroll.push({ label: `wheel ${i} (y=${y})`, img: await shot() });
  }

  await page.evaluate('scrollTo(0,0)').catch(() => {}); await page.waitFor(600);
  const targets = await page.evaluate(`[...document.querySelectorAll('a,button,[role=button],nav li,h1,h2,img,figure')]
    .map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, tag: e.tagName.toLowerCase(), text: (e.innerText || e.alt || '').trim().slice(0, 24) }; })
    .filter(t => t.y > 0 && t.y < ${H} && t.x > 0 && t.x < ${W}).slice(0, 9)`).catch(() => []);
  const hover = [];
  for (const t of targets) {
    for (let k = 0; k <= 4; k++) await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: t.x - 40 + k * 10, y: t.y });
    await page.waitFor(450);
    hover.push({ label: `hover ${t.tag} "${t.text}"`, img: await shot() });
  }

  report.errors.push(...page.errors.filter(e => !/favicon\.ico$/.test(e.url || '')).map(e => e.text));
  report.frames = { load: load.length, scroll: scroll.length, hover: hover.length, pageHeight: height };
  await sheet('load', load); await sheet('scroll', scroll); if (hover.length) await sheet('hover', hover);
} finally {
  await page.close(); server?.close();
}
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
