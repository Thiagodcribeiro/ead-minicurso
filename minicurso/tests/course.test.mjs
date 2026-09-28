import { test } from 'node:test';
import assert from 'node:assert/strict';
import { youtubeId, questions, quizResult } from '../course.mjs';
test('aceita os formatos de vídeo documentados e remoção', () => {
  for (const value of ['abcdefghijk', 'https://youtu.be/abcdefghijk?t=10', 'https://www.youtube.com/watch?v=abcdefghijk', 'https://youtube.com/shorts/abcdefghijk', 'https://www.youtube-nocookie.com/embed/abcdefghijk']) assert.equal(youtubeId(value), 'abcdefghijk');
  assert.equal(youtubeId(''), '');
});
test('rejeita outros hosts, código e IDs inválidos', () => {
  for (const value of ['javascript:alert(1)', 'https://youtube.com.evil.com/watch?v=abcdefghijk', 'https://evil.com/abcdefghijk', '<script>', 'abcd', 'ftp://youtube.com/watch?v=abcdefghijk']) assert.equal(youtubeId(value), null);
});
test('pontua respostas sem duplicar quando uma escolha é revisada', () => {
  const answers = {};
  assert.deepEqual(quizResult(answers), { answered:0, correct:0, total:5 });
  questions.forEach((q,i) => { assert.equal(q.options.filter(o=>o[1]).length, 1); answers[i] = q.options.findIndex(o=>o[1]); });
  assert.deepEqual(quizResult(answers), { answered:5, correct:5, total:5 });
  answers[0] = 0; assert.deepEqual(quizResult(answers), { answered:5, correct:4, total:5 });
});
