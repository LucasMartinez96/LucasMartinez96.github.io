/* V7: carrega motor do avatar só quando Sobre Mim se aproxima da tela. */
(()=>{
  const canvas=document.getElementById('portfolio-avatar-canvas');
  if(!canvas)return;
  let iniciado=false;
  const carregar=()=>{
    if(iniciado)return;
    iniciado=true;
    const script=document.createElement('script');
    script.src='avatar-portfolio.js?v=9';
    script.async=true;
    script.onerror=()=>{canvas.setAttribute('aria-label','Avatar temporariamente indisponível');};
    document.body.appendChild(script);
  };
  if('IntersectionObserver' in window){
    const observador=new IntersectionObserver(entradas=>{
      if(entradas.some(e=>e.isIntersecting)){observador.disconnect();carregar();}
    },{rootMargin:'360px 0px',threshold:0});
    observador.observe(canvas);
  }else carregar();
})();
