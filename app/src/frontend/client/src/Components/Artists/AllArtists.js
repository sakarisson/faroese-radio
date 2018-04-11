import React from 'react';
import keyGen from '../../Helpers/KeyGenerator';

// eslint-disable-next-line react/prefer-stateless-function
class AllArtists extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: [],
    };
  }

  render() {
    return (
      <div className="allArtists">
        {this.state.artists.map(artist => <p key={`artist_${keyGen.next}`}>{artist.name}</p>)}
      </div>
    );
  }
}

export default AllArtists;
