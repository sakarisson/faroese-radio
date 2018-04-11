class KeyGenerator {
  constructor() {
    this.key = 0;
  }

  get next() {
    this.key = this.key + 1;
    return this.key;
  }
}

const instance = new KeyGenerator();

export default instance;
