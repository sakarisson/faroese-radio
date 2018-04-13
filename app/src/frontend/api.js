import express from 'express';
import {
  getArtistSongs,
  getAllArtists,
  getMostRecentSongs,
  connect,
} from '../util/database';

connect();

const api = express.Router();

const handleError = (res, error) => {
  res.status(error.status).send({ error: error.message });
};

api.get('/artists', async (req, res) => {
  const { name } = req.query;
  if (name === undefined) {
    const artists = await getAllArtists();
    res.send(artists);
  } else {
    const songs = await getArtistSongs(name);
    if (songs.length === 0) {
      handleError(res, { status: 404, message: `Artist: ${name} not found` });
      return;
    }
    res.send({ songs });
  }
});

api.get('/recent', async (req, res) => {
  const songs = await getMostRecentSongs();
  res.send({ songs });
});

export default api;
