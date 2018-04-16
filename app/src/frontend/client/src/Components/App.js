import React from 'react';
import PropTypes from 'prop-types';
import Routes from './Routes';

const App = props => (
  <div className="container">
    <Routes store={props.store} />
  </div>
);

App.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
};

export default App;
