/* =========================================================
   TAMESHE GLOBAL NIGERIA — PRODUCT FILTERING
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.querySelector('.product-filters');
  const productGrid = document.querySelector('[data-product-grid]');
  if (!filterBar || !productGrid) return;

  const cards = Array.from(productGrid.querySelectorAll('.product-card'));
  const emptyState = document.querySelector('[data-products-empty]');

  filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilter(btn.dataset.filter);
    });
  });

  function applyFilter(filter) {
    let visible = 0;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (emptyState) emptyState.style.display = visible ? 'none' : 'block';
  }
});
