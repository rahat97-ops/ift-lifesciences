
const menu=document.querySelector('.menu'),links=document.querySelector('.links');
if(menu&&links)menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const form=document.querySelector('#contactForm');
if(form)form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('button[type=submit]');const status=form.querySelector('.form-status');btn.disabled=true;btn.textContent='Sending…';try{const data=Object.fromEntries(new FormData(form).entries());const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error('Unable to send');status.textContent='Thank you. Your enquiry has been submitted.';form.reset()}catch(err){status.textContent='The form could not be sent right now. Please email support@iftlifesciences.com or WhatsApp +91 7738004147.'}finally{btn.disabled=false;btn.textContent='Send enquiry'}});

// Subtle reveal-on-scroll motion; content remains visible if IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll('.section-head,.card,.split,.photo-panel,.banner-in');
  targets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
