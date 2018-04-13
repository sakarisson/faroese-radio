import React from 'react';
import PropTypes from 'prop-types';

const Home = props => (
  <div className="home">
    <p>Home</p>
    {props.store.getState().artists.map(artist => <p>{artist}</p>)}
  </div>
);

Home.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func }).isRequired,
};

export default Home;
