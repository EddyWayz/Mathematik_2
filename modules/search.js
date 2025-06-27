/**
 * Initializes the search functionality for table of contents items.
 * It filters the displayed items based on user input, searching within
 * both the item's title and the content of the linked chapter.
 */
export default function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const tocList = document.querySelector('nav.toc ul');
  if (!tocList) return;

  const originalItems = Array.from(tocList.children);
  let searchIndex = [];

  // Create a "not found" message element
  const notFoundMessage = document.createElement('li');
  notFoundMessage.textContent = 'Keine Ergebnisse gefunden.';
  notFoundMessage.style.display = 'none';
  tocList.appendChild(notFoundMessage);

  // Fetch the pre-built search index
  fetch('search-index.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      searchIndex = data;
      // Create a map of URLs to list items for efficient lookup
      const urlToLiMap = new Map();
      originalItems.forEach(li => {
        const a = li.querySelector('a');
        if (a) {
          // Normalize the href to match the search index URL format
          const key = a.getAttribute('href').replace(/^\.\//, '');
          urlToLiMap.set(key, li);
        }
      });

      // Attach the correct DOM element to each search item
      searchIndex.forEach(item => {
        item.li = urlToLiMap.get(item.url);
      });
    })
    .catch(error => console.error('Error loading or processing search index:', error));

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let hasResults = false;

    // If the input is empty, show all original items
    if (q === '') {
      originalItems.forEach(li => {
        li.style.display = '';
      });
      notFoundMessage.style.display = 'none';
      return;
    }

    searchIndex.forEach(({ li, title, content }) => {
      if (li) {
        const isMatch =
          title.toLowerCase().includes(q) || content.toLowerCase().includes(q);
        li.style.display = isMatch ? '' : 'none';
        if (isMatch) {
          hasResults = true;
        }
      }
    });

    // Show or hide the "not found" message
    notFoundMessage.style.display = hasResults ? 'none' : '';
  });
}