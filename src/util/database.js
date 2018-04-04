import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const client = new Client({
  user: process.env.DBUSER,
  database: process.env.DATABASE,
  host: process.env.DBHOST,
  password: process.env.DBPASSWORD,
  port: 5432,
  idltTimeoutMillis: 3000,
});

client.connect((e) => {
  if (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  } else {
    // eslint-disable-next-line no-console
    console.log('Database client connected');
  }
});

export const getStationId = async (shortName) => {
  try {
    const result = await client.query('select * from stations where short_name = $1', [shortName]);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
};

export const getLastStationSong = async (shortName) => {
  try {
    const result = await client.query(`
      select songs.artist, songs.title
      from songs, stations
      where songs.fk_stations = stations.id
      and stations.short_name = $1
      order by songs.id desc
      limit 1`, [shortName]);
    const { artist, title } = result.rows[0];
    return { artist, title };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
  return null;
};

export const insertSong = async (song) => {
  try {
    const stationId = await getStationId(song.station);
    await client.query(`
      insert into songs (artist, title, fk_stations, time_played)
      values ($1, $2, $3, now())
    `, [
      song.artist,
      song.title,
      stationId,
    ]);
  } catch (e) {
    return false;
  }
  return false;
};

export default null;
