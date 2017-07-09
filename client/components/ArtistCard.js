import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { lightGreen } from '../../assets/colors';

const styles = {
  artistCardContainer: {
    margin: 'auto',
    width: '700px',
    padding: 30,
    paddingTop: 0,
    marginBottom: -60,
    zIndex: -1,
  },
  imgWrapperStyle: {
    float: 'left',
    position: 'relative',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  headerStyle: {
    fontSize: 40,
    maxWidth: 300,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    float: 'left',
    fontWeight: 'bold',
  },
  buttonStyle: {
    float: 'left',
  },
  popularityStyle: {
    fontSize: 24,
    fontStyle: 'italic',
  },
};

class ArtistCard extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name && this.props.img !== nextProps.img;
  }

  render() {
    const {
      name,
      img,
      handleRadioButton,
      handleAddArtist,
      type,
    } = this.props;

    const actionButton = (
      <FloatingActionButton
        mini
        onTouchTap={handleAddArtist}
        iconStyle={{
          fill: lightGreen,
          color: lightGreen,
        }}
        style={{
          padding: 0,
          marginLeft: 10,
        }}
        zDepth={0}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    return (
      <div style={styles.artistCardContainer}>
        <div style={styles.imgWrapperStyle}>
          <img alt="" src={img} style={{ width: 'auto', height: '100%' }} />
        </div>
        <div style={{ float: 'left', position: 'relative', padding: 30 }}>
          <div>
            <div style={styles.headerStyle}>{name}</div>
            <div style={styles.buttonStyle}>{actionButton}</div>
          </div>
          <RadioButtonGroup
            name="type"
            defaultSelected={type}
            onChange={handleRadioButton}
            style={{ width: 300, fontFamily: 'inherit', marginTop: 0 }}
          >
            <RadioButton
              value="albums"
              label="By albums"
              iconStyle={{ fill: '#212121' }}
              labelStyle={{ fontFamily: 'inherit' }}
            />
            <RadioButton
              value="all_songs"
              label="All songs"
              iconStyle={{ fill: '#212121' }}
              labelStyle={{ fontFamily: 'inherit' }}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}

ArtistCard.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  handleRadioButton: PropTypes.func.isRequired,
  handleAddArtist: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

ArtistCard.defaultProps = {
  name: '',
  img: '',
  popularity: false,
};

export default ArtistCard;
