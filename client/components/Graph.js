import { ScatterChart, XAxis, YAxis, CartesianGrid, Scatter, Tooltip, Text } from 'recharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTooltip from './CustomTooltip';

const CustomLabel = (props) => {
  const x = props.viewBox.x
  + (props.angle === 0 ? props.viewBox.width / 2 : 15);
  const y = props.viewBox.y
  + (props.angle === 0 ? props.viewBox.height + 5 : props.viewBox.height / 2);
  const style = {
    fontWeight: 'light',
    fontSize: 12,
  };
  return (
    <Text
      x={x}
      y={y}
      angle={props.angle}
      textAnchor="middle"
      style={style}
    >{props.children}</Text>
  );
};

CustomLabel.propTypes = {
  children: PropTypes.string.isRequired,
  angle: PropTypes.number,
  viewBox: PropTypes.object.isRequired,
};

CustomLabel.defaultProps = {
  angle: 0,
  viewBox: { x: 0, y: 0 },
};

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
        <XAxis
          type="number"
          dataKey="danceability"
          name="danceability"
          label={<CustomLabel>Danceability</CustomLabel>}
        />
        <YAxis
          type="number"
          dataKey="energy"
          name="energy"
          label={<CustomLabel angle={90}>Energy</CustomLabel>}
        />
        <Tooltip content={
          <CustomTooltip onClick={this.props.onClick} payload={this.props.data} />
          }
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Scatter name="temp" data={this.props.data} fill="#1ED760" />
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
