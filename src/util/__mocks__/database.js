import _ from 'underscore';

const mockDatabase = {
  stations: [{
    id: 1,
    short_name: 'kvf',
    long_name: 'Kringvarp Føroya',
  },
  {
    id: 2,
    short_name: 'test',
    long_name: 'Test Station',
  }],
  songs: [{
    id: 1,
    artist: 'Random',
    title: 'Some song',
    fk_stations: 1,
    time_played: '2018-04-04 14:44:09.134784',
  },
  {
    id: 2,
    artist: 'Last Artist',
    title: 'Last Song',
    fk_stations: 1,
    time_played: '2018-04-04 16:20:04.387387',
  },
  {
    id: 3,
    artist: 'Other Station',
    title: 'Some songs',
    fk_stations: 2,
    time_played: '2018-04-04 14:44:09.134784',
  }],
};

export const getLastStationSong = async (shortName) => {
  const { stations, songs } = mockDatabase;
  const stationId = _.where(stations, { short_name: shortName })[0].id;
  const stationSongs = _.where(songs, { fk_stations: stationId });
  const lastStationSong = _.max(stationSongs, song => song.id);
  return {
    artist: lastStationSong.artist,
    title: lastStationSong.title,
  };
};

export default null;