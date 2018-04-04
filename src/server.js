import { KvfParser } from './util/parsers';
import { insertSong } from './util/database';

const parsers = [
  new KvfParser(),
];

parsers.forEach((parser) => {
  parser.startListening();
  parser.on('new song', (song) => {
    console.log('new song playing', song);
    insertSong(song);
  });
});
