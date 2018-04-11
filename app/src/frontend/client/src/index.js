import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Home from './Components/Home';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);

render(<App />, document.getElementById('root'));
registerServiceWorker();
