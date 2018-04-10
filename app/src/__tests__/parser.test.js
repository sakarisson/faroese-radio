import { startAllParsers } from '../parser';

jest.mock('../util/database');
jest.mock('../util/externalData');

describe('Parser', () => {
  it('should not crash', (done) => {
    startAllParsers();
    setTimeout(() => {
      done();
    }, 100);
  });
});
