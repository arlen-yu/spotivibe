import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  imgWrapperStyle: {
    display: 'inline-block',
    position: 'relative',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  headerStyle: {
    verticalAlign: 'top',
    fontSize: 40,
    width: 300,
    fontWeight: 'bold',
  },
  popularityStyle: {
    verticalAlign: 'top',
    marginTop: -50,
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
      popularity,
      handleRadioButton,
    } = this.props;

    return (
      <div style={{ margin: 'auto', width: '550px', padding: 30, paddingTop: 0, marginBottom: -60, zIndex: -1 }}>
        <div style={styles.imgWrapperStyle}>
          <img alt="" src={img} style={{ width: 'auto', height: '100%' }} />
        </div>
        <div style={{ display: 'inline-block', position: 'relative', top: -80, padding: 30 }}>
          <p style={styles.headerStyle}>{name}</p>
          {popularity
            ? <p style={styles.popularityStyle}>{`Popularity: ${popularity}`}</p>
            : null}
          <RadioButtonGroup
            name="type"
            defaultSelected="albums"
            onChange={handleRadioButton}
            style={{ width: 300, fontFamily: 'inherit', marginTop: -20 }}
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
  popularity: PropTypes.number,
  handleRadioButton: PropTypes.func.isRequired,
};

ArtistCard.defaultProps = {
  name: '',
  img: '',
  popularity: false,
};

export default ArtistCard;
