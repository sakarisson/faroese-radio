import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.SERVER_PORT || 80;

app.listen(PORT, (e) => {
  if (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } else {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${PORT}`);
  }
});
