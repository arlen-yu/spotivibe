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
      artistData: [],
      artistsData: [],
      danceability: 0.5,
      data: [],
      energy: 0.5,
      error: false,
      menu: false,
      inputMenu: false,
      officialName: '',
      activeName: '',
      type: 'albums',
      uri: '',
      landing: true,
      allArtists: [],
      allSongs: [],
      playlistSongs: [],
    };
    this.fetchArtistData = this.fetchArtistData.bind(this);
    this.fetchArtistSearch = this.fetchArtistSearch.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAddArtist = this.handleAddArtist.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleChangePlaylistSongs = this.handleChangePlaylistSongs.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/') {
      this.fetchArtistData(this.state.artistData);
    } else {
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

  onSubmit(artistData) {
    if (artistData !== this.state.artistData) {
      this.resetState();
      this.setState({ artistData, inputMenu: false });
      this.fetchArtistData(artistData);
    }
  }

  resetState() {
    this.setState({
      albumInfo: [],
      data: [],
      error: false,
      type: 'albums',
      officialName: '',
      inputMenu: false,
    });
  }

  fetchArtistData(artistData) {
    if (artistData && artistData.id) {
      this.setState({
        officialName: artistData.name,
        artistImg: artistData.images.length > 0 ? artistData.images[0].url : '',
        artistPop: artistData.popularity,
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
                  this.setState({ data: newData, landing: false });
                }));
          }
        });
    } else {
      this.setState({ error: true });
    }
  }

  fetchArtistSearch() {
    fetch(`/artist/id/${this.state.activeName}`)
      .then(res => res.json())
      .then((res) => {
        if (res.data !== null) {
          this.setState({ artistsData: res.data, inputMenu: true });
        }
      });
  }

  handleMenuToggle() {
    this.setState({ menu: !this.state.menu });
  }

  handleAddArtist() {
    if (!this.state.allArtists.includes(this.state.officialName)) {
      let allSongData = [];
      this.state.data.map(el => (allSongData = [...allSongData, ...el.data.data]));
      const allSongs = [...this.state.allSongs, ...allSongData];
      this.handleChangePlaylistSongs(allSongs);
      this.setState({ allArtists: [...this.state.allArtists, this.state.officialName] });
    }
  }

  handleChangePlaylistSongs(allSongs) {
    let playlistSongs = [];
    allSongs.map((el) => {
      if (Math.abs(el.energy - this.state.energy) <= 0.1
        && Math.abs(el.danceability - this.state.danceability) <= 0.1) {
        playlistSongs = [...playlistSongs, el];
      }
      return el;
    });
    this.setState({ allSongs, playlistSongs });
  }

  handleSliderChange(value, type) {
    if (type === 'danceability') {
      this.setState({ danceability: value });
    } else {
      this.setState({ energy: value });
    }
    this.handleChangePlaylistSongs(this.state.allSongs);
  }

  handleHeaderClick() {
    this.resetState();
    this.setState({ landing: true });
  }

  render() {
    const {
      match,
      location,
    } = this.props;

    const {
      artistImg,
      artistPop,
      artistsData,
      danceability,
      data,
      inputMenu,
      energy,
      landing,
      error,
      menu,
      officialName,
      playlistSongs,
      type,
      uri,
    } = this.state;

    const artistName = location.pathname === '/' ? '' : match.params.artistName;
    const activeName = artistName || this.state.activeName;
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '120px' }}>
          <Drawer
            menu={menu}
            handleAddArtist={this.handleAddArtist}
            energy={energy}
            danceability={danceability}
            name={officialName}
            playlistSongs={playlistSongs}
            handleSliderChange={this.handleSliderChange}
          />
          <div className={classnames('app-content', { expanded: menu })}>
            <Homepage
              artistName={activeName}
              dataSource={artistsData}
              landing={landing}
              open={inputMenu}
              onChangeArtist={val => this.setState({ activeName: val })}
              onSelectArtist={this.onSubmit}
              onSubmit={this.fetchArtistSearch}
              onToggleMenu={this.handleMenuToggle}
              pathname={location.pathname}
              handleHeaderClick={this.handleHeaderClick}
            />
            <div>
              {landing
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
