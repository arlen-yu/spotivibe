import React from 'react';
import PropTypes from 'prop-types';
import { Animate } from 'react-move';
import Input from './Input';
import { darkGrey } from '../../assets/colors';

function getStyles(pathname) {
  return {
    container: {
      width: pathname === '/' ? 900 : 600,
      margin: 'auto',
      textAlign: 'center',
      paddingTop: pathname === '/' ? 50 : -100,
    },
    header: {
      fontSize: pathname === '/' ? 50 : 0,
      fontWeight: 600,
      color: darkGrey,
      opacity: pathname === '/' ? 0.9 : 0,
    },
    inputStyles: {
      background: 'transparent',
      border: 'none',
      width: pathname === '/' ? 880 : 580,
      height: pathname === '/' ? 38 : 26,
      fontSize: pathname === '/' ? 36 : 24,
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
  } = props;
  const styles = getStyles(pathname);
  return (
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
