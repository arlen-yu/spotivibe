import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import { lightGreen } from '../../assets/colors';

class PlaylistFrame extends Component {
  componentDidMount() {
    this.resetSongs(this.props);
  }

  shouldComponentUpdate(nextProps) {
    return (!this.props.loadingPlaylist && nextProps.loadingPlaylist) || !nextProps.loadingPlaylist;
  }

  render() {
    const baseUrl = 'https://open.spotify.com/embed?uri=spotify:track:';
    const songs = this.props.allTracks.map((el) => {
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
        {this.props.loadingPlaylist
          ? <div style={{ textAlign: 'center' }}>
            <div>Loading playlist</div>
            <div style={{ width: 60, margin: 'auto' }}>
              <CircularProgress color={lightGreen} size={60} />
            </div>
          </div>
          : songs}
      </div>
    );
  }
}

PlaylistFrame.propTypes = {
  allTracks: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadingPlaylist: PropTypes.bool.isRequired,
};

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
};

export default CustomDrawer;
