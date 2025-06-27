const fs = require('fs');
const path = require('path');
const build = require('./build');
const browserSync = require('browser-sync').create();

const watchDirs = [
  path.join(__dirname, '..', 'chapters'),
  path.join(__dirname, '..', 'templates'),
  path.join(__dirname, '..', 'style.css'),
  path.join(__dirname, '..', 'main.js'),
  path.join(__dirname, '..', 'modules'),
];

function runBuild() {
  console.log('Änderung erkannt – baue neu...');
  build();
  console.log('Fertig.');
  browserSync.reload();
}

// Initialize BrowserSync
browserSync.init({
  server: {
    baseDir: './',
    index: 'index.html',
  },
  startPath: '/index.html',
  files: [
    'index.html',
    'chapters/**/*.html',
    'style.css',
    'main.js',
    'modules/**/*.js',
  ],
  ignore: ['node_modules'],
  port: 3000,
  ui: { port: 3001 },
});

watchDirs.forEach((dir) => {
  fs.watch(dir, { recursive: true }, (evt, filename) => {
    if (filename) {
      runBuild();
    }
  });
});

console.log('Watcher läuft. Beende mit Strg+C.');