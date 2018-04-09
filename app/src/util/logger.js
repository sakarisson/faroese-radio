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

  write(...args) {
    if (!this.enabled) {
      return;
    }
    // eslint-disable-next-line no-console
    args.forEach(arg => console.log(arg));
  }
}

const instance = new Logger(); // Singleton

export default instance;
