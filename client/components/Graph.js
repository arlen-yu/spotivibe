import { ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Scatter, Tooltip } from 'recharts';
import { Paper } from 'material-ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var paperStyle = {
  height: 200,
  width: 200,
  margin: 20
}
class CustomTooltip extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps && nextProps.payload.length !== 0) {
      var uri = 'https://open.spotify.com/embed?uri=' + nextProps.payload[0].payload.uri;
      nextProps.onClick(uri);
    }
  }

  render () {
    if (this.props && this.props.payload.length !== 0) {
      console.log('rendering tooltip!')
      var payload = this.props.payload[0].payload;
      return (
        <Paper style={paperStyle} zDepth={2}>
          <h2>{payload.name}</h2>
          <p>{'danceability: ' + this.props.payload[0].value}</p>
          <p>{'energy: ' + this.props.payload[1].value}</p>
        </Paper>
      )
    } else {
      return (<div>{'shit'}</div>)
    }
  }
}


class Graph extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.data.length !== nextProps.data.length) {
      return true;
    }
    for (let i = 0; i < this.props.data.length; i++) {
      if (JSON.stringify(this.props.data[i]) !== JSON.stringify(nextProps.data[i])) {
        return true;
      }
    }
    return false;
  }

  render () {
    return (
      <ScatterChart
        width={this.props.width || 300}
        height={this.props.height || 300}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis type='number' dataKey="danceability" name="danceability" />
        <YAxis type='number' dataKey="energy" name="energy" />
        <Tooltip content={<CustomTooltip onClick={this.props.onClick} payload={this.props.data} />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Scatter name="temp" data={this.props.data} fill="#82ca9d" />
      </ScatterChart>
    )
  }
}

Graph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  /* On tooltip click */
  onClick: PropTypes.func
}

export default Graph
