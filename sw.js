
// sw.js - Service Worker para MIXPELIS

self.addEventListener('install', function (event) {
  console.log('✅ Service Worker instalado');
  self.skipWaiting(); // activa sin esperar
});

self.addEventListener('activate', function (event) {
  console.log('🔄 Service Worker activado');
});

self.addEventListener('fetch', function (event) {
  // Puedes añadir caché aquí si lo deseas en el futuro
});