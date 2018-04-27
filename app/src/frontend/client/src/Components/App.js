import React from 'react';
import PropTypes from 'prop-types';
import Routes from './Routes';

const App = props => (
  <div className="container">
    <h1>Føroyskt útvarp</h1>
    <h2>
      Ein einføld skipan, har tú kann síggja upplýsingar
      um tónleik, sum verður spældur í Føroyskum útvarpi
    </h2>
    <Routes store={props.store} />
  </div>
);

App.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
};

export default App;
