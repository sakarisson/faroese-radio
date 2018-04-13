import React from 'react';
import Artist from './Artist';
import keyGen from '../../Helpers/KeyGenerator';

// eslint-disable-next-line react/prefer-stateless-function
class AllArtists extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: [],
    };
  }

  async componentWillMount() {
    try {
      const response = await fetch('/api/artists');
      const artists = await response.json();
      this.setState({ artists });
    } catch (e) {
      // Continue
    }
  }

  render() {
    return (
      <div className="allArtists">
        {this.state.artists.map(artist => <Artist name={artist.name} key={`artist_${keyGen.next}`} />)}
      </div>
    );
  }
}

export default AllArtists;
