import React from 'react';
import PropTypes from 'prop-types';
import Artist from './Artist';
import keyGen from '../../Helpers/KeyGenerator';

const AllArtists = props => (
  <div className="allArtists">
    {props.artists.map(artist => <Artist name={artist.name} key={`artist_${keyGen.next}`} />)}
  </div>
);

AllArtists.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AllArtists;
