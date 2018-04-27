import express from 'express';
import {
  getArtistSongs,
  getAllArtists,
  getMostRecentSongs,
  connect,
} from '../util/database';

connect();

const api = express.Router();

api.get('/artists', async (req, res) => {
  const artists = await getAllArtists();
  res.send(artists);
});

api.get('/artists/:name', async (req, res) => {
  const { name } = req.params;
  const songs = await getArtistSongs(name);
  res.send(songs);
});

api.get('/latest', async (req, res) => {
  const songs = await getMostRecentSongs();
  res.send(songs);
});

export default api;
