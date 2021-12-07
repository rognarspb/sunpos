import * as KpConstants from './KpConstants';
import KpIndexData from './KpIndexData';

export default class KpIndexDataSet {
  // date of dataset:
  date = null;

  // dictionary containing dataset parts
  dictionary = {};

  constructor(dt) {
    this.date = dt;
  }

  static Empty(dt) {
    const res = new KpIndexDataSet(dt);
    res.setEmpty();
    return res;
}

  push(name, kpData) {
    this.dictionary[name] = kpData;
  }

  getByName(name) {
    return this.dictionary[name];
  }

  setEmpty() {
    this.dictionary[KpConstants.INDEX_EST] = new KpIndexData(KpConstants.INDEX_EST, this.date);
    this.dictionary[KpConstants.INDEX_HIGH] = new KpIndexData(KpConstants.INDEX_HIGH, this.date);
    this.dictionary[KpConstants.INDEX_MID] = new KpIndexData(KpConstants.INDEX_MID, this.date);
  }

  get estimated() {
    return this.dictionary[KpConstants.INDEX_EST];
  }

  get highLatitude() {
    return this.dictionary[KpConstants.INDEX_HIGH];
  }

  get middleLatitude() {
    return this.dictionary[KpConstants.INDEX_MID];
  }
}
