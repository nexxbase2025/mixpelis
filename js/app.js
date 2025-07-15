
const categories = {
  terror: [
    { title: "NOCHE DE MIEDO", url: "https://ia801307.us.archive.org/19/items/noche-de-miedo-2/Noche%20de%20Miedo%202.mp4" },
    { title: "Película Terror 2", url: "https://archive.org/download/terror-item-2/terror2.mp4" },
    { title: "Película Terror 3", url: "https://archive.org/download/terror-item-3/terror3.mp4" },
    { title: "Película Terror 4", url: "https://archive.org/download/terror-item-4/terror4.mp4" },
    { title: "Película Terror 5", url: "https://archive.org/download/terror-item-5/terror5.mp4" }
  ],
  accion: [
    { title: "ESCAPAR DE LA PYTON", url: "https://ia800804.us.archive.org/15/items/peliculas-chinas-de-accion/C%C3%B3mo%20escapar%20del%20ataque%20de%20una%20pit%C3%B3n%20gigante.mp4" },
    { title: "NARCO TERROR", url: "https://dn720403.ca.archive.org/0/items/narco-terror-1985-hd-1080p/Narco%20Terror%20%281985%29HD%201080p.mp4" },
    { title: "Película Acción 3", url: "https://archive.org/download/accion-item-3/accion3.mp4" },
    { title: "Película Acción 4", url: "https://archive.org/download/accion-item-4/accion4.mp4" },
    { title: "Película Acción 5", url: "https://archive.org/download/accion-item-5/accion5.mp4" }
  ],
  drama: [
    { title: "LALEY DEL MONTE", url: "https://dn720305.ca.archive.org/0/items/y-2-mate.is-la-ley-del-monte-widescreen-d-1-amdx-7o-hp-q-720p-1641780089832/Y2Mate.is%20-%20La%20Ley%20Del%20Monte%20WIDESCREEN-D1AMDX7oHpQ-720p-1641780089832.mp4" },
    { title: "Película Drama 2", url: "https://archive.org/download/drama-item-2/drama2.mp4" },
    { title: "Película Drama 3", url: "https://archive.org/download/drama-item-3/drama3.mp4" },
    { title: "Película Drama 4", url: "https://archive.org/download/drama-item-4/drama4.mp4" },
    { title: "Película Drama 5", url: "https://archive.org/download/drama-item-5/drama5.mp4" }
  ],
  comedia: [
    { title: "EL CHAPULIN COLORADO", url: "https://dn721901.ca.archive.org/0/items/el-chapulin-colorado-no-te-arrugues-cuero-viejo-que-te-quiero-pa-tambor-1974/El%20Chapul%C3%ADn%20Colorado%20No%20te%20arrugues%2C%20cuero%20viejo%2C%20que%20te%20quiero%20pa%27%20tambor%201974.mp4" },
    { title: "Película Comedia 2", url: "https://archive.org/download/comedia-item-2/comedia2.mp4" },
    { title: "Película Comedia 3", url: "https://archive.org/download/comedia-item-3/comedia3.mp4" },
    { title: "Película Comedia 4", url: "https://archive.org/download/comedia-item-4/comedia4.mp4" },
    { title: "Película Comedia 5", url: "https://archive.org/download/comedia-item-5/comedia5.mp4" }
  ],
  infantiles: [
    { title: "EL REY LEON 2", url: "https://dn721604.ca.archive.org/0/items/el-rey-leon-1-12/El%20rey%20le%C3%B3n%201%C2%BD.mp4" },
    { title: "DRAGON BALL SUPER BROLY", url: "https://dn720701.ca.archive.org/0/items/dragon-ball-super-broly/Dragon%20Ball%20Super%3A%20Broly.mp4" },
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
