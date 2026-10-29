/* Lucas Martinez | Credencial animada 3D - v1, independente de bibliotecas externas */
(() => {
  "use strict";
  const hero = document.getElementById("inicio");
  if (!hero || document.getElementById("credencial")) return;
  const sec = document.createElement("section");
  sec.id = "credencial";
  sec.className = "lm-credential-section section";
  sec.setAttribute("aria-labelledby", "lm-credential-title");
  sec.innerHTML = `
    <div class="container lm-credential-grid">
      <div class="lm-credential-info">
        <span class="lm-credential-eyebrow"><span class="lm-credential-led"></span> IDENTIDADE DIGITAL // 01</span>
        <h2 id="lm-credential-title">Muito além de um <span>crachá.</span></h2>
        <p class="lm-credential-lead">Uma credencial interativa para quem transforma desafios em soluções de software, automação e inteligência artificial.</p>
        <p>Puxe, arraste e solte o crachá. Movimente-o para os lados para virar e descobrir o QR Code do GitHub.</p>
        <div class="lm-credential-features"><span>◈ Física interativa</span><span>↔ Puxe e gire</span><span>▦ QR real</span></div>
        <div class="lm-credential-actions">
          <a href="https://github.com/LucasMartinez96" class="lm-credential-action" target="_blank" rel="noopener noreferrer">Acessar GitHub ↗</a>
        </div>
      </div>
      <div class="lm-credential-scene is-visible" aria-label="Credencial interativa de Lucas Martinez">
        <div class="lm-credential-halo" aria-hidden="true"></div>
        <div class="lm-credential-orbit lm-orbit-one" aria-hidden="true"></div>
        <div class="lm-credential-orbit lm-orbit-two" aria-hidden="true"></div>
        <div class="lm-credential-swing">
          <svg class="lm-credential-strap" viewBox="0 0 360 190" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="lm-strap-grad" x1="0" y1="0" x2="1" y2="0">
                <stop stop-color="#031127"/><stop offset=".4" stop-color="#0d2e5e"/><stop offset=".7" stop-color="#102b4f"/><stop offset="1" stop-color="#051326"/>
              </linearGradient>
              <path id="lm-strap-text-left" d="M 132 -12 L 168 166"/>
              <path id="lm-strap-text-right" d="M 228 -12 L 192 166"/>
            </defs>
            <path d="M 116 -14 L 152 -14 L 186 164 L 160 170 Z" fill="url(#lm-strap-grad)" stroke="#1f75c7" stroke-width="1.5"/>
            <path d="M 208 -14 L 244 -14 L 200 170 L 174 164 Z" fill="url(#lm-strap-grad)" stroke="#1f75c7" stroke-width="1.5"/>
            <text font-family="Arial, sans-serif" font-size="13" letter-spacing="1.1" font-weight="700" fill="#b9e9ff"><textPath href="#lm-strap-text-left">LUCAS MARTINEZ · LUCAS MARTINEZ</textPath></text>
            <text font-family="Arial, sans-serif" font-size="13" letter-spacing="1.1" font-weight="700" fill="#b9e9ff"><textPath href="#lm-strap-text-right">LUCAS MARTINEZ · LUCAS MARTINEZ</textPath></text>
            <rect x="163" y="156" width="34" height="31" rx="8" fill="#111c2c" stroke="#6aa2d4" stroke-width="2"/>
            <rect x="170" y="163" width="20" height="17" rx="5" fill="#050d1a" stroke="#a2c7e9" stroke-width="2"/>
          </svg>
          <div id="lm-credential-card" class="lm-credential-card" role="button" tabindex="0" aria-label="Girar crachá e mostrar o verso" aria-pressed="false">
            <div class="lm-credential-flipper">
              <div class="lm-credential-face lm-credential-front">
                <div class="lm-credential-topline"><span class="lm-gh-sign">◉</span><span>DEVELOPER / TECHNOLOGY</span><span class="lm-pixel-pips">▪ ▪ ▪</span></div>
                <img src="assets/lucas-credencial-retrato.svg" alt="Retrato de Lucas Martinez" class="lm-credential-portrait" loading="lazy"/>
                <div class="lm-credential-fade"></div>
                <div class="lm-credential-front-text">
                  <div class="lm-credential-chip"><span></span> DIGITAL IDENTITY</div>
                  <strong>Lucas<br><em>Martinez</em></strong>
                  <span class="lm-credential-role">DESENVOLVIMENTO · AUTOMAÇÃO · IA</span>
                  <div class="lm-credential-symbols"><span>‹/› CODE</span><span>◈ CREATE</span><span>⌘ BUILD</span></div>
                </div>
              </div>
              <div class="lm-credential-face lm-credential-back">
                <div class="lm-credential-back-top"><span>LM / PORTFOLIO</span><span>↗</span></div>
                <h3>LET'S BUILD<br><span>TOGETHER.</span></h3>
                <div class="lm-credential-qr-frame">
                  <svg id="lm-credential-qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" role="img" aria-label="QR Code para github.com/LucasMartinez96" shape-rendering="crispEdges"></svg>
                </div>
                <p class="lm-credential-qr-caption">ESCANEIE PARA ACESSAR MEU GITHUB</p>
                <strong class="lm-credential-url">github.com/LucasMartinez96</strong>
                <div class="lm-credential-back-bottom"><span>BUILD WITH PURPOSE.</span><span>© 2026 LM</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="lm-credential-scene-note" aria-hidden="true">SEGURE · PUXE · GIRE · SOLTE</div>
      </div>
    </div>`;
  hero.insertAdjacentElement("afterend", sec);
  // Matriz QR veficada por decodificação real: https://github.com/LucasMartinez96
  const matrix = atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAA/m4iP4BBR6sQQC6LfougF1wgBdALrvba6AQRTXkEA/qqqv4AASYxAABehlptAE51GYcAKeD7e+ADilk6YA92nusAByp+sJABnZcG2AHIJ6atAE7yevgAPhjnFQAmm0x1oBi5hInACqnyzVAFolxW0AIplIeWAQkQgMUA99B5+YAASSTFAD+PH+qAEFskMfALry/fiAXV22aUAug7JX4BBRGGvwD+VQCYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==");
  const qr = sec.querySelector("#lm-credential-qr");
  let path = "";
  for (let i = 0; i < 1681; i++) {
    if (matrix.charCodeAt(i >> 3) & (128 >> (i % 8))) path += "M" + (i % 41) + " " + ((i / 41) | 0) + "h1v1h-1z";
  }
  qr.innerHTML = '<rect width="41" height="41" fill="#fff"/><path fill="#061329" d="' + path + '"/>';

  (function(){
  const strap=sec.querySelector(".lm-credential-strap");
  strap.setAttribute("viewBox","0 0 360 640");
  strap.innerHTML=`
    <defs>
      <linearGradient id="lm-band-material" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#010f22"/>
        <stop offset=".28" stop-color="#0a72bc"/>
        <stop offset=".48" stop-color="#133d72"/>
        <stop offset=".85" stop-color="#041e3b"/>
        <stop offset="1" stop-color="#031122"/>
      </linearGradient>
    </defs>
    <path id="lm-band-left" stroke="url(#lm-band-material)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path id="lm-band-right" stroke="url(#lm-band-material)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path id="lm-band-left-stitch" stroke="#249ff2" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity=".7"/>
    <path id="lm-band-right-stitch" stroke="#249ff2" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity=".7"/>
    <text class="lm-strap-lettering" fill="#def3ff" font-size="12" font-weight="700" font-family="Arial,sans-serif" letter-spacing="1">
      <textPath href="#lm-band-left" startOffset="8%">LUCAS MARTINEZ · LUCAS MARTINEZ</textPath>
    </text>
    <text class="lm-strap-lettering" fill="#def3ff" font-size="12" font-weight="700" font-family="Arial,sans-serif" letter-spacing="1">
      <textPath href="#lm-band-right" startOffset="8%">LUCAS MARTINEZ · LUCAS MARTINEZ</textPath>
    </text>
    <g id="lm-badge-buckle" transform="translate(180,166)">
      <rect x="-20" y="-17" width="40" height="40" rx="12" fill="#152236" stroke="#8bbfe6" stroke-width="2.5"/>
      <rect x="-14" y="-12" width="28" height="27" rx="8" fill="#030b19" stroke="#b5d0eb" stroke-width="2"/>
      <path d="M-9 18H9" fill="none" stroke="#a8cde9" stroke-width="3"/>
    </g>`;
  const left=strap.querySelector("#lm-band-left");
  const right=strap.querySelector("#lm-band-right");
  const stitchLeft=strap.querySelector("#lm-band-left-stitch");
  const stitchRight=strap.querySelector("#lm-band-right-stitch");
  const buckle=strap.querySelector("#lm-badge-buckle");
  const card=sec.querySelector("#lm-credential-card");
  const scene=sec.querySelector(".lm-credential-scene");
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state={x:0,y:0,vx:0,vy:0,angle:0,va:0,snap:0,pitch:0,roll:0,dragging:false,visible:true,startX:0,startY:0,baseX:0,baseY:0,baseAngle:0,wantedX:0,wantedY:0,wantedAngle:0,moved:0,pointer:null};
  let raf=0,lastFrame=0;
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
  function spring(position,velocity,goal,strength,damping,delta){
    velocity+=((goal-position)*strength-velocity*damping)*delta;
    position+=velocity*delta;
    return [position,velocity];
  }
  function render(time){
    const s=state,bend=reduced?0:Math.sin(time*.0013)*2.8;
    const x=s.x,y=s.y,w=x*.22+s.vx*.14+bend;
    const lx=180+x-10,rx=180+x+10,endY=164+y;
    const d1="M133 -20 C"+(132+w*.24).toFixed(1)+" 45 "+(156+x*.6+w*.35).toFixed(1)+" "+(endY-40).toFixed(1)+" "+lx.toFixed(1)+" "+endY.toFixed(1);
    const d2="M227 -20 C"+(225+w*.24).toFixed(1)+" 45 "+(202+x*.6+w*.3).toFixed(1)+" "+(endY-40).toFixed(1)+" "+rx.toFixed(1)+" "+endY.toFixed(1);
    left.setAttribute("d",d1);right.setAttribute("d",d2);
    stitchLeft.setAttribute("d",d1);stitchRight.setAttribute("d",d2);
    buckle.setAttribute("transform","translate("+(180+x).toFixed(1)+","+(164+y).toFixed(1)+") rotate("+(s.roll*.6).toFixed(1)+")");
    card.style.setProperty("--lm-x",x.toFixed(2)+"px");
    card.style.setProperty("--lm-y",y.toFixed(2)+"px");
    card.style.setProperty("--lm-rx",s.pitch.toFixed(2)+"deg");
    card.style.setProperty("--lm-rz",s.roll.toFixed(2)+"deg");
    card.style.setProperty("--lm-spin",s.angle.toFixed(2)+"deg");
  }
  function step(time){
    raf=0;
    if(!state.visible||document.hidden){lastFrame=0;return;}
    const dt=lastFrame?clamp((time-lastFrame)/1000,.001,.033):.016;
    lastFrame=time;
    for(let k=0;k<2;k++){
      const d=dt/2,s=state;
      const wind=reduced?0:Math.sin(time*.0009)*1.3;
      const gx=s.dragging?s.wantedX:wind;
      const gy=s.dragging?s.wantedY:0;
      const ga=s.dragging?s.wantedAngle:s.snap;
      [s.x,s.vx]=spring(s.x,s.vx,gx,s.dragging?120:19,s.dragging?19:4.6,d);
      [s.y,s.vy]=spring(s.y,s.vy,gy,s.dragging?130:25,s.dragging?20:6.1,d);
      [s.angle,s.va]=spring(s.angle,s.va,ga,s.dragging?100:35,s.dragging?16:8,d);
      s.pitch+=((s.dragging?clamp(-s.wantedY*.11,-14,14):0)-s.pitch)*Math.min(1,d*15);
      const desiredRoll=clamp(-s.x*.1-s.vx*.09,-18,18);
      s.roll+=(desiredRoll-s.roll)*Math.min(1,d*14);
      const maxX=Math.min(150,Math.max(42,(scene.clientWidth-300)*.5));
      s.x=clamp(s.x,-maxX-15,maxX+15);
      s.y=clamp(s.y,-70,140);
    }
    render(time);
    raf=requestAnimationFrame(step);
  }
  function run(){if(!raf&&state.visible&&!document.hidden){lastFrame=0;raf=requestAnimationFrame(step);}}
  function label(){
    const back=Math.abs(Math.round(state.snap/180)%2)===1;
    card.setAttribute("aria-pressed",String(back));
    card.setAttribute("aria-label",back?"Girar crachá para ver a frente":"Girar crachá para ver o verso");
  }
  function toggle(){
    state.snap=Math.round(state.snap/180)*180+180;
    state.wantedAngle=state.snap;
    label();run();
  }
  card.addEventListener("pointerdown",e=>{
    if(e.pointerType!=="touch"&&e.button!==0)return;
    e.preventDefault();
    const s=state;s.dragging=true;s.pointer=e.pointerId;
    s.startX=e.clientX;s.startY=e.clientY;
    s.baseX=s.x;s.baseY=s.y;s.baseAngle=s.snap;
    s.wantedX=s.x;s.wantedY=s.y;s.wantedAngle=s.snap;s.moved=0;
    card.classList.add("is-dragging");
    card.setPointerCapture(e.pointerId);
    run();
  });
  card.addEventListener("pointermove",e=>{
    if(!state.dragging||e.pointerId!==state.pointer)return;
    const s=state,dx=e.clientX-s.startX,dy=e.clientY-s.startY;
    s.moved=Math.max(s.moved,Math.hypot(dx,dy));
    const maxX=Math.min(150,Math.max(42,(scene.clientWidth-300)*.5));
    s.wantedX=clamp(s.baseX+dx*.92,-maxX,maxX);
    s.wantedY=clamp(s.baseY+dy*.72,-68,135);
    s.wantedAngle=s.baseAngle+dx*1.4;
  });
  function finish(e,cancelled=false){
    const s=state;
    if(!s.dragging||s.pointer!==e.pointerId)return;
    s.dragging=false;s.pointer=null;
    card.classList.remove("is-dragging");
    if(!cancelled&&s.moved<9)toggle();
    else if(!cancelled){const spin=s.baseAngle+(e.clientX-s.startX)*1.4;s.snap=Math.round(spin/180)*180;}
    else{s.snap=Math.round(s.angle/180)*180;}
    label();
    try{if(card.hasPointerCapture(e.pointerId))card.releasePointerCapture(e.pointerId);}catch(_){}
    run();
  }
  card.addEventListener("pointerup",e=>finish(e));
  card.addEventListener("pointercancel",e=>finish(e,true));
  card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}});
  card.setAttribute("aria-label","Puxe ou toque no crachá para girar e ver o verso");
  card.setAttribute("aria-description","Arraste lateralmente para girar, solte para ver o balanço e toque para alternar o lado");
  card.setAttribute("aria-pressed","false");
  if("IntersectionObserver" in window){
    new IntersectionObserver(entries=>{
      state.visible=entries[0].isIntersecting;
      scene.classList.toggle("is-visible",state.visible);
      if(state.visible)run();
      else if(raf){cancelAnimationFrame(raf);raf=0;}
    },{threshold:.025}).observe(scene);
  }
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)run();});
  render(0);run();
})();
})();