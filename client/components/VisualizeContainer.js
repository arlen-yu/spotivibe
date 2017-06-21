import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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
      type: 'albums',
      ready: false, // should be false to start
    };
    this.fetchData = this.fetchData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
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
      ready: false,
    });
  }

  fetchData(artistData) {
    if (artistData) {
      this.setState({
        officialName: artistData.name,
        artistImg: artistData.images.length > 0 ? artistData.images[0].url : '',
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
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '120' }}>
          <Homepage artistName={this.props.match.params.artistName} landing={false} />
          <div>
            {!this.state.error
              ? <Visualize
                name={this.state.officialName}
                img={this.state.artistImg}
                data={this.state.data}
                onClick={this.onClick}
                type={this.state.type}
              />
              : <p>ERROR</p>}
          </div>
        </div>
        <Toolbar style={{ position: 'fixed', bottom: 0, left: 0, height: 120, width: '100%' }}>
          <ToolbarGroup>
            <RadioButtonGroup
              name="type"
              defaultSelected="albums"
              onChange={this.onChange}
              style={{ width: 300 }}
            >
              <RadioButton
                value="albums"
                label="By albums"
              />
              <RadioButton
                value="all_songs"
                label="All songs"
              />
            </RadioButtonGroup>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={this.state.uri !== '' ? 'Now listening ' : ''} />
            <iframe
              title="spotify-widgit"
              src={this.state.uri}
              width="250"
              height="80"
              frameBorder="0"
              allowTransparency="true"
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

VisualizeContainer.propTypes = {
  match: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default VisualizeContainer;
