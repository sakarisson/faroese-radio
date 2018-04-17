import { addArtists, setArtistSongs } from '../Actions/Artists';

export const initializeArtists = async (store) => {
  try {
    const result = await fetch('/api/artists');
    const json = await result.json();
    store.dispatch(addArtists(json));
    return true;
  } catch (e) {
    return false;
  }
};

export const initializeArtistSongs = async (store, name) => {
  try {
    const result = await fetch(`/api/artists/${name}`);
    const songs = await result.json();
    store.dispatch(setArtistSongs({ name, songs }));
    return true;
  } catch (e) {
    return false;
  }
};

export default null;
