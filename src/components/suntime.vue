<i18n>
{
  "en": {
    "title": "Sunrise and sunset",
    "solarNoon": "Solar noon (JD)",
    "solarNoonLocal": "Solar noon (local time)",
    "sunrise": "Sunrise",
    "sunset": "Sunset",
    "daylength": "Day length",
    "twilightMorning": "Astronomical twilight (morning)",
    "twilightEvening": "Astronomical twilight (evening)"
  },
  "ru": {
    "title": "Закат и восход Солнца",
    "solarNoon": "Солнечный полдень (JD)",
    "solarNoonLocal": "Солнечный полдень (локальное время)",
    "sunrise": "Восход",
    "sunset": "Закат",
    "daylength": "Длительность дня",
    "twilightMorning": "Астрономические сумерки (утренние)",
    "twilightEvening": "Астрономические сумерки (вечерние)"
  }
}
</i18n>
<template>
    <div>
        <h4>{{$t('title')}}</h4>
        <dl class="info">
          <dt>{{$t('solarNoon')}}</dt>
          <dd>{{solarNoon}} </dd>
          <dt>{{$t('solarNoonLocal')}}</dt>
          <dd>{{solarNoonString}} </dd>
          <hr/>
          <dt>{{$t('sunrise')}}</dt>
          <dd>{{sunrise}} </dd>
          <dt>{{$t('sunset')}}</dt>
          <dd>{{sunset}} </dd>
          <hr/>
          <dt>{{$t('daylength')}}</dt>
          <dd>{{daylength}} </dd>
        </dl>
    </div>
</template>

<script>
import moment from 'moment';
import * as JD from '../js/jd.js';
import * as Sun from '../js/sun.js';
import * as Util from '../js/util.js';


export default {
  name: 'suntime',
  props: {
      date: {
          default: new Date(),
          required: true
      },
      latitude: {
          required: true
      }, 
      longitude: {
          required: true
      }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {         
    solarNoonString: function(){
      var sn =  Sun.GetSolarNoon(this.date, this.longitude);
      var dateObj = JD.GetDateObject(sn);
      return Util.dateObjToString(dateObj);
    },
    solarNoon: function() {
      var sn =  Sun.GetSolarNoon(this.date, this.longitude);
      return sn.toFixed(6);     
    },
    sunrise: function(){
        var sunriseTime = Sun.GetSunriseTime(this.date, this.latitude, this.longitude);
        return String(sunriseTime.hours).padStart(2,'0') + ":" 
              + String(sunriseTime.minutes).padStart(2,'0') + ":" 
              + String(sunriseTime.seconds).padStart(2,'0');
    },
    sunset: function(){
        var sunsetTime = Sun.GetSunsetTime(this.date, this.latitude, this.longitude);
        return String(sunsetTime.hours).padStart(2,'0') + ":" 
              + String(sunsetTime.minutes).padStart(2,'0') + ":" 
              + String(sunsetTime.seconds).padStart(2,'0');
    },
    daylength: function(){
      var ha =  Sun.GetSunriseHourAngle(this.date, this.latitude, this.longitude);
      var timeObj = Util.degreeToTime(ha);
      var hours = 2*timeObj.hours;
      var minutes = 2*timeObj.minutes;
      if (minutes > 60) {
        minutes = minutes - 60;
        hours++;
      }
      var seconds = 2*timeObj.seconds;
      if (seconds > 60) {
        seconds = seconds - 60;
        minutes++;
      }
      
      return String(hours).padStart(2,'0') + "h " + String(minutes).padStart(2,'0') + "min " + String(seconds).padStart(2,'0') + "sec";
    },
    astronomicalTwilightMorning: function(){
      var alpha = -18; // 12-18 degree
      var twilight = Sun.GetTwilightTime(alpha, this.date, this.latitude, this.longitude);
      return String(twilight.morningTwilight.hours).padStart(2,'0') + ":" + String(twilight.morningTwilight.minutes).padStart(2,'0') 
            + " h=-" + twilight.hourAngle.toFixed(2);
    },
    astronomicalTwilightEvening: function(){
      var alpha = -18; // 12-18 degree
      var twilight = Sun.GetTwilightTime(alpha, this.date, this.latitude, this.longitude);
      return String(twilight.eveningTwilight.hours).padStart(2,'0') + ":" + String(twilight.eveningTwilight.minutes).padStart(2,'0')
            + " h=+" + twilight.hourAngle.toFixed(2);
    }
    
  }
}
</script>

<style lang="scss">
</style>

