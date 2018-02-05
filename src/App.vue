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
    "setNoon": "Set noon",
    "currentCoordinates": "Reset coordinates",

    "ecliptiTitle": "Ecliptic plane",
    "addonTitle": "Additional information",
    "photoTitle": "Sun photos (online)",

    "sdoLink": "Sun photo",
    "sohoSolarLink": "Sun photo",
    "sohoLink": "Sun's corona photo",
    "jdcalc": "Julian day(JD) calculator",
    "timezone": "Timezone"
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
    "setNoon": "Установить полдень",
    "currentCoordinates": "Получить текущие координаты",
    
    "ecliptiTitle": "Плоскость эклиптики солнца",
    "addonTitle": "Вспомогательные ресурсы",
    "photoTitle": "Фотографии солнца (online)",
    
    "sdoLink": "Фото солнца",
    "sohoSolarLink": "Фото солнца",
    "sohoLink": "Фото короны солнца",
    "jdcalc": "Калькулятор юлианской даты",
    "timezone": "Часовой пояс"
  }
}
</i18n>

<template>
  <div id="app" class="container-fluid">
    <div class="row title-row">
      <div class="col-12 text-center">
        <img src="./assets/sunm.svg" width="100" height="100" class="sunimage">
        <h1 class="he">{{$t('title')}}</h1>
      </div>
    </div>
    <div class="row lang-row">
      <div class="col-12 text-center">
        <div class="btn-group btn-group-toggle">
          <button class="btn btn-outline-secondary btn-sm" v-bind:class="{ 'active': $i18n.locale == 'en'}" v-on:click="setEnglish">Eng</button>
          <button class="btn btn-outline-secondary btn-sm" v-bind:class="{ 'active': $i18n.locale == 'ru'}" v-on:click="setRussian">Рус</button>
        </div>
      </div>
    </div>
    <div class="row top-row">
      <div class="col-sm-12 col-lg-8 col-xl-8">
        <h4>{{$t('sunStatusTitle')}}&nbsp;<span class="fa fa-question-circle" role="button" v-on:click="toggleInfo" style="cursor: pointer"></span></h4>

          <div style="height: 550px;" v-if="!showInfo">
            <sunstatus :date="julianDate" :latitude="lat" :longitude="lon"></sunstatus>
          </div>

        <transition name="fade">
          <div class="info" v-if="showInfo">             
            <div class="row">
              <div class="col">
                <br/>
                <p><strong>SunPos application provides various information about sun:</strong></p>
                <ul>
                  <li>Where is the sun?</li>
                  <li>What time is solar noon?</li>
                  <li>Sunrise and sunset times</li>              
                  <li>Julian day number and normalized Julian day number</li>
                  <li>Ecliptic and equatorial coordinates</li>
                  <li>Sun azimuth, zenith and elevation angle</li>
                  <li>Twilight time at morning and evening</li>
                  <li>Photography golden hour</li>
                  <li>Day length and local sun coordinates</li>
                  <li>Sun solstice and equinox parameters</li>
                </ul>
              </div>
              <div class="col" style="border-left: 1px solid lightgray;">
                <br/>
                <p><strong>SunPos позволяет получить различную информацию о солнце:</strong></p>
                <ul>
                  <li>Где сейчас солнце?</li>
                  <li>Во сколько наступает истинный полдень?</li>
                  <li>Время восхода и заката</li>              
                  <li>Юлианская дата и Юлианский день</li>
                  <li>Эклиптические и экваториальные координаты солнца</li>
                  <li>Азимут солнца, угол зенита и высота солнца над горизонтом</li>
                  <li>Время наступления утренних и вечерних сумерек</li>
                  <li>Золотой час для фотографии</li>
                  <li>Длительность дня и координаты солнца на небосводе</li>
                  <li>Сведения о солнцестоянии и равноденствии</li>
                </ul>
              </div>
              
            </div>
          </div>
        </transition>
      </div>
      <div class="col-sm-12 col-lg-4 col-xl-4">
        <h4>{{$t('observer')}}</h4>
        <div class="form form-info">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>{{$t('latitude')}}</label>
              <input type="number" v-model="lat" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label>{{$t('longitude')}}</label>
              <input type="number" v-model="lon" class="form-control"/>
            </div>
          </div>
          <div class="form-group">
            <label>{{$t('timezone')}}</label>
            <input type="text" v-model="timezoneName" readonly class="form-control"/>
          </div>
          <div class="form-group">
              <button class="btn btn-secondary btn-sm" v-on:click="getLocation">{{$t('currentCoordinates')}}</button>
          </div>         
          <div class="form-group">
            <label>{{$t('date')}}</label>
            <div class="input-group">
              <datepicker v-model="userDate"              
                :language="globalLocale" 
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
        <suntime :date="julianDate" :latitude="lat" :longitude="lon"></suntime>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <twilight :date="julianDate" :latitude="lat" :longitude="lon"></twilight>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <h4>{{$t('ecliptiTitle')}}</h4>
        <div class="info">
          <ecliptic :longitude="eclipticLongitude"></ecliptic>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <coordinates :date="julianDate" :latitude="lat" :longitude="lon"></coordinates>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <localcoordinates :date="julianDate" :latitude="lat" :longitude="lon"></localcoordinates>
      </div>
      
    </div>
    <hr/>
    <h3 class="text-center"><a href="#addons">{{$t('addonTitle')}}</a></h3>
    <br/>
    <div class="text-center"><i class="fa fa-arrow-down fa-2x"></i></div>
    <br/>
    <div class="row" id="addons">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <jdcalc></jdcalc>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <azcalc :date="julianDate" :latitude="lat" :longitude="lon"></azcalc>
      </div>
    </div>

    <hr/>
    <h3 class="text-center"><a href="#photos">{{$t('photoTitle')}}</a></h3>
    <br/>
    <div class="text-center"><i class="fa fa-arrow-down fa-2x"></i></div>
    <br/>
    
    <div class="row" id="photos">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div class="info text-center">
          <h4>{{$t('sdoLink')}} <a href="https://sdo.gsfc.nasa.gov/data/">SDO</a></h4>
          <img class="img-fluid" src="https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0193.jpg"/>
        </div>
      </div>    
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div class="info text-center">
          <h4>{{$t('sohoSolarLink')}} <a href="https://soho.nascom.nasa.gov/data/realtime/realtime-update.html">SOHO</a></h4>
          <img class="img-fluid" width="512" height="512" src="https://sohowww.nascom.nasa.gov/data/realtime/eit_304/512/latest.jpg"/>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div class="info text-center">
          <h4>{{$t('sohoLink')}} <a href="https://soho.nascom.nasa.gov/data/realtime/realtime-update.html">SOHO</a></h4>
          <img class="img-fluid" width="512" height="512" src="https://soho.nascom.nasa.gov/data/realtime/c2/1024/latest.jpg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import tzlookup from 'tz-lookup';
import momenttz from 'moment-timezone';
import Datepicker from 'vuejs-datepicker';
import Ecliptic from './components/ecliptic.vue';
import SunStatus from './components/sunstatus.vue';
import SunTime from './components/suntime.vue';
import JDCalc from './components/jdcalc.vue';
import AZCalc from './components/azcalc.vue';
import DateInfo from './components/dateinfo.vue';
import Coordinates from './components/coordinates.vue';
import LocalCoordinates from './components/localcoordinates.vue';
import Twilight from './components/twilight.vue';
import * as JD from './js/jd.js';
import * as Sun from './js/sun.js';
import * as Util from './js/util.js';


export default {
  name: 'app',
  components: {
    'datepicker':  Datepicker,
    'ecliptic': Ecliptic,
    'jdcalc': JDCalc,
    'azcalc': AZCalc,
    'sunstatus': SunStatus,
    'suntime': SunTime,
    'dateinfo': DateInfo,
    'coordinates': Coordinates,
    'localcoordinates': LocalCoordinates,
    'twilight': Twilight
  },
  data () {
    return {
      msg: 'Where is the sun?',
      lat: 59.57,
      lon: 30.18,
      userDate: new Date(),
      userHours: 12,
      userMinutes: 0, 
      userSeconds: 0,
      showInfo: false
    }
  },
  created: function() {
      this.setNow();
      this.selectLocale();
      this.getLocation();
  },
  methods: {
    toggleInfo: function(){
      this.showInfo = !this.showInfo;
    },
    getLanguages: function()
    {
      if (navigator.languages != undefined) 
        return navigator.languages; 
      else 
        return [navigator.language];
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
    },
    setEnglish: function(){
      this.$root.$options.i18n.locale = 'en';
    },
    setRussian: function(){
      this.$root.$options.i18n.locale = 'ru';
    },    
    getLocation: function(){
      var self = this;
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      if ("geolocation" in navigator) {
        // try get current coordinates
        navigator.geolocation.getCurrentPosition(function(pos){
            var coords = pos.coords;
            self.lat = coords.latitude;
            self.lon = coords.longitude;
        }, function(err) {
          console.warn("ERROR(${err.code}): ${err.message}");
        }, options);
      }
    },
    selectLocale: function(){
      var lngs = this.getLanguages();
      if (lngs && lngs.length > 0) {
          for(var key in lngs){
            if (lngs[key] == 'ru' || lngs[key] == 'ru-RU'){
              this.setRussian();
              break;
            }
            if (lngs[key] == 'en' || lngs[key] == 'en-GB' || lngs[key] == 'en-US'){
              this.setRussian();
              break;
            }
          }
      } else {
        setEnglish();
      }
    }
  },
  computed:{   
    julianDate: function(){
      var dt = moment(this.userDate).toDate();
      var res = dt.setHours(this.userHours, this.userMinutes, this.userSeconds);
      var dateWrapper = moment(dt).clone();
      return dateWrapper.toDate();
    },
    eclipticLongitude: function(){
      var elon =  Sun.GetEclipticLongitude(this.julianDate);
      return Math.round(elon * 100) / 100;
    },
    globalLocale: function(){
      return this.$root.$options.i18n.locale;
    },
    timezoneName: function(){
        var tzName = tzlookup(this.lat, this.lon);
        var dt = new Date();
        var hourOffset = moment(dt).tz(tzName).utcOffset()/60
        var sign = hourOffset > 0 ? "+" : "";
        return tzName + " (UTC" + sign + String(hourOffset).padStart(2, "0") + ")";
    }
  },
  watch: {
    userHours: function(){
        if (this.userHours >= 24)
          this.userHours = 0;
        if (this.userHours < 0){
          this.userHours = 23;
        }
    },
    userMinutes: function(){
        if (this.userMinutes >= 60)
          this.userMinutes = 0;
        if (this.userMinutes < 0){
          this.userMinutes = 59;
        }
    },
    userSeconds: function(){
        if (this.userSeconds >= 60)
          this.userSeconds = 0;
        if (this.userSeconds < 0){
          this.userSeconds = 59;
        }
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
  @media only screen and (min-resolution:96dpi) and (max-resolution:264dpi) and (min-width:768px) and (max-width:1024px),
       only screen and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio:3) and (min-width:768px) and (max-width:1024px) {
    text.label-lg{
      font-size: 1.2em;
    }
    div, p {
      font-size: 2rem;
    }
    h1, h2, h3, h4{
      font-size: 3rem;
    }
    button, input{
      font-size: 2rem;
    }
  }
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
  box-shadow: 3px 3px 50px -5px  #888888;
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
  background: white;
}

.title-row {
  padding-top: 10px;
  padding-bottom: 20px;
  background: #4181ca;
  color: whitesmoke;
  border-bottom: 10px solid #bedcfb;
  h1 {
    text-shadow: 0 0 3px #efefef;
  }
}

.lang-row {
  padding-top: 5px;
  padding-bottom: 5px;
  background: #d2e2f8;
}


@-webkit-keyframes rotation {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes rotation {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

.sunimage{
  -webkit-animation: rotation 20s infinite linear;
  animation: rotation 20s infinite linear;
}
 
.fade-enter-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>
