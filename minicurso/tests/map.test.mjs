import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compareAlgorithms} from '../map-model.mjs';
import {publicationUrl} from '../course.mjs';
test('cenário-base, entrada pequena e conflito de requisitos',()=>{
  const names=c=>compareAlgorithms(c).filter(r=>r.eligible).map(r=>r.name);
  assert.deepEqual(names({stable:true,memory:true,guaranteed:true,small:false}),['Merge Sort']);
  assert.deepEqual(names({stable:true,memory:false,guaranteed:false,small:true}),['Insertion Sort']);
  assert.deepEqual(names({stable:true,memory:false,guaranteed:true,small:false}),[]);
  assert.deepEqual(names({stable:false,memory:true,guaranteed:false,small:false}),['Quick Sort','Merge Sort','Insertion Sort']);
});
test('as 16 combinações mantêm restrições e explicam exclusões',()=>{
  for(let n=0;n<16;n++){
    const c={stable:!!(n&1),memory:!!(n&2),guaranteed:!!(n&4),small:!!(n&8)};
    const [q,m,i]=compareAlgorithms(c);
    assert.equal(q.eligible,!c.stable&&!c.guaranteed);
    assert.equal(m.eligible,c.memory);
    assert.equal(i.eligible,!c.guaranteed);
    for(const row of [q,m,i])assert.equal(row.eligible,row.reasons.length===0);
  }
});
test('link da plataforma exige HTTPS e host correto',()=>{
  assert.equal(publicationUrl('https://online.fliphtml5.com/test/book/'),'https://online.fliphtml5.com/test/book/');
  assert.equal(publicationUrl('https://view.genially.com/123/book'),'https://view.genially.com/123/book');
  for(const u of ['','javascript:alert(1)','https://fliphtml5.com.evil.test/book','http://fliphtml5.com/book','https://fliphtml5.com/'])assert.equal(publicationUrl(u),null);
});
