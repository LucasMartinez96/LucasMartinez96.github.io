'use strict';
/* ==========================================================================
   Lucas Martinez — Portfólio V2
   JavaScript puro, sem dependências. Nenhuma requisição de rede é feita aqui.
   Cada bloco é independente: se um falhar, os demais continuam funcionando.
   ========================================================================== */
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const safe = (name, fn) => { try { fn(); } catch (error) { console.warn(`[portfolio] ${name}:`, error); } };

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => motionQuery.matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lowPower = (navigator.hardwareConcurrency || 8) <= 4
    || (navigator.deviceMemory || 8) <= 4
    || Boolean(navigator.connection && navigator.connection.saveData)
    || (!finePointer && window.innerWidth < 700);

  /* ---------- rodapé: ano ---------- */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- cabeçalho: sombra, progresso e seção ativa ---------- */
  safe('header', () => {
    const header = $('.header');
    const bar = $('#progress-bar');
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header?.classList.toggle('is-scrolled', y > 8);
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();

    const links = $$('.desktop-nav a, .mobile-nav a');
    const sections = $$('main section[id]').filter(s => links.some(a => a.getAttribute('href') === `#${s.id}`));
    if ('IntersectionObserver' in window) {
      const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(a => {
            if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => spy.observe(s));
    }
  });

  /* ---------- menu móvel ---------- */
  safe('menu', () => {
    const toggle = $('.menu-toggle');
    const nav = $('#mobile-nav');
    if (!toggle || !nav) return;
    const close = (returnFocus = false) => {
      nav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = nav.hidden;
      nav.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    $$('a', nav).forEach(a => a.addEventListener('click', () => close()));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !nav.hidden) close(true); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) close(); });
  });

  /* ---------- entrada ao rolar (IntersectionObserver) ---------- */
  const revealAll = () => $$('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  safe('reveal', () => {
    $$('.projects-grid .card').forEach((card, i) => card.style.setProperty('--i', String(i % 2)));
    $$('.skills-list .skill-row').forEach((row, i) => row.style.setProperty('--i', String(i)));
    if (!('IntersectionObserver' in window) || reduced()) { revealAll(); return; }
    // Títulos com revelação em blocos (clip-path) não "intersectam" por si mesmos:
    // observamos o contêiner deles e revelamos o título quando o contêiner aparece.
    const proxy = new Map();
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (proxy.get(entry.target) || [entry.target]).forEach(el => el.classList.add('is-visible'));
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('[data-reveal]').forEach(el => {
      if (el.classList.contains('scan') && el.parentElement) {
        const host = el.parentElement;
        proxy.set(host, [...(proxy.get(host) || []), el]);
        io.observe(host);
      } else io.observe(el);
    });
  });

  /* ==========================================================================
     HERO — nome em pixel art (canvas 2D, animação única)
     ========================================================================== */
  const GLYPHS = {
    A: ['.1111.', '111111', '11..11', '11..11', '111111', '111111', '11..11', '11..11'],
    C: ['.1111.', '111111', '11..11', '11....', '11....', '11..11', '111111', '.1111.'],
    E: ['111111', '111111', '11....', '11111.', '11111.', '11....', '111111', '111111'],
    I: ['1111', '1111', '.11.', '.11.', '.11.', '.11.', '1111', '1111'],
    L: ['11....', '11....', '11....', '11....', '11....', '11....', '111111', '111111'],
    M: ['110011', '111111', '111111', '110011', '110011', '110011', '110011', '110011'],
    N: ['110011', '111011', '111111', '110111', '110011', '110011', '110011', '110011'],
    R: ['11111.', '111111', '11..11', '111111', '11111.', '11.11.', '11..11', '11..11'],
    S: ['.11111', '111111', '11....', '111110', '011111', '....11', '111111', '11111.'],
    T: ['111111', '111111', '..11..', '..11..', '..11..', '..11..', '..11..', '..11..'],
    U: ['11..11', '11..11', '11..11', '11..11', '11..11', '11..11', '111111', '.1111.'],
    Z: ['111111', '111111', '....11', '...11.', '..11..', '.11...', '111111', '111111']
  };

  const mulberry = seed => () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  safe('name', () => {
    const canvas = $('#name-canvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.parentElement.classList.add('has-canvas');

    const lines = ['LUCAS', 'MARTINEZ'];
    const GH = 8, LINE_GAP = 3;
    const widthOf = text => [...text].reduce((n, ch) => n + GLYPHS[ch][0].length, 0) + (text.length - 1);
    const COLS = Math.max(...lines.map(widthOf));      // largura da linha mais longa
    const ROWS = GH * 2 + LINE_GAP;
    const rand = mulberry(96);
    const pixels = [];
    lines.forEach((text, li) => {
      let ox = 0;
      [...text].forEach(ch => {
        GLYPHS[ch].forEach((row, r) => [...row].forEach((bit, c) => {
          if (bit === '1') pixels.push({ x: ox + c, y: li * (GH + LINE_GAP) + r, li, r, delay: 0, tone: 0.95 + rand() * 0.1, rnd: rand() });
        }));
        ox += GLYPHS[ch][0].length + 1;
      });
    });
    const SPREAD = 1250, POP = 240;
    pixels.forEach(p => { p.delay = (p.x / COLS) * 0.55 * SPREAD + p.rnd * 0.45 * SPREAD; });

    let cell = 6, gap = 1, dpr = 1;
    const layout = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const available = Math.min(canvas.parentElement.clientWidth || 320, 820);
      cell = Math.max(3, Math.floor(available * dpr / COLS));
      gap = Math.max(1, Math.round(cell * 0.09));
      canvas.width = COLS * cell;
      canvas.height = ROWS * cell;
      canvas.style.width = `${canvas.width / dpr}px`;
      canvas.style.height = `${canvas.height / dpr}px`;
    };

    const shade = (p, flash) => {
      const k = p.tone;
      let r, g, b;
      if (p.li === 0) { const m = p.r / 7; r = 238 - 34 * m; g = 246 - 32 * m; b = 255 - 6 * m; }       // LUCAS: gelo
      else { const m = p.r / 7; r = 112 - 80 * m; g = 240 - 40 * m; b = 255 - 5 * m; }                   // MARTINEZ: ciano
      r = r * k + (255 - r * k) * flash; g = g * k + (255 - g * k) * flash; b = Math.min(255, b * k + (255 - b * k) * flash);
      return `rgb(${r | 0},${g | 0},${b | 0})`;
    };

    const draw = (now, glitchRows) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pixels) {
        const t = (now - p.delay) / POP;
        if (t <= 0) continue;
        const k = Math.min(1, t);
        const flash = (1 - k) * 0.9;
        const size = cell - gap;
        const grow = 0.45 + 0.55 * (1 - Math.pow(1 - k, 3));
        let x = p.x * cell + gap / 2, y = p.y * cell + gap / 2;
        if (glitchRows && glitchRows.has(p.y)) x += glitchRows.get(p.y) * cell;
        ctx.globalAlpha = k;
        ctx.fillStyle = shade(p, flash);
        const s = size * grow, o = (size - s) / 2;
        ctx.fillRect(x + o, y + o, s, s);
        ctx.fillStyle = 'rgba(255,255,255,.22)';                 // brilho de "tile" no canto superior
        ctx.fillRect(x + o, y + o, s, Math.max(1, s * 0.18));
      }
      ctx.globalAlpha = 1;
    };

    let finished = false;
    layout();
    window.addEventListener('resize', (() => {
      let id; return () => { clearTimeout(id); id = setTimeout(() => { layout(); if (finished) draw(1e9); }, 150); };
    })());

    if (reduced()) { finished = true; draw(1e9); return; }

    const start = performance.now();
    const END = SPREAD + POP;
    let lastGlitch = 0, rows = null;
    const frame = nowAbs => {
      const now = nowAbs - start;
      if (now < END + 300) { draw(now); requestAnimationFrame(frame); return; }
      if (now < END + 300 + 240) {            // glitch suave, uma única vez
        if (nowAbs - lastGlitch > 60) {
          lastGlitch = nowAbs; rows = new Map();
          for (let i = 0; i < 2; i++) rows.set(Math.floor(Math.random() * ROWS), (Math.random() < .5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2)));
        }
        draw(1e9, rows); requestAnimationFrame(frame); return;
      }
      finished = true; draw(1e9);
    };
    requestAnimationFrame(frame);
  });

  /* ==========================================================================
     HERO — partículas e circuitos luminosos (canvas 2D, pausa fora da tela)
     ========================================================================== */
  safe('fx', () => {
    const canvas = $('#fx-canvas');
    const hero = $('#inicio');
    if (!canvas || !hero || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const base = document.createElement('canvas');
    const bctx = base.getContext('2d');

    let w = 0, h = 0, dpr = 1, particles = [], paths = [];
    let running = false, raf = 0, last = 0, visible = true, skip = false;

    const pointAt = (path, s) => {
      const pts = path.pts, cum = path.cum;
      s = Math.max(0, Math.min(path.len, s));
      let i = 1;
      while (i < cum.length - 1 && cum[i] < s) i++;
      const seg = cum[i] - cum[i - 1] || 1;
      const t = (s - cum[i - 1]) / seg;
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
    };

    const build = () => {
      const rand = mulberry(2026);
      particles = [];
      const count = Math.round(Math.max(22, Math.min(70, w / 20)) * (lowPower ? 0.5 : 1));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand() * w, y: rand() * h, vx: (rand() - 0.5) * 6, vy: -(4 + rand() * 10),
          s: rand() < 0.2 ? 2.4 : 1.4, a: 0.25 + rand() * 0.5, ph: rand() * 6.28, om: 0.6 + rand() * 1.4,
          c: rand() < 0.35 ? '120,230,255' : '90,150,255'
        });
      }
      paths = [];
      const total = lowPower || w < 700 ? 3 : 7;
      for (let k = 0; k < total; k++) {
        const left = k % 2 === 0, dir = left ? 1 : -1;
        let x = left ? -4 : w + 4, y = h * (0.1 + rand() * 0.75);
        const pts = [[x, y]];
        x += dir * w * (0.05 + rand() * 0.14); pts.push([x, y]);
        const dy = (rand() < 0.5 ? -1 : 1) * (36 + rand() * 80);
        x += dir * Math.abs(dy); y += dy; pts.push([x, y]);
        x += dir * w * (0.03 + rand() * 0.1); pts.push([x, y]);
        const cum = [0];
        for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        paths.push({ pts, cum, len: cum[cum.length - 1], s: rand() * cum[cum.length - 1], v: 50 + rand() * 70 });
      }
      // camada estática dos circuitos
      base.width = canvas.width; base.height = canvas.height;
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);
      bctx.lineWidth = 1; bctx.strokeStyle = 'rgba(70,140,255,.24)';
      paths.forEach(p => {
        bctx.beginPath(); p.pts.forEach(([px, py], i) => (i ? bctx.lineTo(px, py) : bctx.moveTo(px, py))); bctx.stroke();
        bctx.fillStyle = 'rgba(53,217,255,.55)';
        const [ex, ey] = p.pts[p.pts.length - 1]; bctx.fillRect(ex - 3, ey - 3, 6, 6);
        bctx.fillStyle = 'rgba(70,140,255,.5)';
        const [mx, my] = p.pts[2]; bctx.fillRect(mx - 2, my - 2, 4, 4);
      });
    };

    const render = (t, dt) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // pulsos nos circuitos
      paths.forEach(p => {
        p.s += p.v * dt; if (p.s > p.len + 60) p.s = -40;
        for (let k = 0; k < 6; k++) {
          const s = p.s - k * 7; if (s < 0 || s > p.len) continue;
          const [px, py] = pointAt(p, s);
          ctx.fillStyle = `rgba(80,225,255,${0.95 - k * 0.15})`;
          const sz = 4 - k * 0.4; ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
        }
      });
      // partículas (quadrados, no espírito pixel)
      for (const p of particles) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
        const a = p.a * (0.6 + 0.4 * Math.sin(t * p.om + p.ph));
        ctx.fillStyle = `rgba(${p.c},${a})`;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      // conexões entre partículas próximas (somente em aparelhos mais fortes)
      if (!lowPower && w > 900) {
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 9000) {
              ctx.strokeStyle = `rgba(90,160,255,${(1 - d2 / 9000) * 0.14})`;
              ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
          }
        }
      }
    };

    const loop = now => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (lowPower) { skip = !skip; if (skip) return; }   // ~30 fps em aparelhos mais simples
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      render(now / 1000, dt);
    };
    const play = () => {
      const should = visible && !document.hidden && !reduced();
      hero.classList.toggle('is-paused', !should);
      if (should && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
      else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    };

    const resize = () => {
      w = hero.clientWidth; h = hero.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      build();
      render(0, 0);
    };
    resize();
    let rid; window.addEventListener('resize', () => { clearTimeout(rid); rid = setTimeout(resize, 200); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; play(); }).observe(hero);
    }
    document.addEventListener('visibilitychange', play);
    motionQuery.addEventListener('change', play);
    play();
  });

  /* ==========================================================================
     HERO — terminal decorativo (digitação única, controlado por botões)
     ========================================================================== */
  safe('terminal', () => {
    const screen = $('#term-screen');
    const tabs = $$('.term-tabs button');
    if (!screen || !tabs.length) return;

    let token = 0, auto = true, timer = 0;
    const charWidth = () => {
      const probe = document.createElement('span');
      probe.textContent = 'MMMMMMMMMM';
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;font:inherit';
      screen.appendChild(probe);
      const width = probe.getBoundingClientRect().width / 10 || 8;
      probe.remove();
      return width;
    };
    const wrapText = (text, max) => {
      const out = []; let cur = '';
      text.split(' ').forEach(word => {
        if ((cur + ' ' + word).trim().length > max) { out.push(cur); cur = word; } else cur = (cur + ' ' + word).trim();
      });
      if (cur) out.push(cur);
      return out;
    };
    const compose = tab => {
      const style = getComputedStyle(screen);
      const inner = screen.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const max = Math.max(18, Math.floor(inner / charWidth()) - 4);
      const segs = [[{ c: 't-prompt', t: '$ ' }, { c: '', t: tab.dataset.cmd }],
                    [{ c: 't-prompt', t: '> ' }, { c: 't-title', t: tab.dataset.title }]];
      wrapText(tab.dataset.desc, max).forEach(line => segs.push([{ c: '', t: `  ${line}` }]));
      return segs;
    };
    const paint = (lines, count, cursor) => {
      screen.textContent = '';
      let left = count;
      lines.forEach((line, li) => {
        line.forEach(seg => {
          if (left <= 0) return;
          const part = seg.t.slice(0, left); left -= part.length;
          if (seg.c) { const s = document.createElement('span'); s.className = seg.c; s.textContent = part; screen.appendChild(s); }
          else screen.appendChild(document.createTextNode(part));
        });
        if (li < lines.length - 1 && left > 0) { screen.appendChild(document.createTextNode('\n')); left -= 1; }
      });
      if (cursor) { const c = document.createElement('span'); c.className = 'term-cursor'; c.setAttribute('aria-hidden', 'true'); screen.appendChild(c); }
    };
    const show = (tab, animate) => new Promise(resolve => {
      const my = ++token;
      tabs.forEach(b => b.setAttribute('aria-pressed', String(b === tab)));
      const lines = compose(tab);
      const total = lines.reduce((n, l) => n + l.reduce((m, s) => m + s.t.length, 0) + 1, -1);
      if (!animate || reduced()) { paint(lines, total, false); resolve(); return; }
      let n = 0;
      const step = () => {
        if (my !== token) { resolve(); return; }
        n += 1; paint(lines, n, true);
        if (n >= total) { resolve(); return; }
        // comando digitado mais devagar que a resposta
        timer = setTimeout(step, n < lines[0].reduce((m, s) => m + s.t.length, 0) ? 34 : 14);
      };
      step();
    });

    tabs.forEach(tab => tab.addEventListener('click', () => {
      auto = false; clearTimeout(timer);
      show(tab, true);
    }));

    if (reduced()) { show(tabs[0], false); return; }
    // sequência automática: roda uma única vez, depois o controle é da pessoa
    const sleep = ms => new Promise(r => { timer = setTimeout(r, ms); });
    (async () => {
      await sleep(1500);
      for (const tab of tabs) {
        if (!auto) return;
        await show(tab, true);
        if (!auto) return;
        await sleep(1700);
      }
    })();
  });

  /* ==========================================================================
     PROJETOS — filtros com transição, casos expansíveis, inclinação 3D
     ========================================================================== */
  const grid = $('#projects-grid');
  const cards = $$('.card', grid || document);
  const chips = $$('.filter-chip');
  let currentFilter = 'todos';

  const matches = (card, key) => key === 'todos' || (card.dataset.tags || '').split(' ').includes(key);

  const applyFilter = async key => {
    if (!grid || key === currentFilter) return;
    currentFilter = key;
    chips.forEach(chip => {
      const on = chip.dataset.filter === key;
      chip.classList.toggle('active', on);
      chip.setAttribute('aria-pressed', String(on));
    });
    const status = $('#filter-status');
    cards.forEach(c => c.classList.add('is-visible'));       // garante que nenhum cartão fique invisível

    const animate = !reduced() && typeof grid.animate === 'function' && cards[0].animate;
    const leaving = cards.filter(c => !c.hidden && !matches(c, key));
    const staying = cards.filter(c => !c.hidden && matches(c, key));
    const entering = cards.filter(c => c.hidden && matches(c, key));

    if (animate) {
      grid.style.minHeight = `${grid.offsetHeight}px`;
      await Promise.all(leaving.map(c => c.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.96)' }], { duration: 160, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => {})));
    }
    const before = new Map(staying.map(c => [c, c.getBoundingClientRect()]));
    cards.forEach(c => { c.hidden = !matches(c, key); c.getAnimations().forEach(a => a.cancel()); });
    grid.dataset.view = key;

    if (animate) {
      staying.forEach(c => {
        const a = before.get(c), b = c.getBoundingClientRect();
        const dx = a.left - b.left, dy = a.top - b.top;
        const resized = Math.abs(a.width - b.width) > 2;
        if (!dx && !dy && !resized) return;
        c.animate([{ transform: `translate(${dx}px, ${dy}px)`, opacity: resized ? 0.4 : 1 }, { transform: 'none', opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.2,.7,.2,1)' });
      });
      entering.forEach((c, i) => c.animate([{ opacity: 0, transform: 'translateY(18px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 80 + i * 70, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
      setTimeout(() => { grid.style.minHeight = ''; }, 700);
    }
    const n = cards.filter(c => !c.hidden).length;
    if (status) status.textContent = `Mostrando ${n} ${n === 1 ? 'projeto' : 'projetos'}.`;
  };

  safe('filters', () => {
    chips.forEach(chip => chip.addEventListener('click', () => applyFilter(chip.dataset.filter)));
  });

  safe('cases', () => {
    $$('.case').forEach(panel => { panel.querySelector('.case-inner').inert = true; });
    $$('.case-toggle').forEach(btn => btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.firstElementChild.textContent = open ? 'Ocultar detalhes' : 'Ver detalhes';
      panel.dataset.open = String(open);
      panel.querySelector('.case-inner').inert = !open;
    }));
  });

  safe('tilt', () => {
    if (!finePointer || reduced()) return;
    $$('.card-tilt').forEach(el => {
      let pending = null, raf = 0;
      const apply = () => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const px = (pending.clientX - r.left) / r.width, py = (pending.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        el.style.setProperty('--ry', `${((px - 0.5) * 7).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${((0.5 - py) * 5).toFixed(2)}deg`);
      };
      el.addEventListener('pointerenter', () => el.classList.add('is-tilting'));
      el.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; pending = e; if (!raf) raf = requestAnimationFrame(apply); });
      el.addEventListener('pointerleave', () => {
        el.classList.remove('is-tilting');
        el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
      });
    });
  });

  /* ---------- lightbox: apenas imagens que já fazem parte do portfólio ---------- */
  safe('lightbox', () => {
    const modal = $('#image-modal');
    const img = $('#modal-img');
    const title = $('#modal-title');
    const count = $('#modal-count');
    const prev = $('#modal-prev');
    const next = $('#modal-next');
    const closeBtn = $('#modal-close');
    if (!modal || !img || typeof modal.showModal !== 'function') return;

    let list = [], index = 0;
    const show = i => {
      index = (i + list.length) % list.length;
      const btn = list[index];
      const path = btn.dataset.img || '';
      if (!/^assets\/sese-hub-[\w-]+\.jpg$/.test(path)) return;
      img.src = btn.querySelector('img')?.currentSrc || path;
      img.alt = btn.dataset.alt || 'Imagem do projeto';
      title.textContent = btn.dataset.title || 'Projeto';
      count.textContent = `${index + 1} / ${list.length}`;
      prev.hidden = next.hidden = list.length < 2;
    };
    $$('.card-media').forEach(btn => btn.addEventListener('click', () => {
      list = $$('.card-media').filter(b => !b.closest('.card').hidden);
      index = list.indexOf(btn);
      show(index);
      document.documentElement.classList.add('modal-open');
      modal.showModal();
    }));
    const dismiss = () => { if (modal.open) modal.close(); };
    closeBtn.addEventListener('click', dismiss);
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
    modal.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' && list.length > 1) { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight' && list.length > 1) { e.preventDefault(); show(index + 1); }
    });
    modal.addEventListener('close', () => {
      img.removeAttribute('src');
      document.documentElement.classList.remove('modal-open');
      list[index]?.focus();
    });
  });

  /* ==========================================================================
     TECNOLOGIAS — sistema digital interativo
     ========================================================================== */
  safe('map', () => {
    const nodes = $$('.node');
    const panels = $$('.panel');
    const edges = $$('.map-lines line');
    const rows = $$('.skill-row');
    if (!nodes.length) return;

    const select = name => {
      nodes.forEach(n => {
        const on = n.dataset.node === name;
        n.setAttribute('aria-pressed', String(on));
        const linked = edges.some(e => { const [a, b] = e.dataset.edge.split(' '); return (a === name && b === n.dataset.node) || (b === name && a === n.dataset.node); });
        n.classList.toggle('is-linked', linked);
      });
      edges.forEach(e => e.classList.toggle('is-active', e.dataset.edge.split(' ').includes(name)));
      panels.forEach(p => { p.hidden = p.dataset.panel !== name; });
      rows.forEach(r => r.classList.toggle('is-linked', r.dataset.areas.split(' ').includes(name)));
    };
    nodes.forEach(n => {
      n.addEventListener('click', () => select(n.dataset.node));
      n.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') select(n.dataset.node); });
    });
    $$('.panel-action').forEach(btn => btn.addEventListener('click', async () => {
      await applyFilter(btn.dataset.goto);
      const target = document.getElementById('projetos');
      target?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    }));
    select('software');
  });

  /* ==========================================================================
     PROCESSO — diagrama que acende uma vez ao entrar na tela
     ========================================================================== */
  safe('flow', () => {
    const flow = $('#flow');
    if (!flow) return;
    const steps = $$('.flow-step', flow);
    const lightAll = () => { flow.classList.add('is-on'); steps.forEach(s => s.classList.add('is-on')); };
    if (!('IntersectionObserver' in window) || reduced()) { lightAll(); return; }
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      flow.classList.add('is-on');
      steps.forEach((s, i) => setTimeout(() => s.classList.add('is-on'), i * 420));
    }, { threshold: 0.3 });
    io.observe(flow);
  });

  /* ---------- contato: copiar link ---------- */
  safe('copy', () => {
    const button = $('#copy-profile');
    const feedback = $('#copy-feedback');
    button?.addEventListener('click', async () => {
      const url = button.dataset.copy || '';
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard indisponível');
        await navigator.clipboard.writeText(url);
        if (feedback) feedback.textContent = 'Link copiado!';
      } catch {
        if (feedback) feedback.textContent = `Copie o endereço: ${url}`;
      }
    });
  });

  /* ---------- cursor em anel: somente mouse, sem esconder o cursor nativo ---------- */
  safe('cursor', () => {
    if (!finePointer || reduced()) return;
    const ring = document.createElement('div');
    ring.className = 'cursor';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      ring.style.transform = `translate(${x}px, ${y}px)`;
      raf = (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!ring.classList.contains('is-on')) { x = tx; y = ty; ring.classList.add('is-on'); }
      ring.classList.toggle('is-hot', Boolean(e.target.closest && e.target.closest('a, button, [role="button"]')));
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => ring.classList.remove('is-on'));
  });
})();
