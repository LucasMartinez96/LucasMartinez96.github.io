/* V11: apenas sprites novos. NÃO substitui o motor de movimento original. */
(()=>{
  const nomes=['rest_soft','rest_happy','smile_soft','smile_medium','smile_big','laugh','smile_closed','curious','thinking','focus','surprised_soft','surprised_big','shy','proud','relieved','sleepy','hearts_soft','hearts_big','wink_left','wink_right'];
  let tentativas=0;
  function iniciar(){
    const avatar=window.__avatarLucasOriginal;
    if(!avatar||!window.AVATAR_V10_ATLAS){
      if(++tentativas<120)setTimeout(iniciar,100);
      return;
    }
    const img=new Image();
    img.onload=()=>{
      const extras={};
      for(let n=0;n<nomes.length;n++){
        const c=document.createElement('canvas');c.width=256;c.height=288;
        const ctx=c.getContext('2d',{willReadFrequently:true});
        if(!ctx)continue;
        ctx.drawImage(img,(n%5)*256,Math.floor(n/5)*288,256,288,0,0,256,288);
        const data=ctx.getImageData(0,0,256,288),p=data.data;
        // Remove halo claro deixado pelo fundo branco, sem alterar olhos e pele.
        const original=new Uint8ClampedArray(p);
        for(let y=1;y<287;y++)for(let x=1;x<255;x++){
          const i=(y*256+x)*4,a=original[i+3];
          if(a===0)continue;
          let nearEdge=false;
          for(let yy=-1;yy<=1&&!nearEdge;yy++)for(let xx=-1;xx<=1;xx++)
            if(original[((y+yy)*256+x+xx)*4+3]<80){nearEdge=true;break;}
          if(!nearEdge)continue;
          const white=Math.min(original[i],original[i+1],original[i+2]);
          const chroma=Math.max(original[i],original[i+1],original[i+2])-white;
          // Só pixels claros junto à transparência: não apaga reflexos internos.
          if(white>200&&chroma<45)p[i+3]=Math.round(a*.12);
          else if(a<180)p[i+3]=Math.round(a*.70);
        }
        ctx.putImageData(data,0,0);
        extras[nomes[n]]=c;
      }
      avatar.spritesV11=extras;
      // A animação de olhar, piscar, toque e idle continua 100% da V8.
      // Só trocamos a ilustração quando a expressão original já é solicitada.
      const originalDesenhar=avatar._desenharPose.bind(avatar);
      avatar._desenharPose=function(ctx,pose){
        const atual=this.img[pose];
        let alternativa=null;
        if(pose==='grin')alternativa=extras.smile_medium;
        else if(pose==='hearts')alternativa=extras.hearts_soft;
        // rest, closed, half, todas as direções e angry permanecem originais.
        if(alternativa)this.img[pose]=alternativa;
        try{return originalDesenhar(ctx,pose);}
        finally{if(alternativa)this.img[pose]=atual;}
      };
      avatar.atualizar(true);
      document.documentElement.dataset.avatarSprites='v11';
    };
    img.src=window.AVATAR_V10_ATLAS;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar,{once:true});
  else iniciar();
})();