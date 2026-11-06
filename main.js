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

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contactForm');

  if (!contactForm) {
    console.error('Contact form not found!');
    return;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Safely grab values by ID or fallback to input name attributes from your HTML
    const formData = {
      name: contactForm.querySelector('#name')?.value || contactForm.querySelector('[name="name"]')?.value || '',
      email: contactForm.querySelector('#email')?.value || contactForm.querySelector('[name="email"]')?.value || '',
      phone: contactForm.querySelector('#phone')?.value || contactForm.querySelector('[name="phone"]')?.value || '',
      subject: contactForm.querySelector('#subject')?.value || contactForm.querySelector('[name="subject"]')?.value || 'Product enquiry',
      message: contactForm.querySelector('#message')?.value || contactForm.querySelector('[name="message"]')?.value || ''
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        alert('Enquiry sent successfully!');
        contactForm.reset();
      } else {
        alert(result.error || 'Failed to send message.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });


