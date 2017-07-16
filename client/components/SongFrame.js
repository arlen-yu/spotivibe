import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import { lightGreen, lightGrey, darkGrey } from '../../assets/colors';
/* global Audio:true*/

class SongFrame extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(this.props.preview);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.playing && nextProps.isActive) {
      this.audio.play();
      this.audio.volume = nextProps.volume;
    } else {
      this.audio.pause();
    }
  }

  render() {
    const styles = {
      wrapper: {
        display: 'inline-block',
        width: '100%',
        background: this.props.isActive ? lightGreen : '#FFFFFF',
        height: 40,
        maxHeight: 40,
        padding: 5,
        border: `1px solid ${lightGrey}`,
        '-webkit-transition': 'background 300ms ease-in 200ms', /* property duration timing-function delay */
        '-moz-transition': 'background 300ms ease-in 200ms',
        '-o-transition': 'background 300ms ease-in 200ms',
        transition: 'background 300ms ease-in 200ms',
      },
      textWrapper: {
        width: 225,
        display: 'block',
        verticalAlign: 'top',
      },
      track: {
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 300,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        float: 'left',
      },
      artistName: {
        padding: 5,
        paddingTop: 0,
        fontSize: 10,
        fontWeight: 600,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        float: 'left',
      },
      iconButton: {
        width: 35,
        height: 35,
        padding: 0,
      },
    };
    return (
      <div style={styles.wrapper}>
        <div style={styles.textWrapper}>
          <div style={styles.track}>{this.props.trackName}</div>
          <div style={styles.artistName}>{this.props.artistName}</div>
        </div>
        <IconButton
          style={styles.iconButton}
          iconStyle={{ width: 25, height: 25, color: darkGrey }}
          onTouchTap={() => {
            this.props.handlePlaySong(this.props.index);
          }}
        >
          {this.props.playing && this.props.isActive ? <Pause /> : <PlayArrow />}
        </IconButton>
      </div>
    );
  }
}

SongFrame.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handlePlaySong: PropTypes.func.isRequired,
  preview: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
};

export default SongFrame;
