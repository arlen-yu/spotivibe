import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import { lightGreen } from '../../assets/colors';
import PlaylistFrame from './PlaylistFrame';

const styles = {
  subtext: {
    fontSize: 15,
    fontWeight: 200,
    padding: 5,
    marginTop: -5,
  },
  header: {
    fontSize: 30,
    fontWeight: 200,
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const CustomDrawer = props => (
  <Drawer open={props.menu} width={300}>
    <div style={{ padding: 10 }}>
      <div style={styles.header}>{'Your Playlist'}</div>
      <div style={styles.subtext}>Danceability: {props.danceability}</div>
      <Slider
        style={{ marginTop: '-20px', marginBottom: '-30px' }}
        value={props.danceability}
        onChange={(event, newValue) => props.handleSliderChange(newValue, 'danceability')}
        onDragStart={() => props.handleSliderDragStart()}
        onDragStop={() => props.handleSliderDragStop()}
      />
      <div style={styles.subtext}>Energy: {props.energy}</div>
      <Slider
        style={{ marginTop: '-20px', marginBottom: '-30px' }}
        value={props.energy}
        onChange={(event, newValue) => props.handleSliderChange(newValue, 'energy')}
        onDragStop={() => props.handleSliderDragStop()}
        onDragStart={() => props.handleSliderDragStart()}
      />
    </div>
    <div style={{ width: 200, margin: 'auto' }}>
      <a href="/login">
        <FlatButton
          label="save on spotify"
          style={{
            width: 200,
            borderRadius: '32px',
            fontWeight: 600,
            fontSize: 32,
            marginBottom: 20,
            backgroundColor: lightGreen,
          }}
        />
      </a>
    </div>
    {props.playlistSongs.length !== 0
      ? <PlaylistFrame
        allTracks={props.playlistSongs}
        loadingPlaylist={props.loadingPlaylist}
        onDeleteSongs={props.onDeleteSongs}
      />
      : <div style={{ fontSize: 26, padding: 10, width: 280, margin: 'auto' }}>
        No songs! Move the sliders, or add more music!</div>}
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
