import request from 'supertest';
import app from '../frontend/app';

jest.mock('../util/database');

describe('API', () => {
  it('base route should give 404', (done) => {
    request(app)
      .get('/api/')
      .expect(404, done);
  });

  describe('artists', () => {
    it('Fetching "test Artist" should yield data', async () => {
      const result = await request(app).get('/api/artist?name=Test Artist');
      expect(result.body).toEqual({ id: 1 });
    });
  });

  describe('songs', () => {
    it('should be possible to get the latest songs', async () => {
      const result = await request(app).get('/api/songs');
      expect(result.body).toContainEqual({
        artist: 'kvf Last Artist',
        title: 'kvf Last Song',
        time_played: '2018-04-06 10:20:21.196721+03',
      });
    });
  });
});
