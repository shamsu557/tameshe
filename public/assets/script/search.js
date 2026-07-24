/* =========================================================
   TAMESHE GLOBAL NIGERIA — SITE SEARCH
   ========================================================= */
const TAMESHE_SEARCH_INDEX = [
  { title: 'Ankara Fabrics', type: 'Product', url: 'products.html#ankara' },
  { title: 'Lace Materials', type: 'Product', url: 'products.html#lace' },
  { title: 'Guinea Brocade', type: 'Product', url: 'products.html#brocade' },
  { title: 'Atampa Fabrics', type: 'Product', url: 'products.html#atampa' },
  { title: 'Silk Materials', type: 'Product', url: 'products.html#silk' },
  { title: 'Cotton Fabrics', type: 'Product', url: 'products.html#cotton' },
  { title: 'Wedding & Bridal Fabrics', type: 'Product', url: 'products.html#wedding' },
  { title: 'Retail Sales', type: 'Service', url: 'services.html#retail' },
  { title: 'Wholesale Supply', type: 'Service', url: 'services.html#wholesale' },
  { title: 'Fabric Consultation', type: 'Service', url: 'services.html#consultation' },
  { title: 'Bulk & Corporate Orders', type: 'Service', url: 'services.html#bulk' },
  { title: 'About TAMESHE Global Nigeria', type: 'Page', url: 'about.html' },
  { title: 'Our Team', type: 'Page', url: 'team.html' },
  { title: 'Gallery', type: 'Page', url: 'gallery.html' },
  { title: 'Contact Us', type: 'Page', url: 'contact.html' },
];

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.navbar__search input');
  const resultsBox = document.querySelector('.navbar__search-results');
  if (!input || !resultsBox) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    resultsBox.innerHTML = '';
    if (q.length < 2) return;

    const matches = TAMESHE_SEARCH_INDEX.filter((item) => item.title.toLowerCase().includes(q));
    if (!matches.length) {
      resultsBox.innerHTML = '<p>No results found. Try “Ankara” or “Lace”.</p>';
      return;
    }
    matches.slice(0, 6).forEach((item) => {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = `${item.title} — ${item.type}`;
      resultsBox.appendChild(a);
    });
  });

  document.querySelector('.navbar__search form').addEventListener('submit', (e) => {
    e.preventDefault();
    const first = resultsBox.querySelector('a');
    if (first) window.location.href = first.href;
  });
});
