import express from 'express';
import path from 'path';
import api from './api';

const app = express();

app.use('/api', api);

if (process.env.MODE === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

export default app;
