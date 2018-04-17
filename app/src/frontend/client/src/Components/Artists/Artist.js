import React from 'react';
import PropTypes from 'prop-types';
import keyGen from '../../Helpers/KeyGenerator';

const Artist = props => (
  <div className="artist">
    <div>{props.name}</div>
    {props.songs.map(song => <p key={keyGen.next}>{song.title}</p>)}
  </div>
);

Artist.propTypes = {
  name: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object),
};

Artist.defaultProps = {
  songs: [],
};

export default Artist;
