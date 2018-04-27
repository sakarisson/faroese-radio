import React from 'react';
import PropTypes from 'prop-types';

const Song = props => (
  <tr className="lastPlayedSong">
    <td>{props.artist}</td>
    <td>{props.title}</td>
    <td>{props.station}</td>
  </tr>
);

Song.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  station: PropTypes.string.isRequired,
};

export default Song;
