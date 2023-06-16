
$(document).ready(function() {
  var clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
  var clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';
  var apiUrl = 'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb';

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
          artistDetails.append('<p class="seguidores">Seguidores: ' + response.followers.total + '</p>');
          artistDetails.append('<p class="genre">Géneros: ' + response.genres.join(', ') + '</p>');

          // Agrega todo el contenido del artista (imagen, nombre y detalles) al div con el ID 'artist-info'
          $('#artist-info').html(artistInfo).append(artistDetails);

          // Agrega el contenedor de la información adicional al div con el ID 'artist-details'
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
