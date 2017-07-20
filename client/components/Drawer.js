import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';

const PlaylistFrame = (props) => {
  const baseUrl = 'https://open.spotify.com/embed?uri=spotify:track:';
  const songs = props.allTracks.map((el) => {
    if (el) {
      return (
        <iframe
          title="spotify-frame"
          src={`${baseUrl + el.id}&theme=white`}
          height="80"
          width="280"
          frameBorder="0"
          allowTransparency="true"
        />
      );
    }
    return '';
  }).filter(el => el !== '');

  return (
    <div style={{ height: 400, overflowY: 'scroll', overflowX: 'visible', padding: 8, width: 280, margin: 'auto' }}>
      {songs}
    </div>
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
    {props.playlistSongs.length !== 0
      ? <PlaylistFrame allTracks={props.playlistSongs} />
      : <div style={{ fontSize: 26, padding: 10, width: 280, margin: 'auto' }}>
        No songs! Move the sliders, or add more music!</div>}
  </Drawer>
);

CustomDrawer.propTypes = {
  energy: PropTypes.number.isRequired,
  danceability: PropTypes.number.isRequired,
  menu: PropTypes.bool.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  playlistSongs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CustomDrawer;
