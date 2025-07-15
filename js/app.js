
// Esperar a que cargue el DOM
window.addEventListener('DOMContentLoaded', () => {
  const installPrompt = document.getElementById('installPrompt');
  const installBtn = document.getElementById('installBtn');
  const iosPrompt = document.getElementById('iosPrompt');
  let deferredPrompt;

  // Detectar evento para Android (PWA)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Evitar el prompt automático
    deferredPrompt = e;
    installPrompt.classList.remove('hidden');

    installBtn.addEventListener('click', () => {
      installPrompt.classList.add('hidden');
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('✅ El usuario aceptó instalar la app');
          } else {
            console.log('❌ El usuario rechazó la instalación');
          }
          deferredPrompt = null;
        });
      }
    });
  });

  // Detectar iPhone con Safari (no soporta beforeinstallprompt)
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase());

  if (isIOS && isSafari) {
    setTimeout(() => {
      iosPrompt.classList.remove('hidden');
    }, 1000); // breve retraso para no mostrarla de inmediato
  }
});

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('✅ Service Worker registrado:', reg.scope))
      .catch(err => console.error('❌ Error al registrar Service Worker:', err));
  });
}