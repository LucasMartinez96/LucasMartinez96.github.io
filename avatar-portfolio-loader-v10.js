/* V7: carrega motor do avatar só quando Sobre Mim se aproxima da tela. */
(()=>{
  const canvas=document.getElementById('portfolio-avatar-canvas');
  if(!canvas)return;
  let iniciado=false;
  const carregar=()=>{
    if(iniciado)return;
    iniciado=true;
    const motor=()=>{
      const script=document.createElement('script');
      script.src='avatar-portfolio-v10.js?v=10.1';
      script.async=true;
      script.onerror=()=>{canvas.setAttribute('aria-label','Avatar temporariamente indisponível');};
      document.body.appendChild(script);
    };
    const atlas=document.createElement('script');
    atlas.src='avatar-v10-atlas.js?v=10.1';
    atlas.async=true;
    atlas.onload=motor;
    atlas.onerror=motor;
    document.body.appendChild(atlas);
  };
  if('IntersectionObserver' in window){
    const observador=new IntersectionObserver(entradas=>{
      if(entradas.some(e=>e.isIntersecting)){observador.disconnect();carregar();}
    },{rootMargin:'360px 0px',threshold:0});
    observador.observe(canvas);
  }else carregar();
})();
