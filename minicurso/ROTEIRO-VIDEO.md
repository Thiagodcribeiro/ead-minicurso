# Roteiro de gravação — 25 minutos

Título: **Além da resposta certa: como criar atividades de Computação que tornam o raciocínio visível na era da IA**.

Este é um roteiro de apresentação, não um vídeo pronto ou uma transcrição. Grave a tela do site com narração. Descreva verbalmente as informações importantes das tabelas, evite depender apenas de cores e revise as legendas do YouTube.

## 0:00–3:00 · Por que mudar a pergunta?

Apresente-se e diga a quem o minicurso se destina. Mostre os objetivos. Compare “Qual é a complexidade do Merge Sort?” com “Que algoritmo atende a estas restrições e por quê?”. Explique que recordar conceitos é necessário, mas uma resposta correta isolada não mostra como o estudante pensa. Antecipe o produto final: uma atividade com cenário, alternativas, perguntas e rubrica.

## 3:00–8:00 · Apresente o método

Percorra Cenário → Alternativas → Critérios → Decisão → Justificativa. Construa um exemplo em voz alta: ordenar inscrições; considerar três algoritmos; verificar estabilidade, memória e tempo; escolher; justificar. Diferencie requisito obrigatório de preferência. Peça uma pausa para o participante transformar uma pergunta de memorização em uma pergunta de comparação.

## 8:00–15:00 · Demonstração de Computação

Abra o estudo de caso das 100 mil inscrições. Leia as restrições. Explique Big-O como crescimento, não como cronômetro. Mostre a diferença entre tempo médio e pior caso.

Use esta pequena lista em ordem de chegada:

| Registro | Nota | Chegada |
|---|---:|---:|
| Ana | 8 | 1 |
| Caio | 9 | 2 |
| Bia | 8 | 3 |
| Davi | 7 | 4 |

Ordenação esperada por nota decrescente: **Caio, Ana, Bia, Davi**. Explique que Ana continua antes de Bia porque suas notas empatam. Na intercalação estável, em caso de empate escolha o item da metade esquerda. Mostre que estabilidade depende da implementação.

Compare os três algoritmos pela mesma tabela. Escolha Merge Sort e explicite o custo de memória. Explique por que o desempenho médio do Quick Sort não satisfaz o requisito de pior caso e por que estabilidade, sozinha, não torna Insertion Sort adequado.

Mude o cenário para 20 registros quase ordenados sem limite assintótico obrigatório. Discuta por que Insertion Sort passa a ser plausível. Peça que o participante diga uma condição que mudaria a própria decisão.

## 15:00–20:00 · Analise as respostas de IA

Leia o prompt e identifique a origem didática das duas respostas. Mostre A antes de expandir a análise. Convide o participante a localizar três alegações verificáveis: “sempre O(n log n)”, “não usa memória extra” e “mantém empates”. Revele a análise e conecte cada correção à tabela.

Leia B. Explique por que é mais consistente e como pode melhorar: exemplo de desempate, testes e condições de mudança. Demonstre a pergunta “Que evidência sustenta esta afirmação?”. Não trate a IA como autoridade nem a proíba como recurso; use suas respostas como objetos de investigação.

## 20:00–25:00 · Avalie e transfira

Apresente os cinco critérios da rubrica, cada um de 0 a 2 pontos. Avalie oralmente uma resposta que diz apenas “Merge Sort”: ela ainda não comprova leitura das restrições, comparação ou evidência. Não atribua pontuação com base em extensão do texto.

Responda uma alternativa incorreta do quiz, leia o feedback e revise a escolha. Mostre a atividade final, o checklist e o botão para baixar o texto. Explique que o rascunho fica somente no navegador e que a entrega é feita pelo canal do professor. Termine retomando os objetivos e propondo que o participante crie sua própria atividade.

## Antes de publicar

- Conferir o enunciado original da 1ª VA e ajustar o roteiro se necessário.
- Gravar uma aula de 20–30 minutos; 25 minutos é a meta deste roteiro.
- Usar fonte legível, cursor visível e áudio compreensível.
- Inserir legendas revisadas; acrescentar transcrição se houver conteúdo adicional.
- Publicar no YouTube, permitir incorporação e copiar o ID para `config.js`.
- Testar o vídeo na página publicada, inclusive pelo celular.
