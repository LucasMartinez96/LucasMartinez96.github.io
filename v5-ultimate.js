/* V5 ULTIMATE: apresentação profissional PT/EN, sem coleta de dados corporativos. */
(()=>{
  'use strict';
  const root=document.querySelector('#perfil-profissional');
  if(!root)return;
  const labels={
    pt:{
      eyebrow:'PORTFÓLIO / V5',
      profileLabel:'APRESENTAÇÃO PROFISSIONAL',
      profileTitle:'Uma visão rápida para recrutadores.',
      profileText:'Conheça meus projetos, ferramentas e um resumo público da minha atuação. O currículo é imprimível e pode ser salvo como PDF no navegador.',
      resumeButton:'Abrir resumo / PDF ↗',
      githubButton:'Ver GitHub ↗'
    },
    en:{
      eyebrow:'PORTFOLIO / V5',
      profileLabel:'PROFESSIONAL SUMMARY',
      profileTitle:'A quick introduction for recruiters.',
      profileText:'Explore my selected projects, tools and public professional summary. The resume-style page can be printed or saved as a PDF in your browser.',
      resumeButton:'Open summary / PDF ↗',
      githubButton:'View GitHub ↗'
    }
  };
  let language='pt';
  const control=root.querySelector('#v5-lang');
  const fields=Array.from(root.querySelectorAll('[data-v5-key]'));
  function render(){
    fields.forEach(field=>{const text=labels[language][field.dataset.v5Key];if(text)field.textContent=text;});
    if(control){
      control.textContent=language==='pt'?'PT / EN':'EN / PT';
      control.setAttribute('aria-label',language==='pt'?'Mudar idioma desta seção para inglês':'Switch this section to Portuguese');
      control.setAttribute('aria-pressed',String(language==='en'));
    }
  }
  control?.addEventListener('click',()=>{language=language==='pt'?'en':'pt';render();});
  root.querySelectorAll('a[data-v5-action]').forEach(link=>link.addEventListener('click',()=>{
    try{
      if(typeof window.va==='function')window.va('event','v5_action',{action:link.dataset.v5Action});
    }catch(_){}
  }));
  render();
})();
