/* Beyond the Interface: a real 3D mesh projected in Canvas 2D.
   Beveled faces, camera perspective and lighting without a WebGL dependency.
   Rendering sleeps at rest and stops outside the viewport. */
(() => {
  'use strict';
  const canvas=document.getElementById('wow-monogram');
  const host=canvas?.closest('.wow-sculpture'),hero=document.querySelector('.wow-hero');
  if(!canvas||!host||!hero)return;
  let ctx;try{ctx=canvas.getContext('2d',{alpha:true});}catch(_){return;}if(!ctx)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const economy=innerWidth<760||!fine.matches||(navigator.deviceMemory||8)<=4||navigator.connection?.saveData;
  let reduced=media.matches;
  try{reduced ||= sessionStorage.getItem('lm-motion-paused')==='true';}catch(_){}
  const data=[];
  function triangle(a,b,c,part) {
    const u=b.map((v,i)=>v-a[i]), v=c.map((x,i)=>x-a[i]);
    const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    const len=Math.hypot(...n)||1;
    for (const p of [a,b,c]) data.push(...p,...n.map(x=>x/len),part);
  }
  function beam(x1,y1,x2,y2,width,part) {
    const length=Math.hypot(x2-x1,y2-y1)+width*.2;
    const angle=Math.atan2(y2-y1,x2-x1)-Math.PI/2;
    const cx=(x1+x2)/2, cy=(y1+y2)/2, depth=.34, bevel=.035;
    const rotate=p=>[p[0]*Math.cos(angle)-p[1]*Math.sin(angle)+cx,p[0]*Math.sin(angle)+p[1]*Math.cos(angle)+cy,p[2]];
    const ring=(w,h,z)=>[[-w+bevel,-h],[w-bevel,-h],[w,-h+bevel],[w,h-bevel],[w-bevel,h],[-w+bevel,h],[-w,h-bevel],[-w,-h+bevel]].map(p=>rotate([p[0],p[1],z]));
    const rings=[ring(width/2-bevel,length/2-bevel,-depth/2),ring(width/2,length/2,-depth/2+bevel),ring(width/2,length/2,depth/2-bevel),ring(width/2-bevel,length/2-bevel,depth/2)];
    for(let r=0;r<3;r++)for(let i=0;i<8;i++){
      const j=(i+1)%8;triangle(rings[r][i],rings[r][j],rings[r+1][j],part);triangle(rings[r][i],rings[r+1][j],rings[r+1][i],part);
    }
    const front=rotate([0,0,depth/2]),back=rotate([0,0,-depth/2]);
    for(let i=0;i<8;i++){const j=(i+1)%8;triangle(front,rings[3][i],rings[3][j],part);triangle(back,rings[0][j],rings[0][i],part);}
  }
  beam(-1.32,.92,-1.32,-.91,.31,0);
  beam(-1.32,-.91,-.48,-.91,.31,1);
  beam(-.12,-.91,-.12,.92,.3,2);
  beam(-.12,.92,.51,-.03,.29,3);
  beam(.51,-.03,1.15,.92,.29,4);
  beam(1.15,.92,1.15,-.91,.3,5);

  let frame=0,visible=true,start=performance.now(),last=0,activeUntil=start+1700;
  let tx=-.50,ty=.20,x=tx,y=ty,scroll=0,assembled=reduced||Boolean(location.hash),width=1,height=1;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function rotate(p){
    const rz=-.15,rx=y,ry=x+scroll*.3;
    let px=p[0]*Math.cos(rz)-p[1]*Math.sin(rz),py=p[0]*Math.sin(rz)+p[1]*Math.cos(rz),pz=p[2];
    const qy=py*Math.cos(rx)-pz*Math.sin(rx),qz=py*Math.sin(rx)+pz*Math.cos(rx);
    return [px*Math.cos(ry)+qz*Math.sin(ry),qy,-px*Math.sin(ry)+qz*Math.cos(ry)];
  }
  function project(p){const k=height*.73/(4.7-p[2]);return [width*.51+p[0]*k*2.25,height*.48-p[1]*k*2.25];}
  function path(points){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();}
  function draw(now){
    frame=0;if(document.hidden||!visible)return;
    if(now-last<(economy?32:16)){frame=requestAnimationFrame(draw);return;}last=now;
    x+=(tx-x)*.16;y+=(ty-y)*.16;
    const age=clamp((now-start)/(economy?950:1450),0,1),assembly=assembled||reduced?1:1-Math.pow(1-age,4);
    ctx.clearRect(0,0,width,height);
    // Exact rectangular planes form a quiet spatial frame behind the identity.
    for(let j=4;j>=0;j--){
      const z=-.6-j*.19,ext=1+(1-assembly)*(j+1)*.35;
      const corners=[[-1.75,-1.18,z],[1.6,-1.18,z],[1.6,1.18,z],[-1.75,1.18,z]].map(p=>project(rotate([p[0]*ext,p[1]*ext,p[2]])));
      path(corners);ctx.strokeStyle=`rgba(85,158,255,${.14-j*.018})`;ctx.lineWidth=1;ctx.stroke();
    }
    const faces=[];
    for(let i=0;i<data.length;i+=21){
      const part=data[i+6],spread=1-assembly;
      const offset=[Math.sin(part*2.4)*2.6*spread,Math.cos(part*1.7)*2.2*spread,(part-2.5)*.8*spread];
      const points=[0,7,14].map(k=>rotate([data[i+k]+offset[0],data[i+k+1]+offset[1],data[i+k+2]+offset[2]]));
      const n=rotate([data[i+3],data[i+4],data[i+5]]);
      if(n[2]<-.25)continue;
      faces.push({points:points.map(project),z:points.reduce((v,p)=>v+p[2],0)/3,n});
    }
    faces.sort((a,b)=>a.z-b.z);
    for(const face of faces){
      const n=face.n;
      const diffuse=Math.max(0,n[0]*-.3+n[1]*.65+n[2]*.7);
      const edge=Math.pow(1-Math.abs(n[2]),2);
      const light=clamp(diffuse*.8+edge*.35,.08,1);
      const r=Math.round(12+light*52),g=Math.round(37+light*108),b=Math.round(82+light*158);
      path(face.points);
      if(n[2]>.75){
        const gradient=ctx.createLinearGradient(0,height*.15,width*.7,height*.85);
        gradient.addColorStop(0,`rgb(${r+32},${g+37},${clamp(b+22,0,255)})`);
        gradient.addColorStop(.38,`rgb(${r},${g},${b})`);
        gradient.addColorStop(.56,`rgb(${r+17},${g+28},${clamp(b+18,0,255)})`);
        gradient.addColorStop(1,'#102749');ctx.fillStyle=gradient;
      }else ctx.fillStyle=`rgb(${r},${g},${b})`;
      ctx.fill();ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.4;ctx.stroke();
    }
    // A finite convergence, never an idle particle loop.
    if(!reduced&&!assembled&&age<1){
      const fade=Math.sin(age*Math.PI);
      for(let i=0;i<(economy?18:42);i++){
        const a=i*2.399,z=2+Math.sin(i)*.5;
        const radius=(1-age)*3.8;
        const end=project(rotate([Math.cos(a)*radius,Math.sin(a)*radius,z]));
        const begin=project(rotate([Math.cos(a)*(radius+.13),Math.sin(a)*(radius+.13),z]));
        ctx.beginPath();ctx.moveTo(...begin);ctx.lineTo(...end);ctx.strokeStyle=`rgba(164,218,255,${fade*.7})`;ctx.lineWidth=1;ctx.stroke();
      }
    }
    host.classList.add('has-canvas');
    if(!reduced&&(now<activeUntil||(!assembled&&age<1)))frame=requestAnimationFrame(draw);
  }
  function schedule(ms=650){activeUntil=performance.now()+ms;if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
  function resize(){
    width=Math.max(1,host.clientWidth);height=Math.max(1,host.clientHeight);
    const dpr=Math.min(devicePixelRatio||1,economy?1:1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);schedule(100);
  }
  hero.addEventListener('pointermove',e=>{if(reduced||!fine.matches||e.pointerType!=='mouse')return;const b=hero.getBoundingClientRect();tx=-.5+(e.clientX-b.left-b.width/2)/b.width*.5;ty=.2+(e.clientY-b.top-b.height/2)/b.height*.3;schedule();},{passive:true});
  hero.addEventListener('pointerleave',()=>{tx=-.5;ty=.2;schedule();});
  addEventListener('scroll',()=>{if(reduced||!visible)return;scroll=clamp(-hero.getBoundingClientRect().top/hero.offsetHeight,0,1);schedule(100);},{passive:true});
  addEventListener('wow-opening-finished',()=>{assembled=true;schedule(100);});
  addEventListener('wow-motion-change',e=>{reduced=e.detail.reduced;if(reduced)assembled=true;tx=-.5;ty=.2;x=tx;y=ty;schedule(100);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule(100);});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule(100);else{cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(hero);
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(host);else addEventListener('resize',resize,{passive:true});
  resize();
})();
