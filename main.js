(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.textContent = open ? '×' : '☰';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰';
    }));
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => {const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    document.querySelectorAll('[data-product-category]').forEach(card => card.classList.toggle('hidden', !(filter==='all'||card.dataset.productCategory===filter)));
  }));
  const year=document.querySelector('[data-year]'); if(year) year.textContent=new Date().getFullYear();

  const form=document.querySelector('#contact-form');
  if(form){
    const params=new URLSearchParams(window.location.search);
    const productField=form.querySelector('[name="product"]');
    const topicField=form.querySelector('[name="topic"]');
    if(productField && params.has('product')) productField.value=params.get('product');
    if(topicField && params.has('topic')) {
      const wanted=params.get('topic').toLowerCase();
      [...topicField.options].forEach(option=>{if(option.text.toLowerCase()===wanted) topicField.value=option.value;});
    }
  }
  if(form){
    const status=document.querySelector('#form-status');
    form.addEventListener('submit', async event=>{
      event.preventDefault();
      if(!form.reportValidity()) return;
      const submit=form.querySelector('[type=submit]');
      submit.disabled=true; const original=submit.textContent; submit.textContent='Sending…';
      status.className='form-status'; status.textContent='Sending your enquiry securely…';
      const data=Object.fromEntries(new FormData(form).entries());
      try {
        const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        const result=await response.json().catch(()=>({}));
        if(!response.ok) throw new Error(result.error || 'The message could not be sent. Please use the email or phone details shown on this page.');
        status.className='form-status success';status.textContent='Thank you. Your enquiry has been sent successfully.';form.reset();
      } catch(error) {
        status.className='form-status error';
        status.textContent=error.message || 'Unable to send right now. Please contact us using the details listed on this page.';
      } finally {submit.disabled=false;submit.textContent=original;}
    });
  }
})();
