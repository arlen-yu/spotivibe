import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animate } from 'react-move';
import Snackbar from 'material-ui/Snackbar';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import HeadingInput from './HeadingInput';
import Drawer from './Drawer';
import VisualizeContainer from './VisualizeContainer';
import { black, lightGreen } from '../../assets/colors';


class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allArtists: [],
      artist: '',
      artistData: false,
      artistsData: [],
      billboardData: [],
      featureData: [],
      inputMenuOpen: false,
      drawerOpen: false,
      energy: 0.5,
      danceability: 0.5,
      allSongs: [],
      activeSongs: [],
      uri: '',
      redirect: false,
      artistError: false,
    };
    this.onSelectArtist = this.onSelectArtist.bind(this);
    this.resetProps = this.resetProps.bind(this);
    this.fetchArtistSearch = this.fetchArtistSearch.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleAddArtist = this.handleAddArtist.bind(this);
    this.handleAddBillboard = this.handleAddBillboard.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleChangePlaylistSongs = this.handleChangePlaylistSongs.bind(this);
  }

  componentDidMount() {
    // Initialize billboard data
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/') {
      this.resetProps();
    } else if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ redirect: false });
    }
  }

  onSelectArtist(artistData) {
    this.setState({ artistData, inputMenuOpen: false, redirect: true });
  }

  resetProps() {
    this.setState({
      artist: '',
      artistData: false,
      artistsData: [],
      featureData: [],
      redirect: false,
    });
  }

  fetchData() {
    fetch('/playlist/top100')
      .then(res => res.json())
      .then((res) => {
        this.setState({ billboardData: res.data });
      });
  }

  fetchArtistSearch() {
    fetch(`/artist/id/${this.state.artist}`)
      .then(res => res.json())
      .then((res) => {
        if (res.data !== null) {
          this.setState({ artistsData: res.data, inputMenuOpen: true });
        } else {
          this.setState({ artistError: true });
        }
      });
  }

  handleAddArtist() {
    if (!this.state.allArtists.includes(this.state.artist)) {
      let allSongData = [];
      this.state.featureData.map(el => (allSongData = [...allSongData, ...el.data.data]));
      const allSongs = [...this.state.allSongs, ...allSongData];
      this.handleChangePlaylistSongs(allSongs);
      this.setState({ allArtists: [...this.state.allArtists, this.state.artist] });
    }
    this.setState({ drawerOpen: true });
  }

  handleAddBillboard() {
    if (!this.state.allArtists.includes('billboard')) {
      let allSongData = [];
      this.state.billboardData.map(el => (allSongData = [...allSongData, el]));
      const allSongs = [...this.state.allSongs, ...allSongData];
      this.handleChangePlaylistSongs(allSongs);
      this.setState({ allArtists: [...this.state.allArtists, 'billboard'] });
    }
    this.setState({ drawerOpen: true });
  }

  handleSliderChange(value, type) {
    if (type === 'danceability') {
      this.setState({ danceability: value }, () => {
        this.handleChangePlaylistSongs(this.state.allSongs);
      });
    } else {
      this.setState({ energy: value }, () => {
        this.handleChangePlaylistSongs(this.state.allSongs);
      });
    }
  }

  handleChangePlaylistSongs(allSongs) {
    let activeSongs = [];
    allSongs.map((el) => {
      if (Math.abs(el.energy - this.state.energy) <= 0.1
        && Math.abs(el.danceability - this.state.danceability) <= 0.1) {
        activeSongs = [...activeSongs, el];
      }
      return el;
    });
    this.setState({ allSongs, activeSongs });
  }


  render() {
    const d = {
      closed: {
        margin: '0 0 0 0',
        paddingLeft: 0,
        paddingRight: '20px !important',
      },
      open: {
        paddingLeft: 300,
      },
    };

    const {
      artist,
      artistData,
      artistsData,
      billboardData,
      inputMenuOpen,
      drawerOpen,
      energy,
      danceability,
      activeSongs,
      uri,
      redirect,
    } = this.state;

    const {
      location,
    } = this.props;

    return (
      <div>
        <Drawer
          menu={drawerOpen}
          energy={energy}
          danceability={danceability}
          playlistSongs={activeSongs}
          handleSliderChange={this.handleSliderChange}
        />
        <Animate
          data={drawerOpen ? d.open : d.closed}
          duration={250}
        >
          {data => (<div style={data}>
            <AppBar
              style={{
                backgroundColor: black,
                width: '100%',
                padding: 0,
              }}
              title={<Link
                to="/"
                style={{
                  textDecoration: 'none',
                  fontSize: '24px',
                  fontFamily: 'San Francisco',
                  fontWeight: 500,
                  color: lightGreen,
                }}
              >
                spotivibe
              </Link>}
              iconElementLeft={<IconButton
                onTouchTap={() => { this.setState({ drawerOpen: !drawerOpen }); }}
                style={{ marginLeft: 30, padding: 0 }}
                iconStyle={{ height: 40, width: 40 }}
                tooltip={drawerOpen ? 'Hide playlist' : 'Show playlist'}
              >
                {drawerOpen
                  ? <ChevronLeft color={lightGreen} />
                  : <ChevronRight color={lightGreen} />}
              </IconButton>}
            />
            <HeadingInput
              artistName={artist}
              dataSource={artistsData}
              open={inputMenuOpen}
              onChangeArtist={val => this.setState({ artist: val })}
              onSelectArtist={this.onSelectArtist}
              onSubmit={this.fetchArtistSearch}
              pathname={location.pathname}
              handleHeaderClick={() => { this.setState({ artistData: false }); }}
            />
            <VisualizeContainer
              artistData={artistData}
              onTooltipHover={u => this.setState({ uri: u })}
              data={this.state.featureData}
              updateData={newData => this.setState({ featureData: newData })}
              redirect={redirect}
              handleAddArtist={this.handleAddArtist}
              handleAddBillboard={this.handleAddBillboard}
              pathname={location.pathname}
              billboardData={billboardData}
            />
          </div>)}
        </Animate>
        <iframe
          title="spotify-widgit"
          src={uri}
          style={{ position: 'fixed', bottom: 20, right: 20 }}
          width="250"
          height="80"
          frameBorder="0"
          allowTransparency="true"
        />
        <Snackbar
          open={this.state.artistError}
          message="Artist not found!"
          autoHideDuration={3000}
          onRequestClose={() => this.setState({ artistError: false })}
        />
      </div>
    );
  }
}

Page.propTypes = {
  location: PropTypes.any.isRequired,
};

export default Page;
