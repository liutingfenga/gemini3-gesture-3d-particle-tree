// Service Worker for caching large assets
// 使用时间戳确保版本更新
const CACHE_VERSION = '20251215'; // 更新时修改此日期
const CACHE_NAME = `shengdan-cache-${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
    '/js/mediapipe/wasm/vision_wasm_internal.js',
    '/js/mediapipe/wasm/vision_wasm_internal.wasm',
    '/js/mediapipe/tasks-vision.js',
    '/assets/hand_landmarker.task',
    '/assets/shengdanbgm.mp3',
    '/assets/8vIJ7ww63mVu7gt79mT7.woff2'
];

// 安装时预缓存核心资源
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    // 立即激活新的 Service Worker
    self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 请求拦截 - 区分不同资源的缓存策略
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // HTML 文件使用 Network First 策略，确保能获取最新版本
    if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
        return;
    }
    
    // 只缓存同源请求和指定的大型资源
    const shouldCache = 
        url.pathname.includes('/js/mediapipe/') ||
        url.pathname.includes('/assets/hand_landmarker.task') ||
        url.pathname.includes('/assets/shengdanbgm.mp3') ||
        url.pathname.endsWith('.wasm') ||
        url.pathname.endsWith('.woff2');
    
    if (shouldCache) {
        // 大型资源使用 Stale While Revalidate 策略
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        // 后台更新缓存
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                    
                    // 返回缓存（如果有），同时后台更新
                    if (cachedResponse) {
                        console.log('[SW] Cache hit (updating in background):', url.pathname);
                        return cachedResponse;
                    }
                    
                    console.log('[SW] Cache miss, fetching:', url.pathname);
                    return fetchPromise;
                });
            })
        );
    }
});
