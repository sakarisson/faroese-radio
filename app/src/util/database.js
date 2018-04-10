import dotenv from 'dotenv';
import { Client } from 'pg';
import logger from './logger';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  idltTimeoutMillis: 3000,
});

export const connect = async () => {
  client.connect((e) => {
    if (e) {
      logger.write(e);
      return false;
    }
    logger.write('Database client connected');
    return true;
  });
};

export const getStationId = async (shortName) => {
  try {
    const result = await client.query('select * from stations where lower(short_name) = lower($1)', [shortName]);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    }
  } catch (e) {
    throw e;
  }
  return null;
};

export const getLastStationSong = async (shortName) => {
  try {
    const result = await client.query(`
      select artists.name as artist, songs.title
      from artists, songs, stations, song_plays
      where lower(stations.short_name) = lower($1)
      and song_plays.fk_stations = stations.id
      and song_plays.fk_songs = songs.id
      and songs.fk_artists = artists.id
      order by song_plays.id desc
      limit 1`, [shortName]);
    const { artist, title } = result.rows[0];
    return { artist, title };
  } catch (e) {
    throw e;
  }
};

export const getArtistId = async (artist) => {
  try {
    const result = await client.query(`
      select artists.id from artists
      where lower(artists.name) = lower($1)
    `, [
      artist,
    ]);

    if (result.rows.length > 0) {
      const { id } = result.rows[0];
      return id;
    }
  } catch (e) {
    throw e;
  }
  return null;
};

export const getSongId = async (song) => {
  try {
    const result = await client.query(`
      select songs.id from songs, artists
      where songs.fk_artists = artists.id
      and lower(artists.name) = lower($1)
      and lower(songs.title) = lower($2)
    `, [
      song.artist,
      song.title,
    ]);

    if (result.rows.length > 0) {
      const { id } = result.rows[0];
      return id;
    }
  } catch (e) {
    throw e;
  }
  return null;
};

export const addArtistToDatabase = async (artist) => {
  try {
    const result = await client.query(`
      insert into artists
      (name)
      values
      ($1)
      returning id
    `, [
      artist,
    ]);

    if (result.rows.length > 0) {
      const { id } = result.rows[0];
      return id;
    }
  } catch (e) {
    throw e;
  }
  return null;
};

export const addSongToDatabase = async (artistId, title) => {
  try {
    const result = await client.query(`
      insert into songs
      (title, fk_artists)
      values
      ($1, $2)
      returning id
    `, [
      title,
      artistId,
    ]);

    if (result.rows.length > 0) {
      const { id } = result.rows[0];
      return id;
    }
  } catch (e) {
    throw e;
  }
  return null;
};

export const addStationToDatabase = async (station) => {
  try {
    const { shortName, longName } = station;
    const result = await client.query(`
      insert into stations
      (short_name, long_name)
      values
      ($1, $2)
      returning id
    `, [
      shortName,
      longName,
    ]);

    if (result.rows.length > 0) {
      const { id } = result.rows[0];
      return id;
    }
  } catch (e) {
    throw e;
  }
  return null;
};

export const insertSongplayToDatabase = async (songId, stationId) => {
  try {
    await client.query(`
      insert into song_plays
      (fk_songs, fk_stations)
      values
      ($1, $2)
      returning id
    `, [
      songId,
      stationId,
    ]);
  } catch (e) {
    throw e;
  }
  return true;
};

export default null;
