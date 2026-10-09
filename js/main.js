// theme
(function(){
  var r=document.documentElement,k='theme';
  try{var s=localStorage.getItem(k);if(s)r.setAttribute('data-theme',s)}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var dark=r.getAttribute('data-theme')?r.getAttribute('data-theme')==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    var n=dark?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem(k,n)}catch(e){}
  });
})();
// project accordions
document.querySelectorAll('.proj>button').forEach(function(b){
  b.addEventListener('click',function(){
    var p=b.parentElement,o=p.getAttribute('data-open')==='true';
    p.setAttribute('data-open',String(!o));b.setAttribute('aria-expanded',String(!o));
  });
});
document.querySelector('.proj>button').click();
// links come from js/links.js; empty ones stay hidden so there are no dead links
document.querySelectorAll('a[data-link]').forEach(function(a){
  var u=(window.LINKS||{})[a.getAttribute('data-link')];
  if(u){a.href=u;if(/^https?:/.test(u)){a.target='_blank';a.rel='noopener noreferrer'}}
  else a.hidden=true;
});
// knowledge-graph hero
(function(){
  var c=document.getElementById('graph'),x=c.getContext('2d'),W,H,N=[],m={x:-999,y:-999},
  still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function size(){var d=devicePixelRatio||1,r=c.getBoundingClientRect();W=r.width;H=r.height;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);
    var n=Math.round(Math.min(70,W*H/16000));N=[];for(var i=0;i<n;i++)N.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:1.6+Math.random()*2.4})}
  function col(){return getComputedStyle(document.documentElement).getPropertyValue('--node').trim()||'#7a5cf0'}
  function draw(){
    x.clearRect(0,0,W,H);var cl=col(),L=130;
    for(var i=0;i<N.length;i++){var a=N[i];
      if(!still){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1}
      var dm=Math.hypot(a.x-m.x,a.y-m.y);
      for(var j=i+1;j<N.length;j++){var b=N[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<L){x.globalAlpha=(1-d/L)*.35;x.strokeStyle=cl;x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
      if(dm<170){x.globalAlpha=(1-dm/170)*.7;x.strokeStyle=cl;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(m.x,m.y);x.stroke()}
      x.globalAlpha=dm<170?.95:.5;x.fillStyle=cl;x.beginPath();x.arc(a.x,a.y,dm<170?a.r+1.5:a.r,0,6.283);x.fill()}
    x.globalAlpha=1;if(!still)requestAnimationFrame(draw)}
  size();draw();
  addEventListener('resize',function(){size();if(still)draw()});
  c.parentElement.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top;if(still)draw()});
  c.parentElement.addEventListener('pointerleave',function(){m.x=m.y=-999});
})();
