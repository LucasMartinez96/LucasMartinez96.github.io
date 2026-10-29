/* Lucas Martinez V7 — ponte de scroll entre o portfolio e a abertura independente. */
(()=>{
 'use strict';
 const main=document.querySelector('main#conteudo');
 if(!main || document.getElementById('experiencia')) return;
 const section=document.createElement('section');
 section.id='experiencia';
 section.className='v7-experience';
 section.setAttribute('aria-label','Abertura interativa: Notebook Realista — Lucas Martinez');
 section.innerHTML=`<div class="v7-hold"><iframe src="abertura-v7.html" title="Animação cinematográfica do portfólio Lucas Martinez" tabindex="-1" aria-hidden="true" loading="eager"></iframe><div class="v7-reduced"><strong>LUCAS MARTINEZ</strong><span>Código com propósito. Design com visão.</span><a href="#inicio">Explorar portfólio</a></div></div>`;
 main.insertBefore(section,main.firstChild);
 const hold=section.querySelector('.v7-hold');
 const frame=section.querySelector('iframe');
 let raf=0;
 function send(){
   raf=0;
   if(!frame.contentWindow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   const rect=section.getBoundingClientRect();
   const distance=Math.max(1,section.offsetHeight-hold.offsetHeight);
   const value=Math.max(0,Math.min(1,-rect.top/distance));
   try {frame.contentWindow.postMessage({type:'LM_V7_SCROLL',progress:value}, location.origin==='null'?'*':location.origin);}catch(_){}
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(send)}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
 frame.addEventListener('load',schedule);
 schedule();
})();
