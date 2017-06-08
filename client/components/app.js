import React, { Component } from 'react';
import Homepage from './Homepage.js';
import VisualizeContainer from './VisualizeContainer.js';
import { Switch, Route } from 'react-router-dom'

var style = {
  margin: '0',
  padding: '0',
  fontFamily: 'sans-serif',
  textAlign: 'center'
}

class App extends Component {
  render() {
    return (
      <div style={style}>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/visualize/:artistName' component={VisualizeContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
