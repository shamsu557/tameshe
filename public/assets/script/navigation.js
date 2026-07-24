/* =========================================================
   TAMESHE GLOBAL NIGERIA — NAVIGATION
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  const searchToggle = document.querySelector('.navbar__search-toggle');
  const searchPanel = document.querySelector('.navbar__search');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
      const isOpen = searchPanel.classList.toggle('is-open');
      searchToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        const input = searchPanel.querySelector('input');
        if (input) input.focus();
      }
    });
  }
});
