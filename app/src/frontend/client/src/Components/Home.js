import React from 'react';
import PropTypes from 'prop-types';
import LastPlayed from './LastPlayed';

const Home = props => (
  <div className="home">
    <p>Heim</p>
    <LastPlayed songs={props.store.getState().latestSongs} />
  </div>
);

Home.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func.isRequired }).isRequired,
};

export default Home;
