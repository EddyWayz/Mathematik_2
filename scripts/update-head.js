const fs = require('fs');
const path = require('path');

const fragmentPath = path.join(__dirname, '..', 'templates', 'head-fragment.html');
const chaptersDir = path.join(__dirname, '..', 'chapters');


function updateHtml(html, frag, stylePath) {
  const link = `<link rel="stylesheet" href="${stylePath}">`;
  const scriptIdIndex = html.indexOf('<script id="MathJax-script"');
  if (scriptIdIndex === -1) return html;
  const start = html.lastIndexOf('<script>', scriptIdIndex);
  const end = html.indexOf(link, scriptIdIndex);
  if (start === -1 || end === -1) return html;
  const after = end + link.length;
  return html.slice(0, start) + frag + html.slice(after);
}

function setOgTitle(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) return html;
  const title = titleMatch[1];
  return html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
}

function updateAll() {
  const fragment = fs.readFileSync(fragmentPath, 'utf8').trim();

  for (const file of fs.readdirSync(chaptersDir)) {
    if (!file.endsWith('.html')) continue;
    const filePath = path.join(chaptersDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    let updated = updateHtml(html, fragment, '../style.css');
    updated = setOgTitle(updated);
    fs.writeFileSync(filePath, updated);
  }

  const indexPath = path.join(__dirname, '..', 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const rootFragment = fragment
    .replace('../style.css', 'style.css')
    .replace(/\.\.\/images\//g, 'images/');
  let updatedIndex = updateHtml(indexHtml, rootFragment, 'style.css');
  updatedIndex = setOgTitle(updatedIndex);
  fs.writeFileSync(indexPath, updatedIndex);
}

if (require.main === module) {
  updateAll();
}

module.exports = updateAll;
