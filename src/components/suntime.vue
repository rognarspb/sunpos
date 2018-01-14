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
    "twilightEvening": "Astronomical twilight (evening)",
    "hourangle": "Hour angle (sunrise/sunset)",
    "sunriseAzimuth": "Azimuth (sunrise)",
    "sunsetAzimuth": "Azimuth (sunset)"
  },
  "ru": {
    "title": "Закат и восход Солнца",
    "solarNoon": "Солнечный полдень (JD)",
    "solarNoonLocal": "Солнечный полдень (локальное время)",
    "sunrise": "Восход",
    "sunset": "Закат",
    "daylength": "Длительность дня",
    "twilightMorning": "Астрономические сумерки (утренние)",
    "twilightEvening": "Астрономические сумерки (вечерние)",
    "hourangle": "Часовой угол (восход/закат)",
    "sunriseAzimuth": "Азимут (восход)",
    "sunsetAzimuth": "Азимут (закат)"
  }
}
</i18n>
<template>
    <div>
        <h4>{{$t('title')}}</h4>
        <div class="info">
          <!-- <h5>Восход и закат</h5> -->
          <div class="row row-img">
            <div class="col-1 vparent">
                <svg width="36" height="36" style="background:none" class="vcenter">
                    <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#ff9431"></circle>
                </svg>
            </div>
            <div class="col-2 vparent">
              <div class="vcenter">{{$t('sunrise')}}</div>
            </div>
            <div class="col-6 vparent">
              <div class="vcenter">{{sunrise}}</div>
            </div>
          </div>
          <div class="row row-img">
            <div class="col-1 vparent">
              <svg width="36" height="36" style="background:none" class="vcenter">
                  <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#ff6e31"></circle>
              </svg>
            </div>
            <div class="col-2 vparent">
              <div class="vcenter">{{$t('sunset')}}</div>
            </div>
            <div class="col-6 vparent">
              <div class="vcenter">{{sunset}}</div>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-1">
              <svg width="36" height="36" style="background:none">
                  <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#ffe92b"></circle>
              </svg>
            </div>
            <div class="col">
              <dl>
                <dt>
                  {{$t('solarNoon')}}
                </dt>
                <dd>{{solarNoon}} </dd>
                <dt>{{$t('solarNoonLocal')}}</dt>
                <dd>{{solarNoonString}} </dd>
              </dl>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-1">
              <svg width="36" height="36" style="background:none">
                  <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="whitesmoke"></circle>
              </svg>
            </div>
            <div class="col">
              <dl>
                  <dt>{{$t('daylength')}}</dt>
                  <dd>{{daylength}} </dd>
                  <dt>{{$t('hourangle')}}</dt>
                  <dd>{{sunriseHourAngle}}&deg; </dd>
                  <dt>{{$t('sunriseAzimuth')}}</dt>
                  <dd>{{sunriseAzimuth}}&deg; </dd>
                  <dt>{{$t('sunsetAzimuth')}}</dt>
                  <dd>{{sunsetAzimuth}}&deg; </dd>
                </dl>
              </dl>
             </div>
          </div>
        </div>
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
    sunriseHourAngle: function() {
      var ha =  Sun.GetSunriseHourAngle(this.date, this.latitude, this.longitude);
      return ha.toFixed(2);     
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
    sunriseAzimuth: function(){
        var sunriseTime = Sun.GetSunriseTime(this.date, this.latitude, this.longitude);
        var dt = Util.timeObjToDate(this.date, sunriseTime);
        var a = Sun.GetAzimuthAngle(dt, this.latitude, this.longitude);
        return a.toFixed(2);
    },
    sunsetAzimuth: function(){
        var sunsetTime = Sun.GetSunsetTime(this.date, this.latitude, this.longitude);
        var dt = Util.timeObjToDate(this.date, sunsetTime);
        var a = Sun.GetAzimuthAngle(dt, this.latitude, this.longitude);
        return a.toFixed(2);
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
    }
  }
}
</script>

<style lang="scss">

.row-img {
  padding-top: 5px;
  padding-bottom: 5px;
  height: 56px;
  &:hover{
    background: aliceblue;
  }
}

.vparent{
  position: relative;
}

.vcenter{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

</style>

