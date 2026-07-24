/* =========================================================
   TAMESHE GLOBAL NIGERIA — GALLERY & LIGHTBOX
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.gallery-grid');
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const lightbox = document.querySelector('.lightbox');

  if (filterBtns.length && grid) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        grid.querySelectorAll('figure').forEach((fig) => {
          const show = filter === 'all' || fig.dataset.category === filter;
          fig.style.display = show ? '' : 'none';
        });
      });
    });
  }

  if (grid && lightbox) {
    const figures = Array.from(grid.querySelectorAll('figure'));
    const lightboxImg = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox__caption');
    let current = 0;

    function open(i) {
      current = i;
      update();
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function update() {
      const fig = figures[current];
      const img = fig.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      caption.textContent = fig.dataset.caption || img.alt;
    }
    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function next() { current = (current + 1) % figures.length; update(); }
    function prev() { current = (current - 1 + figures.length) % figures.length; update(); }

    figures.forEach((fig, i) => fig.addEventListener('click', () => open(i)));
    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    lightbox.querySelector('.lightbox__next').addEventListener('click', next);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prev);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }
});
