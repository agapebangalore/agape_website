const CACHE_NAME = 'agape-church-v2';
const STATIC_CACHE = 'agape-static-v2';
const DYNAMIC_CACHE = 'agape-dynamic-v2';
const IMAGE_CACHE = 'agape-images-v2';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/agape-bible-church-logo.png',
  '/authentic-church-worship.webp',
  '/community-fellowship.png',
  '/children-ministry-authentic.png',
  '/caring-ministry.png',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap'
];

const MAX_AGE = {
  STATIC: 30 * 24 * 60 * 60 * 1000, // 30 days
  DYNAMIC: 7 * 24 * 60 * 60 * 1000,  // 7 days
  IMAGES: 14 * 24 * 60 * 60 * 1000   // 14 days
};

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching app shell and essential resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker install failed:', error);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activated successfully');
    })
  );
});

// Enhanced Fetch with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Different strategies based on request type
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.origin === location.origin) {
    event.respondWith(handleSameOriginRequest(request));
  } else if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(handleFontRequest(request));
  } else {
    event.respondWith(handleExternalRequest(request));
  }
});

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cached image is still fresh
      const cachedDate = new Date(cachedResponse.headers.get('date'));
      const now = new Date();
      if (now.getTime() - cachedDate.getTime() < MAX_AGE.IMAGES) {
        return cachedResponse;
      }
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Image request failed, trying cache:', error);
    const cache = await caches.open(IMAGE_CACHE);
    return await cache.match(request) || new Response('Image not available', { status: 404 });
  }
}

// Handle same-origin requests with network-first for HTML, cache-first for assets
async function handleSameOriginRequest(request) {
  const url = new URL(request.url);
  
  if (request.destination === 'document' || url.pathname.endsWith('/')) {
    // Network-first for HTML pages
    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      console.log('Network failed, trying cache:', error);
      const cache = await caches.open(DYNAMIC_CACHE);
      const cachedResponse = await cache.match(request);
      return cachedResponse || await cache.match('/');
    }
  } else {
    // Cache-first for static assets
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.log('Asset request failed:', error);
      return new Response('Asset not available', { status: 404 });
    }
  }
}

// Handle font requests with long-term caching
async function handleFontRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Font request failed:', error);
    return cachedResponse || new Response('Font not available', { status: 404 });
  }
}

// Handle external requests with network-only
async function handleExternalRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log('External request failed:', error);
    return new Response('External resource not available', { status: 404 });
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions when back online
  return new Promise((resolve) => {
    // Implementation for syncing offline data
    resolve();
  });
}

// Push notifications (for future ministry updates)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New message from Agape Bible Church',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Message',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Agape Bible Church', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});