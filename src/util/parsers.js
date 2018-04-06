/**
 * parsers.js
 * This file defined a main class, Parser and any number
 * of derived classes, with certain functionality to extract
 * music from a given radio station
 */

import xmlParser from 'xml2js';
import EventEmitter from 'events';
import _ from 'underscore';
import { getLastStationSong } from './database';
import { getCurrentData } from './externalData';

class Parser extends EventEmitter {
  constructor() {
    super();
    this.link = null;
    this.stationName = null; // should be unique
    this.json = null;
    this.lastSong = null;
    this.interval = null;
  }

  async startListening() {
    this.lastSong = await getLastStationSong(this.stationName);
    this.interval = setInterval(() => {
      this.updateCurrentSong();
    }, 1000);
  }

  stopListening() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  checkIfNewSong(currentSong) {
    if (!_.isEqual(currentSong, this.lastSong)) {
      this.lastSong = currentSong;
      const song = { ...currentSong };
      song.station = this.stationName;
      this.emit('new song', song);
    }
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
}

export class KvfParser extends Parser {
  constructor() {
    super();
    this.link = 'http://kvf.fo/service/now-next.xml';
    this.stationName = 'kvf';
  }

  async setJson() {
    const xml = await getCurrentData(this.link);
    xmlParser.parseString(xml, (err, result) => {
      if (err) {
        return;
      }
      this.json = result;
    });
  }

  async updateCurrentSong() {
    await this.setJson();
    const { artist, title } = this.json.data.now[0];
    if (artist[0] === '' || title[0] === '') {
      return null;
    } else if (_.contains(title[0], 'Høvuðstíðindi') || _.contains(title[0], 'GMF')) { // Manual exceptions
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

export default [
  KvfParser,
];
