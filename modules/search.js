export default function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  const items = document.querySelectorAll('nav.toc li');
  const data = Array.from(items).map(li => {
    const link = li.querySelector('a');
    return { li, link, title: li.textContent.toLowerCase(), content: '' };
  });

  // Kapiteltexte laden
  data.forEach(item => {
    if (!item.link) return;
    fetch(item.link.getAttribute('href'))
      .then(r => r.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        item.content = doc.body.textContent.toLowerCase();
      })
      .catch(() => {});
  });

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    data.forEach(({ li, title, content }) => {
      li.style.display = title.includes(q) || content.includes(q) ? '' : 'none';
    });
  });
}
