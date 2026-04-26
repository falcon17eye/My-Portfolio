/* ============================================
   CONTACT.JS — Form validation & submission
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Submit via Formspree
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        showStatus('Something went wrong. Please try again or email me directly.', 'error');
      }
    } catch (error) {
      showStatus('Network error. Please check your connection and try again.', 'error');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = 'contact__form-status';
    statusEl.classList.add(`contact__form-status--${type}`);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      statusEl.style.display = 'none';
      statusEl.className = 'contact__form-status';
    }, 5000);
  }

});
