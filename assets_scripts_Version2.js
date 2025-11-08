// reveal-on-scroll
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)) {
    reveals.forEach(r=>r.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r=>io.observe(r));
})();

// tilt effect for .project (lightweight & accessible)
(function(){
  const projects = document.querySelectorAll('.project');
  projects.forEach(p=>{
    let rect = null;
    p.addEventListener('pointermove', (ev)=>{
      rect = rect || p.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 18;
      const py = (y / rect.height - 0.5) * 10;
      p.style.transform = `translateY(-8px) scale(1.02) perspective(600px) rotateX(${ -py }deg) rotateY(${ px }deg)`;
    });
    p.addEventListener('pointerleave', ()=>{
      p.style.transform = '';
      rect = null;
    });
    p.addEventListener('focus', ()=> p.style.transform = 'translateY(-8px) scale(1.02)');
    p.addEventListener('blur', ()=> p.style.transform = '');
  });
})();

// smooth scroll for internal links
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length>1 && document.querySelector(id)){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth', block:'center'});
      }
    });
  });
})();