var path = require('path');
var router = require('express').Router();
var config = require('../../config.json');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

// Fetch artist data by name
router.get('/artist/id/:artistName', function (req, res) {
  if (req.params.artistName !== 'bundle.js') {
    authorize()
      .then(function (token) {
        spotifyApi.setAccessToken(token);
        return getArtistIdByName(req.params.artistName)
      })
      .then(function (response) {
        if (response) {
          res.json({"data": response});
        } else {
          res.json({"data": null})
        }
      })
  }
})

router.get('/albums/:artistId', function (req, res) {
  if (req.params.artistId !== 'bundle.js') {
    getArtistAlbumsById(req.params.artistId)
      .then(function (response) {
        res.json({albumInfo: response})
      })
  }
})

router.get('/visualize/feature/:albumName', function (req, res) {
  authorize();
  if (req.params.albumName !== 'bundle.js') {
    getAlbumData(req.params.albumName)
      .then(function (response) {
        res.json({'data': response})
      })
  }
})

module.exports = router;

var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId : config.clientId,
  clientSecret : config.clientSecret
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
      let artist = data.body.artists.items[0]
      if (artist) {
        return {
          id: artist.id,
          img: artist.images[0].url,
          name: artist.name,
        }
      } else {
        return false;
      }
    });
}

// TODO: Do I still need to authorize??? Fix later...
function getArtistAlbumsById(artistId) {
  return spotifyApi.getArtistAlbums(artistId, {limit: 50, album_type: 'album', market: 'US'})
    .then(function(data) {
      let visited = [];

      data = data.body.items.map(function (album) {
        let generalName = album.name.replace(/ *\([^)]*\) */g, '');
        if (isInArray(generalName, visited)) {
          return false
        } else {
          visited.push(generalName);
          return {
            id: album.id, name: album.name
          }
        }});
      data = data.filter(function (album) {
        return album;
      })
      return data;
    })
}

function getAlbumTracks (albumId) {
  return spotifyApi.getAlbumTracks(albumId, { limit : 50})
    .then(function(data) {
      let trackInfo = data.body.items.map(function (a) {
        let temp = {
          id: a.id,
          name: a.name
        }
        return temp;
    });
      return trackInfo;
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}

function getAudioFeatures(trackInfo) {
  let trackIds = trackInfo.map(function (track) {
    return track.id
  })
  return spotifyApi.getAudioFeaturesForTracks(trackIds)
    .then(function(data) {
      return data.body.audio_features.map(function (track) {
        for (let i = 0; i < trackInfo.length; i++) {
          if (track.id === trackInfo[i].id) {
            console.log('trackid found!')
            track['name'] = trackInfo[i].name;
            console.log(track)
            return track;
          }
        }
        return track;
      })
    }, function(err) {
      console.log(err)
    });
}

function getAllAlbums (artistName) {
  return authorize()
    .then(function (token) {
      spotifyApi.setAccessToken(token);
      return getArtistIdByName(artistName)
    })
    .then(function (response) {
      return getArtistAlbumsById(response.id)
    })
}
function getAlbumData (albumId) {
  return getAlbumTracks(albumId)
    .then(function (response) {
      return getAudioFeatures(response)
    })
    .then(function (features) {
      return features;
    })
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
