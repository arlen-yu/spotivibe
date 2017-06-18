import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Visualize from './Visualize';
import Homepage from './Homepage';

class VisualizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialName: '',
      artistImg: '',
      albumInfo: [],
      data: [],
      error: false,
      uri: '',
      ready: false, // should be false to start
    };
    this.fetchData = this.fetchData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // FETCH DATA FROM API...
    this.fetchData(this.props.location.state.artistData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.artistName !== this.props.match.params.artistName) {
      this.resetState();
      this.fetchData(nextProps.location.state.artistData);
    }
  }

  onClick(uri) {
    this.setState({ uri });
  }

  fetchData(artistData) {
    if (artistData) {
      this.setState({
        officialName: artistData.name,
        artistImg: artistData.images[0].url,
      });
      fetch(`/albums/${artistData.id}`)
        .then(res => res.json())
        .then((res) => {
          if (res.albumInfo) {
            this.setState({ albumInfo: res.albumInfo });
            return res.albumInfo;
          }
          return false;
        })
        .then((albumInfo) => {
          if (albumInfo) {
            albumInfo.map(album =>
              fetch(`/visualize/feature/${album.id}`)
                .then(res => res.json())
                .then((featureData) => {
                  const newData = this.state.data;
                  newData.push({ albumName: album.name, data: featureData });
                  this.setState({ data: newData });
                }));
          }
        });
    } else {
      this.setState({ error: true });
    }
  }

  resetState() {
    this.setState({
      albumInfo: [],
      data: [],
      error: false,
      ready: false,
    });
  }

  render() {
    const iframeStyle = {
      position: 'fixed',
      bottom: 50,
      right: 50,
    };

    return (
      <div style={{ position: 'relative' }}>
        <Homepage artistName={this.props.match.params.artistName} />
        <div style={{ textAlign: 'center' }}>
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
          title="spotify-widgit"
          style={iframeStyle}
          src={this.state.uri}
          width="250"
          height="80"
          frameBorder="0"
          allowTransparency="true"
        />
      </div>
    );
  }
}

VisualizeContainer.propTypes = {
  match: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default VisualizeContainer;
