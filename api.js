//INFORMACION DEL ARTISTA--------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  var clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  var clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';
  var apiUrl = 'https://api.spotify.com/v1/artists/1Yox196W7bzVNZI7RBaPnf?si=zF4HW-TCQhOm6M6jvJfzdw';

  // https://open.spotify.com/artist/1Yox196W7bzVNZI7RBaPnf?si=zF4HW-TCQhOm6M6jvJfzdw

  // Realiza una solicitud para obtener el token de acceso
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al obtener el token de acceso');
    }
  })
  .then(function(tokenResponse) {
    var accessToken = tokenResponse.access_token;

    // Realiza la solicitud a la API de Spotify utilizando el token de acceso
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener la información del artista');
      }
    })
    .then(function(response) {
      var artistInfo = '<img class="imgArtist" src="' + response.images[0].url + '" alt="Imagen del artista">';
      artistInfo += '<h2 class="responseName">' + response.name + '</h2>';

      // Crea un contenedor para la información adicional
      var artistDetails = document.createElement('div');
      artistDetails.innerHTML = '<p class="infoExt">Popularidad: ' + response.popularity + '</p>';
      artistDetails.innerHTML += '<p class="infoExt">Seguidores: ' + response.followers.total + '</p>';
      artistDetails.innerHTML += '<p class="infoExt">Géneros: ' + response.genres.join(', ') + '</p>';

      // se agrega todo el contenido del artista (imagen, nombre y detalles) al div info'
      document.getElementById('artist-info').innerHTML = artistInfo;
      document.getElementById('artist-info').appendChild(artistDetails);

      // se agrega el contenedor de la información adicional al div details'
      document.getElementById('artist-details').innerHTML = '';
      document.getElementById('artist-details').appendChild(artistDetails);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
});

//ALBUMES ------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  var clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  var clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';
  var artistId = '1Yox196W7bzVNZI7RBaPnf';

  // Realiza una solicitud para obtener el token de acceso
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al obtener el token de acceso');
    }
  })
  .then(function(tokenResponse) {
    var accessToken = tokenResponse.access_token;

    // Realiza la solicitud a la API de Spotify utilizando el token de acceso
    fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener la información de los álbumes');
      }
    })
    .then(function(response) {
      if (response.hasOwnProperty('items')) {
        var albums = response.items;
        var albumsContainer = document.getElementById('albums-container');

        // Itera sobre los álbumes y muestra la información en el HTML
        albums.forEach(function(album) {
          var albumContainer = document.createElement('div');
          albumContainer.classList.add('album-container');
          var albumImage = document.createElement('img');
          albumImage.classList.add('imgAlbum');
          albumImage.src = album.images[0].url;
          var albumInfo = document.createElement('div');
          albumInfo.classList.add('album-info');

          albumInfo.innerHTML += '<h3>' + album.name + '</h3>';
          albumInfo.innerHTML += '<p class="album-info-line">Total de canciones: ' + album.total_tracks + '</p>';
          albumInfo.innerHTML += '<p class="album-info-line">Fecha de lanzamiento: ' + album.release_date + '</p>';

          albumContainer.appendChild(albumImage);
          albumContainer.appendChild(albumInfo);

          albumsContainer.appendChild(albumContainer);
        });
      } else {
        console.log('La respuesta de la API no contiene la propiedad "items".', response);
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
});


//ALBUM ESPECIFICO -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  const albumId = '1ziUtOuRT545OI4cnHEMhC';
  const clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  const clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';

  // Realiza una solicitud para obtener el token de acceso
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener el token de acceso');
      }
    })
    .then(function(tokenResponse) {
      const accessToken = tokenResponse.access_token;

      fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then(response => response.json())
        .then(data => {
          const albumImageDiv = document.getElementById('album-image');
          const albumDetailsDiv = document.getElementById('album-details');

          // Crea elementos HTML para mostrar los datos del álbum
          const albumImage = document.createElement('img');
          albumImage.src = data.images[1].url;
          albumImage.alt = 'Imagen del álbum';

          const albumName = document.createElement('h2');
          albumName.textContent = '' + data.name;

          const totalTracks = document.createElement('p');
          totalTracks.textContent = 'Total de canciones: ' + data.total_tracks;

          // Agrega los elementos al div correspondiente
          albumImageDiv.appendChild(albumImage);
          albumDetailsDiv.appendChild(albumName);
          albumDetailsDiv.appendChild(totalTracks);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
});


//TRACKS DEL ALBUM-----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  const albumId = '1ziUtOuRT545OI4cnHEMhC';
  const clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  const clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';

  // Realiza una solicitud para obtener el token de acceso
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener el token de acceso');
      }
    })
    .then(function(tokenResponse) {
      const accessToken = tokenResponse.access_token;

      fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then(response => response.json())
        .then(data => {
          // Accede al elemento div donde quieres mostrar la información de los tracks
          const tracksInfoDiv = document.getElementById('tracks-info');

          // Itera sobre cada track y crea elementos HTML para mostrar la información
          data.items.forEach(track => {
            const trackInfoContainer = document.createElement('div');
            trackInfoContainer.classList.add('track-info');

            const trackName = document.createElement('p');
            trackName.classList.add('track-name');
            trackName.textContent = ' ' + track.name;

            const trackDuration = document.createElement('p');
            trackDuration.classList.add('track-duration');

            const minutes = Math.floor(track.duration_ms / 60000);
            const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
            trackDuration.textContent = 'Duración: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            trackInfoContainer.appendChild(trackName);
            trackInfoContainer.appendChild(trackDuration);
            tracksInfoDiv.appendChild(trackInfoContainer);
          });
        })
        .catch(error => {
          console.log('Error:', error);
        });
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
});



// Ejecutar función en el evento click-------------------------------------------------------------------
$('#btn_open').on('click', open_close_menu);

// Declaramos variables
var side_menu = $('#menu_side');
var btn_open = $('#btn_open');
var body = $('#body');

// Evento para mostrar y ocultar menú
function open_close_menu() {
  body.toggleClass("body_move");
  side_menu.toggleClass("menu__side_move");
}

// Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página
if (window.innerWidth < 760) {
  body.addClass("body_move");
  side_menu.addClass("menu__side_move");
}

// Haciendo el menú responsive(adaptable)
$(window).resize(function() {
  if (window.innerWidth > 760) {
    body.removeClass("body_move");
    side_menu.removeClass("menu__side_move");
  }

  if (window.innerWidth < 760) {
    body.addClass("body_move");
    side_menu.addClass("menu__side_move");
  }
});
