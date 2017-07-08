import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { lightGreen } from '../../assets/colors';
import Graph from './Graph';

class Billboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackData: null,
      viewBillboard: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.setState({ viewBillboard: false });
  }

  fetchData() {
    fetch('/playlist/top100')
      .then(res => res.json())
      .then((res) => {
        this.setState({ trackData: res.data });
      });
  }

  render() {
    const { onTooltipHover } = this.props;
    let field;
    if (this.state.trackData && this.state.viewBillboard) {
      field = (<div style={{ width: 550, margin: 'auto', textAlign: 'center' }}>
        <p style={{ fontSize: 28 }}>Billboard Top 100</p>
        <Graph
          data={this.state.trackData}
          width={550}
          height={550}
          onClick={onTooltipHover}
        />
      </div>);
    } else if (!this.state.viewBillboard) {
      field = (<div style={{ width: 550, margin: 'auto', textAlign: 'center' }}>
        <FlatButton
          onTouchTap={() => {
            this.setState({ viewBillboard: true });
            this.fetchData();
          }}
          label="view billboard top 100"
          style={{
            borderRadius: '32px',
            fontWeight: 600,
            fontSize: 32,
            backgroundColor: lightGreen,
          }}
        />
      </div>);
    } else {
      field = (<div style={{ width: 80, margin: 'auto', marginTop: '200px', textAlign: 'center' }}>
        <p>Loading... </p>
        <CircularProgress
          size={80}
          thickness={5}
          color="#212121"
        />
      </div>);
    }
    return (
      <div>
        {field}
      </div>
    );
  }
}

Billboard.propTypes = {
  onTooltipHover: PropTypes.func.isRequired,
};

export default Billboard;
