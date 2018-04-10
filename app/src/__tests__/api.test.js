import request from 'supertest';
import app from '../frontend/app';

jest.mock('../util/database');

describe('API', () => {
  it('base route should give 404', (done) => {
    request(app)
      .get('/api/')
      .expect(404, done);
  });

  it('"artists/test Test Artist" should yield data', async () => {
    const result = await request(app).get('/api/artist?name=Test Artist');
    expect(result.body).toEqual({ id: 1 });
  });
});
