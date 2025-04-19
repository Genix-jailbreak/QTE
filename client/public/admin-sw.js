const CACHE_NAME = 'qte-admin-v1';
const urlsToCache = [
  '/admin/',
  '/admin/index.html',
  '/admin/static/css/main.css',
  '/admin/static/js/main.js',
  '/logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});