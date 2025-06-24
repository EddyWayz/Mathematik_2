const fs = require('fs');
const path = require('path');
const build = require('./build');

const watchDirs = [
  path.join(__dirname, '..', 'chapters'),
  path.join(__dirname, '..', 'templates')
];

function runBuild() {
  console.log('Änderung erkannt – baue neu...');
  build();
  console.log('Fertig.');
}

watchDirs.forEach(dir => {
  fs.watch(dir, { recursive: true }, (evt, filename) => {
    if (filename && filename.endsWith('.html')) {
      runBuild();
    }
  });
});

console.log('Watcher läuft. Beende mit Strg+C.');
