const fs = require('fs');
const path = require('path');

const fragment = fs.readFileSync(path.join(__dirname, '..', 'templates', 'head-fragment.html'), 'utf8').trim();
const chaptersDir = path.join(__dirname, '..', 'chapters');

for (const file of fs.readdirSync(chaptersDir)) {
  if (!file.endsWith('.html')) continue;
  const filePath = path.join(chaptersDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/<script id="MathJax-script"[\s\S]*?<link rel="stylesheet" href="\.\.\/style.css">/, fragment);
  fs.writeFileSync(filePath, html);
}
