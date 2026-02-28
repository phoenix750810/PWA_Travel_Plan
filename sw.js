// 每次修改這裡的版本號 (例如 v1 -> v2)，手機就會自動更新 APP
const CACHE_NAME = 'my-trips-v4'; 

// 這裡的檔名必須跟 HTML 檔名完全一樣
const urlsToCache = [
  './index.html', 
  './manifest.json',
  './icon.png'
];

// 1. 安裝 (Install) - 下載並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // 強制讓新的 Service Worker 立刻接管，不用等待下次
  self.skipWaiting();
});

// 2. 啟用 (Activate) - 清除舊版本的快取 (這是新增的關鍵部分!)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 如果快取名稱跟現在的不一樣 (例如舊的是 my-trips)，就刪掉它
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 讓新的 Service Worker 立刻控制所有頁面
  return self.clients.claim();
});

// 3. 攔截請求 (Fetch) - 有快取讀快取，沒快取上網抓
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
