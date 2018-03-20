let accessToken;
let expiresIn;
let tracks = [];
const clientId = '67fa2734f1e14488837c8b02e35de685';
const redirectURI = 'http://localhost:3000/';
const debugging = false;

const Spotify = {
  getAccessToken() {
    if (accessToken !== undefined) {
      if (debugging) {console.log('first condition met');}
      if (debugging) {console.log(accessToken);}
      if (debugging) {console.log(expiresIn);}
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      if (debugging) {console.log('second condition met');}
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      if (debugging) {console.log(accessToken);}
      if (debugging) {console.log(expiresIn);}

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      if (debugging) {console.log('third condition met');}
      if (debugging) {console.log(accessToken);}
      if (debugging) {console.log(expiresIn);}
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      return;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks === undefined || jsonResponse.tracks.items.length === 0) {
        tracks = [];
        return tracks;
      } else {
        if (debugging) {
          console.log(jsonResponse);
          jsonResponse.tracks.items.map(track => {
            return console.log(`"${track.name}" by ${track.artists[0].name} from the ${track.album.album_type} "${track.album.name}". URI: ${track.uri}`);
          });
        }
        tracks = jsonResponse.tracks.items.map(track => {
          return {
            ID: track.id,
            Name: track.name,
            Artist: track.artists[0].name,
            Album: track.album.name,
            URI: track.uri
          }
        });

        if (debugging) {console.log(tracks);}

        return tracks;
      }
    });
  },
  
  savePlaylist(playlistName, trackURIs) {
    if (playlistName === '' || trackURIs === '') {
      return;
    } else {
      let userToken = accessToken;
      let headers = {
        Authorization: `Bearer ${userToken}`
      };
      let userID;

      fetch('https://api.spotify.com/v1/me', {
        headers: headers
      }).then(response => response.json()).then(jsonResponse => {
        userID = jsonResponse.id;
        return userID;
      });

      fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'post',
        body: JSON.stringify({
          name: playlistName,
          public: false,
          collaborative: false
        })
      }).then(response => response.json()).then(playlistID => {
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: {
            ...headers,
            "Content-Type": "application/json"
          },
          method: 'post',
          body: JSON.stringify({
            uris: trackURIs
          })
        }).then(response => response.json());
      });
    }
  }
}

export default Spotify;