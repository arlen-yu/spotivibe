import { ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Scatter, Tooltip } from 'recharts';
import React, { Component, PropTypes } from 'react';

class CustomTooltip extends Component {
  render () {
    if (this.props && this.props.payload.length !== 0) {
      console.log(this.props.payload)
      var payload = this.props.payload[0].payload
      return (
        <div>
          <p>{'name: ' + payload.name}</p>
          <p>{'danceability: ' + this.props.payload[0].value}</p>
          <p>{'energy: ' + this.props.payload[1].value}</p>
        </div>
      )
    } else {
      return (<div>{'shit'}</div>)
    }
  }
}
class Graph extends Component {
  render () {
    console.log(this.props.data)
    return (
      <ScatterChart
        width={this.props.width || 300}
        height={this.props.height || 300}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis type='number' dataKey="danceability" name="danceability" />
        <YAxis type='number' dataKey="energy" name="energy" />
        <Tooltip content={<CustomTooltip />} label={'name'} payload={this.props.data} />
        <CartesianGrid strokeDasharray="3 3" />
        <Scatter name="temp" data={this.props.data} fill="#82ca9d" />
      </ScatterChart>
    )
  }
}

Graph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array
}

export default Graph
