// Simple Service Worker for PWA-readiness
const CACHE_NAME = 'mohith-portfolio-v1';
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
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
