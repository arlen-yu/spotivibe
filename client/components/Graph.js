import { ScatterChart, XAxis, YAxis, CartesianGrid, Scatter, Tooltip } from 'recharts';
import React, { Component } from 'react';

class Graph extends Component {
  render () {    
    return (
      <ScatterChart width={300} height={300}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis type='number' dataKey="danceability" name="danceability" />
        <YAxis type='number' dataKey="energy" name="energy" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Scatter name="temp" data={this.props.data} fill="#82ca9d" />
      </ScatterChart>
    )
  }
}

export default Graph
