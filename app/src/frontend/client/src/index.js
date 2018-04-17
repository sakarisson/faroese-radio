import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import dataStore from './Reducers';
import { initializeArtists } from './Data/Artists';
import App from './Components/App';

const store = createStore(dataStore);

const renderApp = () => render(<App store={store} />, document.getElementById('root'));

const initializeApp = async () => {
  await initializeArtists(store);
  renderApp();
};

store.subscribe(renderApp);
initializeApp();
registerServiceWorker();
