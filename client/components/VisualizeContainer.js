import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Drawer from './Drawer';
import Visualize from './Visualize';
import Homepage from './Homepage';
import Billboard from './Billboard';

class VisualizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistImg: '',
      artistPop: null,
      data: [],
      error: false,
      menu: false,
      officialName: '',
      type: 'albums',
      uri: '',
      playlistSongs: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddArtist = this.handleAddArtist.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/') {
      this.fetchData(this.props.location.state.artistData);
    } else {
      this.resetState();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.resetState();
    if (nextProps.match.params.artistName !== this.props.match.params.artistName
          && nextProps.location.pathname !== '/') {
      this.fetchData(nextProps.location.state.artistData);
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

  handleMenuToggle() {
    this.setState({ menu: !this.state.menu });
  }

  handleAddArtist() {
    let allSongData = [];
    this.state.data.map(el => (allSongData = [...allSongData, ...el.data.data]));
    this.setState({ playlistSongs: allSongData });
  }

  render() {
    const {
      match,
      location,
    } = this.props;

    const {
      artistImg,
      artistPop,
      data,
      error,
      menu,
      officialName,
      playlistSongs,
      type,
      uri,
    } = this.state;

    const artistName = location.pathname === '/' ? '' : match.params.artistName;

    return (
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '120px' }}>
          <Drawer
            menu={menu}
            handleAddArtist={this.handleAddArtist}
            handleMenuToggle={this.handleMenuToggle}
            name={officialName}
            playlistSongs={playlistSongs}
          />
          <div style={{ paddingTop: 50 }}>
            <Homepage
              artistName={artistName}
              landing={false}
              onToggleMenu={this.handleMenuToggle}
            />
            <div className={classnames('app-content', { expanded: menu })}>
              {location.pathname === '/'
                ? <Billboard onClick={this.onClick} />
                : null}
              {!error && data.length
                ? <Visualize
                  name={officialName}
                  img={artistImg}
                  popularity={artistPop}
                  data={data}
                  onClick={this.onClick}
                  type={type}
                  handleRadioButton={this.onChange}
                />
                : null}
            </div>
          </div>
          <iframe
            title="spotify-widgit"
            src={uri}
            style={{ position: 'fixed', bottom: 20, right: 20 }}
            width="250"
            height="80"
            frameBorder="0"
            allowTransparency="true"
          />
        </div>
      </div>
    );
  }
}

VisualizeContainer.propTypes = {
  match: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default VisualizeContainer;
