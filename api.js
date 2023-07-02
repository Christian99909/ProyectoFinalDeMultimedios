$(document).ready(function() {
  var clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  var clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';
  var apiUrl = 'https://api.spotify.com/v1/artists/1Yox196W7bzVNZI7RBaPnf?si=zF4HW-TCQhOm6M6jvJfzdw';

  // Realiza una solicitud para obtener el token de acceso
  $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    type: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'grant_type': 'client_credentials'
    },
    success: function(tokenResponse) {
      var accessToken = tokenResponse.access_token;

      // Realiza la solicitud a la API de Spotify utilizando el token de acceso
      $.ajax({
        url: apiUrl,
        type: 'GET',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        },
        success: function(response) {
          var artistInfo = '<img class="imgArtist" src="' + response.images[0].url + '" alt="Imagen del artista">';
          artistInfo += '<h2 class="responseName">' + response.name + '</h2>';

          // Crea un contenedor para la información adicional
          var artistDetails = $('<div></div>');
          artistDetails.append('<p class="infoExt">Popularidad: ' + response.popularity + '</p>');
          artistDetails.append('<p class="infoExt">Seguidores: ' + response.followers.total + '</p>');
          artistDetails.append('<p class="infoExt">Géneros: ' + response.genres.join(', ') + '</p>');

          // se agrega todo el contenido del artista (imagen, nombre y detalles) al div info'
          $('#artist-info').html(artistInfo).append(artistDetails);

          // se agrega el contenedor de la información adicional al div details'
          $('#artist-details').html(artistDetails);
        },
        error: function(error) {
          console.log('Error:', error);
        }
      });
    },
    error: function(error) {
      console.log('Error:', error);
    }
  });
});

$(document).ready(function() {
  var clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  var clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';
  var artistId = '1Yox196W7bzVNZI7RBaPnf';

  // Realiza una solicitud para obtener el token de acceso
  $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    type: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'grant_type': 'client_credentials'
    },
    success: function(tokenResponse) {
      var accessToken = tokenResponse.access_token;

      // Realiza la solicitud a la API de Spotify utilizando el token de acceso
      $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artistId + '/albums',
        type: 'GET',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        },
        success: function(response) {
          if (response.hasOwnProperty('items')) {
            var albums = response.items;
            var albumsContainer = $('#albums-container');

            // Itera sobre los álbumes y muestra la información en el HTML
            albums.forEach(function(album) {
              var albumContainer = $('<div class="album-container"></div>');
              var albumImage = $('<img class="imgAlbum" src="' + album.images[0].url + '">');
              var albumInfo = $('<div class="album-info"></div>');

              albumInfo.append('<h3>' + album.name + '</h3>');
              albumInfo.append('<p class="album-info-line">Total de canciones: ' + album.total_tracks + '</p>');
              albumInfo.append('<p class="album-info-line">Fecha de lanzamiento: ' + album.release_date + '</p>');

              albumContainer.append(albumImage);
              albumContainer.append(albumInfo);

              albumsContainer.append(albumContainer);
            });
          } else {
            console.log('La respuesta de la API no contiene la propiedad "items".', response);
          }
        },

        error: function(error) {
          console.log('Error:', error);
        }
      });
    },
    error: function(error) {
      console.log('Error:', error);
    }
  });
});

// Ejecutar función en el evento click
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
