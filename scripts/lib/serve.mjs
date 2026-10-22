// Static file server that behaves like GitHub Pages: GET/HEAD only (else 405), missing files 404.
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.pdf': 'application/pdf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm',
};

export function serve(root) {
  const server = createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405, { Allow: 'GET, HEAD' }).end('405 Method Not Allowed');
    // normalize() on an absolute path drops leading "..", so requests cannot escape root
    let file = join(root, normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    try {
      if (statSync(file).isDirectory()) file = join(file, 'index.html');
      const { size } = statSync(file);
      res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream', 'Content-Length': size });
      req.method === 'HEAD' ? res.end() : createReadStream(file).pipe(res);
    } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404 Not Found'); }
  });
  return new Promise(ok => server.listen(0, '127.0.0.1', () =>
    ok({ url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() })));
}
