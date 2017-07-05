import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

const PlaylistFrame = (props) => {
  const baseUrl = 'https://embed.spotify.com/?theme=white&uri=spotify:trackset:My Playlist:';
  const songs = props.allTracks.map((el) => {
    if (el) {
      return el.id;
    }
    return '';
  }).join(',');
  return (
    <iframe title="spotify-playlist" src={baseUrl + songs} height="375px" />
  );
};

PlaylistFrame.propTypes = {
  allTracks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const CustomDrawer = props => (
  <Drawer open={props.menu} width={300}>
    <div style={{ padding: 10 }}>
      <p>Danceability: {props.danceability}</p>
      <Slider
        style={{ marginTop: '-10px', marginBottom: '-30px' }}
        value={props.danceability}
        onChange={(event, newValue) => props.handleSliderChange(newValue, 'danceability')}
      />
      <p>Energy: {props.energy}</p>
      <Slider
        style={{ marginTop: '-10px', marginBottom: '-30px' }}
        value={props.energy}
        onChange={(event, newValue) => props.handleSliderChange(newValue, 'energy')}
      />
    </div>
    <RaisedButton
      label={`Add ${props.name} to playlist`}
      style={{ width: '100%' }}
      onTouchTap={props.handleAddArtist}
      disabled={props.name === ''}
    />
    {props.playlistSongs.length !== 0
      ? <PlaylistFrame allTracks={props.playlistSongs} />
      : null}
  </Drawer>
);

CustomDrawer.propTypes = {
  energy: PropTypes.number.isRequired,
  danceability: PropTypes.number.isRequired,
  menu: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleAddArtist: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  playlistSongs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CustomDrawer;
