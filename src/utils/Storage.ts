export default class Storage {
  private static instance: Storage;

  constructor() {}

  public getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }
}
