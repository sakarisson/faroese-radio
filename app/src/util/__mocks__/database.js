import _ from 'underscore';
import moment from 'moment';

const mockDatabase = {
  stations: [{
    id: 1,
    short_name: 'kvf',
    long_name: 'Kringvarp Føroya',
  }],
  artists: [{
    id: 1,
    name: 'kvf Last Artist',
  }],
  songs: [{
    id: 1,
    title: 'kvf Last Song',
    fk_artists: 1,
  }],
  song_plays: [{
    id: 1,
    fk_songs: 1,
    fk_stations: 1,
    time_played: '2018-04-06 10:20:21.196721+03',
  }],
};

const getNextId = table => _.max(table, row => row.id).id + 1;

// eslint-disable-next-line arrow-body-style
export const connect = async () => {
  // Bib bab bub, connecting...
  return true;
};

export const getStationId = async (shortName) => {
  const { stations } = mockDatabase;
  const stationId = _.findWhere(stations, { short_name: shortName }).id;
  return stationId;
};

export const getLastStationSong = async (shortName) => {
  const {
    // eslint-disable-next-line camelcase
    artists, songs, song_plays,
  } = mockDatabase;
  const stationId = await getStationId(shortName);
  const stationSongsPlays = _.where(song_plays, { fk_stations: stationId });
  const lastStationSongPlay = _.max(stationSongsPlays, song => song.id);
  const lastStationSong = _.findWhere(songs, { id: lastStationSongPlay.fk_songs });
  const lastStationArtist = _.findWhere(artists, { id: lastStationSong.fk_artists });

  const song = {
    artist: lastStationArtist.name,
    title: lastStationSong.title,
  };

  return song;
};

export const getArtistId = async (artist) => {
  const { artists } = mockDatabase;
  const dbArtist = _.findWhere(artists, { name: artist });
  if (!dbArtist) {
    return null;
  }
  return dbArtist.id;
};

export const getSongId = async (song) => {
  const { songs } = mockDatabase;
  const artistId = await getArtistId(song.artist);
  const dbSong = _.findWhere(songs, { title: song.title, fk_artists: artistId });
  if (!dbSong) {
    return null;
  }
  return dbSong.id;
};

export const addArtistToDatabase = async (artist) => {
  const { artists } = mockDatabase;
  const id = getNextId(artists);
  artists.push({ id, name: artist });
  return id;
};

export const addSongToDatabase = async (artistId, title) => {
  const { songs } = mockDatabase;
  const id = getNextId(songs);
  songs.push({ id, title, fk_artists: artistId });
  return id;
};

export const addStationToDatabase = async (station) => {
  const { stations } = mockDatabase;
  const id = getNextId(stations);
  const { shortName, longName } = station;
  stations.push({ id, short_name: shortName, long_name: longName });
  return id;
};

export const insertSongplayToDatabase = async (songId, stationId) => {
  const songPlays = mockDatabase.song_plays;
  const id = getNextId(songPlays);
  let time = moment().format('YYYY-MM-DD HH:MM:ss.SSSSSSZ');
  time = time.substr(0, time.length - 3);
  songPlays.push({
    id,
    fk_songs: songId,
    fk_stations: stationId,
    time_played: time,
  });
  return id;
};

export default null;
