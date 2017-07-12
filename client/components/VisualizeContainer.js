import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import Visualize from './Visualize';
import Billboard from './Billboard';

class VisualizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialName: '',
      artistImg: '',
      artistPop: 0,
      type: 'albums',
      loading: false,
    };
    this.resetState = this.resetState.bind(this);
    this.handleRadioButton = this.handleRadioButton.bind(this);
    this.fetchArtistData = this.fetchArtistData.bind(this);
  }

  componentDidMount() {
    if (this.props.artistData) {
      this.fetchArtistData(this.props.artistData);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.artistData !== nextProps.artistData) {
      this.resetState();
      this.fetchArtistData(nextProps.artistData);
    }
  }

  resetState() {
    this.setState({
      officialName: '',
      artistImg: '',
      artistPop: 0,
    });
    this.props.updateData([]);
  }

  handleRadioButton(event, value) {
    event.preventDefault();
    this.setState({
      type: value,
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
          if (albumInfo && albumInfo.length !== 0) {
            albumInfo.map(album =>
              fetch(`/visualize/feature/${album.id}`)
                .then(res => res.json())
                .then((featureData) => {
                  const newData = this.props.data;
                  newData.push({ albumName: album.name, data: featureData });
                  this.props.updateData(newData);
                }));
          } else {
            this.props.updateData(false);
          }
        });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const {
      officialName,
      artistImg,
      artistPop,
      type,
      loading,
    } = this.state;

    if (this.props.redirect) {
      return (
        <Redirect to={{
          pathname: `/visualize/${officialName}`,
          state: { artistData: this.props.artistData },
        }}
        />
      );
    }

    return (
      <div>
        {loading ? <LinearProgress style={{ position: 'absolute', top: 64 }} /> : null}
        {this.props.pathname !== '/'
          ? <Visualize
            data={this.props.data}
            name={officialName}
            img={artistImg}
            popularity={artistPop}
            onTooltipHover={this.props.onTooltipHover}
            handleRadioButton={this.handleRadioButton}
            handleAddArtist={this.props.handleAddArtist}
            type={type}
          />
          : <Billboard
            onTooltipHover={this.props.onTooltipHover}
            handleRadioButton={this.handleRadioButton}
            handleAddBillboard={this.props.handleAddBillboard}
            data={this.props.billboardData}
          />}
      </div>
    );
  }
}

VisualizeContainer.propTypes = {
  artistData: PropTypes.any.isRequired,
  billboardData: PropTypes.arrayOf(PropTypes.any).isRequired,
  onTooltipHover: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateData: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  handleAddArtist: PropTypes.func.isRequired,
  handleAddBillboard: PropTypes.func.isRequired,
};

export default VisualizeContainer;
