/* Lucas Martinez | Code Experience v1 — adição isolada, sem alterar a lógica do portfólio. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const params = new URLSearchParams(window.location.search);
  const forceIntro = params.get('intro') === '1';
  const demo = document.documentElement.hasAttribute('data-intro-demo');
  let running = false;
  let abortController = null;
  let overlay = null;
  let restoreFocus = null;

  const code = [
    'public class LucasMartinez {',
    '    public static void main(String[] args) {',
    '        String nome = "Lucas Martinez";',
    '        String foco = "Software • Automação • IA";',
    '        System.out.println("Olá! Eu sou " + nome);',
    '        System.out.println(foco);',
    '    }',
    '}'
  ].join('\n');

  function wait(ms, signal) {
    return new Promise((resolve) => {
      if (signal.aborted) return resolve();
      const timer = window.setTimeout(() => { signal.removeEventListener('abort', onAbort); resolve(); }, ms);
      function onAbort() { window.clearTimeout(timer); signal.removeEventListener('abort', onAbort); resolve(); }
      signal.addEventListener('abort', onAbort, { once: true });
    });
  }

  function escapeText(s) { return s.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function javaSyntax(source) {
    const rx = /("(?:[^"\\]|\\.)*"|\/\/[^\n]*|\b(?:public|class|static|void|new|return)\b|\b(?:String|System)\b|\b(?:main|println|out)\b|\b\d+\b)/g;
    let html = '', last = 0, m;
    while ((m = rx.exec(source))) {
      html += escapeText(source.slice(last, m.index));
      const t = m[0];
      const cls = t.startsWith('"') ? 'string' : t.startsWith('//') ? 'comment' : /^(public|class|static|void|new|return)$/.test(t) ? 'keyword' : /^(String|System)$/.test(t) ? 'type' : 'method';
      html += `<span class="java-${cls}">${escapeText(t)}</span>`;
      last = rx.lastIndex;
    }
    return html + escapeText(source.slice(last));
  }

  function markCode(el, content) {
    const lines = content.split('\n');
    el.innerHTML = lines.map((line, i) => `<div class="intro-code-line"><span class="intro-line-num">${String(i + 1).padStart(2,'0')}</span><span class="intro-line-content">${javaSyntax(line)}${i === lines.length - 1 ? '<span class="intro-caret" aria-hidden="true"></span>' : ''}</span></div>`).join('');
    const body = el.closest('.intro-editor-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function buildIntro() {
    const el = document.createElement('div');
    el.className = 'lm-intro';
    el.tabIndex = -1;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Animação de abertura: Lucas Martinez, programação em Java');
    el.setAttribute('data-phase', 'boot');
    el.innerHTML = `
      <div class="lm-intro-glow" aria-hidden="true"></div>
      <div class="lm-intro-grid" aria-hidden="true"></div>
      <header class="lm-intro-top">
        <span class="lm-intro-logo">LM<span>.</span> <small>/ CODE EXPERIENCE</small></span>
      </header>
      <main class="lm-intro-stage">
        <div class="lm-intro-copy">
          <div class="lm-intro-eyebrow"><span class="lm-intro-pulse"></span> SYSTEM INITIALIZING <span class="lm-intro-index">/ 001</span></div>
          <h2>IDEIAS<br>VIRAM<br><em>CÓDIGO.</em></h2>
          <p>Desenvolvimento, automação e inteligência artificial. Tudo começa com uma linha.</p>
          <div class="lm-intro-path"><span>01</span><i></i><span>CREATE</span><i></i><span>RUN</span><i></i><span>BUILD</span></div>
        </div>
        <div class="lm-intro-machine" aria-label="Computador animado com código Java sendo digitado">
          <div class="lm-intro-float lm-intro-float-one" aria-hidden="true"><span class="float-symbol">{ }</span><span>JAVA<br><strong>MAIN CLASS</strong></span></div>
          <div class="lm-intro-float lm-intro-float-two" aria-hidden="true"><span class="lm-intro-orb"></span> SYSTEM ONLINE</div>
          <div class="lm-intro-laptop" id="lm-intro-laptop">
            <div class="lm-intro-screen-frame">
              <div class="lm-intro-screen">
                <div class="lm-intro-window-top">
                  <span class="lm-intro-dots"><i></i><i></i><i></i></span>
                  <span class="lm-intro-workspace">LUCAS / WORKSPACE</span>
                  <span class="lm-intro-window-mini">⌘</span>
                </div>
                <div class="lm-intro-tabs"><span class="lm-intro-tab-active"><b class="lm-intro-java-icon">J</b> LucasMartinez.java <i>●</i></span><span class="lm-intro-tab-dim">README.md</span></div>
                <div class="lm-intro-ide">
                  <aside class="lm-intro-rail" aria-hidden="true"><span>▦</span><span>⌕</span><span>◇</span><span>⚙</span></aside>
                  <div class="lm-intro-editor">
                    <div class="lm-intro-file-path">src <span>/</span> main <span>/</span> <b>LucasMartinez.java</b></div>
                    <div class="intro-editor-body"><div class="lm-intro-code" id="lm-intro-code" aria-hidden="true"></div></div>
                    <div class="lm-intro-console">
                      <div class="lm-intro-console-bar"><span>TERMINAL</span><span>OUTPUT <b>01</b></span></div>
                      <div class="lm-intro-console-content" id="lm-intro-console"><span class="lm-intro-console-muted">$ </span><span id="lm-intro-command">aguardando código...</span><span class="lm-intro-console-result" id="lm-intro-result"></span></div>
                    </div>
                    <div class="lm-intro-statusbar"><span>◉ Java</span><span>UTF-8　·　Ln 1, Col 1　·　READY</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lm-intro-laptop-base"><div class="lm-intro-trackpad"></div><div class="lm-intro-keyboard" aria-hidden="true"></div></div>
            <div class="lm-intro-laptop-bottom"></div>
          </div>
          <div class="lm-intro-underlabel" aria-hidden="true"><span>DEV ENVIRONMENT</span><span>EST. 2026</span></div>
        </div>
      </main>
      <div class="lm-intro-reveal" aria-hidden="true"><span class="lm-intro-reveal-small">COMPILATION COMPLETE / HELLO WORLD</span><div>LUCAS<br><i>MARTINEZ</i><span class="lm-intro-reveal-period">.</span></div><span class="lm-intro-reveal-bottom">SOFTWARE <b>•</b> AUTOMAÇÃO <b>•</b> IA</span></div>
      <footer class="lm-intro-footer"><span id="lm-intro-status" aria-live="polite">PREPARANDO AMBIENTE</span><div class="lm-intro-progress-track"><i class="lm-intro-progress-value"></i></div><span class="lm-intro-progress-num">00 / 100</span></footer>
    `;
    return el;
  }

  function closeIntro(immediate = false) {
    if (!overlay) return;
    if (abortController) abortController.abort();
    const old = overlay;
    overlay = null;
    running = false;
    document.body.classList.remove('lm-intro-active');
    document.documentElement.classList.remove('lm-intro-active');
    old.classList.add('lm-intro-exit');
    if (immediate) old.remove(); else window.setTimeout(() => old.remove(), 700);
    try { sessionStorage.setItem('lm_intro_seen_v1', '1'); } catch (_) {}
    if (restoreFocus && document.contains(restoreFocus)) restoreFocus.focus({ preventScroll: true });
    restoreFocus = null;
  }

  async function startIntro(force = false) {
    if (running || reducedMotion.matches) return;
    if (!force && !demo && !forceIntro) {
      try { if (sessionStorage.getItem('lm_intro_seen_v1')) return; } catch (_) {}
    }
    running = true;
    restoreFocus = force ? document.activeElement : null;
    abortController = new AbortController();
    const signal = abortController.signal;
    overlay = buildIntro();
    document.body.appendChild(overlay);
    document.body.classList.add('lm-intro-active');
    document.documentElement.classList.add('lm-intro-active');
    overlay.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); closeIntro(); }
      if (e.key === 'Tab') e.preventDefault();
    });
    overlay.focus({ preventScroll: true });
    const codeNode = overlay.querySelector('#lm-intro-code');
    const statusNode = overlay.querySelector('#lm-intro-status');
    const command = overlay.querySelector('#lm-intro-command');
    const output = overlay.querySelector('#lm-intro-result');
    const progress = overlay.querySelector('.lm-intro-progress-value');
    const progressNum = overlay.querySelector('.lm-intro-progress-num');
    const setProgress = v => { progress.style.width = `${v}%`; progressNum.textContent = `${String(v).padStart(2,'0')} / 100`; };

    await wait(700, signal);
    if (signal.aborted || !overlay) return;
    overlay.dataset.phase = 'coding';
    statusNode.textContent = 'DIGITANDO LucasMartinez.java';
    let current = '';
    for (let i = 0; i < code.length; i++) {
      if (signal.aborted || !overlay) return;
      current += code[i];
      markCode(codeNode, current);
      if (i % 3 === 0 || i === code.length - 1) setProgress(Math.round(11 + (i / code.length) * 66));
      const c = code[i];
      await wait(c === '\n' ? 210 : /[{};]/.test(c) ? 95 : c === ' ' ? 12 : 24, signal);
    }
    if (signal.aborted || !overlay) return;
    overlay.dataset.phase = 'compile';
    statusNode.textContent = 'EXECUTANDO COMPILAÇÃO JAVA';
    command.textContent = 'javac LucasMartinez.java && java LucasMartinez';
    setProgress(86);
    await wait(650, signal);
    if (signal.aborted || !overlay) return;
    output.innerHTML = '<span class="lm-intro-success">✓ BUILD SUCCESS</span><span>Olá! Eu sou Lucas Martinez</span><span>Software • Automação • IA</span>';
    statusNode.textContent = 'BUILD SUCCESS · EXPERIÊNCIA PRONTA';
    setProgress(100);
    overlay.dataset.phase = 'success';
    await wait(850, signal);
    if (signal.aborted || !overlay) return;
    overlay.dataset.phase = 'reveal';
    await wait(1350, signal);
    if (!signal.aborted) closeIntro();
  }

  function addReplay() {
    const target = document.querySelector('.hero-buttons') || document.querySelector('.hero-main') || document.querySelector('main');
    if (!target || document.getElementById('lm-intro-replay')) return;
    const replay = document.createElement('button');
    replay.type = 'button';
    replay.id = 'lm-intro-replay';
    replay.className = 'lm-intro-replay';
    replay.textContent = '↻ Rever abertura';
    replay.addEventListener('click', () => startIntro(true));
    target.appendChild(replay);
  }

  function boot() {
    addReplay();
    if (!reducedMotion.matches) startIntro();
    reducedMotion.addEventListener('change', e => { if (e.matches && overlay) closeIntro(true); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
