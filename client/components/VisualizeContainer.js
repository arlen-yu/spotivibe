import React, { Component } from 'react';
import Visualize from './Visualize.js'
import Loading from './Loading.js'
import PropTypes from 'prop-types';
import Homepage from './Homepage.js';

var iframeStyle = {
  position: 'fixed',
  bottom: 50,
  right: 50
}

class VisualizeContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      officialName: '',
      artistImg: '',
      albumInfo: [],
      data: [],
      error: false,
      uri: '',
      ready: false //should be false to start
    }
    this.fetchData = this.fetchData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  resetState () {
    this.setState(
      {
        albumInfo: [],
        data: [],
        error: false,
        ready: false
      }
    );
  }

  fetchData (artistName) {
    fetch('/artist/id/' + artistName)
      .then(res => res.json())
      .then(function (res) {
        if (res.data) {
          this.setState({
            officialName: res.data.name,
            artistImg: res.data.img
          });
          return res.data.id;
        } else {
          this.setState({error: true});
          return false;
        }
      }.bind(this))
      .then(function (artistId) {
        return fetch('/albums/' + artistId)
      })
      .then(res => res.json())
      .then(function (res) {
        if (res.albumInfo) {
          this.setState({albumInfo: res.albumInfo});
          return res.albumInfo;
        } else {
          return false;
        }
      }.bind(this))
      .then(function (albumInfo) {
        if (albumInfo) {
          albumInfo.map(function (album) {
            fetch('/visualize/feature/' + album.id)
              .then(res => res.json())
              .then(function (featureData) {
                let newData = this.state.data;
                newData.push({albumName: album.name, data: featureData});
                this.setState({data: newData});
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

  onClick (uri) {
    this.setState({uri: uri})
  }

  render () {
    return (
      <div style={{position: 'relative'}}>
        <Homepage artistName={this.props.match.params.artistName} />
        <div style={{textAlign: 'center'}}>
          {!this.state.error
            ? <Visualize
              name={this.state.officialName}
              img={this.state.artistImg}
              data={this.state.data}
              onClick={this.onClick}
            />
            : <p>ERROR</p>}
        </div>
        <iframe
          style={iframeStyle}
          src={this.state.uri}
          width="250"
          height="80"
          frameBorder="0"
          allowTransparency="true"
        />
      </div>

    )
  }
}

VisualizeContainer.propTypes = {
  match: PropTypes.object
}

export default VisualizeContainer
