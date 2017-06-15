import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArtistCard extends Component {
  render () {
    console.log('image ' + this.props.img)
    return (
      <div>
        <h1>{this.props.name}</h1>
        <img src={this.props.img} style={{width: '50px'}}/>
      </div>
    )
  }
}

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string
}

export default ArtistCard;
