const CACHE_NAME = 'my-trips'; 

// 這裡必須跟實際檔名完全一樣
const urlsToCache = [
  './',             // 代表根目錄 (index.html)
  './index.html',   // 明確指定 index.html
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
