/**
 * Logger
 * Singleton class that handles all logging.
 */

class Logger {
  constructor() {
    this.enabled = false;
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  write(message) {
    if (!this.enabled) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

const instance = new Logger(); // Singleton

export default instance;
