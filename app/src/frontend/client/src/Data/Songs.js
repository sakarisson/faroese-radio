import { addLatestSongs } from '../Actions/Songs';

export const initializeLatestSongs = async (store) => {
  try {
    const result = await fetch('/api/latest');
    const json = await result.json();
    store.dispatch(addLatestSongs(json));
    return true;
  } catch (e) {
    return false;
  }
};

export default null;
