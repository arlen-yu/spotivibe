import { ScatterChart, XAxis, YAxis, CartesianGrid, Scatter, Tooltip } from 'recharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTooltip from './CustomTooltip';

class Graph extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.data.length !== nextProps.data.length) {
      return true;
    }
    for (let i = 0; i < this.props.data.length; i += 1) {
      if (JSON.stringify(this.props.data[i]) !== JSON.stringify(nextProps.data[i])) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <ScatterChart
        width={this.props.width || 300}
        height={this.props.height || 300}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <XAxis type="number" dataKey="danceability" name="danceability" />
        <YAxis type="number" dataKey="energy" name="energy" />
        <Tooltip content={
          <CustomTooltip onClick={this.props.onClick} payload={this.props.data} />
          }
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Scatter name="temp" data={this.props.data} fill="#82ca9d" />
      </ScatterChart>
    );
  }
}

Graph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  /* On tooltip click */
  onClick: PropTypes.func.isRequired,
};

Graph.defaultProps = {
  data: [],
};

export default Graph;
