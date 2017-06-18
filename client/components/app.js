import React, { Component } from 'react';
import Homepage from './Homepage.js';
import VisualizeContainer from './VisualizeContainer.js';
import { Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

var style = {
  margin: '0',
  padding: '0',
  fontFamily: 'sans-serif',
}

class App extends Component {
  render() {
    return (
      <div style={style}>
        <MuiThemeProvider>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/visualize/:artistName' component={VisualizeContainer} />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
