import axios from 'axios';
import moment from 'moment';
import KpIndexDataSet from '../model/KpIndexDataSet';
import KpIndexParser from './KpIndexParser';

export const DEFAULT_URL = 'http://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt';

export class KpService {
  kpData = [];

  constructor(baseUrl) {
    this.baseUrl = baseUrl || DEFAULT_URL;
  }

  async fetch() {
    const response = await axios.get(this.baseUrl);
    if (response.data) {
      const parser = new KpIndexParser(response.data);
      this.kpData = parser.parseAll();
      return this.kpData;
    }
  }

  findDate(dt) {
    const momentObj = dt ? moment(dt) : moment();
    const [first] = this.kpData.filter(x => momentObj.isSame(x.date, 'day'));
    if (first) {
      return first;
    } else {
      return KpIndexDataSet.Empty(momentObj.toDate());
    }
  }
}
