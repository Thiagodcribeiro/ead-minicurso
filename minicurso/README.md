# Além da resposta certa — minicurso EaD

Site completo em português, com conteúdo didático, quiz formativo e proposta final aberta. Implementado em HTML, CSS e JavaScript nativos, sem dependências: não exige Next.js, instalação de pacotes ou etapa de compilação. A escolha mantém o projeto simples para editar, executar e publicar na Vercel.

## Executar localmente

1. Instale Node.js 20 ou superior, caso ainda não tenha.
2. Abra um terminal na pasta `minicurso` (a pasta deste arquivo).
3. Execute `npm run dev`.
4. Abra **http://localhost:3000**.

Não é necessário executar `npm install`. Não abra `index.html` por duplo clique: o JavaScript usa módulos e deve ser servido por HTTP. Para encerrar o servidor, pressione Ctrl+C no terminal. Se a porta estiver ocupada, no PowerShell use `$env:PORT=3001` e execute `npm run dev`; abra a porta escolhida.

## Identificação e vídeo

Edite `config.js` antes de publicar:

```js
window.COURSE_CONFIG = {
  author: 'Seu nome completo',
  institution: 'Sua instituição / turma',
  youtubeId: 'ID_DO_VIDEO', // substitua por um ID real de 11 caracteres
};
```

Um link `https://www.youtube.com/watch?v=abcdefghijk` tem ID `abcdefghijk` (exemplo de formato, não um vídeo do curso). O código também aceita o link completo. Deixe `youtubeId: ''` enquanto não tiver a gravação.

A seção **Espaço do autor** permite editar nome, instituição e vídeo diretamente no site. Essas alterações são preferências locais, salvas somente no navegador atual; não alteram os arquivos publicados. Preferências locais têm prioridade sobre `config.js`. Para verificar os valores publicados sem preferências antigas, use uma janela privada ou reaplique os valores na seção do autor.

O vídeo ainda precisa ser gravado pelo autor. Há um roteiro de 25 minutos em `ROTEIRO-VIDEO.md` e um guia textual no site. Publique o vídeo no YouTube como público ou não listado, permita incorporação, revise legendas em português e confira a reprodução. O guia escrito não é uma transcrição da gravação; se a gravação tiver conteúdo adicional, acrescente a transcrição revisada ao site.

## Publicar na Vercel

### Pelo painel

1. Coloque os arquivos desta pasta em um repositório Git de sua conta.
2. Na Vercel, use **Add New → Project** e importe o repositório.
3. Se a pasta estiver dentro de outro projeto, defina **Root Directory** como o caminho da pasta `minicurso`. Se o repositório contiver somente seus arquivos na raiz, mantenha a raiz.
4. Selecione **Framework Preset: Other**. Mantenha o **Build Command vazio** e **Output Directory: .**. O `vercel.json` já registra essas configurações.
5. Clique em **Deploy** e abra a URL fornecida pela Vercel.
6. Confirme o nome do autor, o vídeo, o quiz, a exportação da atividade e a navegação pelo celular.

### Pelo terminal, como alternativa

Na pasta deste projeto, execute `npx vercel`. Faça login e siga as instruções para criar ou vincular um projeto. Confira a URL de prévia; quando estiver pronto para publicar em produção, execute `npx vercel --prod`.

O servidor `server.mjs` é apenas para desenvolvimento local. A Vercel serve os arquivos estáticos. Não há backend, credenciais, banco de dados nem variáveis de ambiente obrigatórias. O projeto foi preparado para publicação, mas **não foi implantado em uma conta Vercel nesta entrega**.

Documentação oficial consultada: [Builds](https://vercel.com/docs/builds), [Configuração do build](https://vercel.com/docs/builds/configure-a-build) e [vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

## Conteúdo e edição

- `index.html`: apresentação, público, pré-requisitos, objetivos, método, caso, respostas de IA, rubrica, atividade final e referências.
- `styles.css`: aparência responsiva, foco visível, versão para impressão e redução de movimento.
- `course.mjs`: perguntas, alternativas, explicações e funções de validação/pontuação.
- `app.js`: quiz, incorporação de vídeo, preferências e rascunho local.
- `config.js`: identificação e vídeo padrão para todos os visitantes.
- `vercel.json`: configuração da publicação e cabeçalhos de segurança.
- `tests/`: testes automatizados da lógica de pontuação, validação de vídeos e integridade do conteúdo.

## Funcionamento da avaliação

O quiz possui cinco perguntas com resposta única e feedback imediato para cada alternativa. A pontuação reflete a escolha atual, permite revisão e pode ser reiniciada. Ela não é enviada a ninguém e é zerada ao recarregar a página.

A atividade aberta permite escrever, salvar o rascunho neste navegador, limpar com confirmação e baixar um `.txt` com acentos preservados. Não há submissão ao professor nem correção automática. O estudante deve enviar o arquivo pelo ambiente indicado pelo docente. Se o armazenamento estiver bloqueado, a página informa a falha e o download continua disponível. Evite dados pessoais sensíveis em computadores compartilhados.

As respostas de IA do estudo de caso foram elaboradas durante a criação deste material, com erros deliberados na resposta A. Não são apresentadas como capturas de sessões de outros modelos. O prompt e a finalidade didática estão identificados. Ao substituir os exemplos por consultas próprias, registre ferramenta, data, prompt, resposta e revisão humana.

## Acessibilidade e verificação

Inclui idioma pt-BR, títulos hierárquicos, regiões semânticas, link para pular navegação, formulários rotulados, rádio nativo com teclado, feedback em regiões de status, foco visível, tabelas com cabeçalhos, áreas de rolagem com acesso por teclado, layout adaptável e respeito à preferência de movimento reduzido. A reprodução do YouTube depende da conexão e das permissões do vídeo.

Execute `npm test` para verificar a lógica e a integridade dos arquivos. Antes da entrega acadêmica, faça uma revisão manual em desktop e celular: Tab/Shift+Tab, seleção por setas no quiz, abertura dos detalhes, zoom de 200%, navegação por âncoras, ausência de rolagem horizontal da página, download e persistência local. Teste o vídeo real após configurá-lo.

Verificação realizada na entrega: cinco testes automatizados passaram; a sintaxe JavaScript foi validada e o servidor local respondeu HTTP 200. A automação do navegador não iniciou devido a um arquivo ausente no runtime da ferramenta. Assim, a aparência, o comportamento ponta a ponta e a acessibilidade com leitor de tela não foram verificados em navegador nesta sessão. As verificações manuais acima continuam necessárias.

## Base documental e pendências

O pedido menciona `/mnt/data/Projeto_2026_2.docx.pdf`, mas esse arquivo **não estava disponível no ambiente**. A conversa referenciada também não pôde ser recuperada pela ferramenta. Este projeto segue os requisitos escritos na solicitação e o trecho fornecido, incluindo a proposta de vídeo de 20–30 minutos; **não foi possível conferir a conformidade com o PDF da 1ª VA**.

Antes de entregar: conferir o PDF original, preencher identificação, gravar e configurar o vídeo, revisar legendas e publicar. O site e as atividades escritas estão implementados; o vídeo e a confirmação do enunciado original continuam pendentes.
