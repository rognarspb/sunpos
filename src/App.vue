<template>
  <div id="app" class="container-fluid">
    <div class="text-center">
      <img src="./assets/sun.svg" width="100" height="100">
      <h1 class="he">Cолнце: положение, восход и закат</h1>
    </div>
    <hr/>
    <div class="row sky-row">
      <div class="col-sm-12 col-lg-6 col-xl-4">
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
          <div class="form-group">
              <button class="btn btn-default btn-sm" v-on:click="setNow">Установить текущее время</button>
              <button class="btn btn-default btn-sm" v-on:click="setNoon">Установить полдень</button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
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
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <h4>Астрономические координаты</h4>
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
          <dt>Часовой угол в момент (восход/закат)</dt>
          <dd>{{hourAngle}}&deg; ({{hourAngleValue}})</dd>
        </dl>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <h4>Плоскость эклиптики солнца</h4>
        <div class="info">
          <ecliptic :longitude="eclipticLongutude"></ecliptic>
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
    <h3 class="text-center">Вспомогательные ресурсы</h3>
    <div class="row justify-content-center">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <jdcalc></jdcalc>
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
import JDCalc from './components/jdcalc.vue';
import * as JD from './js/jd.js';
import * as Sun from './js/sun.js';
import * as Util from './js/util.js';


export default {
  name: 'app',
  components: {
    'datepicker':  Datepicker,
    'ecliptic': Ecliptic,
    'jdcalc': JDCalc
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
    },
    setNoon: function(){
      var now = new Date();
      this.userDate = now;
      this.userHours = 12;
      this.userMinutes = 0;
      this.userSeconds = 0;
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
      //var dt = new Date();
      //dt.setFullYear(this.userDate.getFullYear());
      //dt.setMonth(this.userDate.getMonth());
      //dt.setDate(this.userDate.getDate());
      var res = dt.setHours(this.userHours, this.userMinutes, this.userSeconds);
      return dt;
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
      var ha =  Sun.GetSunriseHourAngle(this.julianDate, this.lat);
      return Math.round(ha * 100) / 100;
    },
    hourAngleObject: function() {
      // var dt = new Date()
      var ha =  Sun.GetSunriseHourAngle(this.julianDate, this.lat);
      return Util.degreeToTime(ha);
    },
    hourAngleValue: function(){
      var timeObj =  this.hourAngleObject;
      return Util.timeObjToString(timeObj);
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
    sunset: function(){
      var timeObj =  this.hourAngleObject;
      var hours = this.solarNoonObject.hours + timeObj.hours;
      var minutes = timeObj.minutes + this.solarNoonObject.minutes;
      if (minutes > 60){
        minutes = minutes - 60;
        hours++;
      }
      return String(hours).padStart(2,'0') + ":" + String(minutes).padStart(2,'0');
    },
    sunrise: function(){
      var timeObj =  this.hourAngleObject;
      var hours = this.solarNoonObject.hours - timeObj.hours;
      var minutes = this.solarNoonObject.minutes - timeObj.minutes;
      if (minutes < 0){
         minutes = 60 + minutes;
         hours--;
      }
      return String(hours).padStart(2,'0') + ":" + String(minutes).padStart(2,'0');
    },
    daylength: function(){
      var timeObj =  this.hourAngleObject;
      var hours = 2*timeObj.hours;
      var minutes = 2*timeObj.minutes;
      if (minutes > 60) {
        minutes = minutes - 60;
        hours++;
      }
      return String(hours).padStart(2,'0') + "h " + String(minutes).padStart(2,'0') + "min";
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

.sky-row {
  padding-top: 50px;
  padding-bottom: 50px;
  background: #c0dfff;
}
 
</style>
