import initSearch from '../modules/search.js';

describe('Search Functionality', () => {
  let input;
  let tocList;
  let listItems;

  beforeEach(() => {
    // Set up the DOM elements needed for the search function
    document.body.innerHTML = `
      <input id="search-input" />
      <nav class="toc">
        <ul>
          <li><a href="chapters/01-zaehlprinzipien.html">1 Grundlegende Zählprinzipien</a></li>
          <li><a href="chapters/02-kombinationen.html">2 Variationen und Kombinationen</a></li>
          <li><a href="chapters/03-folgen-einfuehrung.html">3 Einführung in Zahlenfolgen</a></li>
        </ul>
      </nav>
    `;

    input = document.getElementById('search-input');
    tocList = document.querySelector('nav.toc ul');
    listItems = Array.from(tocList.children);

    // Mock the fetch request for the search index
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              title: '1 Grundlegende Zählprinzipien',
              content: 'Summenregel, Produktregel',
              url: 'chapters/01-zaehlprinzipien.html',
            },
            {
              title: '2 Variationen und Kombinationen',
              content: 'Auswahlmodelle',
              url: 'chapters/02-kombinationen.html',
            },
            {
              title: '3 Einführung in Zahlenfolgen',
              content: 'Definitionen und Eigenschaften',
              url: 'chapters/03-folgen-einfuehrung.html',
            },
          ]),
      })
    );

    initSearch();
  });

  test('should filter the list based on title', async () => {
    input.value = 'kombinationen';
    input.dispatchEvent(new Event('input'));

    // Wait for the asynchronous search to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(listItems[0].style.display).toBe('none');
    expect(listItems[1].style.display).toBe('');
    expect(listItems[2].style.display).toBe('none');
  });

  test('should filter the list based on content', async () => {
    input.value = 'summenregel';
    input.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(listItems[0].style.display).toBe('');
    expect(listItems[1].style.display).toBe('none');
    expect(listItems[2].style.display).toBe('none');
  });

  test('should be case-insensitive', async () => {
    input.value = 'KOMBINATIONEN';
    input.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(listItems[0].style.display).toBe('none');
    expect(listItems[1].style.display).toBe('');
    expect(listItems[2].style.display).toBe('none');
  });

  test('should show all items when the input is empty', async () => {
    input.value = 'kombinationen';
    input.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 0));

    input.value = '';
    input.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(listItems[0].style.display).toBe('');
    expect(listItems[1].style.display).toBe('');
    expect(listItems[2].style.display).toBe('');
  });

  test('should show a "not found" message when there are no results', async () => {
    input.value = 'nonexistent';
    input.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 0));

    const notFoundMessage = tocList.querySelector('li:last-child');
    expect(notFoundMessage.textContent).toBe('Keine Ergebnisse gefunden.');
    expect(notFoundMessage.style.display).toBe('');
  });
});
