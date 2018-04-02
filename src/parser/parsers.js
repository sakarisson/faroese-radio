/**
 * parsers.js
 * This file defined a main class, Parser and any number
 * of derived classes, with certain functionality to extract
 * music from a given radio station
 */

const fetch = require('node-fetch');
const xmlParser = require('xml2js');

class Parser {
  constructor() {
    this.link = null;
    this.json = null;
  }

  getCurrentData() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetch(this.link);
        const stringifiedData = await data.text();
        resolve(stringifiedData);
      } catch (e) {
        reject(e);
      }
    });
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

class KvfParser extends Parser {
  constructor() {
    super();
    this.link = 'http://kvf.fo/service/now-next.xml';
  }

  setJson() {
    return new Promise(async (resolve, reject) => {
      const xml = await this.getCurrentData();
      xmlParser.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        }
        this.json = result;
        resolve();
      });
    });
  }

  async getCurrentSong() {
    await this.setJson();
    return this.json.data.now;
  }
}
