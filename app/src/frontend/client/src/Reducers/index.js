import { addArtists, setArtistSongs } from './Artists';

const initialState = {
  artists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTISTS':
      return addArtists(state, action.payload);
    case 'ADD_ARTIST_SONGS':
      return setArtistSongs(state, action.payload);
    default:
      return state;
  }
};
