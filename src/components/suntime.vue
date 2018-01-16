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
    "sunsetAzimuth": "Azimuth (sunset)",
    "daybefore": "Day before",
    "yesterday": "Yesterday",
    "today": "Today",
    "tomorrow": "Tomorrow",
    "dayafter": "Day after"
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
    "sunsetAzimuth": "Азимут (закат)",

    "daybefore": "Позавчера",
    "yesterday": "Вчера",
    "today": "Сегодня",
    "tomorrow": "Завтра",
    "dayafter": "Послезавтра"
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
              <div class="vcenter"><strong>{{sunrise}}</strong>&nbsp;({{sunriseAzimuth}}&deg;)</div>
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
              <div class="vcenter"><strong>{{sunset}}</strong>&nbsp;({{sunsetAzimuth}}&deg;)</div>
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
                <dt>{{$t('hourangle')}}</dt>
                <dd>{{sunriseHourAngle}}&deg; </dd>
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
                  <dd>
                    <table class="table table-sm table-bordered table-daylen">
                      <tbody>
                        <tr>
                            <td>{{getDate(-2)}}</td>
                            <td>{{getDayLength(-2)}}</td>
                        </tr>
                        <tr>
                            <td>{{getDate(-1)}}</td>
                            <td>{{getDayLength(-1)}}</td>
                        </tr>
                        <tr class="text-info">
                            <td>{{getDate(0)}}</td>                          
                            <td>{{getDayLength(0)}}</td>
                        </tr>  
                        <tr>
                            <td>{{getDate(1)}}</td>                          
                            <td>{{getDayLength(1)}}</td>
                        </tr>
                        <tr>
                            <td>{{getDate(2)}}</td>                          
                            <td>{{getDayLength(2)}}</td>
                        </tr>  
                      </tbody>
                    </table>
                  </dd>
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
    getDayLength: function(offset){
        var dateWrapper = moment(this.date).add(offset, 'days');
        var daylen = Sun.GetDayLength(dateWrapper.toDate(), this.latitude, this.longitude);
        return Util.timeObjToString(daylen)
    },
    getDate: function(offset) {
        var res = '';
        var today = new Date();
        if (today.getFullYear() == this.date.getFullYear() && 
            today.getMonth() == this.date.getMonth() && 
            today.getDate() == this.date.getDate()) {
            
            if (offset == -2)
              res += this.$t('daybefore');
            else if (offset == -1)
              res += this.$t('yesterday');
            else if (offset == 0)
              res += this.$t('today');
            else if (offset == 1)
              res += this.$t('tomorrow');
            else if (offset == 2)
              res += this.$t('dayafter');
            return res;              
        }
        var dateWrapper = moment(this.date).add(offset, 'days');
        res += Util.dateToShortString(dateWrapper.toDate());
        return res;
    }
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
      var daylen = Sun.GetDayLength(this.date, this.latitude, this.longitude);
      return Util.timeObjToString(daylen);
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


.table-daylen{
  margin-top: 10px; 
  margin-bottom: 0px;
}

hr {
  margin-top: 0px;
}

dl {
  margin-bottom: 0px;
}

</style>

