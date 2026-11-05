export function compareAlgorithms({ stable, memory, guaranteed, small }) {
  const rows = [
    { name:'Quick Sort', time:'O(n log n) médio · O(n²) pior', space:'Pilha: O(log n) média; O(n) pior, na recursão usual.', reasons:[], note:'Não é estável na versão usual. Pode ser candidato quando estabilidade e limite de pior caso não são obrigatórios. Meça o desempenho da implementação.' },
    { name:'Merge Sort', time:'O(n log n) no pior caso', space:'O(n) para o vetor auxiliar.', reasons:[], note:'Preserva empates se a intercalação escolher primeiro a metade esquerda. O custo do vetor auxiliar precisa caber no cenário.' },
    { name:'Insertion Sort', time:'O(n²) no pior caso · O(n) melhor', space:'O(1) auxiliar.', reasons:[], note: small ? 'Candidato especialmente plausível para uma entrada pequena com poucas inversões; a preferência não é uma medição de velocidade.' : 'Pode atender aos requisitos selecionados, mas o custo quadrático pode ser inadequado para grandes volumes. Investigue o tamanho e a desordem.' }
  ];
  if(stable) rows[0].reasons.push('Não preserva necessariamente a ordem dos empates.');
  if(guaranteed) { rows[0].reasons.push('O pior caso O(n²) não atende ao limite.'); rows[2].reasons.push('O pior caso O(n²) não atende ao limite.'); }
  if(!memory) rows[1].reasons.push('Precisa de um vetor auxiliar O(n), indisponível.');
  return rows.map(row=>({...row, eligible:row.reasons.length===0}));
}
