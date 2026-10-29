/* Lucas Martinez — V7 ORIGINAL restaurada, rolagem nativa, sem iframe. */
(()=>{
 'use strict';
 const main=document.querySelector('main#conteudo');
 if(!main || document.getElementById('experiencia'))return;
 const host=document.createElement('section');
 host.id='experiencia';
 host.setAttribute('aria-label','Abertura V7 Notebook Realista, código Java e logo LM');
 main.insertBefore(host,main.firstChild);
 const shadow=host.attachShadow({mode:'open'});
 const stylesheet=document.createElement('link');
 stylesheet.rel='stylesheet';
 stylesheet.href='experience-v7-original.css?v=7-original-repaired-1';
 shadow.appendChild(stylesheet);
 const stage=document.createElement('div');
 stage.id='v7-stage';
 stage.innerHTML="<canvas id=\"gl\" aria-hidden=\"true\"></canvas>\n<div id=\"cartoon\" aria-hidden=\"true\">\n  <div class=\"comic-art\">\n    <div class=\"comic-image\"></div><div class=\"comic-hands\"></div><div class=\"comic-finger l1\"></div><div class=\"comic-finger l2\"></div><div class=\"comic-finger r1\"></div><div class=\"comic-finger r2\"></div><div class=\"comic-key\"></div><div class=\"comic-key\"></div>\n    <div id=\"comic-editor\"></div>\n    <div id=\"comic-ide\"><div class=\"tabs\"><b class=\"on\">LucasMartinez.java</b><b>application.properties</b></div><div class=\"body\"><div id=\"comic-gut\"></div><div id=\"comic-code\"></div></div><div class=\"status\"><span>● Java</span><span id=\"comic-pos\">Ln 1, Col 1</span></div></div><div id=\"comic-sfx\">TAC!</div>\n  </div>\n  <div id=\"comic-warm\"></div>\n  <div id=\"comic-caption\">\n    <div class=\"comic-kicker\">01 / CÓDIGO GANHA VIDA</div>\n    <h2>IDEIAS<br>VIRAM <em>CÓDIGO.</em></h2>\n  </div>\n  <div id=\"comic-note\"><b>● JAVA</b> &nbsp; / &nbsp; DIGITANDO...</div>\n</div>\n<div id=\"offline-world\" aria-hidden=\"true\"><div class=\"c-ring\"></div><div class=\"c-ring\"></div><div class=\"c-ring\"></div><div class=\"c-text\">{ CODE }<br>010101</div></div>\n<div id=\"offline-brand\" aria-hidden=\"true\"><div class=\"c-lm\">LM</div><h2>LUCAS MARTINEZ</h2><p>SOFTWARE · AUTOMAÇÃO · IA</p></div>\n\n<div id=\"flash\" aria-hidden=\"true\"></div>\n<div id=\"veil\" aria-hidden=\"true\"></div>\n<div class=\"hud\" id=\"top\"><b>LM<span style=\"color:#62dcff\">.</span></b><span>CODE EXPERIENCE / CARTOON OFFICE</span></div>\n<div class=\"hud\" id=\"bar\" aria-hidden=\"true\"><i></i></div>\n<div class=\"hud\" id=\"cap\" aria-hidden=\"true\"></div>\n<div class=\"hud\" id=\"hint\" aria-hidden=\"true\">ROLE PARA EXPLORAR</div>\n<div id=\"name\" aria-hidden=\"true\"></div>\n<div id=\"tag\" aria-hidden=\"true\">Código com propósito. Design com visão.</div>\n<div id=\"runway\"></div>";
 shadow.appendChild(stage);
 const getProgress=()=>{
   const rect=host.getBoundingClientRect();
   const distance=Math.max(1,host.offsetHeight-window.innerHeight);
   return Math.max(0,Math.min(1,-rect.top/distance));
 };
 
/* V6 BASE ORIGINAL — mesma direção visual, apenas digitação mais natural e contínua. */
(()=>{
 'use strict';
 const cartoon=shadow.getElementById('cartoon');
 const art=cartoon.querySelector('.comic-art');
 const caption=shadow.getElementById('comic-caption');
 const note=shadow.getElementById('comic-note');
 const code=shadow.getElementById('comic-code');
 const hands=cartoon.querySelector('.comic-hands');
 const gut=shadow.getElementById('comic-gut'),pos=shadow.getElementById('comic-pos'),ide=shadow.getElementById('comic-ide');
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
 const busy=[0,0,0,0];
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&fingers[0]&&fingers[0].animate)fingers.forEach((f,i)=>f.animate([{transform:'rotate(.7deg)'},{transform:'rotate(-.5deg)'}],{duration:1500+i*370,delay:-i*430,direction:'alternate',iterations:Infinity,easing:'ease-in-out'}));
 function press(ch,now){
   if(reduced||!fingers[0].animate)return;
   const left=/[qwertasdfgzxcvb]/i.test(ch),big=ch==='\n'?1.5:1;
   let a=left?0:2,b=a+1;
   if(left?ch.charCodeAt(0)%2:(ch===' '||ch==='\b'))[a,b]=[b,a];
   const k=busy[a]>now?b:a;
   if(busy[k]>now)return;
   busy[k]=now+170;
   const o={duration:300,easing:'ease-in-out',composite:'add'};
   // levanta um pouco (antecipação), desce na tecla e volta suave
   fingers[k].animate([{transform:'rotate(0deg)'},{transform:'rotate('+1.8*big+'deg)',offset:.22},{transform:'rotate('+-2.8*big+'deg)',offset:.55},{transform:'rotate(0deg)'}],o);
   fingers[k^1].animate([{transform:'rotate(0deg)'},{transform:'rotate(.9deg)',offset:.5},{transform:'rotate(0deg)'}],o);
   const p=keyPts[left?0:1][Math.random()*4|0],g=glows[left?0:1];g.style.left=p[0]+'%';g.style.top=p[1]+'%';
   g.animate([{opacity:0},{opacity:.8,offset:.3},{opacity:0}],{duration:260,delay:120});
 }
 const runway=shadow.getElementById('runway');
 const fallback=shadow.getElementById('offline-world');
 const brand=shadow.getElementById('offline-brand');
 const bar=shadow.querySelector('#bar i');
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
   const p=getProgress();
   const sceneVisible=p<.44 && host.getBoundingClientRect().bottom>0;
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
       delay=ch==='\b'?.14+Math.random()*.08:nextDelay(ch);press(ch,now);
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
   if(host.classList.contains('nogl')){
     if(bar)bar.style.height=(p*100)+'%';
     const world=range(p,.34,.52)*(1-range(p,.69,.82));
     fallback.style.opacity=String(world);
     fallback.style.transform='scale('+(0.7+range(p,.37,.76)*1.8)+') rotate('+(180*range(p,.4,.8))+'deg)';
     const reveal=range(p,.74,.88)*(1-range(p,.96,.99));
     brand.style.opacity=String(reveal);
   }
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

 const start3D=()=>{
   if(!host.isConnected)return;
   
(()=>{
const $=s=>shadow.querySelector(s);
try{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile=Math.min(innerWidth,innerHeight)<700||matchMedia('(pointer:coarse)').matches;
const runway=$('#runway');
if(RM)runway.style.height='420vh';else if(mobile)runway.style.height='780vh';
const renderer=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:!mobile,powerPreference:'high-performance'});
const scene=new THREE.Scene();scene.background=new THREE.Color(0x050b17);
const cam=new THREE.PerspectiveCamera(46,1,.05,200);
const R=Math.random,clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),sm=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10)},seg=(p,a,b)=>sm((p-a)/(b-a)),mix=(a,b,t)=>a+(b-a)*t,bump=(p,c,w)=>Math.exp(-(((p-c)/w)**2));
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const tex=c=>{const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t};
const rad=col=>{const c=cv(128,128),g=c.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,col);r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return tex(c)};

/* trilho da câmera: eixo perpendicular à tela do notebook */
const ANG=-.26,C=new THREE.Vector3(0,1.08,-1.26),Nrm=new THREE.Vector3(0,Math.sin(.26),Math.cos(.26));
const rail=new THREE.Group();rail.position.copy(C);rail.rotation.x=ANG;scene.add(rail);
const railPos=d=>C.clone().addScaledVector(Nrm,d);

/* notebook */
const lap=new THREE.Group();scene.add(lap);
const metal=new THREE.MeshStandardMaterial({color:0x8fa3c4,metalness:.75,roughness:.38}),dark=new THREE.MeshStandardMaterial({color:0x0b1220,metalness:.4,roughness:.6});
const base=new THREE.Mesh(new THREE.BoxGeometry(3.2,.1,2.2),metal);base.position.y=.05;lap.add(base);
const lid=new THREE.Mesh(new THREE.BoxGeometry(3.2,2.05,.08),metal);lid.position.z=-.05;rail.add(lid);
const bez=new THREE.Mesh(new THREE.PlaneGeometry(3.1,1.95),new THREE.MeshBasicMaterial({color:0x02050b}));bez.position.z=-.005;rail.add(bez);
const keys=new THREE.InstancedMesh(new THREE.BoxGeometry(.17,.03,.17),new THREE.MeshStandardMaterial({color:0x0a0f1a,emissive:0x1d4fff,emissiveIntensity:.4,roughness:.5}),70),m4=new THREE.Matrix4();
for(let r=0;r<5;r++)for(let c=0;c<14;c++){m4.setPosition(-1.35+c*.208,.115,-.75+r*.21);keys.setMatrixAt(r*14+c,m4)}
lap.add(keys);
const pad=new THREE.Mesh(new THREE.BoxGeometry(1,.01,.6),dark);pad.position.set(0,.105,.82);lap.add(pad);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(18,18),new THREE.MeshBasicMaterial({map:rad('rgba(61,139,255,.5)'),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));floor.rotation.x=-Math.PI/2;floor.position.y=.002;lap.add(floor);
const grid=new THREE.GridHelper(30,60,0x1d4fff,0x0f2a66);grid.material.transparent=true;grid.material.opacity=.3;grid.position.y=-.002;lap.add(grid);
scene.add(new THREE.AmbientLight(0x2a3f6b,.55));
const kl=new THREE.PointLight(0x3d8bff,1.7,12);kl.position.set(0,1.4,2.4);scene.add(kl);
const r1=new THREE.PointLight(0x5ee1ff,1.3,10);r1.position.set(-3.2,2.2,-2.5);scene.add(r1);
const r2=new THREE.PointLight(0x3d5bff,1,10);r2.position.set(3.4,1.5,-2);scene.add(r2);

/* tela com código Java */
const bgc=cv(1024,640),bx=bgc.getContext('2d'),g0=bx.createLinearGradient(0,0,0,640);
g0.addColorStop(0,'#06122b');g0.addColorStop(1,'#0a2a66');bx.fillStyle=g0;bx.fillRect(0,0,1024,640);
bx.fillStyle='rgba(0,0,0,.35)';bx.fillRect(0,0,1024,44);['#ff6b6b','#ffd166','#5ee1ff'].forEach((c,i)=>{bx.fillStyle=c;bx.beginPath();bx.arc(28+i*26,22,7,0,6.3);bx.fill()});
bx.fillStyle='#8aa0c4';bx.font='20px monospace';bx.fillText('Universe.java',140,29);
for(let y=48;y<640;y+=4){bx.fillStyle='rgba(0,0,0,.12)';bx.fillRect(0,y,1024,1)}
const cc=cv(1024,640),x=cc.getContext('2d'),ctex=tex(cc);
const screen=new THREE.Mesh(new THREE.PlaneGeometry(3,1.875),new THREE.MeshBasicMaterial({map:tex(bgc),transparent:true}));rail.add(screen);
const layers=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(3,1.875),new THREE.MeshBasicMaterial({map:ctex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));m.position.z=.004*(i+1);rail.add(m);return m});
const CODE=`package dev.lucasmartinez;

public class Universe {
  public static void main(String[] a) {
    Developer lucas = new Developer("Lucas Martinez");
    lucas.focus("Software", "Automação");
    lucas.focus("IA", "Dados");
    Portfolio.enter(lucas); // role para entrar
  }
}`.split('\n');
const KW=/^(package|public|class|static|void|new)$/;
const toks=CODE.map(l=>{const o=[];l.replace(/(\/\/.*$)|("[^"]*")|([A-Za-z_]\w*)|(\s+|.)/g,(m,cm,st,id)=>{o.push([m,cm?'#5c6f95':st?'#9be8a5':id?(KW.test(id)?'#7aa8ff':/^[A-Z]/.test(id)?'#5ee1ff':'#dce9ff'):'#9db4dd']);return m});return o});
const total=toks.reduce((s,l)=>s+l.reduce((a,t)=>a+t[0].length,0),0);
function drawCode(n,cur){x.clearRect(0,0,1024,640);x.font='25px "JetBrains Mono",ui-monospace,Menlo,Consolas,monospace';x.textBaseline='top';let left=n;
for(let i=0;i<toks.length;i++){const y=70+i*38;x.fillStyle='#35507f';x.fillText(String(i+1).padStart(2),22,y);let px=74;
for(const [t,c] of toks[i]){if(left<=0)break;const s=t.slice(0,left);left-=s.length;x.fillStyle=c;x.fillText(s,px,y);px+=x.measureText(s).width}
if(left<=0){if(cur){x.fillStyle='#5ee1ff';x.fillRect(px+2,y+2,13,27)}break}}
ctex.needsUpdate=true}

/* ambiente digital: circuitos, molduras e cubos */
const lp=[],ls=[],seg3=(a,b,s)=>{lp.push(...a,...b);ls.push(s,s)};
for(let z=-3;z>-48;z-=3){const h=7,c=[[-h,-h],[h,-h],[h,h],[-h,h]];for(let i=0;i<4;i++){const a=c[i],b=c[(i+1)%4];seg3([a[0],a[1],z],[b[0],b[1],z],.1)}}
for(let k=0;k<110;k++){const w=k%4,s=R(),P=(u,z)=>w===0?[u,-7,z]:w===1?[u,7,z]:w===2?[-7,u,z]:[7,u,z];let u=(R()*2-1)*7,z=-R()*44-2,du=R()<.5;
for(let i=0,n=4+(R()*6|0);i<n;i++){const l=(1+R()*3.5)*(R()<.5?-1:1);let u2=u,z2=z;if(du)u2=clamp(u+l*1.4,-7,7);else z2=clamp(z+l*2,-48,-1);seg3(P(u,z),P(u2,z2),s);u=u2;z=z2;du=!du}}
for(let k=0;k<46;k++){const c=[(R()<.5?-1:1)*(2.6+R()*3),(R()*2-1)*5.5,-R()*44-3],h=(.15+R()*.5)/2,s=R(),V=[];
for(let i=0;i<8;i++)V.push([c[0]+(i&1?h:-h),c[1]+(i&2?h:-h),c[2]+(i&4?h:-h)]);
[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]].forEach(e=>seg3(V[e[0]],V[e[1]],s))}
const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(lp,3));lg.setAttribute('aS',new THREE.Float32BufferAttribute(ls,1));
const lineMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uT:{value:0},uA:{value:0}},
vertexShader:'attribute float aS;varying float vS,vZ,vD;void main(){vS=aS;vZ=position.z;vec4 mv=modelViewMatrix*vec4(position,1.);vD=-mv.z;gl_Position=projectionMatrix*mv;}',
fragmentShader:'uniform float uT,uA;varying float vS,vZ,vD;void main(){float pl=pow(.5+.5*sin(vZ*.35-uT*2.2+vS*6.283),8.);float a=(.2+.9*pl)*uA*exp(-vD*.03)*smoothstep(0.,2.,vD);gl_FragColor=vec4(vec3(.25,.6,1.)*(1.+pl),a);}'});
const lines=new THREE.LineSegments(lg,lineMat);lines.frustumCulled=false;rail.add(lines);

/* logo LM: máscara para as partículas e versão metálica */
function logo(ctx,sw){ctx.clearRect(0,0,512,256);const g=ctx.createLinearGradient(0,0,512,256);
if(sw==null){g.addColorStop(0,'#fff');g.addColorStop(1,'#fff')}else{g.addColorStop(0,'#566784');g.addColorStop(clamp(sw-.2),'#aebbd3');g.addColorStop(clamp(sw),'#fff');g.addColorStop(clamp(sw+.14),'#7cc4ff');g.addColorStop(1,'#2a63d6')}
ctx.strokeStyle=g;ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(132,50);ctx.lineTo(132,206);ctx.lineTo(205,206);ctx.moveTo(232,206);ctx.lineTo(232,50);ctx.lineTo(296,142);ctx.lineTo(360,50);ctx.lineTo(360,206);ctx.stroke();
ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(92,84);ctx.lineTo(54,128);ctx.lineTo(92,172);ctx.moveTo(420,84);ctx.lineTo(458,128);ctx.lineTo(420,172);ctx.stroke()}
const lc=cv(512,256),lx=lc.getContext('2d');logo(lx,null);
const id=lx.getImageData(0,0,512,256).data,pts=[];for(let y=0;y<256;y+=2)for(let xx=0;xx<512;xx+=2)if(id[(y*512+xx)*4+3]>128)pts.push(xx,y);
const NP=mobile?3600:8000,pA=new Float32Array(NP*3),pB=new Float32Array(NP*3),pR=new Float32Array(NP*4);
for(let i=0;i<NP;i++){const a=R()*6.283,r=2.2+Math.pow(R(),.6)*7.5,k=(R()*(pts.length/2)|0)*2;
pA.set([Math.cos(a)*r,Math.sin(a)*r,-R()*46-1],i*3);pB.set([(pts[k]-256)/512*9+(R()-.5)*.05,-(pts[k+1]-128)/512*9+(R()-.5)*.05,-32+(R()-.5)*.5],i*3);pR.set([R(),R(),R(),R()],i*4)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pA,3));pg.setAttribute('aB',new THREE.BufferAttribute(pB,3));pg.setAttribute('aR',new THREE.BufferAttribute(pR,4));
const PM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uM:{value:0},uT:{value:0},uA:{value:0},uSc:{value:500},uLS:{value:1}},
vertexShader:'attribute vec3 aB;attribute vec4 aR;uniform float uM,uT,uSc,uLS;varying vec3 vC;varying float vD;void main(){float d=clamp(uM*1.7-aR.x*.7,0.,1.);d=d*d*(3.-2.*d);vec3 b=vec3(aB.x*uLS,aB.y*uLS,aB.z);vec3 p=mix(position,b,d);float sw=sin(d*3.14159);p+=vec3(cos(aR.y*6.283+uT*.5),sin(aR.z*6.283+uT*.4),0.)*sw*3.;p+=vec3(sin(uT*.3+aR.y*20.),cos(uT*.35+aR.z*20.),sin(uT*.25+aR.w*20.))*.15*(1.-d);vec4 mv=modelViewMatrix*vec4(p,1.);vD=-mv.z;gl_PointSize=max(1.5,(.03+.05*aR.w)*(1.+d*.4)*uSc/max(vD,.1));vC=mix(vec3(.25,.55,1.),vec3(.75,.92,1.),d);gl_Position=projectionMatrix*mv;}',
fragmentShader:'uniform float uA;varying vec3 vC;varying float vD;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;float a=smoothstep(.5,0.,r);gl_FragColor=vec4(vC*(1.+a),a*uA*exp(-vD*.02));}'});
const parts=new THREE.Points(pg,PM);parts.frustumCulled=false;rail.add(parts);
const mc=cv(512,256),mx=mc.getContext('2d'),mtex=tex(mc),logoG=new THREE.Group();logoG.position.z=-32;rail.add(logoG);
const lm=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(9,4.5),new THREE.MeshBasicMaterial({map:mtex,transparent:true,opacity:0,depthWrite:false,blending:i?THREE.AdditiveBlending:THREE.NormalBlending}));m.position.z=-i*.3;logoG.add(m);return m});
const glow=new THREE.Mesh(new THREE.PlaneGeometry(18,9),new THREE.MeshBasicMaterial({map:rad('rgba(61,139,255,.7)'),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.z=-1;logoG.add(glow);

/* curva de câmera (Hermite) */
function curve(K,v){let i=0;while(i<K.length-2&&v>K[i+1][0])i++;const a=K[i],b=K[i+1],h=b[0]-a[0],t=clamp((v-a[0])/h),
tg=j=>{const u=K[Math.max(j-1,0)],w=K[Math.min(j+1,K.length-1)];return(w[1]-u[1])/(w[0]-u[0])*h},t2=t*t,t3=t2*t;
return(2*t3-3*t2+1)*a[1]+(t3-2*t2+t)*tg(i)+(-2*t3+3*t2)*b[1]+(t3-t2)*tg(i+1)}
const KD=[[0,6.4],[.18,6.3],[.32,3.4],[.41,.9],[.46,-.8],[.58,-13],[.74,-23],[.9,-24.5],[1,-35]];

/* letras do nome */
const nameEl=$('#name'),L=[...'LUCAS MARTINEZ'].map(ch=>{const s=document.createElement('span');if(ch===' '){s.className='sp';s.innerHTML='&nbsp;'}else s.textContent=ch;nameEl.appendChild(s);return s});
const CAPS=[[0,'Boot: o código ganha vida'],[.2,'Compilando'],[.42,'Atravessando a tela'],[.6,'Construindo o universo'],[.8,'Identidade LM'],[.94,'Portfólio']];
let baseFov=46,ls2=1,capI=-1;
function resize(){const w=innerWidth,h=innerHeight;renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.5:2));renderer.setSize(w,h,false);cam.aspect=w/h;baseFov=w/h<1?62:46;cam.fov=baseFov;cam.updateProjectionMatrix();
PM.uniforms.uSc.value=renderer.domElement.height/(2*Math.tan(baseFov*Math.PI/360));ls2=clamp(2*8*Math.tan(baseFov*Math.PI/360)*cam.aspect/10.5,.28,1);PM.uniforms.uLS.value=ls2;logoG.scale.setScalar(ls2)}
addEventListener('resize',resize);resize();

const mouse={x:0,y:0,tx:0,ty:0};addEventListener('pointermove',e=>{mouse.tx=(e.clientX/innerWidth-.5)*2;mouse.ty=(e.clientY/innerHeight-.5)*2},{passive:true});
const prog=()=>getProgress();
const glEl=$('#gl'),flash=$('#flash'),veil=$('#veil'),tag=$('#tag'),cap=$('#cap'),hint=$('#hint'),barI=$('#bar i');
let sp=prog(),last=performance.now(),T=0,typed=0,lastKey=-1;

function frame(now){requestAnimationFrame(frame);
const dt=Math.min(.05,(now-last)/1000);last=now;const tp=prog();
sp=RM?tp:sp+(tp-sp)*(1-Math.exp(-dt*7));if(Math.abs(tp-sp)<1e-4)sp=tp;
const p=sp;barI.style.height=(p*100)+'%';
if(tp>=1&&p>.998){glEl.style.visibility='hidden';veil.style.opacity=1;return}
glEl.style.visibility='visible';
if(!RM)T+=dt;mouse.x+=(mouse.tx-mouse.x)*.06;mouse.y+=(mouse.ty-mouse.y)*.06;

/* câmera */
const w=seg(p,.15,.36),d=curve(KD,p),a=-.55+.5*seg(p,0,.2);
const orb=new THREE.Vector3(Math.sin(a)*6.2,mix(2.7,2.3,seg(p,0,.2)),Math.cos(a)*6.2-.5),pos=orb.lerp(railPos(d),w);
const tgt=new THREE.Vector3(0,.85,-.4).lerp(railPos(d-6),w);
const roll=RM?0:.08*bump(p,.44,.05)+(p>.5?Math.sin(T*.35)*.012:0);
cam.up.set(Math.sin(roll),Math.cos(roll),0);cam.position.copy(pos);cam.lookAt(tgt);
if(!RM){cam.translateX(mouse.x*.12);cam.translateY(-mouse.y*.08)}
cam.fov=baseFov+(RM?0:16*bump(p,.45,.05));cam.updateProjectionMatrix();

/* notebook e tela */
lap.visible=d>-1.5;lid.visible=bez.visible=d>.7;
const so=clamp((d-.1)/.6),dep=seg(p,.2,.4);screen.visible=so>0;screen.material.opacity=so;
layers.forEach((m,i)=>{m.visible=so>0;m.position.z=.004*(i+1)+dep*(i+1)*.09;m.material.opacity=so*(i?.28+.3*dep:.9)});
if(p<.45){typed+=RM?0:dt*38;const n=RM?total:Math.min(total,Math.floor(Math.max(typed,total*seg(p,.02,.3)))),key=n*2+(Math.floor(T*2)%2);if(key!==lastKey){lastKey=key;drawCode(n,n<total||Math.floor(T*2)%2===0)}}

/* ambiente, partículas e logo */
const env=seg(p,.38,.5);lineMat.uniforms.uT.value=PM.uniforms.uT.value=T;
lineMat.uniforms.uA.value=env*(1-.7*seg(p,.8,.9));PM.uniforms.uA.value=env;PM.uniforms.uM.value=seg(p,.58,.8);
const lo=seg(p,.8,.88)*(1-seg(p,.955,.985));
if(lo>0){logo(mx,.1+.85*seg(p,.8,.95)+(RM?0:Math.sin(T*.6)*.05));mtex.needsUpdate=true}
lm.forEach((m,i)=>{m.visible=lo>0;m.material.opacity=lo*(i?.35:1)});glow.visible=lo>0;glow.material.opacity=lo*(.75+(RM?0:.2*Math.sin(T*2)));
logoG.rotation.y=RM?0:mouse.x*.1+Math.sin(T*.4)*.04;logoG.rotation.x=RM?0:-mouse.y*.05;

/* interface */
const r=seg(p,.84,.93)*(1-seg(p,.955,.985));
L.forEach((s,i)=>{const v=clamp(r*1.8-i*.07);s.style.opacity=v;s.style.transform='translateY('+((1-v)*26).toFixed(1)+'px)';s.style.filter=v<1?'blur('+((1-v)*8).toFixed(1)+'px)':'none'});
nameEl.style.letterSpacing=mix(.5,.12,r)+'em';tag.style.opacity=seg(p,.9,.94)*(1-seg(p,.955,.985));
flash.style.opacity=.9*bump(p,.44,.025);veil.style.opacity=seg(p,.95,.995);hint.style.opacity=1-seg(p,.01,.05);
let ci=0;CAPS.forEach((c,i)=>{if(p>=c[0])ci=i});if(ci!==capI){capI=ci;cap.textContent=CAPS[ci][1]}
renderer.render(scene,cam)}
requestAnimationFrame(frame);
}catch(e){host.classList.add('nogl');console.error('Abertura V5:',e)}
})();

 };
 if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){host.classList.add('nogl');return;}
 if(window.THREE){start3D();}
 else{
   const dependency=document.createElement('script');
   dependency.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
   dependency.async=true;
   let finished=false;
   const finish=loaded=>{
     if(finished)return;
     finished=true;
     if(loaded&&window.THREE)start3D();else host.classList.add('nogl');
   };
   const timeout=setTimeout(()=>finish(false),5000);
   dependency.addEventListener('load',()=>{clearTimeout(timeout);finish(true);},{once:true});
   dependency.addEventListener('error',()=>{clearTimeout(timeout);finish(false);},{once:true});
   document.head.appendChild(dependency);
 }
})();