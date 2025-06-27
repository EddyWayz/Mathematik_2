
const CACHE_NAME = 'mathe-cache-v1751061458272';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/css/dark-mode.css',
  '/images/favicon.svg',
  '/images/placeholder.svg',
  '/chapters/01-zaehlprinzipien.html',
  '/chapters/02-kombinationen.html',
  '/chapters/03-folgen-einfuehrung.html',
  '/chapters/04-grenzwerte.html',
  '/chapters/05-ableitung-einfuehrung.html',
  '/chapters/06-ableitungsregeln.html',
  '/chapters/07-partielle-ableitungen.html',
  '/chapters/08-extremwerte-mehrere-var.html',
  '/chapters/09-anwendungen-diff.html',
  '/chapters/10-integralrechnung.html',
  '/chapters/11-unendliche-reihen.html',
  '/chapters/12-taylorreihen.html',
  '/chapters/13-fourierreihen.html',
  '/chapters/14-dgl.html',
  '/chapters/15-klausurvorbereitung.html',
  '/chapters/gallery.html',
  '/chapters/test.html',
  '/chapters/training/02-uebungen-kombinationen-loesungen.html',
  '/chapters/training/03-uebungen-folgen-einfuehrung-loesungen.html',
  '/chapters/training/04-uebungen-grenzwerte-loesungen.html',
  '/chapters/training/05-uebungen-ableitung-einfuehrung-loesungen.html',
  '/chapters/training/06-uebungen-ableitungsregeln-loesungen.html',
  '/chapters/training/07-uebungen-mehrdimensionale-differentialrechnung-loesungen.html',
  '/chapters/training/08-uebungen-extremwerte-loesungen.html',
  '/chapters/training/09-uebungen-integralrechnung-loesungen.html',
  '/chapters/training/10-uebungen-integrationstechniken-loesungen.html',
  '/chapters/training/11-uebungen-taylorreihe-loesungen.html',
  '/chapters/training/12-uebungen-fourierreihen-loesungen.html',
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
