/* =========================================================
   TAMESHE GLOBAL NIGERIA — NEWSLETTER
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.newsletter form').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const success = form.parentElement.querySelector('.newsletter__success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (!valid) {
        input.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.4)';
        input.focus();
        setTimeout(() => { input.style.boxShadow = ''; }, 1500);
        return;
      }
      if (success) {
        success.textContent = `Thank you! ${input.value.trim()} has been subscribed to TAMESHE updates.`;
        success.classList.add('is-visible');
      }
      form.reset();
    });
  });
});
