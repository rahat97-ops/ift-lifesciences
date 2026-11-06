
const menu=document.querySelector('.menu'),links=document.querySelector('.links');
if(menu&&links)menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const form=document.querySelector('#contactForm');
if(form)form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('button[type=submit]');const status=form.querySelector('.form-status');btn.disabled=true;btn.textContent='Sending…';try{const data=Object.fromEntries(new FormData(form).entries());const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error('Unable to send');status.textContent='THANK YOU. YOUR INQUIRY HAS BEEN SUBMITTED SUCCESSFULLY.';form.reset()}catch(err){status.textContent='The form could not be sent right now. Please email support@iftlifesciences.com or WhatsApp +91 7738004147.'}finally{btn.disabled=false;btn.textContent='Send enquiry'}});

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
document.addEventListener("DOMContentLoaded", function() {
  // 1. Create the floating warning tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "copy-warning-tooltip";
  tooltip.innerText = "Content protection: Copying or right-clicking is disabled.";
  document.body.appendChild(tooltip);

  // 2. Inject basic styles for the popup cursor message
  const style = document.createElement("style");
  style.innerHTML = `
    .copy-warning-tooltip {
      position: fixed;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 6px 12px;
      font-size: 12px;
      font-family: sans-serif;
      border-radius: 4px;
      pointer-events: none;
      display: none;
      z-index: 999999;
      white-space: nowrap;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);

  // Helper function to check if target is inside form, allowed copy items, or the left contact box
  function isAllowedTarget(target) {
    return (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable ||
      target.closest("form") !== null ||
      target.closest(".card") !== null ||
      target.closest(".card-body") !== null ||
      target.closest(".contact-info") !== null ||
      target.closest(".allow-copy") !== null
    );
  }

  // 3. Function to handle warning display near cursor
  function showWarning(e) {
    if (isAllowedTarget(e.target)) {
      return;
    }

    e.preventDefault();
    tooltip.style.left = (e.clientX + 15) + "px";
    tooltip.style.top = (e.clientY + 15) + "px";
    tooltip.style.display = "block";

    clearTimeout(tooltip.timer);
    tooltip.timer = setTimeout(() => {
      tooltip.style.display = "none";
    }, 2000);
  }

  // 4. Attach protection listeners
  document.addEventListener("contextmenu", showWarning);
  document.addEventListener("copy", showWarning);
  document.addEventListener("cut", showWarning);
});



