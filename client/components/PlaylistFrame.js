import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import { lightGreen } from '../../assets/colors';

class PlaylistFrame extends Component {
  shouldComponentUpdate(nextProps) {
    return (!this.props.loadingPlaylist && nextProps.loadingPlaylist) || !nextProps.loadingPlaylist;
  }

  render() {
    const style = {
      position: 'relative',
      padding: 0,
      top: -105,
      right: -250,
    };

    const baseUrl = 'https://open.spotify.com/embed?uri=spotify:track:';
    const songs = this.props.allTracks.map((el) => {
      if (el) {
        return (
          <div style={{ height: 85, width: 285, marginTop: 4 }} key={el.id}>
            <iframe
              title="spotify-frame"
              src={`${baseUrl + el.id}&theme=white`}
              height="80"
              width="280"
              frameBorder="0"
              allowTransparency="true"
            />
            <IconButton
              style={style}
              iconStyle={{ color: lightGreen }}
              onTouchTap={() => this.props.onDeleteSongs(el.id)}
            >
              <Cancel />
            </IconButton>
          </div>
        );
      }
      return '';
    }).filter(el => el !== '');

    return (
      <div style={{ height: 'calc(100% - 300px)', overflowY: 'scroll', overflowX: 'hidden', width: 295, margin: 'auto' }}>
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
  onDeleteSongs: PropTypes.func.isRequired,
};

export default PlaylistFrame;
