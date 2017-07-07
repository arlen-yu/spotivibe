import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Page from './Page';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: '#1ED760',
  },
});

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Switch>
        <Route exact path="/" component={Page} />
        <Route path="/visualize/:artistName" component={Page} />
      </Switch>
    </MuiThemeProvider>
  </div>
);

export default App;
