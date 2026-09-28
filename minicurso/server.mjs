import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'config.js', 'course.mjs', 'favicon.svg']);
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript', '.svg':'image/svg+xml' };
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (!publicFiles.has(file)) { res.writeHead(404); return res.end('Não encontrado'); }
    const body = await readFile(path.join(root, file));
    res.writeHead(200, { 'Content-Type': `${types[path.extname(file)]}; charset=utf-8` });
    res.end(body);
  } catch { res.writeHead(500); res.end('Não foi possível abrir o arquivo.'); }
}).listen(process.env.PORT || 3000, '127.0.0.1', () => console.log('Minicurso em http://localhost:' + (process.env.PORT || 3000)));
