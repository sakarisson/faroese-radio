import { getLastStationSong } from '../util/database';
import parsers from '../util/parsers';

jest.mock('../util/database');
jest.mock('../util/externalData');

describe('Parsers', () => {
  parsers.forEach((StationParser) => {
    const key = new StationParser().shortName;
    describe(key, () => {
      it('should be possible to get last song', async () => {
        const stationParser = new StationParser();
        const { shortName } = stationParser;
        expect(await getLastStationSong(shortName)).toEqual({ artist: `${key} Last Artist`, title: `${key} Last Song` });
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
        expect.assertions(2);
        const stationParser = new StationParser();
        await stationParser.startListening();
        stationParser.on('new song', (song) => {
          expect(song).toMatchObject({ artist: `${key} Test Artist`, title: `${key} Test Song 1` });
          const { station } = song;
          expect(station).toMatchObject({ shortName: key });
          done();
        });
      });
    });
  });
});
