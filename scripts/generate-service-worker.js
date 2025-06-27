const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './css/dark-mode.css',
  './images/favicon.svg',
  './images/placeholder.svg',
];

// Dynamically add all HTML chapter files
const chapterFiles = glob.sync('chapters/**/*.html', { cwd: path.join(__dirname, '..') });
chapterFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        ASSETS_TO_CACHE.push(`./${file}`);
    }
});

// Generate a unique cache name based on current timestamp
const CACHE_NAME = `mathe-cache-v${Date.now()}`;

const serviceWorkerContent = `
const CACHE_NAME = '${CACHE_NAME}';
const ASSETS = [
${ASSETS_TO_CACHE.map(asset => `  '${asset}',`).join('\n')}
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) return resp;
      return fetch(event.request)
        .then((networkResp) => {
          if (event.request.method === 'GET' && networkResp.ok) {
            const clone = networkResp.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clone));
          }
          return networkResp;
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'service-worker.js'), serviceWorkerContent);
console.log('service-worker.js generated successfully!');
