import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import { Animate } from 'react-move';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Input from './Input';
import { black, lightGreen, darkGrey } from '../../assets/colors';

function getStyles(pathname) {
  return {
    container: {
      width: '80%',
      margin: 'auto',
      textAlign: 'center',
      padding: 20,
      paddingTop: pathname === '/' ? 50 : -100,
    },
    header: {
      fontSize: pathname === '/' ? 60 : 0,
      fontWeight: 600,
      color: darkGrey,
      opacity: pathname === '/' ? 0.9 : 0,
    },
    inputStyles: {
      background: 'transparent',
      border: 'none',
      width: pathname === '/' ? 900 : 600,
      height: pathname === '/' ? 50 : 26,
      fontSize: pathname === '/' ? 48 : 24,
      color: 'black',
      outline: 'none',
      fontWeight: 400,
      padding: '0px 0px 0px 0px',
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
    pathname,
    onToggleMenu,
  } = props;
  const styles = getStyles(pathname);
  return (
    <div>
      <AppBar
        style={{
          backgroundColor: black,
          width: '100%',
          padding: 0,
        }}
        title={<Link
          to="/"
          style={{
            textDecoration: 'none',
            fontSize: '24px',
            fontFamily: 'San Francisco',
            fontWeight: 500,
            paddingLeft: 30,
            paddingRight: 30,
            color: lightGreen,
          }}
        >
          spotivibe
        </Link>}
        iconElementLeft={<IconButton onTouchTap={onToggleMenu} style={{ marginLeft: 30 }}>
          <MenuIcon color={lightGreen} style={{ height: 40, width: 40 }} />
        </IconButton>}
      />
      <div>
        <Animate
          data={styles}
          duration={250}
        >
          {data => (
            <div style={data.container}>
              <p style={data.header}>Find your vibe.</p>
              <Input
                onSubmit={onSubmit}
                artistName={artistName}
                dataSource={dataSource}
                onChange={onChangeArtist}
                onSelect={onSelectArtist}
                open={open}
                inputStyles={data.inputStyles}
              />
            </div>
          )}
        </Animate>
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
  pathname: PropTypes.string.isRequired,
};

HeadingInput.defaultProps = {
  artistName: '',
  open: false,
  dataSource: [],
};

export default HeadingInput;
