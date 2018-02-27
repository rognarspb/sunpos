<i18n>
{
  "en": {
    "title": "Sun position calculator",
    "latitude": "Latitude",
    "longitude": "Longitude",
    "time": "Time",
    "azimuth": "Azimuth",
    "elevation": "Elevation",
    "degree": "degree"
  },
  "ru": {
    "title": "Калькулятор положения солнца",
    "latitude": "Широта",
    "longitude": "Долгота",
    "time": "Время",
    "azimuth": "Азимут",
    "elevation": "Высота",
    "degree": "градусы"
  }
}
</i18n>


<template>
    <div class="form form-calc">
        <h4>{{$t('title')}}</h4>       
        <br/>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>{{$t('elevation')}} 1, {{$t('degree')}} &deg</label>
                <input type="number" class="form-control form-control-sm" v-model="alpha1" placeholder="alpha">
            </div>
            <div class="form-group col-md-6">
                <label>{{$t('elevation')}} 2, {{$t('degree')}} &deg</label>
                <input type="number" class="form-control form-control-sm" v-model="alpha2" placeholder="alpha">
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-6" style="border-right: 1px solid lightgray;">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>{{$t('time')}} 1</label>
                        <input type="text" class="form-control form-control-sm form-morning" :value="morningTime1" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label>{{$t('azimuth')}} 1</label>
                        <input type="text" class="form-control form-control-sm form-morning" :value="morningAzimuth1" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>{{$t('time')}} 2</label>
                        <input type="text" class="form-control form-control-sm form-evening" :value="eveningTime1" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label>{{$t('azimuth')}} 2</label>
                        <input type="text" class="form-control form-control-sm form-evening" :value="eveningAzimuth1" readonly>
                    </div>
                </div>
            </div>
            <div class="col-md-6" style="background: #fffbda">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>{{$t('time')}} 1</label>
                        <input type="text" class="form-control form-control-sm form-morning" :value="morningTime2" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label>{{$t('azimuth')}} 1</label>
                        <input type="text" class="form-control form-control-sm form-morning" :value="morningAzimuth2" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>{{$t('time')}} 2</label>
                        <input type="text" class="form-control form-control-sm form-evening" :value="eveningTime2" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label>{{$t('azimuth')}} 2</label>
                        <input type="text" class="form-control form-control-sm form-evening" :value="eveningAzimuth2" readonly>
                    </div>
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
  name: 'azcalc',
  props: { 
      date: {
          required: true,
          default: new Date()
      },
      latitude: {
          required: true,
          default: 60
      },
      longitude: {
          required: true,
          default: 30
      }
  },
  data () {
    return {
        alpha1: -0.6,
        alpha2: 10
    }
  },
  computed: {
        elevationTime1: function(){
            return Sun.GetElevationTime(this.alpha1, this.date, this.latitude, this.longitude);
        },
        morningTime1: function(){
            return Util.timeObjToShortString(this.elevationTime1.morningTime);
        },
        morningAzimuth1: function(){
            return this.elevationTime1.morningAzimuth.toFixed(2) + String.fromCharCode(176);
        },        
        eveningTime1: function(){
            return Util.timeObjToShortString(this.elevationTime1.eveningTime);
        },
        eveningAzimuth1: function(){
            return this.elevationTime1.eveningAzimuth.toFixed(2) + String.fromCharCode(176);
        },


        elevationTime2: function(){
            return Sun.GetElevationTime(this.alpha2, this.date, this.latitude, this.longitude);
        },
        morningTime2: function(){
            return Util.timeObjToShortString(this.elevationTime2.morningTime);
        },
        morningAzimuth2: function(){
            return this.elevationTime2.morningAzimuth.toFixed(2) + String.fromCharCode(176);
        },        
        eveningTime2: function(){
            return Util.timeObjToShortString(this.elevationTime2.eveningTime);
        },
        eveningAzimuth2: function(){
            return this.elevationTime2.eveningAzimuth.toFixed(2) + String.fromCharCode(176);
        },        
    }
}
</script>

<style lang="scss">
.form-calc {
    background: #efefef;
    border: 2px solid #efefef;
    margin: 10px;
    padding: 10px;  
    min-height: 432px;
}
.form-morning{
    color: darkorange;
}
.form-evening{
    color: darkblue;
}
</style>

