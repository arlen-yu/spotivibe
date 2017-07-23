import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import { lightGreen } from '../../assets/colors';
import PlaylistFrame from './PlaylistFrame';

const CustomDrawer = props => (
  <Drawer open={props.menu} width={300}>
    <div style={{ padding: 10 }}>
      <p>Danceability: {props.danceability}</p>
      <Slider
        style={{ marginTop: '-10px', marginBottom: '-30px' }}
        value={props.danceability}
        onChange={(event, newValue) => props.handleSliderChange(newValue, 'danceability')}
        onDragStart={() => props.handleSliderDragStart()}
        onDragStop={() => props.handleSliderDragStop()}
      />
      <p>Energy: {props.energy}</p>
      <Slider
        style={{ marginTop: '-10px', marginBottom: '-30px' }}
        value={props.energy}
        onChange={(event, newValue) => props.handleSliderChange(newValue, 'energy')}
        onDragStop={() => props.handleSliderDragStop()}
        onDragStart={() => props.handleSliderDragStart()}
      />
    </div>
    {props.playlistSongs.length !== 0
      ? <PlaylistFrame
        allTracks={props.playlistSongs}
        loadingPlaylist={props.loadingPlaylist}
        onDeleteSongs={props.onDeleteSongs}
      />
      : <div style={{ fontSize: 26, padding: 10, width: 280, margin: 'auto' }}>
        No songs! Move the sliders, or add more music!</div>}
    <div style={{ width: 140, margin: 'auto' }}>
      <a href="/login">
        <FlatButton
          label="save on spotify"
          style={{
            borderRadius: '32px',
            fontWeight: 600,
            fontSize: 32,
            backgroundColor: lightGreen,
          }}
        />
      </a>
    </div>
  </Drawer>
);

CustomDrawer.propTypes = {
  energy: PropTypes.number.isRequired,
  danceability: PropTypes.number.isRequired,
  menu: PropTypes.bool.isRequired,
  loadingPlaylist: PropTypes.bool.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleSliderDragStart: PropTypes.func.isRequired,
  handleSliderDragStop: PropTypes.func.isRequired,
  playlistSongs: PropTypes.arrayOf(PropTypes.any).isRequired,
  onDeleteSongs: PropTypes.func.isRequired,
};

export default CustomDrawer;
