import React, { Component } from 'react';
import Graph from './Graph.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import PropTypes from 'prop-types';
import ArtistCard from './ArtistCard.js';

class Visualize extends Component {
  constructor (props) {
    super(props);
    this.state = {
      type: 'albums'
    }
    this.onChange = this.onChange.bind(this);
    this.renderAlbumGraphs = this.renderAlbumGraphs.bind(this);
    this.renderAllSongGraphs = this.renderAllSongGraphs.bind(this);
  }

  onChange (event, value) {
    event.preventDefault();
    this.setState({
      type: value
    })
  }

  renderAllSongGraphs () {
    let allSongData = []
    this.props.data.map(function (el, i) {
      allSongData = [...allSongData, ...el.data.data]
    })
    return <Graph data={allSongData} width={800} height={800} onClick={this.props.onClick} />
  }

  renderAlbumGraphs () {
    return (
      <div style={{display: 'inline-block'}}>
        {this.props.data.map(function (el, i) {
          return (
            <div
              style={{display: 'inline-block', width: '400px', height: '400px', float: 'left'}}
              key={el.albumName}>
              <h1>{el.albumName}</h1>
              <Graph data={el.data.data} width={300} height={300} onClick={this.props.onClick} />
            </div>
        )
      }.bind(this))}
      </div>
    )
  }

  render () {
    return (
      <div>
        <ArtistCard name={this.props.name} img={this.props.img}/>
        <RadioButtonGroup
          name='type'
          defaultSelected='albums'
          onChange={this.onChange}>
          <RadioButton
            value='albums'
            label='By album'
          />
          <RadioButton
            value='all_songs'
            label='All songs'
          />
        </RadioButtonGroup>
        {this.state.type === 'albums' ? this.renderAlbumGraphs() : this.renderAllSongGraphs()}
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
