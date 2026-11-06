const contactForm = document.querySelector('#contactform');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const formData = {
      name: contactForm.querySelector('#name')?.value || '',
      email: contactForm.querySelector('#email')?.value || '',
      phone: contactForm.querySelector('#phone')?.value || '',
      subject: contactForm.querySelector('#subject')?.value || '',
      message: contactForm.querySelector('#message')?.value || ''
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
}
