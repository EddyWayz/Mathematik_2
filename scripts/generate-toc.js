const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const chaptersDir = path.join(__dirname, '..', 'chapters');
const indexPath = path.join(__dirname, '..', 'index.html');

/**
 * Generates a URL-friendly ID from a given text.
 * @param {string} text - The input text.
 * @returns {string} The generated ID.
 */
function generateId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}

/**
 * Processes a chapter HTML file to ensure headings have IDs and extracts heading data.
 * @param {string} filePath - The absolute path to the chapter file.
 * @returns {Array<Object>} An array of heading objects { level, text, id }.
 */
function processChapterFile(filePath) {
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;
  const headings = [];

  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    let id = heading.id;
    if (!id) {
      id = generateId(heading.textContent);
      heading.id = id;
    }
    headings.push({
      level: parseInt(heading.tagName.substring(1), 10),
      text: heading.textContent.trim(),
      id: id,
    });
  });

  // Write back the modified HTML with new IDs
  fs.writeFileSync(filePath, dom.serialize());
  return headings;
}



/**
 * Main function to build the Table of Contents.
 */
function buildToc() {
  const chapterFiles = fs
    .readdirSync(chaptersDir)
    .filter((f) => f.endsWith('.html'))
    .sort();

  let allHeadings = [];
  chapterFiles.forEach((file) => {
    const filePath = path.join(chaptersDir, file);
    const chapterHeadings = processChapterFile(filePath);
    // Add chapter file path to each heading for linking
    chapterHeadings.forEach(h => h.filePath = filePath);
    allHeadings = allHeadings.concat(chapterHeadings);
  });

  // Group headings by chapter for the main TOC structure
  const groupedHeadings = {};
  allHeadings.forEach(heading => {
    const chapterFileName = path.basename(heading.filePath);
    if (!groupedHeadings[chapterFileName]) {
      groupedHeadings[chapterFileName] = [];
    }
    groupedHeadings[chapterFileName].push(heading);
  });

  let tocItemsHtml = '';
  for (const chapterFileName of Object.keys(groupedHeadings).sort()) {
    const chapterTitle = groupedHeadings[chapterFileName][0].text; // Assuming h1 is the first heading
    const chapterLink = `chapters/${chapterFileName}#${groupedHeadings[chapterFileName][0].id}`;
    tocItemsHtml += `<li><a href="${chapterLink}">${chapterTitle}</a>`;

    // Build sub-list for sections within the chapter
    if (groupedHeadings[chapterFileName].length > 1) {
      tocItemsHtml += '<ul>';
      for (let i = 1; i < groupedHeadings[chapterFileName].length; i++) {
        const section = groupedHeadings[chapterFileName][i];
        const sectionLink = `chapters/${chapterFileName}#${section.id}`;
        tocItemsHtml += `<li><a href="${sectionLink}">${section.text}</a></li>`;
      }
      tocItemsHtml += '</ul>';
    }
    tocItemsHtml += '</li>';
  }

  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml.replace(
    /<nav class="toc">[\s\S]*?<\/nav>/,
    (match) => {
      return match.replace(
        /<ul>[\s\S]*?<\/ul>/m,
        `<ul>\n${tocItemsHtml}\n            <\/ul>`
      );
    }
  );

  fs.writeFileSync(indexPath, indexHtml);
}

if (require.main === module) {
  buildToc();
}

module.exports = buildToc;