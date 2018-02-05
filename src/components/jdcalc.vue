<i18n>
{
  "en": {
    "title": "Julian day (JD) calculator",
    "latitude": "Latitude",
    "longitude": "Longitude",
    "date": "Date",
    "hours": "Hours",
    "minutes": "Minutes",
    "seconds": "Seconds",
    "setNow": "Set now",
    "direction": "Conversion direction",   
    "julianDay": "Julian day (JD)",   
    "julianDayNumber": "Julian day number (JDN)",   
    "help": "<strong>Calculation of Julian day:</strong><br/> To calculate Julian day (JD) enter date and time into appropriate input fields, result is displayed automatically via JD and JDN fields. Use \"Conversion direction\" button <span class=\"fa fa-arrow-down\"></span> to enable conversion of Julian day to Gregorian date. Use JD input field to enter desired julian day (day number)."
  },
  "ru": {
    "title": "Калькулятор Юлианской даты (JD)",
    "latitude": "Широта",
    "longitude": "Долгота",
    "date": "Дата",
    "hours": "Часы",
    "minutes": "Минуты",
    "seconds": "Секунды",
    "setNow": "Установить текущее время",
    "direction": "Направление конвертации",   
    "julianDay": "Юлианская дата (JD)",   
    "julianDayNumber": "Юлианский день (JDN)",   
    "help": "<strong>Вычисление Юлианской даты:</strong><br/> для вычисления Юлианской даты JD введите нужную дату и время, результат будет отображать автоматически в полях JD и JDN ниже. Используйте кнопку \"Направление конвертации\" <span class=\"fa fa-arrow-down\"></span> чтобы включить обратный перевод Юлианской даты в дату по Григорианскому календарю. При этом поле JD будет доступно для ввода информации."
  }
}
</i18n>


<template>
    <div class="form form-calc">
        <h4 v-if="showTitle">{{$t('title')}}</h4>
        <div class="form-group">
            <label>{{$t('date')}}</label>
            <div class="input-group">
              <datepicker v-model="userDate"              
                :language="globalLocale" 
                :disabled-picker="direction == 'toDate'"
                :bootstrap-styling="true"
                :full-month-name="true"
                :calendar-button="true"
                calendar-button-icon="far fa-calendar-alt" ></datepicker>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
              <label>{{$t('hours')}}</label>
              <input type="number" class="form-control" v-model="userHours" placeholder="HH" :readonly="direction=='toDate'">
            </div>
            <div class="form-group col-md-4">
              <label>{{$t('minutes')}}</label>
              <input type="number" class="form-control" v-model="userMinutes" placeholder="mm" :readonly="direction=='toDate'">
            </div>
            <div class="form-group col-md-4">
              <label>{{$t('seconds')}}</label>
              <input type="number" class="form-control" v-model="userSeconds" placeholder="ss" :readonly="direction=='toDate'">
            </div>
        </div>
        <div class="form-group" v-if="direction=='toJD'">
            <button class="btn btn-default btn-sm" v-on:click="setNow">{{$t('setNow')}}</button>
        </div>
        <hr/>
        <div class="row justify-content-center">
            <div class="col-4">
              <button class="btn btn-default btn-block" v-on:click="toggleDirection" :title="$t('direction')">
                <i v-if="direction == 'toJD'" class="fa fa-arrow-down"></i>
                <i v-if="direction == 'toDate'" class="fa fa-arrow-up"></i>
              </button>
            </div>
        </div>
        <hr/>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>{{$t('julianDay')}}</label>
                <input type="number" class="form-control" v-model="jd" placeholder="JD" :readonly="direction == 'toJD'">
            </div>
            <div class="form-group col-md-6">
                <label>{{$t('julianDayNumber')}}</label>
                <input type="number" class="form-control" v-model="jdn" placeholder="JDN" readonly="readonly">
            </div>
        </div>
        <button v-on:click="toggleHelp" class="btn btn-default btn-sm"><i class="fa fa-question-circle"></i></button>
        <div class="alert alert-info" v-html="$t('help')" v-if="showHelp">
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
    },
    showTitle:{
        default: true,
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
        direction: 'toJD',
        showHelp: false
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
    toggleHelp: function(){
        this.showHelp = !this.showHelp ;
    }
  },
  computed: {
    fullDate: function(){
        var dt = moment(this.userDate).toDate();
        var res = dt.setHours(this.userHours, this.userMinutes, this.userSeconds);
        return dt;
    },
    globalLocale: function(){
      return this.$root.$options.i18n.locale;
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

