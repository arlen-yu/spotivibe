const path = require('path');
const router = require('express').Router();
const config = require('../../config.json');

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

function authorize() {
  return spotifyApi.clientCredentialsGrant()
    .then(data => data.body.access_token);
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

// TODO: Let user pick from a list of names
function getArtistIdByName(name) {
  return spotifyApi.searchArtists(name)
    .then(data => data.body.artists.items);
}

// TODO: Do I still need to authorize??? Fix later...
function getArtistAlbumsById(artistId) {
  return spotifyApi.getArtistAlbums(artistId, { limit: 50, album_type: 'album', market: 'US' })
    .then((data) => {
      const visited = [];

      let newData = data.body.items.map((album) => {
        const generalName = album.name.replace(/ *\([^)]*\) */g, '');
        if (isInArray(generalName, visited)) {
          return false;
        }
        visited.push(generalName);
        return {
          id: album.id, name: album.name,
        };
      });
      newData = newData.filter(album => album);
      return newData;
    });
}

function getAlbumTracks(albumId) {
  return spotifyApi.getAlbumTracks(albumId, { limit: 50 })
    .then((data) => {
      const trackInfo = data.body.items.map((a) => {
        const temp = {
          id: a.id,
          name: a.name,
        };
        return temp;
      });
      return trackInfo;
    });
}

function getAudioFeatures(trackInfo) {
  const trackIds = trackInfo.map(track => track.id);
  return spotifyApi.getAudioFeaturesForTracks(trackIds)
    .then(data => (
      data.body.audio_features.map((track) => {
        for (let i = 0; i < trackInfo.length; i += 1) {
          if (track.id === trackInfo[i].id) {
            const newTrack = track;
            newTrack.name = trackInfo[i].name;
            return newTrack;
          }
        }
        return track;
      })
    ));
}

function getAlbumData(albumId) {
  return getAlbumTracks(albumId)
    .then(response => getAudioFeatures(response))
    .then(features => features);
}

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

// Fetch artist data by name
router.get('/artist/id/:artistName', (req, res) => {
  if (req.params.artistName !== 'bundle.js') {
    authorize()
      .then((token) => {
        spotifyApi.setAccessToken(token);
        return getArtistIdByName(req.params.artistName);
      })
      .then((response) => {
        if (response && response.length !== 0) {
          res.json({ data: response });
        } else {
          res.json({ data: null });
        }
      });
  }
});

router.get('/albums/:artistId', (req, res) => {
  if (req.params.artistId !== 'bundle.js') {
    getArtistAlbumsById(req.params.artistId)
      .then((response) => {
        res.json({ albumInfo: response });
      });
  }
});

router.get('/visualize/feature/:albumName', (req, res) => {
  authorize();
  if (req.params.albumName !== 'bundle.js') {
    getAlbumData(req.params.albumName)
      .then((response) => {
        res.json({ data: response });
      });
  }
});

module.exports = router;
