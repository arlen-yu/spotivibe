import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import Graph from './Graph';

const styles = {
  headerStyle: {
    fontSize: 42,
    textAlign: 'center',
  },
  infoStyle: {
    fontSize: 18,
    width: '550px',
    margin: 'auto',
  },
};

class Billboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackData: null,
      mounted: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/playlist/top100')
      .then(res => res.json())
      .then((res) => {
        this.setState({ trackData: res.data });
      });
  }

  render() {
    const { onClick } = this.props;
    return (
      <div>
        <p style={styles.headerStyle}>Find your tempo.</p>
        <p style={styles.infoStyle}>
          Spotivibe is a way to visualize the danceability of your favourite tracks.
          Type in a desired artist in the input bar above, or see the Billboard Top 100 below.
        </p>
        {this.state.trackData
          ? <div style={{ width: 550, margin: 'auto', textAlign: 'center' }}>
            <p style={{ fontSize: 28 }}>Billboard Top 100</p>
            <Graph data={this.state.trackData} width={550} height={550} onClick={onClick} />
          </div>
          : <div style={{ width: 80, margin: 'auto', marginTop: '200px', textAlign: 'center' }}>
            <p>Loading... </p>
            <CircularProgress
              size={80}
              thickness={5}
              color="#212121"
            />
          </div>}
      </div>
    );
  }
}

Billboard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Billboard;
