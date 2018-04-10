import express from 'express';
import { getArtistByName } from '../util/database';

const api = express.Router();

const handleError = (res, error) => {
  res.status(error.status).send({ error: error.message });
};

api.get('/artist', async (req, res) => {
  const { name } = req.query;
  if (name === undefined) {
    handleError(res, { status: 401, message: 'Use param: name' });
    return;
  }
  const result = await getArtistByName(name);
  if (result !== null) {
    res.send({ id: result });
  } else {
    handleError(res, { status: 404, message: `Artist: ${name} not found` });
  }
});

export default api;
