import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const imgWrapperStyle = {
  display: 'inline-block',
  position: 'relative',
  width: '170px',
  height: '170px',
  overflow: 'hidden',
  borderRadius: '50%',
};

const headerStyle = {
  verticalAlign: 'top',
  fontSize: 44,
  width: 300,
  fontWeight: 'bold',
};

const popularityStyle = {
  verticalAlign: 'top',
  marginTop: -50,
  fontSize: 28,
  fontStyle: 'italic',
};

class ArtistCard extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name && this.props.img !== nextProps.img;
  }

  render() {
    return (
      <div style={{ margin: 'auto', width: '550', padding: 30, paddingBottom: 0, zIndex: -1 }}>
        <div style={imgWrapperStyle}>
          <img alt="" src={this.props.img} style={{ width: 'auto', height: '100%' }} />
        </div>
        <div style={{ display: 'inline-block', position: 'relative', top: -80, padding: 30 }}>
          <p style={headerStyle}>{this.props.name}</p>
          {this.props.popularity
            ? <p style={popularityStyle}>{`Popularity: ${this.props.popularity}`}</p>
            : null}
          <RadioButtonGroup
            name="type"
            defaultSelected="albums"
            onChange={this.props.handleRadioButton}
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
