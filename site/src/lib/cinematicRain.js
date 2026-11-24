export function initCinematicRain(){
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scene = document.querySelector('.hero-portrait');
  if (!scene) return;
  const image = scene.querySelector('img');
  const video = scene.querySelector('video');
  const canvas = scene.querySelector('.nepali-rain');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const sample = document.createElement('canvas');
  const sampleCtx = sample.getContext('2d', {willReadFrequently: true});
  if (!sampleCtx) return;
  const characters = Array.from('अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ०१२३४५६७८९');
  let width = 0, height = 0, ratio = 1, pixels, streams = [], frame = 0, previous = 0, lastSample = 0, visible = true;
  const random = (min, max) => min + Math.random() * (max-min);
  const character = () => characters[Math.floor(Math.random()*characters.length)];
  function refreshSamples() {
    const source = video.hidden ? image : video;
    const sw = source.videoWidth || source.naturalWidth;
    const sh = source.videoHeight || source.naturalHeight;
    if (!sw || !sh || !width || !height) return;
    sample.width = Math.max(1, Math.round(width/8));
    sample.height = Math.max(1, Math.round(height/8));
    const scale = Math.max(sample.width/sw, sample.height/sh);
    sampleCtx.clearRect(0,0,sample.width,sample.height);
    sampleCtx.drawImage(source,(sample.width-sw*scale)/2,(sample.height-sh*scale)/2,sw*scale,sh*scale);
    pixels = sampleCtx.getImageData(0,0,sample.width,sample.height).data;
  }
  function darkAt(x,y) {
    if (!pixels) return x>width*.36 && x<width*.61;
    const ix=Math.max(0,Math.min(sample.width-1,Math.floor(x/width*sample.width)));
    const iy=Math.max(0,Math.min(sample.height-1,Math.floor(y/height*sample.height)));
    const offset=(iy*sample.width+ix)*4;
    return .2126*pixels[offset]+.7152*pixels[offset+1]+.0722*pixels[offset+2]<105;
  }
  function spawn(centered=true,xOverride=null,yOverride=null) {
    let x=xOverride ?? (centered?random(width*.32,width*.65):random(width*.12,width*.87));
    const size = width<700?random(9,11):random(10,13);
    return {x,y:yOverride ?? random(-height*.7,height*.85),speed:random(26,64),size,spacing:size*1.25,
      length:Math.floor(random(4,10)),glyphs:Array.from({length:10},character),opacity:random(.25,.59),next:random(0,1),age:0,life:random(7,14)};
  }
  function resize() {
    const r=scene.getBoundingClientRect(); width=r.width; height=r.height;
    if (!width || !height) return;
    ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    const count=width<700?13:24;
    streams=Array.from({length:count},(_,i)=>spawn(i<count*.8));
    refreshSamples();
  }
  function draw(time) {
    frame=0;
    if(!visible || document.hidden) return;
    const dt=previous?Math.min(.05,(time-previous)/1000):0;previous=time;
    if(!video.hidden && time-lastSample>280){refreshSamples();lastSample=time;}
    ctx.clearRect(0,0,width,height);ctx.textAlign='center';ctx.textBaseline='middle';
    streams.forEach((s,i)=>{
      s.y+=s.speed*dt;s.age+=dt;s.next-=dt;
      if(s.next<=0){s.glyphs.unshift(character());s.glyphs.pop();s.next=random(.17,.45);}
      const fade=Math.min(1,s.age*1.5,(s.life-s.age)*1.2);
      ctx.font=`${s.size}px "Nepali Rain", sans-serif`;
      for(let j=0;j<s.length;j++){
        const y=s.y-j*s.spacing;
        if(y<0||y>height) continue;
        const alpha=Math.max(0,fade)*(1-j/s.length)*s.opacity;
        if(alpha<.015) continue;
        ctx.fillStyle=darkAt(s.x,y)?`rgba(255,215,0,${alpha*.83})`:`rgba(45,43,35,${alpha*.51})`;
        ctx.fillText(s.glyphs[j],s.x,y);
      }
      if(s.y-s.spacing*s.length>height || s.age>s.life)streams[i]=spawn(Math.random()<.77,null,-random(20,height*.25));
    });
    frame=requestAnimationFrame(draw);
  }
  function start(){if(!frame&&visible&&!document.hidden){previous=0;frame=requestAnimationFrame(draw);}}
  function halt(){if(frame)cancelAnimationFrame(frame);frame=0;}
  const observer=new ResizeObserver(resize);observer.observe(scene);
  image.addEventListener('load',refreshSamples);
  document.fonts.load('12px "Nepali Rain"').then(start);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else halt();}).observe(scene);
  document.addEventListener('visibilitychange',()=>document.hidden?halt():start());
  let lastPointer=0;
  scene.closest('.hero').addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||performance.now()-lastPointer<320)return;
    const r=scene.getBoundingClientRect(),x=event.clientX-r.left,y=event.clientY-r.top;
    if(x<0||x>width||y<0||y>height)return;
    lastPointer=performance.now();
    streams.push(spawn(false,x+random(-22,22),y-random(10,65)));
    if(streams.length>32)streams.shift();
  },{passive:true});
  resize();start();
})();


}
