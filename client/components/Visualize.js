import React, { Component } from 'react';
import Graph from './Graph.js'
import PropTypes from 'prop-types';
import ArtistCard from './ArtistCard.js';

class Visualize extends Component {
  render () {
    return (
      <div>
        <ArtistCard name={this.props.name} />
        <div style={{display: 'inline'}}>
          {this.props.data.map(function (el, i) {
            return (
              <div style={{width: '30%', display: 'block', float: 'left'}}>
                <h2>{el.albumId}</h2>
                <Graph data={el.data.data} />
              </div>
          )
          })}
        </div>
      </div>
    )
  }
}

Visualize.propTypes = {
  // Artist name
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default Visualize
