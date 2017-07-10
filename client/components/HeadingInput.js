import React from 'react';
import PropTypes from 'prop-types';
import { Animate } from 'react-move';
import Input from './Input';
import { darkGrey } from '../../assets/colors';

function getStyles(pathname) {
  return {
    container: {
      width: pathname === '/' ? 700 : 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: pathname === '/' ? 0 : -250,
    },
    text: {
      opacity: pathname === '/' ? 1 : 0,
      padding: 40,
      marginTop: pathname === '/' ? 40 : -250,
      cursor: 'default',
    },
    header: {
      fontSize: 60,
      padding: 15,
      fontWeight: 600,
      color: darkGrey,
    },
    subHeader: {
      fontSize: 20,
      fontWeight: 200,
    },
    inputStyles: {
      background: 'transparent',
      border: 'none',
      width: pathname === '/' ? 680 : 580,
      height: pathname === '/' ? 34 : 22,
      fontSize: pathname === '/' ? 32 : 20,
      color: darkGrey,
      outline: 'none',
      fontWeight: 400,
      padding: '0px 0px 0px 0px',
    },
    wrapperStyle: {
      position: 'absolute',
      zIndex: 99,
      top: pathname === '/' ? 300 : 100,
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
  } = props;
  const styles = getStyles(pathname);
  return (
    <Animate
      data={styles}
      duration={250}
    >
      {data => (
        <div style={data.container}>
          <div style={data.text}>
            <div style={data.header}>Find your vibe.</div>
            <div style={data.subHeader}>
              Curate personalized playlists based on energy and danceability.
            </div>
          </div>
          <Input
            onSubmit={onSubmit}
            artistName={artistName}
            dataSource={dataSource}
            onChange={onChangeArtist}
            onSelect={onSelectArtist}
            open={open}
            inputStyles={data.inputStyles}
            wrapperStyle={data.wrapperStyle}
          />
        </div>
      )}
    </Animate>
  );
};

HeadingInput.propTypes = {
  artistName: PropTypes.string,
  dataSource: PropTypes.any,
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
