import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Components/Home';
import AllArtists from './Components/Artists/AllArtists';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/artists" component={AllArtists} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('root'));
registerServiceWorker();
