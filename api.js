const clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
const clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';

// Paso 1: Obtener el token de acceso
$.ajax({
  url: 'https://accounts.spotify.com/api/token',
  type: 'POST',
  data: {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  },
  success: function(response) {
    const accessToken = response.access_token;
    console.log('Token de acceso:', accessToken);

    // Paso 2: Utilizar el token de acceso en tus solicitudes a la API de Spotify
    const apiUrl = 'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb';

    $.ajax({
      url: apiUrl,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function(artist) {
        console.log('Información del artista:', artist);
        // Aquí puedes hacer algo con la información del artista
      },
      error: function(error) {
        console.log('Error al obtener la información del artista:', error);
      }
    });
  },
  error: function(error) {
    console.log('Error al obtener el token de acceso:', error);
  }
});
