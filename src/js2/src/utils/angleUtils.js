export function degreeToRad(degree){
  return (degree * Math.PI)/180.0;
}

export function radToDegree(radValue){
  return (radValue * 180.0)/Math.PI;
}

export class TimeStruct {
  constructor(h, m, s) {
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  }
  hours = 0;
  minutes = 0;
  seconds = 0;
}

/**
 * Converts degree units to time units (angle)
 * @param {number} degree
 * @returns {TimeStruct} time structure
 */
export function degreeToTime(degree){
  var hours = degree/15.0; // 15 degree per hour
  var mins  = (hours % 1) *60.0;
  var seconds = (mins % 1)*60;

  var res = new TimeStruct(
    Math.floor(hours),
    Math.floor(mins),
    Math.floor(seconds));

  return res;
}
