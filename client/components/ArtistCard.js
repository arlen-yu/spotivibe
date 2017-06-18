import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArtistCard extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name && this.props.img !== nextProps.img;
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <img alt="" src={this.props.img} style={{ width: '50px' }} />
      </div>
    );
  }
}

ArtistCard.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
};

ArtistCard.defaultProps = {
  name: '',
  img: '',
};

export default ArtistCard;
