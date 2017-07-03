import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { Link } from 'react-router-dom';

const styles = {
  linkStyle: {
    textDecoration: 'none',
    fontSize: '24px',
    fontFamily: 'Karla',
    color: '#FAFAFA',
    paddingRight: 30,
  },
};

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
    <Toolbar style={{ backgroundColor: '#212121', height: 50 }}>
      <ToolbarGroup firstChild>
        <IconButton onTouchTap={props.handleMenuToggle}>
          <MenuIcon color={'#FAFAFA'} style={{ height: 40, width: 40 }} />
        </IconButton>
        <Link
          to="/"
          style={styles.linkStyle}
        >
          <p className="header">SPOTIVIBE</p>
        </Link>
      </ToolbarGroup>
    </Toolbar>
    <div style={{ padding: 10 }}>
      <p>Danceability:</p>
      <Slider style={{ marginTop: '-10px', marginBottom: '-30px' }} />
      <p>Energy:</p>
      <Slider style={{ marginTop: '-10px', marginBottom: '-30px' }} />
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
  menu: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  handleAddArtist: PropTypes.func.isRequired,
  playlistSongs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CustomDrawer;
