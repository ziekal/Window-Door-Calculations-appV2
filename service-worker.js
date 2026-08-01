self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map(cacheName =>
          caches.delete(cacheName)
        )
      );

      await self.clients.claim();

      const windows = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true
      });

      for (const windowClient of windows) {
        windowClient.navigate("./");
      }

      await self.registration.unregister();
    })()
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});