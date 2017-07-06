import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Input from './Input';

function getStyles(props) {
  return {
    container: {
      width: '80%',
      margin: 'auto',
      textAlign: 'center',
      padding: 20,
      paddingTop: props.landing ? 100 : -50,
      '-webkit-transition': 'all 0.3s ease',
      '-moz-transition': 'all 0.3s ease',
      '-o-transition': 'all 0.3s ease',
      '-ms-transition': 'all 0.3s ease',
    },
    header: {
      fontSize: props.landing ? 80 : 48,
      color: 'black',
      '-webkit-transition': 'all 0.3s ease',
      '-moz-transition': 'all 0.3s ease',
      '-o-transition': 'all 0.3s ease',
      '-ms-transition': 'all 0.3s ease',
    },
  };
}

const Homepage = (props) => {
  const {
    artistName,
    dataSource,
    handleHeaderClick,
    landing, // eslint-disable-line no-unused-vars
    onChangeArtist,
    onSelectArtist,
    onSubmit,
    open,
    onToggleMenu,
  } = props;
  const styles = getStyles(props);
  return (
    <div>
      <AppBar
        style={{
          backgroundColor: '#FAFAFA',
          width: '100%',
          padding: 0,
          margin: 0,
        }}
        title="Find your tempo with spotivibe."
        iconElementLeft={<IconButton onTouchTap={onToggleMenu}>
          <MenuIcon color={'black'} style={{ height: 40, width: 40 }} />
        </IconButton>}
      />
      <div style={styles.container}>
        <div
          role="presentation"
          style={{
            textDecoration: 'none',
            fontSize: '24px',
            fontFamily: 'Karla',
            color: '#FAFAFA',
            paddingLeft: 30,
            paddingRight: 30,
          }}
          onClick={handleHeaderClick}
        >
          <p style={styles.header}>SPOTIVIBE</p>
        </div>
        <Input
          onSubmit={onSubmit}
          artistName={artistName}
          dataSource={dataSource}
          onChange={onChangeArtist}
          onSelect={onSelectArtist}
          open={open}
        />
      </div>
    </div>
  );
};

Homepage.propTypes = {
  artistName: PropTypes.string,
  dataSource: PropTypes.any,
  landing: PropTypes.bool.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  onChangeArtist: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onSelectArtist: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
};

Homepage.defaultProps = {
  artistName: '',
  open: false,
  dataSource: [],
};

export default Homepage;
