import _ from 'underscore';

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
    time_played: '2018-04-04 14:44:09.134784',
  }],
};

export const getLastStationSong = async (shortName) => {
  const {
    // eslint-disable-next-line camelcase
    stations, artists, songs, song_plays,
  } = mockDatabase;
  const stationId = _.where(stations, { short_name: shortName })[0].id;
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

export default null;
