import _ from 'underscore';

export const addLatestSongs = (state, songs) => {
  const previousLatestSongs = state.latestSongs;
  const updatedLatestSongs = _.union(previousLatestSongs, songs);
  return Object.assign({}, state, { latestSongs: updatedLatestSongs });
};

export default null;
