const SpotifyWebApi = require('spotify-web-api-node');

const config = require('../config.json');

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

function authorize() {
  return spotifyApi.clientCredentialsGrant()
    .then(data => data.body.access_token);
}

// TODO: Let user pick from a list of names
function getArtistIdByName(name) {
  return spotifyApi.searchArtists(name)
    .then(data => data.body.artists.items[0].id);
}

// TODO: Do I still need to authorize??? Fix later...
function getArtistAlbumsById(artistId) {
  return spotifyApi.getArtistAlbums(artistId, { limit: 50, album_type: 'album', market: 'US' })
    .then((data) => {
      const dataNew = data.body.items.map(a => a.id);
      return dataNew;
    });
}

function getAlbumTracks(albumId) {
  return spotifyApi.getAlbumTracks(albumId, { limit: 50 })
    .then((data) => {
      const trackInfo = data.body.items.map(a => a.id);
      return trackInfo;
    });
}

function getAudioFeatures(trackIds) {
  return spotifyApi.getAudioFeaturesForTracks(trackIds)
    .then(data => data.body);
}

module.exports = {
  getAllAlbums(artistName) {
    return authorize()
      .then((token) => {
        spotifyApi.setAccessToken(token);
        return getArtistIdByName(artistName);
      })
      .then(response => getArtistAlbumsById(response));
  },
  getAlbumData(albumId) {
    return getAlbumTracks(albumId)
      .then(response => getAudioFeatures(response))
      .then(features => features.audio_features);
  },
};
