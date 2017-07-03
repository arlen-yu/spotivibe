import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';
import ArtistCard from './ArtistCard';

class Visualize extends Component {
  constructor(props) {
    super(props);

    this.renderAlbumGraphs = this.renderAlbumGraphs.bind(this);
    this.renderAllSongGraphs = this.renderAllSongGraphs.bind(this);
  }

  renderAllSongGraphs() {
    let allSongData = [];
    this.props.data.map(el => (allSongData = [...allSongData, ...el.data.data]));
    return (
      <div style={{ width: 500, margin: 'auto' }}>
        <p style={{ width: 150, margin: 'auto', fontSize: 34, fontWeight: 'bold' }}>All songs</p>
        <Graph data={allSongData} width={500} height={500} onClick={this.props.onClick} />
      </div>
    );
  }

  renderAlbumGraphs() {
    const style = {
      container: {
        display: 'inline-block',
        width: 300,
        height: 300,
        margin: 'auto',
      },
      header: {
        fontSize: 14,
        fontWeight: 'bold',
        width: 250,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    };
    return (
      <div style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>
        {this.props.data.map(el => (
          <div
            style={style.container}
            key={el.albumName}
          >
            <p style={style.header}>{el.albumName}</p>
            <Graph data={el.data.data} width={250} height={250} onClick={this.props.onClick} />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      name,
      data, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      img,
      popularity,
      type,
      handleRadioButton,
    } = this.props;

    return (
      <div style={{ margin: '0 auto', width: '100%', zDepth: -1 }}>
        <ArtistCard
          name={name}
          img={img}
          popularity={popularity}
          handleRadioButton={handleRadioButton}
        />
        {type === 'albums' ? this.renderAlbumGraphs() : this.renderAllSongGraphs()}
      </div>
    );
  }
}

Visualize.propTypes = {
  // Artist name
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  handleRadioButton: PropTypes.func.isRequired,
};

export default Visualize;
