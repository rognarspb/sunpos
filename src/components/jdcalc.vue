
<template>
    <div class="form form-calc">
        <h4>Калькулятор JD</h4>
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
        <div class="form-group">
            <label>Юлианская дата (JD)</label>
            <input type="text" class="form-control" v-model="jd" placeholder="JD" readonly="readonly">
        </div>
        <div class="form-group">
            <label>Юлианский день (JDN)</label>
            <input type="text" class="form-control" v-model="jdn" placeholder="JDN" readonly="readonly">
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import * as JD from '../js/jd.js';


export default {
  name: 'jdcalc',
  props: {
      date: {
          type: Object,
          default: new Date()
      }
  },
  components: {
    'datepicker':  Datepicker,
  },
  data () {
    return {
        jd: 0,
        jdn: 0
    }
  },
  methods: {  
    // degree to radians:
    rad: function(degree){
        return (degree * Math.PI)/180;
    },   

    update: function(){

    }
  },
  watch:{
  }
}
</script>

<style lang="scss">
.form-calc {
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

