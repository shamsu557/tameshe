/* =========================================================
   TAMESHE GLOBAL NIGERIA — SCROLL ANIMATIONS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.setProperty('--i', i % 6);
      observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});
