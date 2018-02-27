<i18n>
{
  "en": {
    "title": "Astronomic coordinates",
    "eclipticCoordinates": "Ecliptic coordinates",
    "equatorialCoordinates": "Equatorial coordinates",
    "distance": "Distance",
    "eclipticObliquity": "Obliquity of the ecliptic",
    "declination": "Declination of the sun (approximation of ",
    "hourAngle": "Hour angle at sunrise(sunset)"
  },
  "ru": {
    "title": "Астрономические координаты",
    "eclipticCoordinates": "Эклиптические координаты",
    "equatorialCoordinates": "Экваториальные координаты",
    "distance": "Расстояние",
    "eclipticObliquity": "Наклон эклиптики",
    "declination": "Солнечное склонение (аппроксимация ",
    "hourAngle": "Часовой угол в момент (восход/закат)"
  }
}
</i18n>
<template>
    <div>
        <h4>{{$t('title')}}</h4>
        <dl class="info info-eq">
          <dt>{{$t('eclipticCoordinates')}}</dt>
          <dd>&beta;={{eclipticLatitude}}&deg;, &lambda;={{eclipticLongitude}}&deg; </dd>
          <dt>{{$t('equatorialCoordinates')}}</dt>
          <dd>&alpha;={{alpha}}&deg; , &delta;={{delta}}&deg; </dd>
          <dt>{{$t('distance')}}</dt>
          <dd>{{distance}} а.е.</dd>
          <dd>{{distanceKm}} km</dd>
          <dt>{{$t('eclipticObliquity')}}</dt>
          <dd>{{epsilon}}&deg;</dd>
          <dt>{{$t('declination')}}&delta;)</dt>
          <dd>{{declination}}&deg;</dd>
          <dt>{{$t('hourAngle')}}</dt>
          <dd>{{hourAngle}}&deg; ({{hourAngleValue}})</dd>
        </dl>
    </div>
</template>

<script>
import moment from 'moment';
import * as JD from '../js/jd.js';
import * as Sun from '../js/sun.js';
import * as Util from '../js/util.js';


export default {
  name: 'coordinates',
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
    NumberWithCommas: function (x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

  },
  computed: {         
    eclipticLongitude: function(){
      var elon =  Sun.GetEclipticLongitude(this.date);
      return Math.round(elon * 100) / 100;
    },
    eclipticLatitude: function(){
      return 0.0;
    },
    distance: function(){
      var dist =  Sun.GetDistance(this.date);
      return Math.round(dist * 10000) / 10000;
    },
    distanceKm: function(){
      var dist =  Sun.GetDistance(this.date) * 149597870.691;
      return this.NumberWithCommas(Math.round(dist * 10000) / 10000);
    },
    epsilon: function(){
      var eps =  Sun.GetEps(this.date);
      return Math.round(eps * 100) / 100;
    },
    alpha: function(){
      var a =  Sun.GetAlpha(this.date);
      return Math.round(a * 100) / 100;
    },
    delta: function(){
      var d =  Sun.GetDelta(this.date);
      return Math.round(d * 1000) / 1000;
    },
    declination: function(){
      var d =  Sun.GetDeclination(this.date);
      return Math.round(d * 100) / 100;
    },
    hourAngle: function(){
      var ha =  Sun.GetSunriseHourAngle(this.date, this.latitude);
      return Math.round(ha * 100) / 100;
    },
    hourAngleObject: function() {
      // var dt = new Date()
      var ha =  Sun.GetSunriseHourAngle(this.date, this.latitude);
      return Util.degreeToTime(ha);
    },
    hourAngleValue: function(){
      var timeObj =  this.hourAngleObject;
      return Util.timeObjToString(timeObj);
    },
  }
}
</script>

<style lang="scss">
</style>

