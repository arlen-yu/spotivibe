import React, { Component } from 'react';
import Visualize from './Visualize.js'
import Loading from './Loading.js'
import PropTypes from 'prop-types';
import Homepage from './Homepage.js';

class VisualizeContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      albumIds: [],
      data: [],
      error: false,
      ready: false //should be false to start
    }
    this.fetchData = this.fetchData.bind(this);
  }

  resetState () {
    this.setState(
      {
        albumIds: [],
        data: [],
        error: false,
        ready: false
      }
    );
  }

  fetchData (artistName) {
    console.log('this should be empty: ' + this.state.data)
    console.log('fetching data from ' + artistName)
    fetch('/visualize/albums/' + artistName)
      .then(res => res.json())
      .then(function (res) {
        if (res.albums !== null) {
          this.setState({albumIds: res.albums});
          return res.albums;
        } else {
          console.log('false!')
          this.setState({error: true});
          return false;
        }
      }.bind(this))
      .then(function (albumIds) {
        if (albumIds) {
          albumIds.map(function (id) {
            fetch('/visualize/feature/' + id)
              .then(res => res.json())
              .then(function (featureData) {
                let newData = this.state.data
                newData.push({albumId: id, data: featureData})
                this.setState({data: newData})
              }.bind(this))
          }.bind(this))
        }
      }.bind(this))
  }

  componentDidMount () {
    // FETCH DATA FROM API...
    this.fetchData(this.props.match.params.artistName);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.artistName !== this.props.match.params.artistName) {
      this.resetState();
      this.fetchData(nextProps.match.params.artistName);
    }
  }

  render () {
    return (
      <div>
        <Homepage artistName={this.props.match.params.artistName} />
        {!this.state.error
          ? <Visualize name={this.props.match.params.artistName} data={this.state.data} />
          : <p>ERROR</p>}
      </div>

    )
  }
}

VisualizeContainer.propTypes = {
  match: PropTypes.object
}

export default VisualizeContainer
