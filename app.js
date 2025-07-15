
// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('✅ SW registrado'))
    .catch(err => console.error('❌ Error al registrar SW', err));
}

// Mostrar prompts
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
      deferredPrompt.prompt();
    });
  }

  // Mostrar instrucciones en iPhone
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isIOS && isSafari) {
    iosPrompt.classList.remove('hidden');
  }
});