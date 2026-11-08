(function(){
  var d=document,w=window,reduce=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.add('js');

  /* nav */
  var nav=d.getElementById('nav'),links=d.getElementById('links'),burger=d.getElementById('burger');
  function st(){nav.classList.toggle('is-stuck',w.scrollY>8)}st();w.addEventListener('scroll',st,{passive:true});
  burger.addEventListener('click',function(){var o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')});
  links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
  d.getElementById('yr').textContent=new Date().getFullYear();

  /* scroll reveal */
  var rv=d.querySelectorAll('.rv');
  if('IntersectionObserver' in w&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    rv.forEach(function(el,i){el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
  }else rv.forEach(function(el){el.classList.add('in')});

  /* typed slogans */
  var t=d.getElementById('typed'),lines=['Your Idea. Our Code. Your Empire.','Fast. Secure. Built to Scale.','Code That Converts.','Negotiation allowed. Just talk with us.','Ready to dominate your market?'];
  if(!reduce){var li=0,ci=0,del=false;(function tick(){var s=lines[li];t.textContent=s.slice(0,ci);
    if(!del&&ci<s.length){ci++;setTimeout(tick,55)}
    else if(!del){del=true;setTimeout(tick,1700)}
    else if(ci>0){ci--;setTimeout(tick,26)}
    else{del=false;li=(li+1)%lines.length;setTimeout(tick,350)}})();}

  /* animated network background */
  var cv=d.getElementById('bg'),cx=cv.getContext('2d'),P=[],W,H,dpr,mx=-999,my=-999,run=true;
  function size(){dpr=Math.min(w.devicePixelRatio||1,2);W=w.innerWidth;H=w.innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.round(Math.min(90,Math.max(28,W*H/17000)));P=[];
    for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.6,g:Math.random()<.22})}
  function draw(){
    if(!run)return;cx.clearRect(0,0,W,H);var L=Math.min(150,W/6);
    for(var i=0;i<P.length;i++){var a=P[i];
      if(!reduce){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
        var dx=a.x-mx,dy=a.y-my,dd=dx*dx+dy*dy;if(dd<14400){var f=(1-Math.sqrt(dd)/120)*.6;a.x+=dx*f*.04;a.y+=dy*f*.04}}
      cx.beginPath();cx.arc(a.x,a.y,a.r,0,6.283);cx.fillStyle=a.g?'rgba(212,175,55,.85)':'rgba(140,175,235,.7)';cx.fill();
      for(var j=i+1;j<P.length;j++){var b=P[j],x=a.x-b.x,y=a.y-b.y,q=x*x+y*y;
        if(q<L*L){var o=(1-Math.sqrt(q)/L)*.32;cx.strokeStyle=(a.g||b.g)?'rgba(212,175,55,'+o+')':'rgba(130,165,230,'+o+')';cx.lineWidth=.8;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}}
    if(!reduce)requestAnimationFrame(draw)}
  size();draw();
  var rt;w.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){size();if(reduce)draw()},150)});
  w.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY},{passive:true});
  w.addEventListener('pointerleave',function(){mx=my=-999});
  d.addEventListener('visibilitychange',function(){run=!d.hidden;if(run&&!reduce)requestAnimationFrame(draw)});
})();
