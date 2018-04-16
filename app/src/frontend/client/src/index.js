import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import dataStore from './Reducers';
import { addArtists } from './Actions/Artists';
import App from './Components/App';

const store = createStore(dataStore);

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
