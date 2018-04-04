import { KvfParser } from '../util/parsers';

jest.mock('../util/database');
jest.mock('../util/externalData');

describe('Parsers', () => {
  describe('kvf', () => {
    const kvfParser = new KvfParser();

    it('should be possible to set current song', async () => {
      await kvfParser.updateCurrentSong();
      const { lastSong } = kvfParser;
      expect(lastSong).toEqual({ artist: 'Test Artist', title: 'Test Song 1' });
    });
  });
});
