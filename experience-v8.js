/* Lucas Martinez — V7 Android fix: renderizar diretamente no DOM, sem iframe, sem Three.js. */
(()=>{
 'use strict';
 const main=document.querySelector('main#conteudo');
 if(!main||document.getElementById('experiencia'))return;
 const markup=String.raw`<section id="experiencia" class="v8-experience" aria-label="Abertura interativa: notebook, código Java e identidade Lucas Martinez">
<div class="v8-hold">
<div id="cartoon" aria-hidden="true">
  <div class="comic-art">
    <div class="comic-image"></div><div class="comic-hands"></div><div class="comic-finger l"></div><div class="comic-finger r"></div><div class="comic-key"></div><div class="comic-key"></div>
    <div id="comic-editor"></div>
    <div id="comic-ide"><div class="tabs"><b class="on">LucasMartinez.java</b><b>application.properties</b></div><div class="body"><div id="comic-gut"></div><div id="comic-code"></div></div><div class="status"><span>● Java</span><span id="comic-pos">Ln 1, Col 1</span></div></div><div id="comic-sfx">TAC!</div>
  </div>
  <div id="comic-warm"></div>
  <div id="comic-caption">
    <div class="comic-kicker">01 / CÓDIGO GANHA VIDA</div>
    <h2>IDEIAS<br>VIRAM <em>CÓDIGO.</em></h2>
  </div>
  <div id="comic-note"><b>● JAVA</b> &nbsp; / &nbsp; DIGITANDO...</div>
</div>

<div class="v8-space" aria-hidden="true"><div class="v8-tunnel"></div><span class="v8-spark a">public static void</span><span class="v8-spark b">{ IA / automação }</span><span class="v8-spark c">010101 · Java</span></div>
<div class="v8-brand" aria-hidden="true"><span class="v8-lm">LM</span><h2>LUCAS <em>MARTINEZ</em></h2><p>SOFTWARE · AUTOMAÇÃO · INTELIGÊNCIA ARTIFICIAL</p></div>
<div class="v8-close" aria-hidden="true"><strong>TECNOLOGIA<br>EM MOVIMENTO.</strong><small>PROJETOS E CERTIFICADOS A SEGUIR</small></div>
<div class="v8-hud" aria-hidden="true"><i></i></div><div class="v8-cue" aria-hidden="true">ROLE PARA EXPLORAR ↓</div>
</div></section>`;
 main.insertAdjacentHTML('afterbegin',markup);
 const root=document.getElementById('experiencia');
 const hold=root.querySelector('.v8-hold');
 const cartoon=root.querySelector('#cartoon');
 const art=root.querySelector('.comic-art');
 const space=root.querySelector('.v8-space');
 const tunnel=root.querySelector('.v8-tunnel');
 const brand=root.querySelector('.v8-brand');
 const close=root.querySelector('.v8-close');
 const meter=root.querySelector('.v8-hud i');
 const cue=root.querySelector('.v8-cue');
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 const seg=(p,a,b)=>ease((p-a)/(b-a));
 window.__v8GetProgress=()=>{
  const rect=root.getBoundingClientRect();
  return clamp(-rect.top/Math.max(1,root.offsetHeight-hold.offsetHeight));
 };
 window.__v8Offscreen=()=>{const r=root.getBoundingClientRect();return r.top>window.innerHeight+30||r.bottom< -30};
 let tick=0;
 function paintStage(){
  tick=0;
  if(window.__v8Offscreen())return;
  const p=window.__v8GetProgress();
  const tunnelIn=seg(p,.27,.46),tunnelOut=seg(p,.60,.82);
  const brandIn=seg(p,.53,.65),brandOut=seg(p,.80,.91);
  const finish=seg(p,.88,.98);
  space.style.opacity=String(tunnelIn*(1-tunnelOut));
  tunnel.style.transform='translate(-50%,-50%) rotate('+(45+p*110)+'deg) scale('+(0.52+tunnelIn*1.8)+')';
  brand.style.opacity=String(brandIn*(1-brandOut));
  brand.style.transform='translateY('+((1-brandIn)*35)+'px) scale('+(0.82+brandIn*.18)+')';
  close.style.opacity=String(finish);
  meter.style.height=(p*100).toFixed(1)+'%';
  cue.style.opacity=String(1-seg(p,.08,.24));
 }
 function scheduleStage(){if(!tick)tick=requestAnimationFrame(paintStage)}
 addEventListener('scroll',scheduleStage,{passive:true});
 addEventListener('resize',scheduleStage,{passive:true});
 addEventListener('pageshow',scheduleStage);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)scheduleStage()});
 scheduleStage();
})();


/* V6 BASE ORIGINAL — mesma direção visual, apenas digitação mais natural e contínua. */
(()=>{
 'use strict';
 const cartoon=document.getElementById('cartoon');
 const art=cartoon.querySelector('.comic-art');
 const caption=document.getElementById('comic-caption');
 const note=document.getElementById('comic-note');
 const code=document.getElementById('comic-code');
 const hands=cartoon.querySelector('.comic-hands');
 const gut=document.getElementById('comic-gut'),pos=document.getElementById('comic-pos'),ide=document.getElementById('comic-ide');
 const fingers=[...cartoon.querySelectorAll('.comic-finger')],glows=[...cartoon.querySelectorAll('.comic-key')];
 const keyPts=[[[40.5,74.5],[42.6,76.3],[44.6,78.1],[46.7,77]],[[61,66.5],[63.5,65.5],[66,64.5],[68,66]]];
 function quad(w,h,d){const s=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=d[i];A.push([x,y,1,0,0,0,-x*u,-y*u]);B.push(u);A.push([0,0,0,x,y,1,-x*v,-y*v]);B.push(v);}
  for(let i=0;i<8;i++){let m=i;for(let r=i+1;r<8;r++)if(Math.abs(A[r][i])>Math.abs(A[m][i]))m=r;[A[i],A[m]]=[A[m],A[i]];[B[i],B[m]]=[B[m],B[i]];
   for(let r=i+1;r<8;r++){const f=A[r][i]/A[i][i];for(let c=i;c<8;c++)A[r][c]-=f*A[i][c];B[r]-=f*B[i];}}
  const H=[];for(let i=7;i>=0;i--){let t=B[i];for(let c=i+1;c<8;c++)t-=A[i][c]*H[c];H[i]=t/A[i][i];}
  const[a,b,c,d2,e,f,g,h2]=H;return 'matrix3d('+[a,d2,0,g,b,e,0,h2,0,0,1,0,c,f,0,1].join(',')+')';}
 function fit(){const w=art.offsetWidth,h=art.offsetHeight;ide.style.transform=quad(600,580,[[33.1,16.1],[59.1,19.2],[63.5,56.8],[34.9,61.7]].map(p=>[p[0]*w/100,p[1]*h/100]));}
 fit();addEventListener('resize',fit);
 function press(ch){
   if(reduced||!fingers[0].animate)return;
   const left=/[qwertasdfgzxcvb]/i.test(ch),k=left?0:1,big=ch==='\n'?1.6:1,sx=left?1:-1;
   fingers[k].animate([{transform:'none'},{transform:'translate3d('+.3*sx+'px,'+3*big+'px,0) rotate('+.5*sx*big+'deg)',offset:.35},{transform:'none'}],{duration:130,easing:'ease-out'});
   const p=keyPts[k][Math.random()*4|0],g=glows[k];g.style.left=p[0]+'%';g.style.top=p[1]+'%';
   g.animate([{opacity:0},{opacity:.85,offset:.25},{opacity:0}],{duration:230});
 }
 const runway=document.getElementById('experiencia');
 const fallback=document.getElementById('offline-world');
 const brand=document.getElementById('offline-brand');
 const bar=document.querySelector('#bar i');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 const range=(p,a,b)=>ease((p-a)/(b-a));
 // Java verdadeiro do ponto de vista sintático, curto para a tela ilustrada.
 const source=[
  'public class LucasMartinez {',
  '  public static void main(String[] args) {',
  '    String projeto = "Portfolio";',
  '    System.out.println(projeto);',
  '  }',
  '}'
 ].join('\n');
 // Digitação humana: dois pequenos erros corrigidos com Backspace.
 const ops=[];const spots={[source.indexOf('projeto')+3]:'h',[source.indexOf('println')+2]:'o'};
 for(let i=0;i<source.length;i++){if(spots[i])ops.push(spots[i],'\b');ops.push(source[i]);}
 let buf='',index=0,clock=0,delay=.06,lastTime=0,frameId=0,lastPaint=-1,wasPastScene=false;
 let actionUntil=0,lastTypedAt=0,lastStatus='';
 const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 function colorize(raw){
   return raw.split(/("[^"]*"|\b(?:public|class|static|void)\b|\b(?:String|System|LucasMartinez)\b|\b(?:main|println)\b)/g).map(t=>{
     const c=/^"/.test(t)?'s':/^(public|class|static|void)$/.test(t)?'k':/^(String|System|LucasMartinez)$/.test(t)?'t':/^(main|println)$/.test(t)?'m':'';
     return c?'<b class="'+c+'">'+escape(t)+'</b>':escape(t);}).join('');
 }
 function paint(){
   const lines=buf.split('\n');
   code.innerHTML=lines.map((l,i)=>'<span>'+colorize(l)+(i===lines.length-1?'<i></i>':'')+'</span>').join('');
   gut.innerHTML=lines.map((_,i)=>'<span'+(i===lines.length-1?' class="on"':'')+'>'+(i+1)+'</span>').join('');
   pos.textContent='Ln '+lines.length+', Col '+(lines[lines.length-1].length+1);
   lastPaint=index;
 }
 function nextDelay(ch){
   if(ch==='\n')return .26+Math.random()*.16;
   if(ch===';' || ch==='{' || ch==='}')return .13+Math.random()*.12;
   if(ch==='(' || ch===')')return .10+Math.random()*.055;
   if(ch===' ')return .025+Math.random()*.025;
   return .035+Math.random()*.048;
 }
 function animate(now){
   frameId=0;
   if(document.hidden)return;
   const p=window.__v8GetProgress();
   const sceneVisible=p<.43 && !window.__v8Offscreen();
   const fade=1-range(p,.28,.41);
   cartoon.style.opacity=String(fade);
   cartoon.style.visibility=sceneVisible?'visible':'hidden';
   art.style.transform='translate(-50%,-50%) scale('+(1+range(p,.04,.39)*1.65)+') translate('+(-range(p,.14,.39)*9)+'%, '+(-range(p,.14,.39)*5)+'%)';
   caption.style.opacity=String(1-range(p,.14,.31));
   caption.style.transform='translateY('+(-28*range(p,.12,.30))+'px)';
   note.style.opacity=String(1-range(p,.23,.38));
   if(reduced){
     index=ops.length;buf=source;
   }else if(sceneVisible && index<ops.length){
     const dt=lastTime?Math.min(.12,(now-lastTime)/1000):0;
     clock+=dt;
     while(clock>=delay && index<ops.length){
       clock-=delay;
       const ch=ops[index++];buf=ch==='\b'?buf.slice(0,-1):buf+ch;
       lastTypedAt=now;
       actionUntil=now+165;
       delay=ch==='\b'?.14+Math.random()*.08:nextDelay(ch);press(ch);
       if(ops[index]==='\b')delay+=.24;
     }
   }
   lastTime=now;
   if(index!==lastPaint)paint();
   // Os dedos só se movimentam enquanto novas teclas são digitadas.
   const typing=sceneVisible && !reduced && index<ops.length;
   hands.style.animationPlayState=typing?'running':'paused';
   const status=typing?'DIGITANDO...':index>=ops.length?'CÓDIGO PRONTO':'INICIANDO...';
   if(status!==lastStatus){note.innerHTML='<b>● JAVA</b> &nbsp; / &nbsp; '+status;lastStatus=status;}
   if(p>=.44)wasPastScene=true;
   // Replay da digitação ao voltar completamente ao topo após visitar outras cenas.
   if(wasPastScene && p<.012 && index>=ops.length && !reduced){
     wasPastScene=false;index=0;buf='';clock=0;delay=.06;lastTime=0;lastPaint=-1;paint();
   }
   // Não deixar um loop permanente gastando bateria depois que termina a digitação.
   if(sceneVisible && index<ops.length && !reduced)schedule();
 }
 function schedule(){if(!frameId)frameId=requestAnimationFrame(animate);}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',()=>{lastTime=0;schedule()});
 document.addEventListener('visibilitychange',()=>{lastTime=0;if(!document.hidden)schedule()});
 paint();
 schedule();
})();

