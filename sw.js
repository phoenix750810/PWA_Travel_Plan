const CACHE_NAME = 'my-trips'; 

// 2. 這裡的檔名必須跟 HTML 檔名完全一樣 (travel_skd.html)
const urlsToCache = [
  './travel_skd.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
