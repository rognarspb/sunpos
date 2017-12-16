<template>
  <div id="app">
    <div class="text-center">
      <img src="./assets/sun.svg" width="100" height="100">
      <h1 class="he">Cолнце</h1>
    </div>
    <hr/>
    <div class="row">
      <div class="col-md-4">
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
                calendar-button-icon="far fa-calendar-alt" />
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
      <div class="col-md-4">
        <h4>Текущее время</h4>
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
      <div class="col-md-4">
        <h4>Координаты</h4>
        <dl class="info">
          <dt>Эклиптические координаты</dt>
          <dd>{{eclipticLongutude}}&deg;, {{eclipticLatitude}}&deg; </dd>
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
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h4>Солнце</h4>
        <dl class="info">
          <dt>Солнечный полдень (JD)</dt>
          <dd>{{solarNoon}} </dd>
          <dt>Солнечный полдень (локальное время)</dt>
          <dd>{{solarNoonObject.hour}}:{{solarNoonObject.minutes}} </dd>
          <dt>Восход</dt>
          <dd>{{sunrise}} </dd>
          <dt>Закат</dt>
          <dd>{{sunset}} </dd>
          <dt>Длительность дня</dt>
          <dd>{{daylength}} </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';


export default {
  name: 'app',
  components: {
    'datepicker':  Datepicker
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
    GetJDN : function (dt) {
      var day = dt.getDate();
      var month = dt.getMonth() + 1;
      var year = dt.getFullYear();

      var a = Math.floor((14 - month)/12);
      var y = year + 4800 - a;
      var m = month + 12*a - 3;

      var jdn = day + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
      return jdn;
    },
    GetJD : function (dt) {
      var hour = dt.getHours();
      var minute = dt.getMinutes();
      var second = dt.getSeconds();

      var jd = this.GetJDN(dt) + (hour-12)/24 + minute/1440 + second/86400;
      return jd;
    },
    GetMJD : function (dt) {
      var mjd = this.GetJD(dt) - 2400000.5;
      return mjd;
    },
    GetDayOfWeek : function (dt) {
      return this.GetJDN(dt) % 7;
    },

    // sun ecliptic longitude in degrees
    GetEclipticLongitude: function(dt){
      var jd = this.GetJD(dt);
      var n = jd - 2451545.0;

      // mean longitute in degrees:
      var L = 280.460 + 0.9856474*n; 

      // mean anomaly in degrees:
      var g = 357.528 + 0.9856003*n;

      // TODO: limit to 360:
      L = L % 360;
      g = g % 360;

      // convert to radians:
      var g_rad = g * (Math.PI/180);

      // ecliptic longutude (in degrees)
      var lambda = L + 1.915*Math.sin(g_rad) + 0.02*Math.sin(2.0*g_rad);
      return lambda;
    },
    GetDistance: function(dt){
      var jd = this.GetJD(dt);
      var n = jd - 2451545.0;

      // mean anomaly in degrees:
      var g = 357.528 + 0.9856003*n;
      g = g % 360;

      // convert to radians:
      var g_rad = (g * Math.PI)/180;

      // distance in a.e.:
      var R = 1.00014 - 0.01671*Math.cos(g_rad) - 0.00014*Math.cos(2*g_rad);
      return R;
    },

    // obliquity of the ecliptic:
    GetEps: function(dt){
      var jd = this.GetJD(dt);
      var n = jd - 2451545.0;

      var eps = 23.439 - 0.0000004*n;
      return eps;
    },

    // equatorial coordinates:
    // Right ascension (degrees)
    GetAlpha: function(dt){
      var eps = this.GetEps(dt);
      var lambda = this.GetEclipticLongitude(dt);
      var eps_rad = (eps * Math.PI)/180;
      var lambda_rad = (lambda * Math.PI)/180;

      var alpha = Math.atan2(Math.cos(eps_rad)*Math.sin(lambda_rad), Math.cos(lambda_rad));
      return (alpha*180)/Math.PI;
    },
    // declination (degrees)
    GetDelta: function(dt){
      var eps = this.GetEps(dt);
      var lambda = this.GetEclipticLongitude(dt);
      var eps_rad = (eps * Math.PI)/180;
      var lambda_rad = (lambda * Math.PI)/180;

      var delta = Math.asin(Math.sin(eps_rad)*Math.sin(lambda_rad));
      return (delta*180)/ Math.PI;
    },

    // sun declination:
    GetDeclination: function(dt){
      var N = moment(dt).dayOfYear();
      var arg = (360/365)*(N + 10);
      var arg_rad = arg * (Math.PI/180);
      var delta = -23.44*Math.cos(arg_rad);
      return delta;
    },
    GetHourAngle: function(dt){
      // var N = moment(dt).dayOfYear();
      var lat_rad = (this.lat * Math.PI)/180;
      var dec_rad = (this.GetDeclination(dt) * Math.PI)/180;
      var a_rad = (-0.83 * Math.PI)/180; // athmospheric refraction
      var cosHourAngle = (Math.sin(a_rad) -  Math.sin(lat_rad) * Math.sin(dec_rad))/(Math.cos(lat_rad)*Math.cos(dec_rad));
      var res = Math.acos(cosHourAngle);
      return (res*180)/Math.PI;
    },

    rad: function(degree){
      return (degree * Math.PI)/180;
    },

    // Jtransit = true solar transit or solar noon Julian date
    GetSolarNoon: function() {
      var dt = new Date();
      var hourOffset = dt.getTimezoneOffset()/60;
      dt.setHours(12 - hourOffset);
      dt.setMinutes(0);
      dt.setSeconds(0);
      
      var jd = this.GetJD(dt);
      var n = jd - 2451545.0 + 0.0008;

      // approximation of mean solar time at longitude
      var J = n - this.lon/360;
      // solar mean anomaly:
      var M = (357.5291 + 0.98560028*J) % 360;
      // equation of center:
      var C = 1.9148*Math.sin(this.rad(M)) + 0.02*Math.sin(this.rad(2*M)) + 0.0003*Math.sin(this.rad(3.0*M));
      // ecliptic longitude:
      var lambda = (M + C + 180 + 102.9372) % 360;

      var Jtransit = 2451545.5 + J + 0.0053 * Math.sin(this.rad(M)) - 0.0069*Math.sin(this.rad(2*lambda));
      return Jtransit;
    },

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
      return this.GetJDN(this.julianDate);
    },
    jd: function(){
      return this.GetJD(this.julianDate).toFixed(6);
      //return Math.round(this.GetJD(this.julianDate) * 10000) / 10000;
    },
    mjd: function(){
      return Math.round(this.GetMJD(this.julianDate) * 100) / 100;
    },
    dayOfWeek: function(){
      var days = ["Понедельник","Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
      var index = this.GetDayOfWeek(this.julianDate)
      return days[index];
    },
    eclipticLongutude: function(){
      var elon =  this.GetEclipticLongitude(this.julianDate);
      return Math.round(elon * 100) / 100;
    },
    eclipticLatitude: function(){
      return 0.0;
    },
    distance: function(){
      var dist =  this.GetDistance(this.julianDate);
      return Math.round(dist * 10000) / 10000;
    },
    distanceKm: function(){
      var dist =  this.GetDistance(this.julianDate) * 149597870.691;
      return this.NumberWithCommas(Math.round(dist * 10000) / 10000);
    },
    epsilon: function(){
      var eps =  this.GetEps(this.julianDate);
      return Math.round(eps * 100) / 100;
    },
    alpha: function(){
      var a =  this.GetAlpha(this.julianDate);
      return Math.round(a * 100) / 100;
    },
    delta: function(){
      var d =  this.GetDelta(this.julianDate);
      return Math.round(d * 1000) / 1000;
    },
    declination: function(){
      var d =  this.GetDeclination(this.julianDate);
      return Math.round(d * 100) / 100;
    },
    hourAngle: function(){
      var ha =  this.GetHourAngle(this.julianDate);
      return Math.round(ha * 100) / 100;
    },
    hourAngleObject: function() {
      var ha =  this.GetHourAngle(this.julianDate);
      var x = ha/15; // 15 degree per hour
      var res = {
        hour: Math.floor(x),
        minutes: Math.floor(60 * ((x % 1).toFixed(2)))
      }
      return res;
    },
    hourAngleValue: function(){
      var timeObj =  this.hourAngleObject;
      return timeObj.hour + "h " + timeObj.minutes + "min";
    },
    solarNoonObject: function(){
      var sn =  this.GetSolarNoon();
      var seconds = (sn % 1)*86400;
      var hour = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds - hour*3600)/60);
      return  {
        hour: hour,
        minutes: minutes
      }
    },
    solarNoon: function() {
      var sn =  this.GetSolarNoon();
      return sn.toFixed(6);     
    },
    sunset: function(){
      var timeObj =  this.hourAngleObject;
      var hour = this.solarNoonObject.hour + timeObj.hour;
      var minutes = timeObj.minutes + this.solarNoonObject.minutes;
      if (minutes > 60){
        minutes = minutes - 60;
        hour++;
      }
      return hour + ":" + minutes;
    },
    sunrise: function(){
      var timeObj =  this.hourAngleObject;
      var hour = this.solarNoonObject.hour - timeObj.hour;
      var minutes = this.solarNoonObject.minutes - timeObj.minutes;
      if (minutes < 0){
        minutes = timeObj.minutes - this.solarNoonObject.minutes;
        hour--;
      }
      return hour + ":" + minutes;
    },
    daylength: function(){
      var timeObj =  this.hourAngleObject;
      var hour = 2*timeObj.hour;
      var minutes = 2*timeObj.minutes;
      if (minutes > 60) {
        minutes = minutes - 60;
        hour++;
      }
      return hour + "h " + minutes + "min";
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

dl.info {
  background: #efefef;
  margin: 10px;
  padding: 10px;
}
.form-info {
  background: #efefef;
  margin: 10px;
  padding: 20px;
}
</style>
