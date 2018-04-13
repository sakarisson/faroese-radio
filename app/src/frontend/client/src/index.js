import React from 'react';
import { render } from 'react-dom';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom';
import { createStore } from 'redux';
import Home from './Components/Home';
// import AllArtists from './Components/Artists/AllArtists';
import registerServiceWorker from './registerServiceWorker';
import dataStore from './Reducers';

const store = createStore(dataStore);

const App = () => (
  <div className="container">
    <Home store={store} />
  </div>
);

// const App = () => (
//   <Router>
//     <Switch>
//       <Route exact path="/" component={Home} store={store} />
//       <Route exact path="/artists" component={AllArtists} store={store} />
//     </Switch>
//   </Router>
// );

render(<App />, document.getElementById('root'));
registerServiceWorker();
