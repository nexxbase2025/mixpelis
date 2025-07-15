
// Esperar a que cargue el DOM
window.addEventListener('DOMContentLoaded', () => {
  const installPrompt = document.getElementById('installPrompt');
  const iosPrompt = document.getElementById('iosPrompt');
  let deferredPrompt;

  // Detectar Android para mostrar prompt de instalación
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.classList.remove('hidden');

    document.getElementById('installBtn').addEventListener('click', () => {
      installPrompt.classList.add('hidden');
      deferredPrompt.prompt();
    });
  });

  // Detectar iPhone con Safari
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isIOS && isSafari) {
    iosPrompt.classList.remove('hidden');
  }
});