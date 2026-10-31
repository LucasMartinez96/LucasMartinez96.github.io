(() => {
  'use strict';
  const main=document.querySelector('main');
  if (!main || !document.body.dataset.case) return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let manualPause=false;
  try { manualPause=sessionStorage.getItem('lm-motion-paused')==='true'; } catch (_) {}
  const reduced=()=>media.matches||manualPause;
  const sections=[...main.querySelectorAll('.section[aria-labelledby]')];
  const nav=document.createElement('nav');nav.className='case-chapter-nav';nav.setAttribute('aria-label','Capítulos do estudo de caso');
  const names={desafio:'Contexto',funcionalidades:'Funcionalidades',processo:'Fluxo',arquitetura:'Tecnologia',decisoes:'Decisões'};
  sections.forEach(section=>{
    const id=section.getAttribute('aria-labelledby');
    const title=document.getElementById(id);if(!title)return;
    const link=document.createElement('a');link.href='#'+id;link.textContent=names[id]||title.textContent;nav.appendChild(link);
  });
  main.querySelector('.hero').insertAdjacentElement('afterend',nav);
  const progress=document.createElement('div');progress.className='case-reading-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
  let frame=0;
  const visual=document.querySelector('.visual-main');
  function update(){
    frame=0;
    const distance=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${distance>0?Math.min(1,scrollY/distance):0})`;
    if(visual){const top=visual.getBoundingClientRect().top;visual.style.setProperty('--case-pitch',!reduced()&&innerWidth>850?Math.max(0,Math.min(3,top/innerHeight*3))+'deg':'0deg');}
  }
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true});
  addEventListener('resize',update,{passive:true});media.addEventListener('change',update);update();
  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(!reduced())e.target.classList.add('case-enter');reveal.unobserve(e.target);}}),{threshold:.12});
    sections.forEach(s=>reveal.observe(s));
    const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+e.target.getAttribute('aria-labelledby'))a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}),{rootMargin:'-20% 0px -55% 0px'});sections.forEach(s=>spy.observe(s));
  }
  // Swiping complements the existing native dialog's buttons and arrow keys.
  const stage=document.querySelector('.lightbox-stage');let touch=null;
  stage?.addEventListener('touchstart',e=>{if(e.touches.length===1)touch=[e.touches[0].clientX,e.touches[0].clientY];else touch=null;},{passive:true});
  stage?.addEventListener('touchend',e=>{
    if(!touch||!e.changedTouches.length)return;
    const dx=e.changedTouches[0].clientX-touch[0],dy=e.changedTouches[0].clientY-touch[1];touch=null;
    if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)document.getElementById(dx<0?'lightbox-next':'lightbox-prev')?.click();
  },{passive:true});
})();
