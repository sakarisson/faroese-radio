import { getLastStationSong } from '../util/database';
import { KvfParser } from '../util/parsers';

jest.mock('../util/database');
jest.mock('../util/externalData');

describe('Parsers', () => {
  describe('kvf', () => {
    it('should be possible to get last song', async () => {
      const kvfParser = new KvfParser();
      const { stationName } = kvfParser;
      expect(await getLastStationSong(stationName)).toEqual({ artist: 'Last Artist', title: 'Last Song' });
    });

    it('should be possible to set current song', async () => {
      const kvfParser = new KvfParser();
      await kvfParser.updateCurrentSong();
      const { lastSong } = kvfParser;
      expect(lastSong).toEqual({ artist: 'Test Artist', title: 'Test Song 1' });
    });
  });
});
