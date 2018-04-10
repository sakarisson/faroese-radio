import { startAllParsers } from './parser';
import log from './util/logger';
import app from './frontend/app';

log.enable();

startAllParsers();

app.listen(1524);
