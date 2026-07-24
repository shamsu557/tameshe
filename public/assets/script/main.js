/* =========================================================
   TAMESHE GLOBAL NIGERIA — MAIN
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Loading screen ---- */
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 300);
    });
    // Fallback in case load event already fired
    setTimeout(() => loader.classList.add('is-hidden'), 1800);
  }

  /* ---- Scroll progress bar ---- */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ---- Back to top ---- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Cookie banner ---- */
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    const KEY = 'tameshe_cookie_consent';
    if (!localStorageSafeGet(KEY)) {
      setTimeout(() => cookieBanner.classList.add('is-visible'), 1200);
    }
    cookieBanner.querySelectorAll('[data-cookie-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorageSafeSet(KEY, btn.dataset.cookieAction);
        cookieBanner.classList.remove('is-visible');
      });
    });
  }

  /* ---- Smooth scroll for on-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      item.parentElement.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Quick view modal ---- */
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    document.querySelectorAll('[data-quick-view]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const card = trigger.closest('.product-card');
        modalOverlay.querySelector('.modal__image img').src = card.querySelector('.product-card__media img').src;
        modalOverlay.querySelector('.modal__image img').alt = card.querySelector('.product-card__media img').alt;
        modalOverlay.querySelector('[data-modal-title]').textContent = card.querySelector('h3').textContent;
        modalOverlay.querySelector('[data-modal-desc]').textContent = card.querySelector('p').textContent;
        modalOverlay.querySelector('[data-modal-price]').textContent = card.querySelector('.product-card__price').textContent;
        modalOverlay.classList.add('is-open');
      });
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.closest('.modal__close')) {
        modalOverlay.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modalOverlay.classList.remove('is-open');
    });
  }

  /* ---- Wishlist toggle ---- */
  document.querySelectorAll('.product-card__wishlist').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-active');
      const pressed = btn.classList.contains('is-active');
      btn.setAttribute('aria-pressed', pressed);
    });
  });
});

/* Safe localStorage helpers (guarded for privacy modes) */
function localStorageSafeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function localStorageSafeSet(key, val) {
  try { localStorage.setItem(key, val); } catch (e) { /* no-op */ }
}
