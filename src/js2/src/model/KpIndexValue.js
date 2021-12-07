import * as KpConstants from './KpConstants';
/**
 * Value of planetary Kp index at specified 3-hor period
 */
export default class KpIndexValue {
  // beginning of 3-hour period
  periodStart = 0;

  // end of 3-hour period
  periodEnd = 0;

  // Kp index value
  value = 0;

  constructor(val, hour) {
    this.value = val;
    this.periodStart = hour;
    this.periodEnd = hour + KpConstants.DEFAULT_PERIOD_LENGTH;
  }
}
