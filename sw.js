// Simple Service Worker for PWA-readiness
const CACHE_NAME = 'mohith-portfolio-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './profile.png',
    './project1.png',
    './project2.png',
    './project3.png'
];

self.addEventListener('install', (event) => {
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Delete all caches that aren't the current one.
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Fall back to network if not in cache
            return response || fetch(event.request);
        })
    );
});
