import React from 'react';
import PropTypes from 'prop-types';

import Song from './Song';

const LastPlayed = props => (
  <div className="lastPlayed">
    <table>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Title</th>
          <th>Station</th>
        </tr>
      </thead>
      <tbody>
        {props.songs.map(song => (
          <Song
            title={song.title}
            artist={song.title}
            station={song.station}
          />
        ))}
      </tbody>
    </table>
  </div>
);

LastPlayed.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    station: PropTypes.string.isRequired,
  })),
};

LastPlayed.defaultProps = {
  songs: [],
};

export default LastPlayed;
