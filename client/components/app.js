import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Page from './Page';
import { lightGreen } from '../../assets/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: lightGreen,
  },
});

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Switch>
        <Route exact path="/" component={Page} />
        <Route path="/visualize/:artistName" component={Page} />
        <Route path="/user/:accessToken/:refreshToken" component={Page} />
      </Switch>
    </MuiThemeProvider>
  </div>
);

export default App;
