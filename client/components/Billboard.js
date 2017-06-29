import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';

class Billboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackData: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  componentWillReceiveProps() {
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
      this.state.trackData
        ? <div style={{ width: 550, margin: 'auto' }}>
          <Graph data={this.state.trackData} width={550} height={550} onClick={onClick} />
        </div>
        : null
    );
  }
}

Billboard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Billboard;
