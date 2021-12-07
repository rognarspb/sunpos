import KpIndexValue from './KpIndexValue';
import * as KpConstants from './KpConstants';
/**
 * Kp index data for a specific date/source name
 */
export default class KpIndexData {
  // display name of planetary Kp index source
  name = 'Kp index';

  // date of specific KpIndex
  date = null;

  // array of KpIndexValue
  values = [];

  constructor(name, date, values) {
    this.name = name;
    this.date = date;
    this.values = values || [...Array(KpConstants.INDEX_COUNT).keys()].map(x => new KpIndexValue(-1, x * 3));
  }
}
