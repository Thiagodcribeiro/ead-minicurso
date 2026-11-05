import { compareAlgorithms } from './map-model.mjs';
const $ = id=>document.getElementById(id);
const ids=['stable','memory','guaranteed','small'];
const presets={inscricoes:[true,true,true,false],pequena:[true,false,false,true],restrito:[true,false,true,false]};
const descriptions={inscricoes:'Ordenar notas e preservar a chegada nos empates, com vetor auxiliar disponível e limite no pior caso.',pequena:'Ordenar 20 registros quase ordenados, preservando empates, sem vetor auxiliar e sem limite assintótico obrigatório.',restrito:'Preservar empates e garantir O(n log n) no pior caso, mas sem espaço para um vetor auxiliar.'};
function update(){
  const rows=compareAlgorithms(Object.fromEntries(ids.map(id=>[id,$(id).checked])));
  const eligible=rows.filter(r=>r.eligible);
  $('map-summary').textContent=eligible.length ? `${eligible.length} alternativa(s) atendem às restrições: ${eligible.map(r=>r.name).join(', ')}.` : 'Nenhuma das três versões clássicas atende a todas as restrições.';
  $('algorithm-cards').replaceChildren(...rows.map(row=>{
    const card=document.createElement('article');card.className='algorithm-card '+(row.eligible?'eligible':'excluded');
    const h=document.createElement('h3');h.textContent=row.name;
    const status=document.createElement('strong');status.className='algorithm-status';status.textContent=row.eligible?'Atende às restrições':'Não atende';
    const time=document.createElement('p');time.textContent=row.time;
    const space=document.createElement('p');space.textContent=row.space;
    const explanation=document.createElement('p');explanation.textContent=row.reasons.length?row.reasons.join(' '):row.note;
    card.append(h,status,time,space,explanation);return card;
  }));
  $('map-reasoning').textContent=eligible.length===0?'Quando nenhuma opção atende, o raciocínio deve tornar o conflito explícito. Negocie uma restrição ou investigue outra implementação; não escolha uma alternativa fingindo que o conflito não existe.':eligible.length===1?`Há uma candidata entre as versões comparadas: ${eligible[0].name}. Justifique-a pelos requisitos e verifique a propriedade em uma implementação. Um teste isolado não prova uma garantia para todas as entradas.`:'Mais de uma opção atende. Decida usando critérios adicionais, como tamanho real, desordem, implementação e medições. Não confunda atender aos requisitos com ser sempre a mais rápida.';
}
ids.forEach(id=>$(id).addEventListener('change',()=>{document.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));$('scenario-description').textContent='Cenário personalizado: observe como cada condição altera as alternativas.';update();}));
document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.preset;ids.forEach((id,i)=>$(id).checked=presets[key][i]);document.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('scenario-description').textContent=descriptions[key];update();}));
update();
