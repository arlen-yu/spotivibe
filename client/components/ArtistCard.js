import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArtistCard extends Component {
  render () {
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    )
  }
}

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired
}

export default ArtistCard;
