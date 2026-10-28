'use strict';
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Navegação para telas menores, inclusive suporte a teclado e fechamento ao selecionar.
  const toggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  const closeMenu = () => {
    if (!toggle || !mobileNav) return;
    mobileNav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const willOpen = mobileNav.hidden;
      mobileNav.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', String(willOpen));
      toggle.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
    });
    $$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !mobileNav.hidden) closeMenu();
    });
  }

  // Filtros locais: nenhuma requisição a código, APIs ou bases da operação.
  const filters = $$('.filter-chip');
  const cards = $$('.project-card');
  filters.forEach(filter => filter.addEventListener('click', () => {
    const key = filter.dataset.filter;
    filters.forEach(button => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      card.hidden = key !== 'todos' && !(card.dataset.tags || '').split(' ').includes(key);
    });
  }));

  // Ampliar apenas arquivos de imagem que já fazem parte deste portfólio estático.
  const modal = $('#image-modal');
  const modalImg = $('#modal-img');
  const modalTitle = $('#modal-title');
  const closeModal = $('#modal-close');
  let lastFocused = null;
  if (modal && modalImg && modalTitle && typeof modal.showModal === 'function') {
    $$('.project-image').forEach(button => button.addEventListener('click', () => {
      const imgPath = button.dataset.img || '';
      if (!/^assets\/sese-hub-[\w-]+\.jpg$/.test(imgPath)) return;
      lastFocused = button;
      modalImg.src = button.querySelector('img')?.currentSrc || imgPath;
      modalImg.alt = button.dataset.alt || 'Imagem do projeto';
      modalTitle.textContent = button.dataset.title || 'Projeto';
      modal.showModal();
    }));
    const dismiss = () => { if (modal.open) modal.close(); };
    closeModal?.addEventListener('click', dismiss);
    modal.addEventListener('click', event => { if (event.target === modal) dismiss(); });
    modal.addEventListener('close', () => { modalImg.removeAttribute('src'); lastFocused?.focus(); });
  }

  const copyButton = $('#copy-profile');
  const feedback = $('#copy-feedback');
  copyButton?.addEventListener('click', async () => {
    const url = copyButton.dataset.copy || '';
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(url);
      if (feedback) feedback.textContent = 'Link copiado!';
    } catch {
      if (feedback) feedback.textContent = `Copie o endereço: ${url}`;
    }
  });

  // Acessibilidade: qualquer pessoa com preferência por menos movimento recebe conteúdo imediato.
  const items = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          current.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 40px 0px', threshold: 0.03 });
    items.forEach(element => observer.observe(element));
  } else items.forEach(element => element.classList.add('is-visible'));
})();
