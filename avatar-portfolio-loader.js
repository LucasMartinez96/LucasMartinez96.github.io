/* V7: carrega motor do avatar só quando Sobre Mim se aproxima da tela. */
(()=>{
  const canvas=document.getElementById('portfolio-avatar-canvas');
  if(!canvas)return;
  let iniciado=false;
  const carregar=()=>{
    if(iniciado)return;
    iniciado=true;
    const script=document.createElement('script');
    script.src='avatar-portfolio.js?v=8';
    script.async=true;
    script.onerror=()=>{canvas.setAttribute('aria-label','Avatar temporariamente indisponível');};
    script.onload=()=>{
      const atlas=document.createElement('script');
      atlas.src='avatar-v10-atlas.js?v=11';
      atlas.onload=()=>{
        const extra=document.createElement('script');
        extra.src='avatar-v11-enhance.js?v=11';
        document.body.appendChild(extra);
      };
      document.body.appendChild(atlas);
    };
    document.body.appendChild(script);
  };
  if('IntersectionObserver' in window){
    const observador=new IntersectionObserver(entradas=>{
      if(entradas.some(e=>e.isIntersecting)){observador.disconnect();carregar();}
    },{rootMargin:'360px 0px',threshold:0});
    observador.observe(canvas);
  }else carregar();
})();
