const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, '..', 'chapters');
const indexPath = path.join(__dirname, '..', 'index.html');

function getTitle(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const match = html.match(/<h2[^>]*>([^<]+)/i);
  return match ? match[1].trim() : path.basename(filePath);
}

function buildToc() {
  const files = fs
    .readdirSync(chaptersDir)
    .filter((f) => f.endsWith('.html'))
    .sort();

  const items = files
    .map((f) => {
      const title = getTitle(path.join(chaptersDir, f));
      return `                <li><a href="chapters/${f}">${title}</a></li>`;
    })
    .join('\n');

  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml.replace(
    /<nav class="toc">[\s\S]*?<\/nav>/m,
    (match) => {
      return match.replace(
        /<ul>[\s\S]*?<\/ul>/m,
        `<ul>\n${items}\n            </ul>`
      );
    }
  );

  fs.writeFileSync(indexPath, indexHtml);
}

if (require.main === module) {
  buildToc();
}

module.exports = buildToc;
