import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import Home from './Components/Home';
import registerServiceWorker from './registerServiceWorker';
import dataStore from './Reducers';
import ArtistRoutes from './Helpers/GenerateArtistRoutes';
import { addArtists } from './Actions/Artists';

const store = createStore(dataStore);

const App = props => (
  <Router>
    <div className="container">
      <Switch>
        <Route exact path="/" render={() => <Home store={props.store} />} />
        {ArtistRoutes(props.store)}
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
};

const renderApp = () => render(<App store={store} />, document.getElementById('root'));

const initializeApp = async () => {
  const result = await fetch('/api/artists');
  const artists = await result.json();
  store.dispatch(addArtists(artists));
  renderApp();
};

store.subscribe(renderApp);
initializeApp();
registerServiceWorker();
