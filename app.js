
// app.js - Requiere tener sw.js y manifest.json funcionando

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('✅ Service Worker registrado', reg))
    .catch(err => console.error('❌ Error al registrar el SW:', err));
}

// Manejar instalación de la PWA
window.addEventListener('DOMContentLoaded', () => {
  let deferredPrompt;
  const installPrompt = document.getElementById('installPrompt');
  const installBtn = document.getElementById('installBtn');
  const iosPrompt = document.getElementById('iosPrompt');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.classList.remove('hidden');
  });

  if (installBtn) {
    installBtn.addEventListener('click', () => {
      installPrompt.classList.add('hidden');
      if (deferredPrompt) deferredPrompt.prompt();
    });
  }

  // Mostrar instrucciones iOS
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isIOS && isSafari) {
    iosPrompt.classList.remove('hidden');
  }
});