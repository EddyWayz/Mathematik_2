const fs = require('fs');
const path = require('path');

const materialDir = path.join(__dirname, '..', 'material');
const searchDirs = [path.join(__dirname, '..', 'chapters'), path.join(__dirname, '..')];

function getPdfFiles() {
  return fs.readdirSync(materialDir).filter(f => f.toLowerCase().endsWith('.pdf'));
}

function fileContains(file, text) {
  return fs.readFileSync(file, 'utf8').includes(text);
}

function check() {
  const pdfs = getPdfFiles();
  const htmlFiles = [];
  for (const dir of searchDirs) {
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.html')) htmlFiles.push(path.join(dir, file));
    }
  }

  let ok = true;
  for (const pdf of pdfs) {
    const link = encodeURIComponent(pdf);
    const found = htmlFiles.some(f => fileContains(f, pdf) || fileContains(f, link));
    if (!found) {
      console.log(`Fehlender Link: ${pdf}`);
      ok = false;
    }
  }
  if (ok) {
    console.log('Alle PDFs sind verlinkt.');
  }
}

if (require.main === module) {
  check();
}

module.exports = check;
