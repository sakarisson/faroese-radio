import _ from 'underscore';

export const addArtists = (state, artists) => {
  const artistObjects = artists.map(artist => ({ name: artist.name, songs: [] }));
  const updatedArtists = _.union(state.artists, artistObjects);
  return Object.assign({}, state, { artists: updatedArtists });
};

export const setArtistSongs = (state, data) => {
  const { artists } = state;
  const artist = _.findWhere(artists, { name: data.name });
  if (artist === undefined) {
    return state;
  }
  artist.songs = data.songs;
  return Object.assign({}, state);
};

export default null;
