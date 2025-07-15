
const categories = {
  terror: [
    { title: "Película Terror 1", url: "https://archive.org/download/terror-item-1/terror1.mp4" },
    { title: "Película Terror 2", url: "https://archive.org/download/terror-item-2/terror2.mp4" },
    { title: "Película Terror 3", url: "https://archive.org/download/terror-item-3/terror3.mp4" },
    { title: "Película Terror 4", url: "https://archive.org/download/terror-item-4/terror4.mp4" },
    { title: "Película Terror 5", url: "https://archive.org/download/terror-item-5/terror5.mp4" }
  ],
  accion: [
    { title: "Película Acción 1", url: "https://archive.org/download/accion-item-1/accion1.mp4" },
    { title: "Película Acción 2", url: "https://archive.org/download/accion-item-2/accion2.mp4" },
    { title: "Película Acción 3", url: "https://archive.org/download/accion-item-3/accion3.mp4" },
    { title: "Película Acción 4", url: "https://archive.org/download/accion-item-4/accion4.mp4" },
    { title: "Película Acción 5", url: "https://archive.org/download/accion-item-5/accion5.mp4" }
  ],
  drama: [
    { title: "Película Drama 1", url: "https://archive.org/download/drama-item-1/drama1.mp4" },
    { title: "Película Drama 2", url: "https://archive.org/download/drama-item-2/drama2.mp4" },
    { title: "Película Drama 3", url: "https://archive.org/download/drama-item-3/drama3.mp4" },
    { title: "Película Drama 4", url: "https://archive.org/download/drama-item-4/drama4.mp4" },
    { title: "Película Drama 5", url: "https://archive.org/download/drama-item-5/drama5.mp4" }
  ],
  comedia: [
    { title: "Película Comedia 1", url: "https://archive.org/download/comedia-item-1/comedia1.mp4" },
    { title: "Película Comedia 2", url: "https://archive.org/download/comedia-item-2/comedia2.mp4" },
    { title: "Película Comedia 3", url: "https://archive.org/download/comedia-item-3/comedia3.mp4" },
    { title: "Película Comedia 4", url: "https://archive.org/download/comedia-item-4/comedia4.mp4" },
    { title: "Película Comedia 5", url: "https://archive.org/download/comedia-item-5/comedia5.mp4" }
  ],
  infantiles: [
    { title: "Pokémon Película 1", url: "https://archive.org/download/pokemon-peliculas-1/pokemon%20pelicula%201.mp4" },
    { title: "Pokémon Película 2", url: "https://archive.org/download/pokemon-peliculas-2/pokemon%20pelicula%202.mp4" },
    { title: "Pokémon Película 3", url: "https://archive.org/download/pokemon-pelicula-3/P03ElHechizoDeLosUnknown720p2001bunnydownloads.mp4" },
    { title: "Película Infantil 4", url: "https://archive.org/download/infantil-item-4/infantil4.mp4" },
    { title: "Película Infantil 5", url: "https://archive.org/download/infantil-item-5/infantil5.mp4" }
  ]
};

window.addEventListener('DOMContentLoaded', () => {
  const movieList = document.getElementById('movie-list');

  document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
      const category = bubble.dataset.category;
      const movies = categories[category];
      movieList.innerHTML = '<h2>Películas disponibles</h2>';
      movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie';
        div.innerHTML = `
          <h3>${movie.title}</h3>
          <button class="play-button" data-url="${movie.url}">▶ Ver ahora</button>
        `;
        movieList.appendChild(div);
      });

      document.querySelectorAll('.play-button').forEach(btn => {
        btn.addEventListener('click', () => {
          const videoContainer = document.createElement('div');
          videoContainer.className = 'video-container';
          videoContainer.innerHTML = `
            <div class="video-wrapper">
              <button class="close-button">✖ Cerrar</button>
              <video controls autoplay>
                <source src="${btn.dataset.url}" type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            </div>
          `;
          document.body.appendChild(videoContainer);

          videoContainer.querySelector('.close-button').addEventListener('click', () => {
            videoContainer.remove();
          });
        });
      });
    });
  });

  let deferredPrompt;
  const installPrompt = document.getElementById('installPrompt');
  const installBtn = document.getElementById('installBtn');
  const iosPrompt = document.getElementById('iosPrompt');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.classList.remove('hidden');
  });

  installBtn.addEventListener('click', () => {
    installPrompt.classList.add('hidden');
    deferredPrompt.prompt();
  });

  if (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())) {
    iosPrompt.classList.remove('hidden');
  }
});
