import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
test('âncoras apontam para IDs existentes e únicos', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
});
test('campos possuem rótulos e recursos locais estão presentes', async () => {
  for (const [,id] of html.matchAll(/<label for="([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`));
  for (const [,file] of html.matchAll(/(?:src|href)="([^"#:]+\.(?:css|js|svg))"/g)) assert.ok((await readFile(new URL('../'+file, import.meta.url))).length > 0);
  assert.ok(html.includes('lang="pt-BR"'));
});
