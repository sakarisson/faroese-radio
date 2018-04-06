import parsers from './util/parsers';
import {
  connect,
  getSongId,
  getArtistId,
  addArtistToDatabase,
  addSongToDatabase,
  addStationToDatabase,
  getStationId,
  insertSongplayToDatabase,
} from './util/database';

connect();

const insertSong = async (song) => {
  try {
    let songId = await getSongId(song);
    if (songId === null) {
      let artistId = await getArtistId(song.artist);
      if (artistId === null) {
        artistId = await addArtistToDatabase(song.artist);
      }
      songId = await addSongToDatabase(artistId, song.title);
    }
    let stationId = await getStationId(song.station.shortName);
    if (stationId === null) {
      stationId = await addStationToDatabase(song.station);
    }
    await insertSongplayToDatabase(songId, stationId);
  } catch (e) {
    throw e;
  }
  return true;
};

const parserInstances = parsers.map(ParserObject => new ParserObject());

export const startAllParsers = () => {
  parserInstances.forEach((instance) => {
    instance.startListening();
    instance.on('new song', (song) => {
      // eslint-disable-next-line no-console
      console.log('new song playing', song);
      insertSong(song);
    });
  });
};

export const stopAllParsers = () => {
  parserInstances.forEach(instance => instance.stopListening());
};

export default this;
