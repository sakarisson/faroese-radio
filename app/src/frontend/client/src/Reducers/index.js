import { addArtists } from './Artists';

const initialState = {
  artists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTISTS':
      return addArtists(state, action.payload);
    default:
      return state;
  }
};
