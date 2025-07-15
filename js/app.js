
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
    iosPrompt.classList.remove('hidden');
  }
});