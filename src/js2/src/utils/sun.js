
import moment from 'moment';
import tzlookup from 'tz-lookup';
import JD from './jd.js';
import * as DateUtils from './dateUtils.js';
import * as AngleUtil from './angleUtils.js';


// degree to radians:
function rad(degree){
    return (degree * Math.PI)/180;
}

// sun ecliptic longitude in degrees
export function GetEclipticLongitude(dt) {
    var jd = JD.GetJD(dt);
    var n = jd - 2451545.0;

    // mean longitute in degrees:
    var L = 280.460 + 0.9856474*n;

    // mean anomaly in degrees:
    var g = 357.528 + 0.9856003*n;

    // limit to 360:
    L = L % 360;
    g = g % 360;

    // convert to radians:
    var g_rad = rad(g);

    // ecliptic longutude (in degrees)
    var lambda = L + 1.915*Math.sin(g_rad) + 0.02*Math.sin(2.0*g_rad);
    return lambda;
}

// distance to sun
export function GetDistance(dt){
    var jd = JD.GetJD(dt);
    var n = jd - 2451545.0;

    // mean anomaly in degrees:
    var g = 357.528 + 0.9856003*n;
    g = g % 360;

    // convert to radians:
    var g_rad = (g * Math.PI)/180;

    // distance in a.e.:
    var R = 1.00014 - 0.01671*Math.cos(g_rad) - 0.00014*Math.cos(2*g_rad);
    return R;
}

  // obliquity of the ecliptic:
export function GetEps(dt){
    var jd = JD.GetJD(dt);
    var n = jd - 2451545.0;

    var eps = 23.439 - 0.0000004*n;
    return eps;
}


// equatorial coordinates:
// Right ascension (degrees)
export function GetAlpha(dt){
    var eps = GetEps(dt);
    var lambda = GetEclipticLongitude(dt);
    var eps_rad = (eps * Math.PI)/180;
    var lambda_rad = (lambda * Math.PI)/180;

    var alpha = Math.atan2(Math.cos(eps_rad)*Math.sin(lambda_rad), Math.cos(lambda_rad));
    return (alpha*180)/Math.PI;
}

// declination (degrees)
export function GetDelta(dt){
    var eps = GetEps(dt);
    var lambda = GetEclipticLongitude(dt);
    var eps_rad = (eps * Math.PI)/180;
    var lambda_rad = (lambda * Math.PI)/180;

    var delta = Math.asin(Math.sin(eps_rad)*Math.sin(lambda_rad));
    return (delta*180)/ Math.PI;
}

// sun declination (approximation):
export function GetDeclination(dt){
    var N = moment(dt).dayOfYear();
    var arg = (360/365)*(N + 10);
    var arg_rad = arg * (Math.PI/180);
    var delta = -23.44*Math.cos(arg_rad);
    return delta;
}


// alpha - elevation angle
// dt - date (to determine delta)
// lat - latitude
export function GetHourAngle(alpha, dt, lat){
    var lat_rad = rad(lat);
    var dec_rad = rad(GetDelta(dt));
    var a_rad = rad(alpha);
    var cosHourAngle = (Math.sin(a_rad) -  Math.sin(lat_rad) * Math.sin(dec_rad))/(Math.cos(lat_rad)*Math.cos(dec_rad));
    var res = Math.acos(cosHourAngle);
    return AngleUtil.radToDegree(res);
}

// hour angle of sunrise/sunset:
export function GetSunriseHourAngle(dt, lat){
    var alpha = -0.83; // athmospheric refraction
    var date = new Date();
    date.setFullYear(dt.getFullYear());
    date.setMonth(dt.getMonth());
    date.setDate(dt.getDate());
    date.setHours(12,0,0);
    return GetHourAngle(alpha, date, lat);
}

export function GetSunsetHourAngle(dt, lat){
    return GetSunriseHourAngle(dt, lat);
}

export function GetSunriseTime(dt, lat, lon) {
    var ha =  GetSunriseHourAngle(dt, lat);
    var sn =  GetSolarNoon(dt, lat, lon);

    var solarNoonObj = JD.GetDateObject(sn);
    var solarNoonSeconds = DateUtils.getTotalSeconds(solarNoonObj);
    var timeObj = DateUtils.degreeToTime(ha);
    var diffSeconds = DateUtils.getTotalSeconds(timeObj);

    var sunriseSeconds = solarNoonSeconds - diffSeconds;
    var resTime = DateUtils.getTimeFromSeconds(sunriseSeconds);
    return resTime;
}

export function GetSunsetTime(dt, lat, lon) {
    var ha =  GetSunriseHourAngle(dt, lat);
    var sn =  GetSolarNoon(dt, lat, lon);

    var solarNoonObj = JD.GetDateObject(sn);
    var solarNoonSeconds = Util.getTotalSeconds(solarNoonObj);
    var timeObj = Util.degreeToTime(ha);
    var diffSeconds = Util.getTotalSeconds(timeObj);

    var sunsetSeconds = solarNoonSeconds + diffSeconds;
    var resTime = Util.getTimeFromSeconds(sunsetSeconds);
    return resTime;
}

export function GetDayLengthSeconds(dt, lat, lon) {
    // represents degrees from solar noon:
    var ha =  GetSunriseHourAngle(dt, lat, lon);

    // day length is sunrise angle multiplied by two and converted to time:
    var timeObj = AngleUtil.degreeToTime(ha);
    var totalSeconds = 2*DateUtils.getTotalSeconds(timeObj);
    return totalSeconds;
}

export function GetDayLength(dt, lat, lon) {
    var totalSeconds = GetDayLengthSeconds(dt, lat, lon);
    return Util.getTimeFromSeconds(totalSeconds);
}

// Jtransit = true solar transit or solar noon Julian date
export function GetSolarNoon(currentDate, lat, lon) {
    var dt = new Date(); //now

    //var tzName = tzlookup(lat, lon);
    //var hourOffset = moment(dt).tz(tzName).utcOffset()/60;
    const hourOffset = dt.getTimezoneOffset()/60;

    //var hourOffset = dt.getTimezoneOffset()/60;
    dt.setDate(currentDate.getDate());
    dt.setMonth(currentDate.getMonth());
    dt.setFullYear(currentDate.getFullYear());
    dt.setHours(hourOffset, 0, 0);

    var jd = JD.GetJD(dt);
    var n = jd - 2451545.0 + 0.0008;

    // approximation of mean solar time at longitude
    var J = n - lon/360;
    // solar mean anomaly:
    var M = (357.5291 + 0.98560028*J) % 360;
    // equation of center:
    var C = 1.9148*Math.sin(rad(M)) + 0.02*Math.sin(2.0*rad(M)) + 0.0003*Math.sin(3.0*rad(M));
    // ecliptic longitude:
    var lambdaApprox = (M + C + 180 + 102.9372) % 360;
    var lambda = GetEclipticLongitude(dt);

    var Jtransit = 2451545.5 + J + 0.0053 * Math.sin(rad(M)) - 0.0069*Math.sin(2*rad(lambda));
    return Jtransit;
}

export function GetSolarNoonTime(currentDate, lat, lon) {
    var jd = GetSolarNoon(currentDate, lat, lon);
    var date = JD.GetDateObject(jd);

    return date;
}

// returns hour angle relative solar noon
export function GetCurrentHourAngle(dt, lat, lon){
    var h = dt.getHours();
    var m = dt.getMinutes();
    var sec = dt.getSeconds();
    var solarNoon = GetSolarNoon(dt, lat, lon);
    var solarNoonObj = JD.GetDateObject(solarNoon);

    var currentSeconds = h*3600 + m*60 + sec;
    var noonSeconds = solarNoonObj.hours*3600 + solarNoonObj.minutes*60 + solarNoonObj.seconds;

    var hourAngle = ((currentSeconds -noonSeconds)/3600.0)*15.0;// 15 degree per hour
    return hourAngle;
}

export function GetZenithAngle(dt, lat, lon) {
    var hourAngle = GetCurrentHourAngle(dt, lat, lon);// approximate
    var PHI = rad(lat);
    var delta = rad(GetDelta(dt)); // declination
    var h = rad(hourAngle);

    var z = Math.sin(PHI)*Math.sin(delta) + Math.cos(PHI)*Math.cos(delta)*Math.cos(h);
    var theta = Math.acos(z);
    return (theta*180.0)/Math.PI;
}

export function GetElevationAngle(dt, lat, lon) {
    var teta = GetZenithAngle(dt, lat, lon);
    return 90 - teta;
}

export function GetAzimuthAngle(dt, lat, lon) {
    var theta = rad(GetZenithAngle(dt, lat, lon));
    var delta = rad(GetDelta(dt));
    var h = rad(GetCurrentHourAngle(dt, lat, lon));
    var PHI = rad(lat);

    var p = (-1.0*Math.sin(h)*Math.cos(delta))/Math.sin(theta);

    var p1 = Math.sin(delta) - Math.cos(theta)*Math.sin(PHI);
    var p2 = Math.sin(theta)*Math.cos(PHI);

    var phita = Math.acos(p1/p2);
    if (h > 0)
        phita = 2.0*Math.PI -phita;

    return Util.degree(phita);
}

export function GetTwilightTime(alpha, dt, lat, lon){

    var ha = GetHourAngle(alpha, dt, lat);
    var timeObj = AngleUtil.degreeToTime(ha);
    var sn =  GetSolarNoon(dt, lat, lon);
    var solarNoonObj = JD.GetDateObject(sn);

    var noonSeconds = DateUtils.getTotalSeconds(solarNoonObj);
    var twilightSeconds = DateUtils.getTotalSeconds(timeObj);

    var morningSeconds = noonSeconds - twilightSeconds;
    var eveningSeconds = noonSeconds + twilightSeconds;
    var morning = DateUtils.getTimeFromSeconds(morningSeconds);
    var evening = DateUtils.getTimeFromSeconds(eveningSeconds);

    var res = {
        hourAngle: ha,
        morningTwilight: morning,
        eveningTwilight: evening
    };
    return res;
}

export function GetElevationTime(alpha, dt, lat, lon){

    var ha = GetHourAngle(alpha, dt, lat);
    var timeObj = Util.degreeToTime(ha);
    var sn =  GetSolarNoon(dt, lat, lon);
    var solarNoonObj = JD.GetDateObject(sn);

    var noonSeconds = Util.getTotalSeconds(solarNoonObj);
    var elevSeconds = Util.getTotalSeconds(timeObj);

    var morningSeconds = noonSeconds - elevSeconds;
    var eveningSeconds = noonSeconds + elevSeconds;
    var morning = Util.getTimeFromSeconds(morningSeconds);
    var evening = Util.getTimeFromSeconds(eveningSeconds);

    var dtMorning = Util.timeObjToDate(dt, morning);
    var dtEvening = Util.timeObjToDate(dt, evening);
    var morningAzimuth = GetAzimuthAngle(dtMorning, lat, lon);
    var eveningAzimuth = GetAzimuthAngle(dtEvening, lat, lon);

    return {
        hourAngle: ha,
        morningTime: morning,
        morningAzimuth: morningAzimuth,
        eveningTime: evening,
        eveningAzimuth: eveningAzimuth
    };
}


