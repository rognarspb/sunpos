
import moment from 'moment';
import * as JD from './jd.js';


// degree to radians:
function rad(degree){
    return (degree * Math.PI)/180;
}

// sun ecliptic longitude in degrees
export function GetEclipticLongitude(dt){
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
  
      // sun declination:
export function GetDeclination(dt){
    var N = moment(dt).dayOfYear();
    var arg = (360/365)*(N + 10);
    var arg_rad = arg * (Math.PI/180);
    var delta = -23.44*Math.cos(arg_rad);
    return delta;
}

export function GetHourAngle(dt, lat){
    // var N = moment(dt).dayOfYear();
    var lat_rad = rad(lat);
    var dec_rad = rad(GetDeclination(dt));
    var a_rad = rad(-0.83); // athmospheric refraction
    var cosHourAngle = (Math.sin(a_rad) -  Math.sin(lat_rad) * Math.sin(dec_rad))/(Math.cos(lat_rad)*Math.cos(dec_rad));
    var res = Math.acos(cosHourAngle);
    return (res*180)/Math.PI;
}
  
    // Jtransit = true solar transit or solar noon Julian date
    export function GetSolarNoon(lon) {
        var dt = new Date(); //now
        var hourOffset = dt.getTimezoneOffset()/60;
        dt.setHours(-hourOffset);
        dt.setMinutes(0);
        dt.setSeconds(0);
        
        var jd = JD.GetJD(dt);
        var n = jd - 2451545.0 + 0.0008;
  
        // approximation of mean solar time at longitude
        var J = n - lon/360;
        // solar mean anomaly:
        var M = (357.5291 + 0.98560028*J) % 360;
        // equation of center:
        var C = 1.9148*Math.sin(rad(M)) + 0.02*Math.sin(rad(2*M)) + 0.0003*Math.sin(rad(3.0*M));
        // ecliptic longitude:
        var lambdaApprox = (M + C + 180 + 102.9372) % 360;
        var lambda = GetEclipticLongitude(dt);
  
        var Jtransit = 2451545.5 + J + 0.0053 * Math.sin(rad(M)) - 0.0069*Math.sin(rad(2*lambda));
        return Jtransit;
      }
  
  