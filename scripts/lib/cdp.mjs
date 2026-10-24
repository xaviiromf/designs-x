// Minimal Chrome DevTools Protocol client: system chromium + Node's global WebSocket, no dependencies.
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Headless Chromium reports (hover: none) and (pointer: none). Pass fine: true, or set CDP_FINE_POINTER=1,
// to emulate a mouse so `(hover: hover) and (pointer: fine)` branches run.
export async function launch({ width = 1440, height = 900, fine = !!process.env.CDP_FINE_POINTER } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'cdp-'));
  const proc = spawn('chromium', ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${dir}`,
    '--no-first-run', '--disable-gpu', '--hide-scrollbars', `--window-size=${width},${height}`,
    ...(fine ? ['--blink-settings=primaryHoverType=2,primaryPointerType=4'] : []), 'about:blank'], { stdio: 'ignore' });
  let port;
  for (let i = 0; i < 100 && !port; i++) {
    await sleep(100);
    try { port = readFileSync(join(dir, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch {}
  }
  if (!port) { proc.kill(); throw new Error('chromium did not start'); }
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });

  let seq = 0;
  const pending = new Map(), listeners = new Set();
  ws.onmessage = ({ data }) => {
    const m = JSON.parse(data);
    if (!m.id) return listeners.forEach(fn => fn(m.method, m.params));
    const p = pending.get(m.id); pending.delete(m.id);
    m.error ? p.fail(new Error(m.error.message)) : p.ok(m.result);
  };
  const send = (method, params = {}) => new Promise((ok, fail) => {
    const id = ++seq; pending.set(id, { ok, fail }); ws.send(JSON.stringify({ id, method, params }));
  });
  const once = (method, timeout) => new Promise(ok => {
    const fn = m => { if (m === method) { listeners.delete(fn); ok(true); } };
    listeners.add(fn); setTimeout(() => { listeners.delete(fn); ok(false); }, timeout);
  });

  const page = {
    errors: [], logs: [], docs: [], navs: [],
    reset() { page.errors = []; page.logs = []; page.docs = []; page.navs = []; },
    send,
    async goto(url, timeout = 10000) {
      const loaded = once('Page.loadEventFired', timeout);
      const r = await send('Page.navigate', { url });
      if (r.errorText) throw new Error(`${url}: ${r.errorText}`);
      if (r.loaderId) await loaded; // no loaderId means a same-document (hash) navigation
    },
    async evaluate(expression) {
      const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
      return r.result.value;
    },
    click: sel => page.evaluate(`document.querySelector(${JSON.stringify(sel)}).click()`),
    async type(sel, text) { await page.evaluate(`document.querySelector(${JSON.stringify(sel)}).focus()`); await send('Input.insertText', { text }); },
    waitFor: sleep,
    async screenshot(path) { writeFileSync(path, Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64')); },
    async close() { ws.close(); proc.kill(); await new Promise(r => proc.exitCode !== null ? r() : proc.once('exit', r)); try { rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {} },
  };

  listeners.add((method, p) => {
    if (method === 'Runtime.consoleAPICalled') {
      const text = p.args.map(a => a.value ?? a.description ?? '').join(' ');
      page.logs.push(text);
      if (p.type === 'error' || p.type === 'assert') page.errors.push({ text });
    } else if (method === 'Runtime.exceptionThrown') page.errors.push({ text: p.exceptionDetails.exception?.description ?? p.exceptionDetails.text });
    else if (method === 'Log.entryAdded' && p.entry.level === 'error') page.errors.push({ text: p.entry.text, url: p.entry.url });
    else if (method === 'Network.responseReceived' && p.type === 'Document') page.docs.push({ url: p.response.url, status: p.response.status });
    else if (method === 'Page.frameNavigated' && !p.frame.parentId) page.navs.push(p.frame.url);
    else if (method === 'Page.javascriptDialogOpening') send('Page.handleJavaScriptDialog', { accept: true });
  });
  await Promise.all(['Page', 'Runtime', 'Network', 'Log'].map(d => send(`${d}.enable`)));
  // Headless Chromium clamps --window-size to a 500px minimum width; emulate narrower phones explicitly.
  if (width < 500) await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: true });
  return page;
}
