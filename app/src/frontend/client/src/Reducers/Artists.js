import _ from 'underscore';

export const addArtists = (state, artists) => {
  const updatedArtists = _.union(state.artists, artists);
  return Object.assign({}, state, { artists: updatedArtists });
};

export default null;
