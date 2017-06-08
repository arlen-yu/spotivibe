var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId : '78e5d177b7c24940842391151cf7fa6b',
  clientSecret : '40fecda83f8949c9a0683b44bed066d6'
})

function authorize () {
  return spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      console.log('authorized')
      return data.body['access_token']
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    });
}

// TODO: Let user pick from a list of names
function getArtistIdByName(name) {
  return spotifyApi.searchArtists(name)
    .then(function(data) {
      return data.body.artists.items[0].id
    });
}

// TODO: Do I still need to authorize??? Fix later...
function getArtistAlbumsById(artistId) {
  return spotifyApi.getArtistAlbums(artistId, {limit: 50, album_type: 'album', market: 'US'})
    .then(function(data) {
      data = data.body.items.map(function (a) {return a.id});
      return data;
    })
}

function getAlbumTracks (albumId) {
  return spotifyApi.getAlbumTracks(albumId, { limit : 50})
    .then(function(data) {
      let trackInfo = data.body.items.map(function (a) {return a.id});
      return trackInfo;
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}

function getAudioFeatures(trackIds) {
  return spotifyApi.getAudioFeaturesForTracks(trackIds)
    .then(function(data) {
      return data.body
    }, function(err) {
      console.log(err)
    });
}

module.exports = {
  getAllAlbums: function (artistName) {
    return authorize()
      .then(function (token) {
        console.log('ye')
        spotifyApi.setAccessToken(token);
        console.log('getting artist id by name...')
        return getArtistIdByName(artistName)
      })
      .then(function (response) {
        console.log('getting albums by id...')
        return getArtistAlbumsById(response)
      })
  },
  getAlbumData: function (albumId) {
    return getAlbumTracks(albumId)
      .then(function (response) {
        return getAudioFeatures(response)
      })
      .then(function (features) {
        return features.audio_features;
      })
  }
}
