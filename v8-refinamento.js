/* V8 REFINAMENTO PREMIUM: acesso rápido opcional à galeria, sem substituir a experiência V7. */
(() => {
  'use strict';

  const experience = document.getElementById('experiencia');
  const shadow = experience && experience.shadowRoot;
  const stage = shadow && shadow.getElementById('v7-stage');
  const target = document.getElementById('projetos');
  if (!stage || !target || stage.querySelector('.v8-skip-intro')) return;

  const styles = document.createElement('style');
  styles.textContent = `
    .v8-skip-intro {
      position: absolute;
      z-index: 16;
      top: calc(env(safe-area-inset-top, 0px) + 18px);
      right: clamp(16px, 3vw, 44px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 11px 16px;
      background: rgba(4, 17, 36, .85);
      border: 1px solid rgba(138, 215, 255, .65);
      border-radius: 9px;
      color: #e8f6ff;
      font: 600 13px/1.3 'IBM Plex Sans', system-ui, sans-serif;
      letter-spacing: .015em;
      cursor: pointer;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: background .2s ease, border-color .2s ease;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    .v8-skip-intro:hover { background: #123a61; border-color: #c8f3ff; }
    .v8-skip-intro:focus-visible { outline: 3px solid #8ae1ff; outline-offset: 3px; }
    @media(max-width:700px) {
      .v8-skip-intro {
        top: calc(env(safe-area-inset-top, 0px) + 12px);
        right: 12px;
        font-size: 12px;
        padding: 10px 13px;
      }
    }
    @media(prefers-reduced-motion:reduce) {
      .v8-skip-intro { transition: none; }
    }
  `;
  shadow.appendChild(styles);
  const skip = document.createElement('button');
  skip.type = 'button';
  skip.className = 'v8-skip-intro';
  skip.textContent = 'Pular abertura · Ver projetos';
  skip.setAttribute('aria-label', 'Pular animação de abertura e ir diretamente aos projetos');
  skip.addEventListener('click', () => {
    const top = Math.max(0, Math.round(window.scrollY + target.getBoundingClientRect().top - 72));
    window.scrollTo({ top, behavior: 'instant' });
    const heading = target.querySelector('h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    try { window.history.replaceState(null, '', '#projetos'); } catch (_) {}
  });
  stage.appendChild(skip);
})();
