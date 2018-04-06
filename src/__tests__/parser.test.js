import { startAllParsers } from '../parser';

jest.mock('../util/database');
jest.mock('../util/externalData');

describe('Parser', () => {
  it('should work', (done) => {
    startAllParsers();
    setTimeout(() => {
      done();
    }, 1500);
  });
});
