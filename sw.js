
const CACHE_NAME = "mixpelis-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/manifest.json",
  "/assets/icon.png",
  "/js/app.js",
  "/sw.js"
];

// Instalar el Service Worker y cachear archivos
self.addEventListener("install", function (event) {
  console.log("✅ Service Worker instalado");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar el SW y limpiar cachés antiguas
self.addEventListener