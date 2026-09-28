import { questions, quizResult, youtubeId } from './course.mjs';
const $ = id => document.getElementById(id);
const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
const save = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
const configKey = 'raciocinio-config-v1', draftKey = 'raciocinio-draft-v1';
let savedConfig = {};
try { const parsed = JSON.parse(read(configKey) || '{}'); if (parsed && typeof parsed === 'object') savedConfig = parsed; } catch { /* Invalid local preferences: use project defaults. */ }
const config = { ...window.COURSE_CONFIG, ...savedConfig };
const emptyVideo = $('video-container').firstElementChild.cloneNode(true);
function applyConfig() {
  $('author-name').textContent = typeof config.author === 'string' && config.author.trim() ? config.author.trim() : '[Nome do autor]';
  $('institution-name').textContent = typeof config.institution === 'string' && config.institution.trim() ? ' · ' + config.institution.trim() : '';
  $('author-input').value = config.author || '';
  $('institution-input').value = config.institution || '';
  $('youtube-input').value = config.youtubeId || '';
  const id = youtubeId(config.youtubeId);
  const container = $('video-container'); container.replaceChildren();
  if (id) {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}`;
    frame.title = 'Aula: Além da resposta certa'; frame.loading = 'lazy';
    frame.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin';
    container.append(frame);
  } else container.append(emptyVideo.cloneNode(true));
}
applyConfig();
$('settings-form').addEventListener('submit', event => {
  event.preventDefault();
  const id = youtubeId($('youtube-input').value);
  if (id === null) { $('settings-status').textContent = 'Link inválido. Use um link do YouTube ou um ID de 11 caracteres.'; $('youtube-input').setAttribute('aria-invalid', 'true'); $('youtube-input').focus(); return; }
  $('youtube-input').removeAttribute('aria-invalid');
  config.author = $('author-input').value.trim(); config.institution = $('institution-input').value.trim(); config.youtubeId = id;
  const stored = save(configKey, JSON.stringify(config)); applyConfig();
  $('settings-status').textContent = stored ? 'Aplicado e salvo neste navegador. Para publicar os dados para todos, edite config.js.' : 'Aplicado nesta sessão. O navegador não permitiu salvar as preferências.';
});
const answers = {};
function updateScore() {
  const result = quizResult(answers);
  $('quiz-score').textContent = `${result.answered} de ${result.total} respondidas · ${result.correct} corretas` + (result.answered === result.total ? ' · Quiz concluído. Revise os feedbacks e siga para sua atividade.' : '');
}
questions.forEach((question, i) => {
  const card = document.createElement('div'); card.className = 'question';
  const fieldset = document.createElement('fieldset'); const legend = document.createElement('legend');
  legend.textContent = `${i + 1}. ${question.title}`; fieldset.append(legend);
  const feedback = document.createElement('p'); feedback.id = `feedback-${i}`; feedback.setAttribute('role', 'status'); feedback.hidden = true;
  question.options.forEach(([label, correct, explanation], j) => {
    const option = document.createElement('label'); option.className = 'option';
    const radio = document.createElement('input'); radio.type = 'radio'; radio.name = `question-${i}`; radio.value = j; radio.setAttribute('aria-describedby', feedback.id);
    const text = document.createElement('span'); text.textContent = label;
    radio.addEventListener('change', () => { answers[i] = j; feedback.hidden = false; feedback.className = `feedback${correct ? '' : ' retry'}`; feedback.textContent = `${correct ? 'Correto.' : 'Reveja sua escolha.'} ${explanation}`; updateScore(); });
    option.append(radio, text); fieldset.append(option);
  });
  card.append(fieldset, feedback); $('quiz').append(card);
});
$('reset-quiz').addEventListener('click', () => { Object.keys(answers).forEach(key => delete answers[key]); document.querySelectorAll('#quiz input').forEach(input => input.checked = false); document.querySelectorAll('#quiz [role=status]').forEach(el => { el.hidden = true; el.textContent = ''; }); updateScore(); document.querySelector('#quiz input').focus(); });
$('final-answer').value = read(draftKey) || '';
$('final-answer').addEventListener('input', () => { $('draft-status').textContent = save(draftKey, $('final-answer').value) ? 'Rascunho salvo neste navegador.' : 'Não foi possível salvar no navegador. Baixe sua proposta antes de sair.'; });
$('clear-answer').addEventListener('click', () => { if (!$('final-answer').value || !window.confirm('Apagar o rascunho salvo neste navegador?')) return; $('final-answer').value = ''; const stored = save(draftKey, ''); $('draft-status').textContent = stored ? 'Rascunho apagado.' : 'Texto limpo nesta sessão. Não foi possível atualizar o armazenamento.'; $('final-answer').focus(); });
$('download-answer').addEventListener('click', () => {
  if (!$('final-answer').value.trim()) { $('draft-status').textContent = 'Escreva sua proposta antes de baixar.'; $('final-answer').focus(); return; }
  const blob = new Blob(['\uFEFFAtividade final — Além da resposta certa\n\n' + $('final-answer').value], { type:'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'minha-atividade.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); $('draft-status').textContent = 'Download solicitado. Confira o arquivo antes de enviá-lo ao professor.';
});
const navLinks = Array.from(document.querySelectorAll('nav a'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top); if (!visible.length) return; const id = visible[0].target.id; navLinks.forEach(link => { if (link.hash === '#' + id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }, { rootMargin:'-12% 0px -65% 0px', threshold:0 });
  navLinks.forEach(link => observer.observe(document.querySelector(link.hash)));
}
