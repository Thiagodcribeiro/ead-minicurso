# Entrega da 2ª VA — roteiro de finalização

Autor: **Thiago Diniz Cruz Ribeiro — UFRPE** (identificação recuperada do `config.js` público do site informado).

Site existente: https://ead-minicurso.vercel.app/

O PDF da 2ª VA exige manter o tema, o vídeo e a avaliação da 1ª VA; acrescentar duas mídias diferentes; disponibilizar acesso direto; conferir os links. Entrega indicada: **09/11/2026**, na planilha que o professor disponibilizará. O envio à planilha não foi realizado.

## O que foi preparado

| Exigência | Implementação | Situação |
|---|---|---|
| Mesmo tópico da 1ª VA | Comparar alternativas, aplicar conceitos e justificar decisões em Computação | Mantido |
| Item 1: eBook ou podcast | eBook de 12 páginas, capa, sumário clicável, dez capítulos, diagramas, exemplos e referências | Arquivo pronto |
| Publicação do eBook em plataforma interativa | Campo `ebookUrl` para link direto do FlipHTML5 ou Genially | **Publicação externa pendente** |
| Item 2 diferente do Item 1, sem vídeo nem avaliação | Infográfico/mapa interativo com três cenários e quatro condições ajustáveis; sem nota ou submissão | Implementado |
| Complementaridade | eBook aprofunda perguntas, evidências e transferência para busca; mapa explora mudanças de restrições | Implementado |
| Materiais anteriores | Vídeo `o7uSnWO_ZOc`, conteúdo, quiz, rubrica e atividade aberta | Preservados |
| Sequência clara | Vídeo → fundamentos → eBook → mapa → quiz → atividade autoral | Integrada à página |
| Acessibilidade | Edição HTML de texto ajustável, títulos, links, detalhes nativos, controles por teclado e leitura textual dos cenários | Implementada; revisão manual final necessária |
| Site publicado atualizado | Arquivos prontos para o mesmo projeto Vercel | **Nova publicação pendente** |

## 1. Publique o eBook no FlipHTML5

O PDF local e a edição HTML são úteis, mas **não substituem a publicação em plataforma interativa exigida pelo professor**.

1. Entre em sua conta no [FlipHTML5](https://fliphtml5.com/).
2. No painel, escolha **Upload** e envie `media/ebook-raciocinio.pdf`.
3. Aguarde a conversão. Confira capa, texto, sumário e links. Configure a visibilidade para permitir a leitura pelo professor e colegas sem login. Se os links internos não forem importados, recrie o sumário na plataforma.
4. Use **Share / Book Link** e copie o endereço público de leitura, não o endereço do editor.
5. Em `config.js`, preencha:

```js
ebookUrl: 'COLE_AQUI_O_LINK_PUBLICO_DO_FLIPHTML5',
```

O código aceita HTTPS nos domínios `fliphtml5.com`, `online.fliphtml5.com` e `view.genially.com`. O link deve apontar para uma publicação, não para a página inicial da plataforma. Se você usar um domínio personalizado, será necessário acrescentá-lo à validação de `publicationUrl` em `course.mjs`.

Ao preencher o campo, o botão **Leia na plataforma interativa** aparece automaticamente e o aviso de publicação pendente desaparece. O botão abre a publicação diretamente, sem depender de um iframe. Isso atende à opção de acesso por link claramente identificado prevista no enunciado.

Documentação oficial: [Criar flipbooks a partir de documentos](https://support.fliphtml5.com/en/articles/8001052-create-flipbooks-from-document-files) e [Compartilhar flipbooks](https://help.fliphtml5.com/docs/share/).

## 2. Atualize o mesmo projeto na Vercel

Substitua os arquivos do repositório conectado à Vercel pelo conteúdo da pasta `minicurso`, preservando a estrutura `media/`. Salve e envie as alterações. Mantenha Framework Preset **Other**, Build Command vazio e Output Directory `.`.

Antes de substituir, confira `config.js`: ele já contém o nome e a instituição recuperados da versão publicada, o vídeo existente e o novo campo do eBook. A edição pelo formulário da página continua sendo apenas local ao navegador.

Os novos arquivos públicos são `ebook.html`, `mapa.html`, `mapa.js`, `map-model.mjs`, `media.css` e `media/ebook-raciocinio.pdf`, além das alterações nos arquivos anteriores. Não envie somente `index.html`: as mídias precisam dos arquivos associados.

## 3. Confira a entrega publicada

- Abra o site em uma janela privada, sem depender de dados salvos no navegador.
- Confirme autoria, instituição e reprodução do vídeo, incluindo áudio e legendas.
- Abra **Leia na plataforma interativa** e confirme que não exige login do leitor.
- Percorra o sumário, amplie o texto e abra referências no eBook.
- Abra a versão HTML, os comentários de reflexão e o download do PDF.
- No mapa, teste os três cenários e altere as quatro condições.
- Confirme que o cenário de memória restrita informa que nenhuma das três versões atende.
- Responda uma alternativa correta e uma incorreta no quiz; confira feedback e reinício.
- Faça a navegação por teclado e pelo celular. Confira legibilidade, foco e ausência de cortes.
- Confira todos os links externos; disponibilidade pode mudar e um HTTP 200 não garante reprodução de vídeo.
- Envie o endereço atualizado na planilha indicada pelo professor até **09/11/2026**.

## Como o projeto responde à rubrica

| Critério do enunciado | Peso por mídia | Evidência preparada |
|---|---:|---|
| Relevância e precisão | 0,75 | Comparação com premissas, tempo médio versus pior caso, estabilidade e memória explicitados |
| Estrutura e clareza | 0,75 | Capítulos progressivos no eBook; condições → consequências → justificativa no mapa |
| Qualidade do material | 0,75 | Identidade visual consistente, PDF vetorial com texto selecionável, controles nativos |
| Engajamento e criatividade | 0,75 | Pausas de reflexão; exploração de restrições conflitantes e mudanças de cenário |
| Tamanho adequado | 0,50 | 12 páginas; leitura sugerida de 15–20 min e exploração de 5–10 min |
| Usabilidade e acessibilidade | 0,25 | HTML alternativo, navegação por sumário, versão textual do mapa e foco visível |
| Complementaridade | 0,25 | Ampliação do planejamento pedagógico e transferência para busca em catálogo |

Cada mídia vale até 4 pontos. Organização e funcionamento do site valem até 2 pontos. Estes registros evidenciam implementação; não garantem a nota, que depende da avaliação do professor e colegas.

## Arquivos editáveis

### Verificações realizadas em 05/11/2026

- Oito testes automatizados passaram, incluindo as 16 combinações de restrições do mapa, validação do link externo e regressão da pontuação do quiz.
- Todas as referências locais e âncoras das três páginas HTML foram verificadas; nenhum arquivo ausente foi encontrado.
- A página inicial, o eBook HTML, o mapa, seus recursos e o PDF responderam HTTP 200 na prévia local.
- As seis páginas técnicas da Princeton e o link do vídeo responderam HTTP 200. Isso verifica acesso HTTP, não a reprodução do vídeo ou a validade permanente dos links.
- O PDF tem 12 páginas, texto selecionável, identificação do autor e 26 anotações de links. As páginas foram renderizadas para conferir o layout.
- A automação do navegador apresentou uma falha interna e não permitiu a revisão visual/funcional ponta a ponta do site. A revisão manual por celular, teclado e leitor de tela permanece pendente. A reprodução do vídeo e o futuro link do FlipHTML5 também precisam ser conferidos após a publicação.

O texto-base do eBook está em `media/ebook-content.json`. Para regenerar PDF e HTML após mudar texto ou autoria: instale Python e `reportlab`, e execute `python tools/build_ebook.py` na pasta do projeto. O gerador usa as fontes Arial do Windows; em outro sistema, ajuste o caminho das fontes. Isso é necessário somente para editar o livro, não para executar ou publicar o site. A biblioteca foi instalada em uma pasta temporária do ambiente de trabalho, sem adicionar dependências ao site.

O PDF contém sumário e referências clicáveis. A edição HTML acrescenta comentários expansíveis às pausas de reflexão e oferece leitura acessível. O leitor FlipHTML5 adicionará a experiência de publicação externa exigida pelo enunciado.
