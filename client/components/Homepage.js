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
      transition: 'padding-top 0.3s ease',
      '-webkit-transition': 'padding-top 0.3s ease',
    },
    header: {
      fontSize: props.landing ? 80 : 48,
      color: '#FAFAFA',
      transition: 'font-size 0.3s ease',
      '-webkit-transition': 'font-size 0.3s ease',
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
          backgroundColor: '#4f4f4f',
          width: '100%',
          padding: 0,
        }}
        title="Find your tempo with spotivibe."
        iconElementLeft={<IconButton onTouchTap={onToggleMenu} style={{ marginLeft: 30 }}>
          <MenuIcon color={'#FAFAFA'} style={{ height: 40, width: 40 }} />
        </IconButton>}
      />
      <div style={styles.container}>
        <div
          role="presentation"
          style={{
            textDecoration: 'none',
            color: '#4f4f4f',
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
          landing={landing}
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
