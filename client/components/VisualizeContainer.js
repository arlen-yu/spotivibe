import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
          if (albumInfo) {
            albumInfo.map(album =>
              fetch(`/visualize/feature/${album.id}`)
                .then(res => res.json())
                .then((featureData) => {
                  const newData = this.props.data;
                  newData.push({ albumName: album.name, data: featureData });
                  this.props.updateData(newData);
                }));
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
        {this.props.data.length > 0
          ? <Visualize
            data={this.props.data}
            name={officialName}
            img={artistImg}
            popularity={artistPop}
            onTooltipHover={this.props.onTooltipHover}
            handleRadioButton={this.handleRadioButton}
            type={type}
          />
          : <Billboard
            onTooltipHover={this.props.onTooltipHover}
            handleRadioButton={this.handleRadioButton}
          />}
      </div>
    );
  }
}

VisualizeContainer.propTypes = {
  artistData: PropTypes.any.isRequired,
  onTooltipHover: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateData: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export default VisualizeContainer;
