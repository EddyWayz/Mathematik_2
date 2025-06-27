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

  let searchIndex = [];

  // Fetch the pre-built search index
  fetch('/search-index.json')
    .then(response => response.json())
    .then(data => {
      searchIndex = data;
      // Map the search index to include the corresponding list item (li)
      // This assumes the order of items in search-index.json matches the order in the TOC
      const listItems = Array.from(tocList.children);
      searchIndex = searchIndex.map((item, index) => ({
        ...item,
        li: listItems[index] // Attach the actual DOM element
      }));
    })
    .catch(error => console.error('Error loading search index:', error));

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    searchIndex.forEach(({ li, title, content }) => {
      if (li) { // Ensure li exists before trying to access its style
        li.style.display = title.includes(q) || content.includes(q) ? '' : 'none';
      }
    });
  });
}