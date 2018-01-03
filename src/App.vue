<i18n>
{
  "en": {
    "title": "Sun: coordinates, sunrise and sunset",
    "sunStatusTitle": "Sun elevation angle",
    "observer": "Observer",
    "detailedTitle": "Detailed information",

    "latitude": "Latitude",
    "longitude": "Longitude",
    "date": "Date",
    "hours": "Hours",
    "minutes": "Minutes",
    "seconds": "Seconds",
    "setNow": "Set now",
    "setNoon": "Set noon"
  },
  "ru": {
    "title": "Cолнце: положение, восход и закат",
    "sunStatusTitle": "Высота солнца над горизонтом",
    "observer": "Наблюдатель",
    "detailedTitle": "Детальная информация",

    "latitude": "Широта",
    "longitude": "Долгота",
    "date": "Дата",
    "hours": "Часы",
    "minutes": "Минуты",
    "seconds": "Секунды",
    "setNow": "Установить текущее время",
    "setNoon": "Установить полдень"
    
  }
}
</i18n>

<template>
  <div id="app" class="container-fluid">
    <div class="text-center">
      <img src="./assets/sun.svg" width="100" height="100">
      <h1 class="he">{{$t('title')}}</h1>
      <br/>
      <div class="btn-group btn-group-toggle">
        <button class="btn btn-secondary btn-sm" v-bind:class="{ 'active': $i18n.locale == 'en'}" v-on:click="setEnglish">English</button>
        <button class="btn btn-secondary btn-sm" v-bind:class="{ 'active': $i18n.locale == 'ru'}" v-on:click="setRussian">Русский</button>
      </div>
    </div>
    <hr/>
    <div class="row top-row">
      <div class="col-sm-12 col-lg-8 col-xl-8">
        <h4>{{$t('sunStatusTitle')}}</h4>
        <div style="height: 440px; padding-top: 20px;">
          <sunstatus :date="julianDate" :latitude="lat" :longitude="lon"></sunstatus>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 col-xl-4">
        <h4>{{$t('observer')}}</h4>
        <div class="form form-info">
          <div class="form-group">
            <label>{{$t('latitude')}}</label>
            <input type="number" v-model="lat" class="form-control" />
          </div>
          <div class="form-group">
            <label>{{$t('longitude')}}</label>
            <input type="number" v-model="lon" class="form-control"/>
          </div>
          <div class="form-group">
            <label>{{$t('date')}}</label>
            <div class="input-group">
              <datepicker v-model="userDate"              
                language="ru" 
                :bootstrap-styling="true"
                :full-month-name="true"
                :calendar-button="true"
                calendar-button-icon="far fa-calendar-alt" ></datepicker>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label>{{$t('hours')}}</label>
              <input type="number" class="form-control" v-model="userHours" placeholder="HH">
            </div>
            <div class="form-group col-md-4">
              <label>{{$t('minutes')}}</label>
              <input type="number" class="form-control" v-model="userMinutes" placeholder="mm">
            </div>
            <div class="form-group col-md-4">
              <label>{{$t('seconds')}}</label>
              <input type="number" class="form-control" v-model="userSeconds" placeholder="ss">
            </div>
          </div>
          <div class="form-group">
              <button class="btn btn-secondary btn-sm" v-on:click="setNow">{{$t('setNow')}}</button>
              <button class="btn btn-secondary btn-sm" v-on:click="setNoon">{{$t('setNoon')}}</button>
          </div>
        </div>
      </div>       
    </div>
    <hr/>
    <h3 class="text-center"><a href="#details">{{$t('detailedTitle')}}</a></h3>
    <br/>
    <div class="text-center"><i class="fa fa-arrow-down fa-2x"></i></div>
    <br/>    
    <div class="row sky-row" id="details">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <dateinfo :date="julianDate"></dateinfo>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <coordinates :date="julianDate" :latitude="lat" :longitude="lon"></coordinates>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <h4>Плоскость эклиптики солнца</h4>
        <div class="info">
          <ecliptic :longitude="eclipticLongitude"></ecliptic>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <h4>Закат и восход Солнца</h4>
        <dl class="info">
          <dt>Солнечный полдень (JD)</dt>
          <dd>{{solarNoon}} </dd>
          <dt>Солнечный полдень (локальное время)</dt>
          <dd>{{solarNoonString}} </dd>
          <dt>Восход</dt>
          <dd>{{sunrise}} </dd>
          <dt>Закат</dt>
          <dd>{{sunset}} </dd>
          <dt>Длительность дня</dt>
          <dd>{{daylength}} </dd>
          <dt>Астрономические сумерки (утренние)</dt>
          <dd>{{astronomicalTwilightMorning}}&deg; </dd>
          <dt>Астрономические сумерки (вечерние)</dt>
          <dd>{{astronomicalTwilightEvening}}&deg; </dd>
        </dl>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <h4>Положение солнца в локальных координатах</h4>
        <dl class="info">
          <dt>Часовой угол</dt>
          <dd>h={{sunHourAngle}}&deg;</dd>
          <dt>Высота (угол зенита &theta; и высота &alpha;)</dt>
          <dd>&theta;={{zenithAngle}}&deg; &alpha;={{elevationAngle}}&deg;</dd>
          <dt>Азимут</dt>
          <dd>{{azimuthAngle}}&deg; </dd>
        </dl>
      </div>
      
    </div>
    <hr/>
    <h3 class="text-center"><a href="#addons">Вспомогательные ресурсы</a></h3>
    <br/>
    <div class="text-center"><i class="fa fa-arrow-down fa-2x"></i></div>
    <br/>
    <div class="row" id="addons">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <jdcalc></jdcalc>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div class="info text-center">
          <h4>Фото солнца <a href="https://sdo.gsfc.nasa.gov/data/">SDO</a></h4>
          <img class="img-fluid" src="https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0193.jpg"/>
        </div>
      </div>    
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div class="info text-center">
          <h4>Фото короны солнца <a href="https://soho.nascom.nasa.gov/data/realtime/realtime-update.html">SOHO</a></h4>
          <img class="img-fluid" width="512" height="512" src="https://soho.nascom.nasa.gov/data/realtime/c2/1024/latest.jpg"/>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="jdModal" tabindex="-1" role="dialog" aria-labelledby="jdCalculator" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="jdCalculator">Калькулятор юлианской даты</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <jdcalc></jdcalc>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>    

  </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import Ecliptic from './components/ecliptic.vue';
import SunStatus from './components/sunstatus.vue';
import JDCalc from './components/jdcalc.vue';
import DateInfo from './components/dateinfo.vue';
import Coordinates from './components/coordinates.vue';
import * as JD from './js/jd.js';
import * as Sun from './js/sun.js';
import * as Util from './js/util.js';


export default {
  name: 'app',
  components: {
    'datepicker':  Datepicker,
    'ecliptic': Ecliptic,
    'jdcalc': JDCalc,
    'sunstatus': SunStatus,
    'dateinfo': DateInfo,
    'coordinates': Coordinates
  },
  data () {
    return {
      msg: 'Where is the sun?',
      lat: 59.57,
      lon: 30.18,
      userDate: new Date(),
      userHours: 12,
      userMinutes: 0, 
      userSeconds: 0
    }
  },
  created: function() {
      this.setNow();
  },
  methods: {  
   


    setNow: function(){
      var now = new Date();
      this.userDate = now;
      this.userHours = now.getHours();
      this.userMinutes = now.getMinutes();
      this.userSeconds = now.getSeconds();
    },
    setNoon: function(){
      var now = new Date();
      this.userDate = now;
      this.userHours = 12;
      this.userMinutes = 0;
      this.userSeconds = 0;
    },
    setEnglish: function(){
      this.$root.$options.i18n.locale = 'en';
    },
    setRussian: function(){
      this.$root.$options.i18n.locale = 'ru';
    }

  },
  computed:{   
    julianDate: function(){
      var dt = moment(this.userDate).toDate();
      //var dt = new Date();
      //dt.setFullYear(this.userDate.getFullYear());
      //dt.setMonth(this.userDate.getMonth());
      //dt.setDate(this.userDate.getDate());
      var res = dt.setHours(this.userHours, this.userMinutes, this.userSeconds);
      return dt;
    },
    eclipticLongitude: function(){
      var elon =  Sun.GetEclipticLongitude(this.julianDate);
      return Math.round(elon * 100) / 100;
    },
    
    solarNoonObject: function(){
      var sn =  Sun.GetSolarNoon(this.julianDate, this.lon);
      return JD.GetDateObject(sn);
    },
    solarNoonString: function(){
      var sn =  Sun.GetSolarNoon(this.julianDate, this.lon);
      var dateObj = JD.GetDateObject(sn);
      return Util.dateObjToString(dateObj);
    },
    solarNoon: function() {
      var sn =  Sun.GetSolarNoon(this.julianDate, this.lon);
      return sn.toFixed(6);     
    },
    sunrise: function(){
        var sunriseTime = Sun.GetSunriseTime(this.julianDate, this.lat, this.lon);
        return String(sunriseTime.hours).padStart(2,'0') + ":" 
              + String(sunriseTime.minutes).padStart(2,'0') + ":" 
              + String(sunriseTime.seconds).padStart(2,'0');
    },
    sunset: function(){
        var sunsetTime = Sun.GetSunsetTime(this.julianDate, this.lat, this.lon);
        return String(sunsetTime.hours).padStart(2,'0') + ":" 
              + String(sunsetTime.minutes).padStart(2,'0') + ":" 
              + String(sunsetTime.seconds).padStart(2,'0');
    },
    daylength: function(){
      var ha =  Sun.GetSunriseHourAngle(this.julianDate, this.lat, this.lon);
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
    zenithAngle: function(){
      var teta =  Sun.GetZenithAngle(this.julianDate, this.lat, this.lon);
      return Math.round(teta * 100) / 100;
    },
    elevationAngle: function(){
      var alpha =  Sun.GetElevationAngle(this.julianDate, this.lat, this.lon);
      return Math.round(alpha * 100) / 100;
    },
    azimuthAngle: function(){
      var phita =  Sun.GetAzimuthAngle(this.julianDate, this.lat, this.lon);
      return Math.round(phita * 100) / 100;
    },
    sunHourAngle: function(){
      var phita =  Sun.GetCurrentHourAngle(this.julianDate, this.lon);
      return Math.round(phita * 100) / 100;
    },
    
    astronomicalTwilightMorning: function(){
      var alpha = -18; // 12-18 degree
      var twilight = Sun.GetTwilightTime(alpha, this.julianDate, this.lat, this.lon);
      return String(twilight.morningTwilight.hours).padStart(2,'0') + ":" + String(twilight.morningTwilight.minutes).padStart(2,'0') 
            + " h=-" + twilight.hourAngle.toFixed(2);
    },
    astronomicalTwilightEvening: function(){
      var alpha = -18; // 12-18 degree
      var twilight = Sun.GetTwilightTime(alpha, this.julianDate, this.lat, this.lon);
      return String(twilight.eveningTwilight.hours).padStart(2,'0') + ":" + String(twilight.eveningTwilight.minutes).padStart(2,'0')
            + " h=+" + twilight.hourAngle.toFixed(2);
    }
  }
}
</script>

<style lang="scss">
#app-default {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}


h4 {
  margin: 0 auto;
  text-align: center;
}

.info {
  background: #efefef;
  border: 2px solid #efefef;
  margin: 10px;
  padding: 20px;
  min-height: 460px;
  box-shadow: 3px 3px 50px -5px  #888888;
  &:hover {
    border: 2px solid lightgreen;
  }
}
.form-info {
  background: #efefef;
  border: 2px solid #efefef;
  margin: 10px;
  padding: 20px;  
  min-height: 432px;
  &:hover {
    border: 2px solid lightgreen;
  }
}

.sky-row {
  padding-top: 50px;
  padding-bottom: 50px;
  background: linear-gradient(white,#c0dfff);
}

.top-row {
  padding-top: 50px;
  padding-bottom: 50px;
  background: linear-gradient(#c0dfff, white);
}

 
</style>
