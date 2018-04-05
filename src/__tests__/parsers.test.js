import { getLastStationSong } from '../util/database';
import { KvfParser } from '../util/parsers';

const parsers = {
  kvf: KvfParser,
};

jest.mock('../util/database');
jest.mock('../util/externalData');

describe('Parsers', () => {
  // eslint-disable-next-line
  for (let key in parsers) {
    describe(key, () => {
      const StationParser = parsers[key];

      it('should be possible to get last song', async () => {
        const stationParser = new StationParser();
        const { stationName } = stationParser;
        expect(await getLastStationSong(stationName)).toEqual({ artist: `${key} Last Artist`, title: `${key} Last Song` });
      });
  
      it('should be possible to set current song', async () => {
        const stationParser = new StationParser();
        await stationParser.updateCurrentSong();
        const { lastSong } = stationParser;
        expect(lastSong).toEqual({ artist: `${key} Test Artist`, title: `${key} Test Song 1` });
      });
  
      it('lastSong should be set after calling startListening', async () => {
        const stationParser = new StationParser();
        await stationParser.startListening();
        const { lastSong } = stationParser;
        expect(lastSong).toEqual({ artist: `${key} Last Artist`, title: `${key} Last Song` });
      });
  
      it('should trigger an event when song is updated', async (done) => {
        expect.assertions(1);
        const stationParser = new StationParser();
        await stationParser.startListening();
        stationParser.on('new song', (song) => {
          expect(song).toEqual({ artist: `${key} Test Artist`, title: `${key} Test Song 1`, station: `${key}` });
          done();
        });
      });
    });
  }
});
