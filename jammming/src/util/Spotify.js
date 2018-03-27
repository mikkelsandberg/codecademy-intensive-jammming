let accessToken;
let expiresIn;
let tracks = [];
const clientId = '67fa2734f1e14488837c8b02e35de685';
const scope = 'playlist-modify-private playlist-modify-public'
const prodRedirectURI = 'http://msandberg-jammming.surge.sh/';
const devRedirectURI = 'http://localhost:3000/';
const debugGetAccessToken = false;
const debugSearch = false;
const debugSavePlaylist = false;
const isDevMode = true;

const Spotify = {
  getAccessToken() {
    if (accessToken !== undefined) {
      if (debugGetAccessToken) {console.log('first condition met');}
      if (debugGetAccessToken) {console.log(accessToken);}
      if (debugGetAccessToken) {console.log(expiresIn);}
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      if (debugGetAccessToken) {console.log('second condition met');}
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      if (debugGetAccessToken) {console.log(accessToken);}
      if (debugGetAccessToken) {console.log(expiresIn);}

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      if (debugGetAccessToken) {console.log('third condition met');}
      if (debugGetAccessToken) {console.log(accessToken);}
      if (debugGetAccessToken) {console.log(expiresIn);}
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${isDevMode ? devRedirectURI : prodRedirectURI}`;
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
        if (debugSearch) {
          console.log(jsonResponse);
          jsonResponse.tracks.items.map(track => {
            return console.log(`"${track.name}" by ${track.artists[0].name} from the ${track.album.album_type} "${track.album.name}". URI: ${track.uri}`);
          });
        }
        tracks = jsonResponse.tracks.items.map(track => {
          return {
            ID: track.uri,
            Name: track.name,
            Artist: track.artists[0].name,
            Album: track.album.name
          }
        });

        if (debugSearch) {console.log(tracks);}

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
      let playlistID;

      fetch(`https://api.spotify.com/v1/me`, {
        headers: headers
      }).then(response => {
        if (debugSavePlaylist) {console.log('response:', response)}
        return response.json();
      }).then(jsonResponse => {
        if (debugSavePlaylist) {console.log('jsonResponse.id:', jsonResponse.id)}
        userID = jsonResponse.id;
        return userID;
      }).then(uid => {
        fetch(`https://api.spotify.com/v1/users/${uid}/playlists`, {
          headers: {
            ...headers,
            "content-type": "application/json"
          },
          method: 'post',
          body: JSON.stringify({
            name: playlistName,
            public: false,
            collaborative: false
          })
        }).then(response => {
          if (debugSavePlaylist) {console.log('response:', response)}
          return response.json();
        }).then(jsonResponse => {
          if (debugSavePlaylist) {console.log('jsonResponse.id:', jsonResponse.id)}
          playlistID = jsonResponse.id;
          return playlistID;
        }).then(pid => {
          fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${pid}/tracks?uris=${trackURIs}`, {
            headers: {
              ...headers,
              "content-type": "application/json"
            },
            method: 'post'
          }).then(response => {
            if (debugSavePlaylist) {console.log('response:', response)}
            return response.json();
          }).then(jsonResponse => {
            if (debugSavePlaylist) {console.log('jsonResponse:', jsonResponse)}
            return jsonResponse;
          })
        })
      });
    }
  }
}

export default Spotify;