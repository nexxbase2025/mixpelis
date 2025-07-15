
const CACHE_NAME = "mixpelis-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/accion.html",
  "/comedia.html",
  "/drama.html",
  "/terror.html",
  "/infantiles.html",
  "/ver.html",
  "/css/styles.css",
  "/manifest.json",
  "/assets/icon.png",
  "/js/app.js"
];

// Instalar el Service Worker y cachear archivos
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker instalado");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar y limpiar cachés antiguas
self.addEventListener("activate", (event) => {
  console.log("🔁 Service Worker activado");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("🗑️ Borrando caché antigua:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")
        )
      );
    })
  );
});