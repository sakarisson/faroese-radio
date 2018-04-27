import { addArtists, setArtistSongs } from './Artists';
import { addLatestSongs } from './Songs';

const initialState = {
  artists: [],
  latestSongs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTISTS':
      return addArtists(state, action.payload);
    case 'ADD_ARTIST_SONGS':
      return setArtistSongs(state, action.payload);
    case 'ADD_LATEST_SONGS':
      return addLatestSongs(state, action.payload);
    default:
      return state;
  }
};
