// V6: visualizador isolado, acessível, sem serviços externos.
(()=>{
'use strict';
const dialog=document.querySelector('#case-lightbox');
const preview=dialog?.querySelector('#lightbox-photo');
const caption=dialog?.querySelector('#lightbox-title');
const close=dialog?.querySelector('#lightbox-close');
const previous=dialog?.querySelector('#lightbox-prev');
const next=dialog?.querySelector('#lightbox-next');
if(!dialog||!preview||!caption||!close||typeof dialog.showModal!=='function')return;
const entries=Array.from(document.querySelectorAll('[data-photo]')).filter(b=>{
 const path=b.getAttribute('data-photo')||'';
 return /^assets\/[\w-]+\.(jpg|jpeg|png|webp)$/.test(path);
});
let active=0,opener=null;
function render(n){
 if(!entries.length)return;
 active=(n+entries.length)%entries.length;
 const button=entries[active];
 const path=button.dataset.photo;
 preview.src=path;
 preview.alt=button.dataset.alt||'Imagem do projeto';
 caption.textContent=button.dataset.title||'Projeto';
 const c=dialog.querySelector('#lightbox-position');
 if(c)c.textContent=(active+1)+' / '+entries.length;
}
entries.forEach((b,i)=>b.addEventListener('click',()=>{
 opener=b;
 render(i);
 if(!dialog.open)dialog.showModal();
}));
close.addEventListener('click',()=>dialog.close());
previous?.addEventListener('click',()=>render(active-1));
next?.addEventListener('click',()=>render(active+1));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('keydown',e=>{
 if(e.key==='ArrowRight'){e.preventDefault();render(active+1)}
 if(e.key==='ArrowLeft'){e.preventDefault();render(active-1)}
});
dialog.addEventListener('close',()=>{preview.removeAttribute('src');opener?.focus()});
})();