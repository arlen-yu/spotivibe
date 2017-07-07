import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Input from './Input';

function getStyles() {
  return {
    container: {
      width: '80%',
      margin: 'auto',
      textAlign: 'center',
      padding: 20,
      paddingTop: -50,
      transition: 'padding-top 0.3s ease',
      '-webkit-transition': 'padding-top 0.3s ease',
    },
    header: {
      fontSize: 48,
      color: '#FAFAFA',
      transition: 'font-size 0.3s ease',
      '-webkit-transition': 'font-size 0.3s ease',
    },
  };
}

const HeadingInput = (props) => {
  const {
    artistName,
    dataSource,
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
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            fontSize: '24px',
            fontFamily: 'Karla',
            color: '#FAFAFA',
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <p style={styles.header}>SPOTIVIBE</p>
        </Link>
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

HeadingInput.propTypes = {
  artistName: PropTypes.string,
  dataSource: PropTypes.any,
  onToggleMenu: PropTypes.func.isRequired,
  onChangeArtist: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onSelectArtist: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

HeadingInput.defaultProps = {
  artistName: '',
  open: false,
  dataSource: [],
};

export default HeadingInput;
