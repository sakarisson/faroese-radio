import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ArtistRoutes from './GenerateArtistRoutes';
import Home from '../Home';

const Routes = props => (
  <div className="routesContainer">
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home store={props.store} />} />
        {ArtistRoutes(props.store)}
      </Switch>
    </Router>
  </div>
);

Routes.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
};

export default Routes;
