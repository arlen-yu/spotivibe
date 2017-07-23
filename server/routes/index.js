/* eslint camelcase: ["off", {properties: "never"}] */

const path = require('path');
const router = require('express').Router();
const config = require('../../config.json');

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: config.redirect_uri,
});

const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-private', 'playlist-modify-public'];

const STATE_KEY = 'spotify_auth_state';

let USER_ID;

const generateRandomString = N => (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

function authorize() {
  return spotifyApi.clientCredentialsGrant()
    .then(data => data.body.access_token);
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

router.get('/create/playlist', (req, res) => {
  let trackIds;
  if (Array.isArray(req.query.tracks)) {
    trackIds = req.query.tracks.map(el => `spotify:track:${el}`);
  } else {
    trackIds = [`spotify:track:${req.query.tracks}`];
  }
  // const tracks = res.params.tracks;
  spotifyApi.createPlaylist(USER_ID, 'spotivibe playlist', { public: true })
    .then((ev) => {
      const playlistId = ev.body.id;
      // const trackIds = tracks.map(el => `spotify:track:${el}`);
      return spotifyApi.addTracksToPlaylist(USER_ID, playlistId, trackIds);
    })
    .then(() => {
      res.json({ addedTracks: true });
    }, () => {
      // console.log(err);
      res.json({ addedTracks: false });
    });
});

router.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  // your application requests authorization
  res.redirect(`${spotifyApi.createAuthorizeURL(scopes, state)}&show_dialog=true`);
});

router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  // const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null) {
    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then((data) => {
      const { access_token, refresh_token } = data.body;
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        USER_ID = body.id;
      });
      // we can also pass the token to the browser to make requests from there
      res.redirect(`/#/user/${access_token}/${refresh_token}`);
    }).catch(() => {
      res.redirect('/#/error/invalid token');
    });
  }
});

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

function getPlaylistTracks(user, playlistId) {
  return spotifyApi.getPlaylist(user, playlistId)
    .then((data) => {
      const tracks = data.body.tracks.items.map(trackInfo => trackInfo.track);
      return tracks;
    });
}

function getPlaylistData(user, playlistId) {
  return getPlaylistTracks(user, playlistId)
    .then(response => getAudioFeatures(response))
    .then(features => features);
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

router.get('/playlist/top100', (req, res) => {
  if (req.params.artistId !== 'bundle.js') {
    authorize()
      .then((token) => {
        spotifyApi.setAccessToken(token);
        return getPlaylistData('billboard.com', '6UeSakyzhiEt4NB3UAd6NQ');
      })
      .then((response) => {
        res.json({ data: response });
      });
  }
});

router.get('/visualize/feature/:albumName', (req, res) => {
  if (req.params.albumName !== 'bundle.js') {
    getAlbumData(req.params.albumName)
      .then((response) => {
        res.json({ data: response });
      });
  }
});

module.exports = router;
