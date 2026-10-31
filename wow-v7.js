/* V7 choreography. No scroll interception, no overlay, content visible by default. */
(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.querySelector('.wow-hero');
  if (!hero) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const skip = document.getElementById('skip-opening');
  const motion = document.getElementById('motion-toggle');
  let manualPause = false;
  let completed = false;
  try { manualPause = sessionStorage.getItem('lm-motion-paused') === 'true'; } catch (_) {}
  const isReduced = () => preference.matches || manualPause;
  const finish = () => {
    completed = true;
    root.classList.remove('wow-opening');
    if (document.activeElement === skip) motion.focus({preventScroll:true});
    skip.hidden = true;
    window.dispatchEvent(new CustomEvent('wow-opening-finished'));
  };
  function syncMotion() {
    root.classList.toggle('wow-paused', isReduced());
    motion.setAttribute('aria-pressed', String(isReduced()));
    motion.textContent = isReduced() ? 'Movimento reduzido' : 'Pausar movimento';
    motion.title = preference.matches ? 'A preferência de movimento reduzido do dispositivo está ativa' : '';
    motion.disabled = preference.matches;
    if (isReduced()) finish();
    window.dispatchEvent(new CustomEvent('wow-motion-change', {detail:{reduced:isReduced()}}));
  }
  motion.hidden = false;
  motion.addEventListener('click', () => {
    manualPause = !manualPause;
    try { sessionStorage.setItem('lm-motion-paused', String(manualPause)); } catch (_) {}
    syncMotion();
    if (!isReduced()) motion.textContent = 'Pausar movimento';
  });
  preference.addEventListener('change', syncMotion);
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !completed) finish(); });
  // Hash/deep links and restored pages get direct access; no obligatory introduction.
  if (!isReduced() && !location.hash && scrollY < 20) {
    root.classList.add('wow-opening');
    skip.hidden = false;
    setTimeout(finish, 1550);
  } else finish();
  syncMotion();
  window.addEventListener('pageshow', e => { if (e.persisted) finish(); });

  // Move the intact credential as a whole; its script, DOM and physics stay unchanged.
  const credential = document.getElementById('credencial');
  const projects = document.getElementById('projetos');
  if (credential && projects) projects.insertAdjacentElement('afterend', credential);
  const summary = document.getElementById('perfil-profissional');
  const about = document.getElementById('sobre');
  if (summary && about) about.insertAdjacentElement('afterend', summary);

  // One-shot editorial reveal; default content is already visible, including no-JS.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!isReduced()) {
          entry.target.classList.add('wow-revealing');
          entry.target.addEventListener('animationend', () => entry.target.classList.remove('wow-revealing'), {once:true});
        }
        observer.unobserve(entry.target);
      });
    }, {threshold:.12});
    document.querySelectorAll('.projects-grid>.card,.wow-practice-copy,.about-copy').forEach(el => observer.observe(el));
  }
  // Depth follows native scroll; mobile and reduced motion keep a steady composition.
  let scrollFrame=0;
  function depth(){
    scrollFrame=0;
    const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/hero.offsetHeight));
    const enabled=!isReduced()&&innerWidth>760;
    hero.style.setProperty('--title-shift',enabled?(-progress*38)+'px':'0px');
    hero.style.setProperty('--concept-shift',enabled?(progress*20)+'px':'0px');
  }
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(depth);},{passive:true});
  addEventListener('wow-motion-change',depth);

  // Magnetic displacement is intentionally bounded to four CSS pixels.
  document.querySelectorAll('.wow-magnetic').forEach(button => {
    button.addEventListener('pointermove', e => {
      if (!fine.matches || isReduced() || e.pointerType !== 'mouse') return;
      const box = button.getBoundingClientRect();
      const x = Math.max(-4,Math.min(4,(e.clientX-box.left-box.width/2)*.06));
      const y = Math.max(-3,Math.min(3,(e.clientY-box.top-box.height/2)*.06));
      button.style.translate = `${x}px ${y}px`;
    });
    button.addEventListener('pointerleave', () => button.style.translate = 'none');
  });
})();
