/**
 * parsers.js
 * This file defined a main class, Parser and any number
 * of derived classes, with certain functionality to extract
 * music from a given radio station
 */

import fetch from 'node-fetch';
import xmlParser from 'xml2js';
import EventEmitter from 'events';
import _ from 'underscore';

class Parser extends EventEmitter {
  constructor() {
    super();
    this.link = null;
    this.stationName = null; // should be unique
    this.json = null;
    this.lastSong = null;
    this.interval = null;
  }

  startListening() {
    this.interval = setInterval(() => {
      this.updateCurrentSong();
    }, 1000);
  }

  stopListening() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
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

  /**
   * Should get raw data from radio source and then save it to JSON
   */

  // eslint-disable-next-line class-methods-use-this
  setJson() {
    throw new Error('getJson has not been implemented');
  }

  /**
   * Should get the current song and then call checkIfNewSong
   */

  // eslint-disable-next-line class-methods-use-this
  updateCurrentSong() {
    throw new Error('updateCurrentSong has not been implemented');
  }

  checkIfNewSong(currentSong) {
    if (!_.isEqual(currentSong, this.lastSong)) {
      this.lastSong = currentSong;
      const song = { ...currentSong };
      song.station = this.stationName;
      this.emit('new song', song);
    }
  }
}

export class KvfParser extends Parser {
  constructor() {
    super();
    this.link = 'http://kvf.fo/service/now-next.xml';
    this.stationName = 'kvf';
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

  async updateCurrentSong() {
    await this.setJson();
    const { artist, title } = this.json.data.now[0];
    if (artist[0] === '' || title[0] === '') {
      return null;
    }
    const currentSong = {
      artist: artist[0],
      title: title[0],
    };
    this.checkIfNewSong(currentSong);
    return currentSong;
  }
}

export default Parser;