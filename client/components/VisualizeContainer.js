import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Visualize from './Visualize';
import Homepage from './Homepage';
import Billboard from './Billboard';

class VisualizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialName: '',
      artistImg: '',
      artistPop: null,
      albumInfo: [],
      data: [],
      error: false,
      uri: '',
      type: 'albums',
    };
    this.fetchData = this.fetchData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // FETCH DATA FROM API...
    if (this.props.location.pathname !== '/') {
      this.fetchData(this.props.location.state.artistData);
    } else {
      this.resetState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.artistName !== this.props.match.params.artistName
          && nextProps.location.pathname !== '/') {
      this.resetState();
      this.fetchData(nextProps.location.state.artistData);
    } else if (nextProps.location.pathname === '/') {
      this.resetState();
    }
  }

  onClick(uri) {
    this.setState({ uri });
  }

  onChange(event, value) {
    event.preventDefault();
    this.setState({
      type: value,
    });
  }

  resetState() {
    this.setState({
      albumInfo: [],
      data: [],
      error: false,
      type: 'albums',
    });
  }

  fetchData(artistData) {
    if (artistData && artistData.id) {
      this.setState({
        officialName: artistData.name,
        artistImg: artistData.images.length > 0 ? artistData.images[0].url : '',
        artistPop: artistData.popularity,
        loading: true,
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

  render() {
    const artistName = this.props.location.pathname === '/' ? '' : this.props.match.params.artistName;
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '120px' }}>
          <Homepage artistName={artistName} landing={false} />
          <div>
            {this.props.location.pathname === '/'
              ? <Billboard onClick={this.onClick} />
              : null}
            {!this.state.error && this.state.data.length
              ? <Visualize
                name={this.state.officialName}
                img={this.state.artistImg}
                popularity={this.state.artistPop}
                data={this.state.data}
                onClick={this.onClick}
                type={this.state.type}
                handleRadioButton={this.onChange}
              />
              : null}
          </div>
        </div>
        <iframe
          title="spotify-widgit"
          src={this.state.uri}
          style={{ position: 'fixed', bottom: 20, right: 20 }}
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
