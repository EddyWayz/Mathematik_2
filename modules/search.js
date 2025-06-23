export default function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  const items = document.querySelectorAll('nav.toc li');
  const array = Array.from(items);
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    array.forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(q) ? '' : 'none';
    });
  });
}
