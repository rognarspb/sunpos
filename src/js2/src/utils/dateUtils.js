export function getTotalSeconds(timeObj) {
    var totalSeconds = timeObj.hours * 3600 +  timeObj.minutes* 60 + timeObj.seconds;
    return totalSeconds;
}

export function getTimeFromSeconds(totalSeconds) {
    var hours = Math.floor(totalSeconds/3600);
    var minutes = Math.floor((totalSeconds - hours*3600)/60);
    var seconds = Math.floor(totalSeconds - hours*3600 - minutes*60 );
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
  }

export function dateToString(dt) {
    if (!dt){
        return '';
    }
    var month = dt.getMonth()+1;
    return  dt.getDate() + "." +  month + "." + dt.getFullYear() + ", "
            + String(dt.getHours()).padStart(2,'0') + ":"
            + String(dt.getMinutes()).padStart(2,'0') + ":"
            + String(dt.getSeconds()).padStart(2,'0');
}


export function dateToShortString(dt) {
    if (!dt){
        return '';
    }
    var month = dt.getMonth()+1;
    return  dt.getDate() + "." +  month + "." + dt.getFullYear();
}


export function timeToString(dt) {
    if (!dt){
        return '';
    }
    return  String(dt.getHours()).padStart(2,'0') + ":"
            + String(dt.getMinutes()).padStart(2,'0') + ":"
            + String(dt.getSeconds()).padStart(2,'0');
}

export function timeToShortString(dt) {
    if (!dt){
        return '';
    }
    return  String(dt.getHours()).padStart(2,'0') + ":"
            + String(dt.getMinutes()).padStart(2,'0');
}


export function dateObjToString(dateObj) {
    if (!dateObj){
        return '';
    }

    return  dateObj.day + "." +  dateObj.month + "." + dateObj.year + ", "
            + String(dateObj.hours).padStart(2,'0') + ":"
            + String(dateObj.minutes).padStart(2,'0') + ":"
            + String(dateObj.seconds).padStart(2,'0');
}


export function timeObjToString(timeObj) {
    if (!timeObj){
        return '';
    }

    return String(timeObj.hours).padStart(2, '0') + "h "
    + String(timeObj.minutes).padStart(2, '0') + "min "
    + String(timeObj.seconds).padStart(2, '0') + "sec";
}

export function timeObjToShortString(timeObj) {
    if (!timeObj){
        return '';
    }

    return String(timeObj.hours).padStart(2, '0') + ":"
    + String(timeObj.minutes).padStart(2, '0');

}

export function timeObjToDate(dt, timeObj) {
    var date = new Date();
    date.setFullYear(dt.getFullYear());
    date.setMonth(dt.getMonth());
    date.setDate(dt.getDate());
    date.setHours(timeObj.hours, timeObj.minutes, timeObj.seconds);

    return date;
}
