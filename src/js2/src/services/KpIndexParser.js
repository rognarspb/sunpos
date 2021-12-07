import moment from 'moment';
import KpIndexValue from '../model/KpIndexValue';
import { INDEX_COUNT, INDEX_EST, INDEX_MID, INDEX_HIGH } from '../model/KpConstants';
import KpIndexData from '../model/KpIndexData';
import KpIndexDataSet from '../model/KpIndexDataSet';

export default class KpIndexParser {
  arrLines = [];
  strData = '';

  constructor(strData) {
    this.strData = strData;
    this.arrLines = strData.split('\n');
  }

  static extractValues(strData, offset, name) {
    const ixCount = INDEX_COUNT;
    const values = [];

    // 0, 3, 6, 9, 12, 15, 18, 21
    const periods = [...Array(ixCount).keys()].map(x => x * 3);

    let index = 0;
    for (let i = offset; i < offset + 2 * ixCount; i += 2) {
      const kpIndexValue = Number.parseInt(strData[i] + strData[i + 1]);
      const periodStart = periods[index++];
      values.push(new KpIndexValue(kpIndexValue, periodStart));
    }
    return values;
  }

  static parseLine(strText) {
    const startOffset = 17;
    const dataBlockLength = 23;

    const dateString = strText.substr(0, 10).trim();
    console.log(`Parsing date: "${dateString}"`);
    const dt = moment(dateString, 'YYYY MM DD').toDate();
    const result = new KpIndexDataSet(dt);
    result.push(INDEX_MID, new KpIndexData(INDEX_MID, dt, KpIndexParser.extractValues(strText, startOffset)));
    result.push(INDEX_HIGH, new KpIndexData(INDEX_HIGH, dt, KpIndexParser.extractValues(strText, startOffset + dataBlockLength)));
    result.push(INDEX_EST, new KpIndexData(INDEX_EST, dt, KpIndexParser.extractValues(strText, startOffset + 2 * dataBlockLength)));

    return result;
  }

  parseAll() {
    const result = [];
    for (const strLine of this.arrLines) {
      // title or comment line:
      if (!strLine || strLine.startsWith(':') || strLine.startsWith('#')) {
        continue;
      }
      var parsed = KpIndexParser.parseLine(strLine);
      result.push(parsed);
    }
    return result;
  }

  parseDate(date) {
    const dt = moment(date);
    if (dt.isValid) {
      const strDate = moment(date).format('YYYY MM DD');
      console.log(`Reading Kp index for date: "${strDate}"`);

      for (const strLine of this.arrLines) {
        if (strLine.startsWith(strDate)) {
          var parsed = this.parseLine(strLine);
          return parsed;
        }
      }
      console.error(`Date "${strDate}" not found`);
    }
    return null; // date not found
  }
}
