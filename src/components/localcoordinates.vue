<i18n>
{
  "en": {
    "title": "Astronomic coordinates",
    "hourAngle": "Hour angle",
    "sunElevation": "Elevation (zenith angle &theta; and elevation angle &alpha;)",
    "sunAzimuth": "Azimuth angle"
  },
  "ru": {
    "title": "Положение солнца в локальных координатах",
    "hourAngle": "Часовой угол",
    "sunElevation": "Высота (угол зенита &theta; и высота &alpha;)",
    "sunAzimuth": "Азимут"
  }
}
</i18n>
<template>
    <div>
        <h4>{{$t('title')}}</h4>
        <dl class="info">
          <dt>{{$t('hourAngle')}}</dt>
          <dd>h={{sunHourAngle}}&deg;</dd>
          <dt v-html="$t('sunElevation')"></dt>
          <dd>&theta;={{zenithAngle}}&deg; &alpha;={{elevationAngle}}&deg;</dd>
          <dt>{{$t('sunAzimuth')}}</dt>
          <dd>{{azimuthAngle}}&deg; </dd>
          <azimuth :date="date" :latitude="latitude" :longitude="longitude"></azimuth>
        </dl>
    </div>
</template>

<script>
import moment from 'moment';
import * as JD from '../js/jd.js';
import * as Sun from '../js/sun.js';
import * as Util from '../js/util.js';
import Azimuth from '../components/azimuth.vue';


export default {
  name: 'coordinates',
  components: {
      'azimuth': Azimuth
  },
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
    zenithAngle: function(){
      var teta =  Sun.GetZenithAngle(this.date, this.latitude, this.longitude);
      return Math.round(teta * 100) / 100;
    },
    elevationAngle: function(){
      var alpha =  Sun.GetElevationAngle(this.date, this.latitude, this.longitude);
      return Math.round(alpha * 100) / 100;
    },
    azimuthAngle: function(){
      var phita =  Sun.GetAzimuthAngle(this.date, this.latitude, this.longitude);
      return Math.round(phita * 100) / 100;
    },
    sunHourAngle: function(){
      var phita =  Sun.GetCurrentHourAngle(this.date, this.latitude, this.longitude);
      return Math.round(phita * 100) / 100;
    }
  }
}
</script>

<style lang="scss">
</style>

