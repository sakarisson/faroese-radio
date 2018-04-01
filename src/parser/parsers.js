/**
 * parsers.js
 * This file defined a main class, Parser and any number
 * of derived classes, with certain functionality to extract
 * music from a given radio station
 */

class Parser {
  constructor() {
    this.link = null;
    this.json = null;
  }
  // eslint-disable-next-line class-methods-use-this
  setJson() {
    throw new Error('getJson has not been implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  getCurrentSong() {
    throw new Error('getCurrentSong has not been implemented');
  }
}

module.exports.KvfParser = class KvfParser extends Parser {

};
