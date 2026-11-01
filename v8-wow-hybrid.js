/* Lucas Martinez — V8 WOW HYBRID (preview).
   Safe progressive enhancements; no changes to V7, modal, credential or case study logic. */
(function () {
  'use strict';
  function start() {
    if (document.documentElement.classList.contains('v8-wow')) return;
    document.documentElement.classList.add('v8-wow');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;
    var names = [
      { id: 'inicio', title: 'Início', icon: '<path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/>' },
      { id: 'projetos', title: 'Projetos', icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
      { id: 'sobre', title: 'Sobre', icon: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>' },
      { id: 'tecnologias', title: 'Tecnologias', icon: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16"/>' },
      { id: 'contato', title: 'Contato', icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' }
    ];

    /* The Dock never replaces the existing accessible header navigation. */
    if (window.matchMedia('(min-width: 1100px)').matches) {
      var dock = document.createElement('nav');
      dock.className = 'v8-dock';
      dock.setAttribute('aria-label', 'Navegação rápida da V8');
      names.forEach(function (item) {
        if (!document.getElementById(item.id)) return;
        var a = document.createElement('a');
        a.href = '#' + item.id;
        a.setAttribute('aria-label', item.title);
        a.setAttribute('title', item.title);
        a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + item.icon + '</svg><span>' + item.title + '</span>';
        dock.appendChild(a);
      });
      if (dock.children.length) {
        document.body.appendChild(dock);
        var updateDock = function () {
          var hero = document.getElementById('inicio');
          if (!hero) return;
          var ready = hero.getBoundingClientRect().bottom < window.innerHeight * .72;
          dock.classList.toggle('v8-dock-show', ready);
          dock.inert = !ready;
          if (!ready) return;
          var active = 'inicio';
          names.forEach(function (item) {
            var el = document.getElementById(item.id);
            if (el && el.getBoundingClientRect().top <= window.innerHeight * .46) active = item.id;
          });
          Array.prototype.forEach.call(dock.querySelectorAll('a'), function (a) {
            if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        };
        window.addEventListener('scroll', updateDock, { passive: true });
        window.addEventListener('resize', updateDock, { passive: true });
        updateDock();
      }
    }

    /* Interactive lens: original image is reused with the browser cache. */
    var frame = document.querySelector('#sobre .identity-frame');
    if (fine && !reduced && frame) {
      var original = frame.querySelector('img');
      if (original) {
        var lens = original.cloneNode(false);
        lens.className = 'v8-lens-layer';
        lens.alt = '';
        lens.setAttribute('aria-hidden', 'true');
        lens.removeAttribute('width');
        lens.removeAttribute('height');
        var label = document.createElement('span');
        label.className = 'v8-lens-label';
        label.textContent = 'MODO INSPEÇÃO / PIXEL';
        label.setAttribute('aria-hidden', 'true');
        frame.appendChild(lens);
        frame.appendChild(label);
        frame.addEventListener('pointerenter', function (e) {
          if (e.pointerType !== 'touch') frame.classList.add('v8-lens-on');
        });
        frame.addEventListener('pointermove', function (e) {
          if (e.pointerType === 'touch') return;
          var box = frame.getBoundingClientRect();
          var x = Math.max(0, Math.min(100, 100 * (e.clientX - box.left - 8) / Math.max(1, box.width - 16)));
          var y = Math.max(0, Math.min(100, 100 * (e.clientY - box.top - 8) / Math.max(1, box.height - 16)));
          frame.style.setProperty('--v8-lens-x', x.toFixed(2) + '%');
          frame.style.setProperty('--v8-lens-y', y.toFixed(2) + '%');
        }, { passive: true });
        frame.addEventListener('pointerleave', function () { frame.classList.remove('v8-lens-on'); });
      }
    }

    /* Connected Bento buttons: each button selects the existing working map node. */
    var layout = document.querySelector('#tecnologias .tech-layout');
    if (layout) {
      var block = document.createElement('div');
      block.className = 'v8-bento-block';
      var heading = document.createElement('div');
      heading.className = 'v8-bento-heading';
      heading.textContent = 'EXPLORAR POR ÁREA';
      block.appendChild(heading);
      var grid = document.createElement('div');
      grid.className = 'v8-tech-bento';
      var cards = [
        { id: 'software', num: '01', title: 'Software', desc: 'Interfaces e desenvolvimento web' },
        { id: 'data', num: '02', title: 'Dados', desc: 'PostgreSQL, Supabase e dashboards' },
        { id: 'ai', num: '03', title: 'Inteligência Artificial', desc: 'Automação e análise inteligente' },
        { id: '3d', num: '04', title: 'Experiências 3D', desc: 'Visualização espacial e WebGL' },
        { id: 'automation', num: '05', title: 'Automação', desc: 'APIs e fluxos digitais' }
      ];
      function syncBento(id) {
        Array.prototype.forEach.call(grid.querySelectorAll('button'), function (b) {
          b.setAttribute('aria-pressed', String(b.dataset.v8Target === id));
        });
      }
      cards.forEach(function (item) {
        var node = document.querySelector('#map .node[data-node="' + item.id + '"]');
        if (!node) return;
        var tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'v8-tech-tile';
        tile.dataset.v8Target = item.id;
        tile.setAttribute('aria-pressed', String(node.getAttribute('aria-pressed') === 'true'));
        var index = document.createElement('span'); index.textContent = item.num + ' / CAPACIDADE';
        var title = document.createElement('strong'); title.textContent = item.title;
        var desc = document.createElement('small'); desc.textContent = item.desc;
        tile.appendChild(index);
        tile.appendChild(title);
        tile.appendChild(desc);
        tile.addEventListener('click', function () {
          node.click();
          syncBento(item.id);
          var panel = document.getElementById('map-panel');
          if (panel) panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        });
        node.addEventListener('click', function () { syncBento(item.id); });
        if (fine && !reduced) {
          tile.addEventListener('pointermove', function (e) {
            var r = tile.getBoundingClientRect();
            tile.style.setProperty('--v8-spot-x', (100 * (e.clientX - r.left) / r.width).toFixed(1) + '%');
            tile.style.setProperty('--v8-spot-y', (100 * (e.clientY - r.top) / r.height).toFixed(1) + '%');
          }, { passive: true });
        }
        grid.appendChild(tile);
      });
      block.appendChild(grid);
      layout.insertAdjacentElement('afterend', block);
    }

    /* Magnetic calls-to-action do not change click handlers, targets or hrefs. */
    if (fine && !reduced) {
      document.querySelectorAll('#inicio .hero-buttons .btn, #perfil-profissional .v5-cta').forEach(function (button) {
        button.addEventListener('pointermove', function (e) {
          var rect = button.getBoundingClientRect();
          var x = (e.clientX - rect.left - rect.width / 2) / rect.width * 12;
          var y = (e.clientY - rect.top - rect.height / 2) / rect.height * 10;
          button.classList.add('v8-magnet-active');
          button.style.setProperty('--v8-x', x.toFixed(1) + 'px');
          button.style.setProperty('--v8-y', y.toFixed(1) + 'px');
        }, { passive: true });
        button.addEventListener('pointerleave', function () {
          button.classList.remove('v8-magnet-active');
          button.style.removeProperty('--v8-x');
          button.style.removeProperty('--v8-y');
        });
      });
    }

    /* Optical highlight only: nothing hidden while JS or shaders load. */
    if ('IntersectionObserver' in window && !reduced) {
      var observed = document.querySelectorAll('#projetos .section-heading, #sobre .section-intro, #tecnologias .section-heading, #formacao .v5-academic-card');
      var observer = new IntersectionObserver(function (items) {
        items.forEach(function (entry) {
          entry.target.classList.toggle('v8-section-highlight', entry.isIntersecting);
        });
      }, { threshold: .18 });
      observed.forEach(function (el) { observer.observe(el); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
