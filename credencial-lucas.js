/* Lucas Martinez | Credencial animada 3D - v1, independente de bibliotecas externas */
(() => {
  "use strict";
  const hero = document.getElementById("inicio");
  if (!hero || document.getElementById("credencial")) return;
  const sec = document.createElement("section");
  sec.id = "credencial";
  sec.className = "lm-credential-section section";
  sec.setAttribute("aria-labelledby", "lm-credential-title");
  sec.innerHTML = `
    <div class="container lm-credential-grid">
      <div class="lm-credential-info">
        <span class="lm-credential-eyebrow"><span class="lm-credential-led"></span> IDENTIDADE DIGITAL // 01</span>
        <h2 id="lm-credential-title">Muito além de um <span>crachá.</span></h2>
        <p class="lm-credential-lead">Uma credencial interativa para quem transforma desafios em soluções de software, automação e inteligência artificial.</p>
        <p>Segure o crachá e movimente-o. Toque para girar e descubra, no verso, um QR Code que abre meu GitHub.</p>
        <div class="lm-credential-features"><span>◈ 3D interativo</span><span>↔ Arraste ou toque</span><span>▦ QR real</span></div>
        <div class="lm-credential-actions">
          <button id="lm-credential-flip" type="button" class="lm-credential-action lm-credential-action-primary" aria-controls="lm-credential-card">Ver verso ↻</button>
          <a href="https://github.com/LucasMartinez96" class="lm-credential-action" target="_blank" rel="noopener noreferrer">Acessar GitHub ↗</a>
        </div>
      </div>
      <div class="lm-credential-scene is-visible" aria-label="Credencial interativa de Lucas Martinez">
        <div class="lm-credential-halo" aria-hidden="true"></div>
        <div class="lm-credential-orbit lm-orbit-one" aria-hidden="true"></div>
        <div class="lm-credential-orbit lm-orbit-two" aria-hidden="true"></div>
        <div class="lm-credential-swing">
          <svg class="lm-credential-strap" viewBox="0 0 360 190" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="lm-strap-grad" x1="0" y1="0" x2="1" y2="0">
                <stop stop-color="#031127"/><stop offset=".4" stop-color="#0d2e5e"/><stop offset=".7" stop-color="#102b4f"/><stop offset="1" stop-color="#051326"/>
              </linearGradient>
              <path id="lm-strap-text-left" d="M 132 -12 L 168 166"/>
              <path id="lm-strap-text-right" d="M 228 -12 L 192 166"/>
            </defs>
            <path d="M 116 -14 L 152 -14 L 186 164 L 160 170 Z" fill="url(#lm-strap-grad)" stroke="#1f75c7" stroke-width="1.5"/>
            <path d="M 208 -14 L 244 -14 L 200 170 L 174 164 Z" fill="url(#lm-strap-grad)" stroke="#1f75c7" stroke-width="1.5"/>
            <text font-family="Arial, sans-serif" font-size="13" letter-spacing="1.1" font-weight="700" fill="#b9e9ff"><textPath href="#lm-strap-text-left">LUCAS MARTINEZ · LUCAS MARTINEZ</textPath></text>
            <text font-family="Arial, sans-serif" font-size="13" letter-spacing="1.1" font-weight="700" fill="#b9e9ff"><textPath href="#lm-strap-text-right">LUCAS MARTINEZ · LUCAS MARTINEZ</textPath></text>
            <rect x="163" y="156" width="34" height="31" rx="8" fill="#111c2c" stroke="#6aa2d4" stroke-width="2"/>
            <rect x="170" y="163" width="20" height="17" rx="5" fill="#050d1a" stroke="#a2c7e9" stroke-width="2"/>
          </svg>
          <div id="lm-credential-card" class="lm-credential-card" role="button" tabindex="0" aria-label="Girar crachá e mostrar o verso" aria-pressed="false">
            <div class="lm-credential-flipper">
              <div class="lm-credential-face lm-credential-front">
                <div class="lm-credential-topline"><span class="lm-gh-sign">◉</span><span>DEVELOPER / TECHNOLOGY</span><span class="lm-pixel-pips">▪ ▪ ▪</span></div>
                <img src="assets/lucas-credencial-retrato.svg" alt="Retrato de Lucas Martinez" class="lm-credential-portrait" loading="lazy"/>
                <div class="lm-credential-fade"></div>
                <div class="lm-credential-front-text">
                  <div class="lm-credential-chip"><span></span> DIGITAL IDENTITY</div>
                  <strong>Lucas<br><em>Martinez</em></strong>
                  <span class="lm-credential-role">DESENVOLVIMENTO · AUTOMAÇÃO · IA</span>
                  <div class="lm-credential-symbols"><span>‹/› CODE</span><span>◈ CREATE</span><span>⌘ BUILD</span></div>
                </div>
              </div>
              <div class="lm-credential-face lm-credential-back">
                <div class="lm-credential-back-top"><span>LM / PORTFOLIO</span><span>↗</span></div>
                <h3>LET'S BUILD<br><span>TOGETHER.</span></h3>
                <div class="lm-credential-qr-frame">
                  <svg id="lm-credential-qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" role="img" aria-label="QR Code para github.com/LucasMartinez96" shape-rendering="crispEdges"></svg>
                </div>
                <p class="lm-credential-qr-caption">ESCANEIE PARA ACESSAR MEU GITHUB</p>
                <strong class="lm-credential-url">github.com/LucasMartinez96</strong>
                <div class="lm-credential-back-bottom"><span>BUILD WITH PURPOSE.</span><span>© 2026 LM</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="lm-credential-scene-note" aria-hidden="true">INTERACTIVE ID · FRONT / BACK</div>
      </div>
    </div>`;
  hero.insertAdjacentElement("afterend", sec);
  // Matriz QR veficada por decodificação real: https://github.com/LucasMartinez96
  const matrix = atob("AAAAAAAAAAAAAAAAAAAAAAAAAP5ss/gEEHpQQC6JNLoBdH5l0Aun6C6AQVspBAP6qq/gAABNAACWuc0AA28YUkAqggc8Aat1YWAFc4XlgFhcZgAByKGv4B0z7coAppfJEANHQXpAI+85ZgAQOZswCiAx+gAAdnxcA/laKkAQUrEfALpCz4gF1/DfgC6cPjoBBKH5IA/pVP0AAAAAAAAAAAAAAAAAAAAAAAAAAA==");
  const qr = sec.querySelector("#lm-credential-qr");
  let path = "";
  for (let i = 0; i < 1369; i++) {
    if (matrix.charCodeAt(i >> 3) & (128 >> (i % 8))) path += "M" + (i % 37) + " " + ((i / 37) | 0) + "h1v1h-1z";
  }
  qr.innerHTML = '<rect width="37" height="37" fill="#fff"/><path fill="#061329" d="' + path + '"/>';
  const card = sec.querySelector("#lm-credential-card"), button = sec.querySelector("#lm-credential-flip");
  const scene = sec.querySelector(".lm-credential-scene");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let flipped = false, dragging = false, startX = 0, startY = 0;
  let targetX = 0, targetY = 0, nowX = 0, nowY = 0, frame = 0;
  function animate() {
    nowX += (targetX - nowX) * .15;
    nowY += (targetY - nowY) * .15;
    card.style.setProperty("--lm-rx", nowX.toFixed(2) + "deg");
    card.style.setProperty("--lm-ry", nowY.toFixed(2) + "deg");
    if (Math.abs(nowX - targetX) > .05 || Math.abs(nowY - targetY) > .05) frame = requestAnimationFrame(animate);
    else frame = 0;
  }
  const redraw = () => { if (!frame) frame = requestAnimationFrame(animate); };
  function flip() {
    flipped = !flipped;
    card.classList.toggle("is-flipped", flipped);
    card.setAttribute("aria-pressed", String(flipped));
    card.setAttribute("aria-label", flipped ? "Girar crachá e mostrar a frente" : "Girar crachá e mostrar o verso");
    button.textContent = flipped ? "Ver frente ↺" : "Ver verso ↻";
  }
  button.addEventListener("click", flip);
  card.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); flip(); } });
  card.addEventListener("pointerdown", ev => {
    if (ev.pointerType !== "touch" && ev.button !== 0) return;
    dragging = true; startX = ev.clientX; startY = ev.clientY;
    card.setPointerCapture(ev.pointerId);
    card.classList.add("is-dragging");
  });
  card.addEventListener("pointermove", ev => {
    if (reduced) return;
    if (dragging) {
      targetY = Math.max(-19, Math.min(19, (ev.clientX - startX) * .17));
      targetX = Math.max(-14, Math.min(14, -(ev.clientY - startY) * .14));
    } else if (ev.pointerType === "mouse") {
      const r = card.getBoundingClientRect();
      targetY = ((ev.clientX - r.left) / r.width - .5) * 17;
      targetX = -((ev.clientY - r.top) / r.height - .5) * 13;
    }
    redraw();
  });
  card.addEventListener("pointerup", ev => {
    if (!dragging) return;
    dragging = false; card.classList.remove("is-dragging");
    const dx = ev.clientX - startX, dy = ev.clientY - startY;
    if (Math.abs(dx) > 50 || (Math.abs(dx) < 8 && Math.abs(dy) < 8)) flip();
    targetX = targetY = 0; redraw();
  });
  card.addEventListener("pointercancel", () => { dragging = false; card.classList.remove("is-dragging"); targetX = targetY = 0; redraw(); });
  card.addEventListener("pointerleave", () => { if (!dragging) { targetX = targetY = 0; redraw(); } });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(entries => { scene.classList.toggle("is-visible", entries[0].isIntersecting); }, { threshold: .05 }).observe(scene);
  }
})();