

export function GetJDN(dt) {
    var day = dt.getDate();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();

    var a = Math.floor((14 - month)/12);
    var y = year + 4800 - a;
    var m = month + 12*a - 3;

    var jdn = day + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
    return jdn;
}

export function GetJD(dt) {
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();

    var jd = GetJDN(dt) + (hour-12)/24 + minute/1440 + second/86400;
    return jd;
}

export function GetMJD(dt) {
    var mjd = GetJD(dt) - 2400000.5;
    return mjd;
}

export function GetDayOfWeek(dt) {
    return GetJDN(dt) % 7;
}

export function GetDateObject(jd) {
    var jdn = Math.floor(jd);

    var a = jdn + 32044;
    var b = Math.floor((4*a + 3)/146097);
    var c = a - Math.floor((146097*b)/4);
    var d = Math.floor((4*c + 3)/1461);
    var e = c - Math.floor((1461*d)/4);
    var m = Math.floor((5*e + 2)/153);

    var day = e - Math.floor((153*m+2)/5) + 1;
    var month = m + 3 - 12*Math.floor(m/10);
    var year = 100*b + d - 4800 + Math.floor(m/10);

    // extract time:
    var totalSeconds = Math.floor((jd % 1)*86400);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - hours*3600)/60);
    var seconds = totalSeconds - hours*3600 - minutes*60;

    // if moved to next day:
    hours = hours + 12;
    if (hours >= 24) {
        hours = hours - 24;
        day++;
    }

    return  {
        day: day,
        month: month, 
        year: year,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
    
}

// currently produces invalid results:
// export function GetDateObjectV2(jd) {
//     var jdn = Math.floor(jd);

//     // convert date:
//     var j = 1401;
//     var B = 274277;
//     var C = -38;
//     var r = 4;
//     var v = 3;
//     var u = 5;
//     var w = 2;
//     var p =1461;
//     var s = 153;
//     var m = 2;
//     var n = 12;
//     var y = 4716;

//     var f = jdn + j + Math.floor( (Math.floor((4 * jdn + B)/146097.0)  * 3.0)/4.0 ) + C;
//     var e = r*f + v;
//     var g = Math.floor((e % p)/r);
//     var h = u*g + w;
//     var day = Math.floor((h % s)/u) + 1;
//     var month = Math.floor(( Math.floor(h/s) + m) / n) + 1;
//     var year = Math.floor(e/p) - y + Math.floor((n + m - month)/n);

//     // extract time:
//     var totalSeconds = Math.floor((jd % 1)*86400);
//     var hours = Math.floor(totalSeconds / 3600);
//     var minutes = Math.floor((totalSeconds - hours*3600)/60);
//     var seconds = totalSeconds - hours*3600 - minutes*60;
//     return  {
//         day: day,
//         month: month, 
//         year: year,
//         hours: 12 + hours,
//         minutes: minutes,
//         seconds: seconds
//     }
// }

export function GetDate(jd) {
    var dateObj = GetDateObject(jd);
    return new Date(dateObj.year, 
                    dateObj.month, 
                    null, 
                    dateObj.hour, 
                    dateObj.minutes, 
                    dateObj.seconds, 
                    0);
}
