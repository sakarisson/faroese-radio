import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { createStore } from 'redux';
import Home from './Components/Home';
import registerServiceWorker from './registerServiceWorker';
import dataStore from './Reducers';
import ArtistRoutes from './Helpers/GenerateArtistRoutes';

const store = createStore(dataStore);

const App = () => (
  <Router>
    <div className="container">
      <Switch>
        <Route exact path="/" render={() => <Home store={store} />} />
        {ArtistRoutes(store)}
      </Switch>
    </div>
  </Router>
);

const initializeApp = async () => {
  const result = await fetch('/api/artists');
  const artists = await result.json();
  store.dispatch({ type: 'ADD_ARTISTS', payload: artists });
  render(<App />, document.getElementById('root'));
};

initializeApp();
registerServiceWorker();
