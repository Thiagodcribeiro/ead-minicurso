export function youtubeId(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    let id;
    if (url.hostname === 'youtu.be') id = url.pathname.split('/')[1];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:embed|shorts)\/([^/]+)\/?$/.exec(url.pathname)?.[1];
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id : null;
  } catch { return null; }
}
export const questions = [
  { title: 'No caso das inscrições, qual justificativa atende aos requisitos?', options: [
    ['Quick Sort, porque seu tempo médio é O(n log n).', false, 'O tempo médio não garante o limite exigido no pior caso. Além disso, a versão usual não é estável.'],
    ['Merge Sort estável: garante O(n log n) no pior caso e o vetor auxiliar cabe na memória.', true, 'Você relacionou a escolha às três condições: pior caso, preservação dos empates e memória disponível.'],
    ['Insertion Sort, porque todo algoritmo estável é rápido para grandes volumes.', false, 'Estabilidade e eficiência são propriedades diferentes. Insertion Sort é estável, mas pode exigir O(n²).']
  ]},
  { title: 'Qual pergunta torna o raciocínio mais visível?', options: [
    ['Quem inventou o Merge Sort?', false, 'Essa pergunta verifica uma informação histórica, não a aplicação de critérios a uma decisão.'],
    ['Qual alternativa a IA recomenda?', false, 'Reproduzir a recomendação não demonstra avaliação. É preciso confrontá-la com as restrições.'],
    ['Compare duas soluções pelos requisitos e explique quando você mudaria sua escolha.', true, 'A comparação e a mudança de cenário exigem aplicar conceitos e reconhecer os limites da decisão.']
  ]},
  { title: 'Uma IA diz: “Quick Sort é sempre O(n log n)”. Como avaliar essa afirmação?', options: [
    ['Distinguir tempo médio de pior caso e investigar partições muito desequilibradas.', true, 'Partições repetidamente desequilibradas podem produzir O(n²). Um pivô extremo em entradas ordenadas é um exemplo em implementações que escolhem a ponta.'],
    ['Aceitar, pois a resposta está bem escrita.', false, 'Clareza de escrita não é evidência de correção. Verifique a propriedade em uma fonte ou contraexemplo.'],
    ['Concluir que nenhuma resposta de IA pode ser usada.', false, 'A afirmação deve ser corrigida. Respostas de IA podem ser material de análise quando verificadas criticamente.']
  ]},
  { title: 'Agora são 20 registros quase ordenados, sem exigência de O(n log n) no pior caso. O que muda?', options: [
    ['Insertion Sort se torna plausível; eu verificaria o grau de desordem e mediria o desempenho.', true, 'O cenário favorece uma implementação simples e com poucos deslocamentos. Isso não elimina seu pior caso quadrático.'],
    ['Merge Sort continua sendo obrigatório em qualquer cenário.', false, 'A decisão depende das restrições. Para entradas pequenas, outras opções podem ser adequadas.'],
    ['Quick Sort passa a ser estável automaticamente.', false, 'Mudar a quantidade de registros não torna o particionamento usual estável.']
  ]},
  { title: 'O estudante escreveu apenas “Merge Sort”. Qual feedback ajuda a avançar?', options: [
    ['“Correto. Nota máxima.”', false, 'O nome da alternativa não revela por que ela atende ao problema. A rubrica exige evidências.'],
    ['“Relacione a escolha à estabilidade e ao pior caso, compare outra opção e mostre um teste com empates.”', true, 'O feedback aponta ações concretas para tornar a justificativa verificável e desenvolver o raciocínio.'],
    ['“Sua resposta é curta demais.”', false, 'Extensão não é o critério central. Explique quais conceitos e evidências faltam.']
  ]}
];
export function quizResult(answers) {
  let answered = 0, correct = 0;
  questions.forEach((q, i) => { const option = q.options[answers[i]]; if (option) { answered++; if (option[1]) correct++; } });
  return { answered, correct, total: questions.length };
}
