
<template>
    <div class="form form-calc">
        <h4>Калькулятор Юлианской даты (JD)</h4>
        <div class="form-group">
            <label>Дата</label>
            <div class="input-group">
              <datepicker v-model="userDate"              
                language="ru" 
                :disabled-picker="direction == 'toDate'"
                :bootstrap-styling="true"
                :full-month-name="true"
                :calendar-button="true"
                calendar-button-icon="far fa-calendar-alt" ></datepicker>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
              <label>Часы</label>
              <input type="number" class="form-control" v-model="userHours" placeholder="HH" :readonly="direction=='toDate'">
            </div>
            <div class="form-group col-md-4">
              <label>Минуты</label>
              <input type="number" class="form-control" v-model="userMinutes" placeholder="mm" :readonly="direction=='toDate'">
            </div>
            <div class="form-group col-md-4">
              <label>Секунды</label>
              <input type="number" class="form-control" v-model="userSeconds" placeholder="ss" :readonly="direction=='toDate'">
            </div>
          </div>
        <div class="form-group" v-if="direction=='toJD'">
            <button class="btn btn-default btn-sm" v-on:click="setNow">Установить текущее время</button>
        </div>
        <hr/>
        <div class="row justify-content-center">
            <div class="col-4">
              <button class="btn btn-default btn-block" v-on:click="toggleDirection">
                <i v-if="direction == 'toJD'" class="fa fa-arrow-down"></i>
                <i v-if="direction == 'toDate'" class="fa fa-arrow-up"></i>
              </button>
            </div>
        </div>
        <hr/>
        <div class="form-group">
            <label>Юлианская дата (JD)</label>
            <input type="number" class="form-control" v-model="jd" placeholder="JD" :readonly="direction == 'toJD'">
        </div>
        <div class="form-group">
            <label>Юлианский день (JDN)</label>
            <input type="number" class="form-control" v-model="jdn" placeholder="JDN" readonly="readonly">
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
    date:{
        default: null,
        required: false
    } 
  },
  components: {
    'datepicker':  Datepicker,
  },
  data () {
    return {
        jd: 0,
        jdn: 0,
        userDate: null,
        userHours: 12,
        userMinutes: 0,
        userSeconds: 0,
        direction: 'toJD'
    }
  },
  created: function() {
      var dt = this.date ? this.date : new Date();
      this.userDate = dt;
      this.userHours = dt.getHours();
      this.userMinutes = dt.getMinutes();
      this.userSeconds = dt.getSeconds();
  },
  methods: {   
    toggleDirection: function(){
        if (this.direction == 'toJD') {
            this.direction = 'toDate';
        } else {
            this.direction = 'toJD';
        }
    },
    update: function(){
        if (this.direction == 'toJD') {
            this.jd = JD.GetJD(this.fullDate);
            this.jdn = JD.GetJDN(this.fullDate);
        } 
    },
    updateDate: function() {
        if (this.direction == 'toDate') {
            var dt = JD.GetDate(this.jd);
            this.userDate = dt;
            this.userHours = dt.getHours();
            this.userMinutes = dt.getMinutes();
            this.userSeconds = dt.getSeconds();
            this.jdn = JD.GetJDN(dt);
        }
    },
    setNow: function(){
        var now = new Date();
        this.userDate = now;
        this.userHours = now.getHours();
        this.userMinutes = now.getMinutes();
        this.userSeconds = now.getSeconds();
    },
    
  },
  computed: {
    fullDate: function(){
        var dt = moment(this.userDate).toDate();
        var res = dt.setHours(this.userHours, this.userMinutes, this.userSeconds);
        return dt;
    }
  },
  watch:{
    userDate: function(){ this.update(); },
    userHours: function(){ this.update(); },
    userMinutes: function(){ this.update(); },
    userSeconds: function(){ this.update(); },
    jd: function(){ this.updateDate(); }
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

