const fs = require('fs');
const path = require('path');

const fragment = fs
  .readFileSync(path.join(__dirname, '..', 'templates', 'head-fragment.html'), 'utf8')
  .trim();
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

for (const file of fs.readdirSync(chaptersDir)) {
  if (!file.endsWith('.html')) continue;
  const filePath = path.join(chaptersDir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const updated = updateHtml(html, fragment, '../style.css');
  fs.writeFileSync(filePath, updated);
}

// also update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const rootFragment = fragment
  .replace('../style.css', 'style.css')
  .replace(/\.\.\/images\//g, 'images/');
const updatedIndex = updateHtml(indexHtml, rootFragment, 'style.css');
fs.writeFileSync(indexPath, updatedIndex);
