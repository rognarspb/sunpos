<template>
  <div id="app">
    <div class="text-center">
      <img src="./assets/sun.svg" width="100" height="100">
      <h1 class="he">Cолнце</h1>
    </div>
    <hr/>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-3">
        <h4>Наблюдатель</h4>
        <div class="form form-info">
          <div class="form-group">
            <label>Широта</label>
            <input type="number" v-model="lat" class="form-control" />
          </div>
          <div class="form-group">
            <label>Долгота</label>
            <input type="number" v-model="lon" class="form-control"/>
          </div>
          <div class="form-group">
            <label>Дата</label>
            <div class="input-group">
              <datepicker v-model="userDate"              
                language="ru" 
                :bootstrap-styling="true"
                :full-month-name="true"
                :calendar-button="true"
                calendar-button-icon="far fa-calendar-alt" ></datepicker>
                <span class="input-group-btn">
                  <button class="btn btn-default btn-sm" v-on:click="setNow">Установить текущее время</button>
                </span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label>Часы</label>
              <input type="number" class="form-control" v-model="userHours" placeholder="HH">
            </div>
            <div class="form-group col-md-4">
              <label>Минуты</label>
              <input type="number" class="form-control" v-model="userMinutes" placeholder="mm">
            </div>
            <div class="form-group col-md-4">
              <label>Секунды</label>
              <input type="number" class="form-control" v-model="userSeconds" placeholder="ss">
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <h4>Время</h4>
        <dl class="info">
          <dt>Дата</dt>
          <dd>{{ localTime }}</dd>
          <dt>Юлианский день(JDN)</dt>
          <dd>{{ jdn }}</dd>
          <dt>Юлианская дата (JD)</dt>
          <dd>{{ jd }}</dd>
          <dt>Модифицированная Юлианская дата (MJD)</dt>
          <dd>{{ mjd }}</dd>
        </dl>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <h4>Координаты</h4>
        <dl class="info">
          <dt>Эклиптические координаты</dt>
          <dd>&beta;={{eclipticLatitude}}&deg;, &lambda;={{eclipticLongutude}}&deg; </dd>
          <dt>Экваториальные координаты</dt>
          <dd>&alpha;={{alpha}}&deg; , &delta;={{delta}}&deg; </dd>
          <dt>Расстояние</dt>
          <dd>{{distance}} а.е.</dd>
          <dd>{{distanceKm}} km</dd>
          <dt>Наклон эклиптики</dt>
          <dd>{{epsilon}}&deg;</dd>
          <dt>Солнечное склонение (аппроксимация &delta;)</dt>
          <dd>{{declination}}&deg;</dd>
          <dt>Часовой угол (восход/закат)</dt>
          <dd>{{hourAngle}}&deg; ({{hourAngleValue}})</dd>
        </dl>
        <div class="info">
          <ecliptic :longitude="eclipticLongutude"></ecliptic>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <h4>Солнце</h4>
        <dl class="info">
          <dt>Солнечный полдень (JD)</dt>
          <dd>{{solarNoon}} </dd>
          <dt>Солнечный полдень (локальное время)</dt>
          <dd>{{solarNoonObject.day}}.{{solarNoonObject.month}}.{{solarNoonObject.year}}
             {{solarNoonObject.hours}}:{{solarNoonObject.minutes}}:{{solarNoonObject.seconds}} </dd>
          <dt>Восход</dt>
          <dd>{{sunrise}} </dd>
          <dt>Закат</dt>
          <dd>{{sunset}} </dd>
          <dt>Длительность дня</dt>
          <dd>{{daylength}} </dd>
          <dt>Закат</dt>
          <dd>{{sunset}} </dd>
          <hr/>
          <dt>Высота</dt>
          <dd>&theta;={{zenithAngle}}&deg; &alpha;={{elevationAngle}}&deg;</dd>
          <dt>Азимут</dt>
          <dd>{{azimuthAngle}}&deg; </dd>
        </dl>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import Ecliptic from './components/ecliptic.vue';
import * as JD from './js/jd.js';
import * as Sun from './js/sun.js';


export default {
  name: 'app',
  components: {
    'datepicker':  Datepicker,
    'ecliptic': Ecliptic
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
  methods: {  
   

    NumberWithCommas: function (x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

    setNow: function(){
      var now = new Date();
      this.userDate = now;
      this.userHours = now.getHours();
      this.userMinutes = now.getMinutes();
      this.userSeconds = now.getSeconds();
    }

  },
  computed:{
    localTime: function(){
      var now = this.julianDate;
      var month = now.getMonth()+1;
      return  this.dayOfWeek + ", " + now.getDate() + "." +  month + "." + now.getFullYear() + ", " 
            + String(now.getHours()).padStart(2,'0') + ":"  
            + String(now.getMinutes()).padStart(2,'0') + ":" 
            + String(now.getSeconds()).padStart(2,'0');
    }, 
    julianDate: function(){
      var dt = moment(this.userDate).toDate();
      dt.setHours(this.userHours);
      dt.setMinutes(this.userMinutes);
      dt.setSeconds(this.userSeconds);
      return dt;
      // return new Date();
    },
    jdn: function(){
      return JD.GetJDN(this.julianDate);
    },
    jd: function(){
      return JD.GetJD(this.julianDate).toFixed(6);
      //return Math.round(this.GetJD(this.julianDate) * 10000) / 10000;
    },
    mjd: function(){
      return Math.round(JD.GetMJD(this.julianDate) * 100) / 100;
    },
    dayOfWeek: function(){
      var days = ["Понедельник","Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
      var index = JD.GetDayOfWeek(this.julianDate)
      return days[index];
    },
    eclipticLongutude: function(){
      var elon =  Sun.GetEclipticLongitude(this.julianDate);
      return Math.round(elon * 100) / 100;
    },
    eclipticLatitude: function(){
      return 0.0;
    },
    distance: function(){
      var dist =  Sun.GetDistance(this.julianDate);
      return Math.round(dist * 10000) / 10000;
    },
    distanceKm: function(){
      var dist =  Sun.GetDistance(this.julianDate) * 149597870.691;
      return this.NumberWithCommas(Math.round(dist * 10000) / 10000);
    },
    epsilon: function(){
      var eps =  Sun.GetEps(this.julianDate);
      return Math.round(eps * 100) / 100;
    },
    alpha: function(){
      var a =  Sun.GetAlpha(this.julianDate);
      return Math.round(a * 100) / 100;
    },
    delta: function(){
      var d =  Sun.GetDelta(this.julianDate);
      return Math.round(d * 1000) / 1000;
    },
    declination: function(){
      var d =  Sun.GetDeclination(this.julianDate);
      return Math.round(d * 100) / 100;
    },
    hourAngle: function(){
      var ha =  Sun.GetHourAngle(this.julianDate, this.lat);
      return Math.round(ha * 100) / 100;
    },
    hourAngleObject: function() {
      var ha =  Sun.GetHourAngle(this.julianDate, this.lat);
      var x = ha/15; // 15 degree per hour
      var res = {
        hours: Math.floor(x),
        minutes: Math.floor(60 * ((x % 1).toFixed(2)))
      }
      return res;
    },
    hourAngleValue: function(){
      var timeObj =  this.hourAngleObject;
      return timeObj.hours + "h " + timeObj.minutes + "min";
    },
    solarNoonObject: function(){
      var sn =  Sun.GetSolarNoon(this.lon);
      return JD.GetDateObject(sn);
    },
    solarNoon: function() {
      var sn =  Sun.GetSolarNoon(this.lon);
      return sn.toFixed(6);     
    },
    sunset: function(){
      var timeObj =  this.hourAngleObject;
      var hours = this.solarNoonObject.hours + timeObj.hours;
      var minutes = timeObj.minutes + this.solarNoonObject.minutes;
      if (minutes > 60){
        minutes = minutes - 60;
        hours++;
      }
      return hours + ":" + minutes;
    },
    sunrise: function(){
      var timeObj =  this.hourAngleObject;
      var hours = this.solarNoonObject.hours - timeObj.hours;
      var minutes = this.solarNoonObject.minutes - timeObj.minutes;
      if (minutes < 0){
        minutes = timeObj.minutes - this.solarNoonObject.minutes;
        hours--;
      }
      return hours + ":" + minutes;
    },
    daylength: function(){
      var timeObj =  this.hourAngleObject;
      var hours = 2*timeObj.hours;
      var minutes = 2*timeObj.minutes;
      if (minutes > 60) {
        minutes = minutes - 60;
        hours++;
      }
      return hours + "h " + minutes + "min";
    },
    zenithAngle: function(){
      var teta =  Sun.GetZenithAngle(this.julianDate, this.lat);
      return Math.round(teta * 100) / 100;
    },
    elevationAngle: function(){
      var alpha =  Sun.GetElevationAngle(this.julianDate, this.lat);
      return Math.round(alpha * 100) / 100;
    },
    azimuthAngle: function(){
      var phita =  Sun.GetAzimuthAngle(this.julianDate, this.lat);
      return Math.round(phita * 100) / 100;
    }    
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  min-height: 432px;
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

</style>
