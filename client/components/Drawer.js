import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import SongFrame from './SongFrame';
import { lightGreen } from '../../assets/colors';

class PlaylistFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      playing: false,
      volume: 0.5,
    };
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.handleChangeVolume = this.handleChangeVolume.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ activeIndex: null });
  }

  handlePlaySong(index) {
    if (index !== this.state.activeIndex) {
      this.setState({ activeIndex: index, playing: true });
    } else {
      this.setState({ playing: !this.state.playing });
    }
  }

  handleChangeVolume(val) {
    this.setState({ volume: val });
  }

  render() {
    const songs = this.props.allTracks.map((el) => {
      if (el) {
        return {
          id: el.id,
          trackName: el.name,
          artistName: el.artist,
          preview: el.preview,
        };
      }
      return '';
    }).filter(el => el !== '');
    const style = {
      maxHeight: 400,
      overflow: 'scroll',
      border: `3px solid ${lightGreen}`,
    };

    return (
      <div>
        <div style={style}>
          {songs.map((song, i) =>
            (<SongFrame
              key={song.id}
              trackName={song.trackName}
              id={song.id}
              artistName={song.artistName}
              isActive={i === this.state.activeIndex}
              index={i}
              handlePlaySong={this.handlePlaySong}
              preview={song.preview}
              playing={this.state.playing}
              volume={this.state.volume}
            />))}
        </div>
        <Slider value={this.state.volume} onChange={(ev, val) => this.handleChangeVolume(val)} />
        <FlatButton
          label="Save playlist on spotify"
          style={{
            borderRadius: '32px',
            fontWeight: 600,
            fontSize: 32,
            backgroundColor: lightGreen,
          }}
        />
      </div>
    );
  }
}

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
      {props.playlistSongs.length !== 0
        ? <PlaylistFrame allTracks={props.playlistSongs} />
        : null}
    </div>
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
