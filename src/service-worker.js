/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// Import necessary Workbox modules
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  precacheAndRoute,
  createHandlerBoundToURL,
  cleanupOutdatedCaches,
} from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Take control immediately
self.skipWaiting();
clientsClaim();

// Clean up old caches
cleanupOutdatedCaches();

// Precache all of the assets generated by your build process
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(({ request, url }) => {
  if (request.mode !== 'navigate') {
    return false;
  }
  if (url.pathname.startsWith('/_')) {
    return false;
  }
  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }
  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'));

// Runtime caching for images with network-first strategy
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
        purgeOnQuotaError: true, // Automatically cleanup if storage is low
      }),
    ],
  })
);

// Force update check every time the page loads
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Perform install steps, like caching static assets
      caches.open('static-cache').then((cache) => {
        return cache.addAll([
          '/offline.html',
          // Add other static assets you want to cache
        ]);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting(),
    ])
  );
});

// Clean up old caches during activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete caches that aren't current
            if (!['static-cache', 'images'].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tell clients about the update
      clients.matchAll().then((clients) => {
        clients.forEach((client) =>
          client.postMessage({
            type: 'NEW_VERSION_AVAILABLE',
          })
        );
      }),
    ])
  );
});

// Handle offline requests
self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return caches.match('/offline.html');
      })
    );
  }
});
