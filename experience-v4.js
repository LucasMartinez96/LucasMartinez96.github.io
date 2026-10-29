/* Lucas Martinez / Scroll Experience V4 — sem bibliotecas e sem intro bloqueante. */
(() => {
  'use strict';
  const main = document.querySelector('main#conteudo');
  if (!main || document.getElementById('experiencia')) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lite = Boolean(navigator.connection && navigator.connection.saveData) ||
    (navigator.hardwareConcurrency || 8) <= 4 ||
    (navigator.deviceMemory || 8) <= 4;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const root = document.createElement('section');
  root.className = 'v4-experience';
  root.id = 'experiencia';
  root.setAttribute('aria-label', 'Experiência visual interativa: programação, identidade e projetos de Lucas Martinez');
  if (lite) root.dataset.lite = 'true';
  root.innerHTML = [
    '<div class="v4-hold">',
      '<div class="v4-grid" aria-hidden="true"></div>',
      '<div class="v4-ambient" aria-hidden="true"></div>',
      '<div class="v4-frame" aria-hidden="true"></div>',
      '<div class="v4-hud" aria-hidden="true">',
        '<span class="v4-hud-left"><i class="v4-hud-dot"></i> <strong>LM.</strong> / CODE EXPERIENCE</span>',
        '<span class="v4-hud-right"><b>PORTFOLIO 2026</b> &nbsp; SYSTEM ONLINE</span>',
      '</div>',
      '<div class="v4-rail" aria-hidden="true"><span class="v4-active"></span><span></span><span></span><span></span></div>',
      '<div class="v4-scene v4-laptop-scene" aria-hidden="true">',
        '<div class="v4-laptop">',
          '<div class="v4-laptop-screen">',
            '<div class="v4-editor-top"><span class="v4-editor-dots"><i></i><i></i><i></i></span><span>LucasMartinez.java</span><span>● JAVA</span></div>',
            '<pre class="v4-editor-code"><code id="v4-code"></code></pre>',
            '<div class="v4-editor-status"><span>⌁ JAVA &nbsp; UTF-8</span><span id="v4-build">SYSTEM INITIALIZING</span></div>',
          '</div>',
          '<div class="v4-laptop-base"></div>',
          '<div class="v4-float v4-float-one">01 / <strong>SOFTWARE</strong><br>BUILDING IDEAS</div>',
          '<div class="v4-float v4-float-two"><strong>{ }</strong> AUTOMATION<br>AI & DATA</div>',
        '</div>',
      '</div>',
      '<div class="v4-scene v4-tunnel-scene" aria-hidden="true">',
        '<div class="v4-tunnel-core"></div>',
        '<div class="v4-tunnel-ring"></div><div class="v4-tunnel-ring"></div><div class="v4-tunnel-ring"></div><div class="v4-tunnel-ring"></div>',
        '<span class="v4-tunnel-symbol" style="left:16%;top:22%">public static void</span>',
        '<span class="v4-tunnel-symbol" style="left:69%;top:25%">0101 / AI</span>',
        '<span class="v4-tunnel-symbol" style="left:11%;top:76%">{ code }</span>',
        '<span class="v4-tunnel-symbol" style="left:74%;top:70%">System.out.println()</span>',
      '</div>',
      '<div class="v4-scene v4-logo-scene" aria-hidden="true">',
        '<div class="v4-logo-aura"></div><div class="v4-orbit"></div><div class="v4-orbit v4-orbit-two"></div>',
        '<div class="v4-monogram"><span class="v4-monogram-text">LM</span><span class="v4-logo-code">&lt;/&gt;</span></div>',
        '<div class="v4-brand-caption"><h2>LUCAS <span>MARTINEZ</span></h2><p>SOFTWARE · AUTOMAÇÃO · INTELIGÊNCIA ARTIFICIAL</p></div>',
      '</div>',
      '<div class="v4-scene v4-project-scene" aria-hidden="true">',
        '<div class="v4-project-copy">',
          '<p class="v4-eyebrow">04 / MUNDO REAL</p>',
          '<p class="v4-title">CÓDIGO<br>QUE VIRA<br><em>IMPACTO.</em></p>',
          '<p class="v4-description">Dashboards, automação, inteligência artificial e experiências 3D. Conheça os projetos por trás das ideias.</p>',
        '</div>',
        '<div class="v4-deck">',
          '<div class="v4-deck-card v4-card-left"><img src="assets/sese-hub-inventario-ciclico.jpg" alt="" loading="lazy" decoding="async"></div>',
          '<div class="v4-deck-card v4-card-right"><img src="assets/sese-hub-patio-3d.jpg" alt="" loading="lazy" decoding="async"></div>',
          '<div class="v4-deck-card v4-card-front"><img src="assets/sese-hub-control-tower.jpg" alt="" loading="lazy" decoding="async">',
            '<div class="v4-deck-meta"><span>01 / PROJETO EM DESTAQUE</span><strong>SESÉ HUB / CONTROL TOWER</strong></div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="v4-copy v4-show" data-v4-copy="0">',
        '<p class="v4-eyebrow">01 / INICIALIZANDO</p>',
        '<p class="v4-title">IDEIAS<br>VIRAM<br><em>CÓDIGO.</em></p>',
        '<p class="v4-description">Uma experiência feita de software, automação e inteligência artificial. Role para entrar no meu universo.</p>',
        '<p class="v4-tiny">JAVA <i></i> BUILD <i></i> CREATE</p>',
      '</div>',
      '<div class="v4-copy" data-v4-copy="1">',
        '<p class="v4-eyebrow">02 / DO OUTRO LADO DA TELA</p>',
        '<p class="v4-title">ENTRE<br>NO <em>CÓDIGO.</em></p>',
        '<p class="v4-description">Cada linha abre uma possibilidade. Da lógica ao visual, tecnologia que ganha forma.</p>',
        '<p class="v4-tiny">DESENVOLVIMENTO <i></i> INOVAÇÃO</p>',
      '</div>',
      '<div class="v4-bottom" aria-hidden="true"><span class="v4-bottom-note">CONTINUE ROLANDO</span><span class="v4-meter"><span class="v4-meter-fill"></span></span><span class="v4-stage-count">01 / 04</span></div>',
    '</div>'
  ].join('');

  // Inserir antes do hero preserva a estrutura, conteúdo, filtros e navegação originais.
  main.insertBefore(root, main.firstChild);
  const hold = root.querySelector('.v4-hold');
  const laptopScene = root.querySelector('.v4-laptop-scene');
  const laptop = root.querySelector('.v4-laptop');
  const tunnelScene = root.querySelector('.v4-tunnel-scene');
  const tunnelCore = root.querySelector('.v4-tunnel-core');
  const logoScene = root.querySelector('.v4-logo-scene');
  const monogram = root.querySelector('.v4-monogram');
  const projectScene = root.querySelector('.v4-project-scene');
  const deck = root.querySelector('.v4-deck');
  const code = root.querySelector('#v4-code');
  const build = root.querySelector('#v4-build');
  const meter = root.querySelector('.v4-meter-fill');
  const stageCount = root.querySelector('.v4-stage-count');
  const copies = Array.from(root.querySelectorAll('[data-v4-copy]'));
  const rail = Array.from(root.querySelectorAll('.v4-rail span'));
  const source = [
    'public class LucasMartinez {',
    '  public static void main(String[] args) {',
    '    String foco = "Software | Automação | IA";',
    '    System.out.println("Bem-vindo!");',
    '  }',
    '}'
  ].join('\n');
  let lastCharacters = -1;
  let lastStage = -1;
  let scheduled = false;

  const escapeHtml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function highlight(value) {
    return value.split(/("[^"]*"|\b(?:public|class|static|void|String|System|out|println|main)\b)/g).map(part => {
      if (part.startsWith('"')) return '<span class="v4-str">' + escapeHtml(part) + '</span>';
      if (/^(public|class|static|void)$/.test(part)) return '<span class="v4-kw">' + part + '</span>';
      if (/^(String|System|out|println|main)$/.test(part)) return '<span class="v4-type">' + part + '</span>';
      return escapeHtml(part);
    }).join('');
  }
  function render() {
    scheduled = false;
    if (!document.contains(root)) return;
    const rect = root.getBoundingClientRect();
    // Fora da área visível, não gerar atualizações visuais desnecessárias.
    if (rect.top > window.innerHeight + 100 || rect.bottom < -100) return;
    const total = Math.max(1, root.offsetHeight - hold.offsetHeight);
    const p = clamp(-rect.top / total);
    const phase1 = clamp((p - .18) / .17);
    const phase2 = clamp((p - .41) / .15) * (1 - clamp((p - .66) / .12));
    const phase3 = clamp((p - .69) / .11);
    const tunnelVisible = clamp((p - .24) / .1) * (1 - clamp((p - .44) / .12));
    const laptopVisible = 1 - clamp((p - .23) / .15);
    const stage = p < .28 ? 0 : p < .51 ? 1 : p < .73 ? 2 : 3;
    const isMobile = window.innerWidth <= 760;

    laptopScene.style.opacity = String(laptopVisible);
    const position = isMobile ? 'translate3d(-50%,-50%,0) perspective(950px) rotateY(-7deg) rotateX(5deg)' :
      'translate3d(0,-48%,0) perspective(1300px) rotateY(-12deg) rotateX(6deg)';
    laptop.style.transform = position + ' scale(' + (1 + phase1 * (isMobile ? 1.4 : 1.95)).toFixed(3) + ')';
    tunnelScene.style.opacity = String(tunnelVisible);
    tunnelCore.style.transform = 'rotate(' + (20 + p * 180).toFixed(1) + 'deg) scale(' + (.55 + p * 1.6).toFixed(3) + ')';
    logoScene.style.opacity = String(phase2);
    monogram.style.transform = 'translate3d(0,' + ((1-phase2)*50).toFixed(1) + 'px,0) scale(' + (.7 + phase2*.3).toFixed(3) + ') rotateY(' + ((1-phase2)*-24).toFixed(1) + 'deg)';
    projectScene.style.opacity = String(phase3);
    deck.style.transform = 'translate3d(0,' + ((1-phase3)*65).toFixed(1) + 'px,0) scale(' + (.82 + phase3*.18).toFixed(3) + ')';
    const characters = Math.min(source.length,Math.max(12,Math.round(source.length*clamp((p+.015)/.245))));
    if (characters !== lastCharacters) {
      code.innerHTML = highlight(source.slice(0, characters)) + (characters === source.length ? '' : '<span class="v4-caret"></span>');
      lastCharacters = characters;
    }
    build.textContent = p > .2 ? '✓ BUILD SUCCESS' : 'SYSTEM INITIALIZING';
    meter.style.width = (p * 100).toFixed(2) + '%';
    if (lastStage !== stage) {
      lastStage = stage;
      root.dataset.stage = String(stage);
      stageCount.textContent = '0' + (stage + 1) + ' / 04';
      copies.forEach((el, index) => el.classList.toggle('v4-show', index === stage));
      rail.forEach((el, index) => el.classList.toggle('v4-active', index === stage));
    }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(render);
  }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  document.addEventListener('visibilitychange', () => {
    root.dataset.idle = document.hidden ? 'true' : 'false';
    if (!document.hidden) schedule();
  });
  schedule();

  // Links diretos continuam funcionando inclusive quando a seção é inserida após o parse.
  if (location.hash && location.hash !== '#experiencia') {
    window.addEventListener('load', () => {
      try {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) target.scrollIntoView({behavior:'auto',block:'start'});
      } catch (_) {}
      schedule();
    }, {once:true});
  }
  // Respeitar alteração da preferência de movimento sem reiniciar a página.
  if (typeof motion.addEventListener === 'function') motion.addEventListener('change', schedule);
})();