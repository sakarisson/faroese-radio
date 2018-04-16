import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import keyGen from '../../Helpers/KeyGenerator';

const AllArtists = props => (
  <div className="allArtists">
    {props.store.getState().artists.map(artist => <Link to={`/artists/${artist.name}`} key={keyGen.next}><p>{artist.name}</p></Link>)}
  </div>
);

AllArtists.propTypes = {
  store: PropTypes.shape({ getState: PropTypes.func }).isRequired,
};

export default AllArtists;
