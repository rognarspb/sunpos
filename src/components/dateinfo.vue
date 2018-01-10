<i18n>
{
  "en": {
    "title": "Time and date",
    "datestr": "Date",
    "julianDay": "Julian day number (JDN)",
    "julianDate": "Julian day (JD)",
    "modifiedJulianDate": "Modified Julian date",
    "jdcalc": "Julian day(JD) calculator"
  },
  "ru": {
    "title": "Время и дата",
    "datestr": "Дата",
    "julianDay": "Юлианский день(JDN)",
    "julianDate": "Юлианская дата (JD)",
    "modifiedJulianDate": "Модифицированная Юлианская дата (MJD)",
    "jdcalc": "Калькулятор юлианской даты"
  }
}
</i18n>
<template>
    <div>
        <h4>{{$t('title')}}</h4>
        <dl class="info">
            <dt>{{$t('datestr')}}</dt>
            <dd>{{ localTime }}</dd>
            <dt>{{$t('julianDay')}}</dt>
            <dd>{{ jdn }}</dd>
            <dt>{{$t('julianDate')}}</dt>
            <dd>{{ jd }}</dd>
            <dt>{{$t('modifiedJulianDate')}}</dt>
            <dd>{{ mjd }}</dd>
            <br/>
            <dd>
              <b-btn v-b-modal.jdModal><i class="fa fa-calculator"></i>&nbsp;{{$t('jdcalc')}}</b-btn>
            </dd>
        </dl>
        
        <!-- Modal Component -->
        <b-modal id="jdModal" :title="$t('jdcalc')" size="lg" ok-only>
            <jdcalc :show-title="false"></jdcalc>
        </b-modal>
    </div>
</template>

<script>
import moment from 'moment';
import * as JD from '../js/jd.js';
import * as Util from '../js/util.js';
import JDCalc from './jdcalc.vue';


export default {
  name: 'dateinfo',
  props: {
      date: {
          default: new Date()
      }
  },
  components: {
    'jdcalc': JDCalc
  },
  data () {
    return {
    }
  },
  methods: {  
  },
  watch:{
  },
  computed: {         
    localTime: function(){
      return  this.dayOfWeek + ", " + Util.dateToString(this.date);
    }, 
    jdn: function(){
      return JD.GetJDN(this.date);
    },
    jd: function(){
      return JD.GetJD(this.date).toFixed(6);
      //return Math.round(this.GetJD(this.julianDate) * 10000) / 10000;
    },
    mjd: function(){
      return Math.round(JD.GetMJD(this.date) * 100) / 100;
    },
    dayOfWeek: function(){
      var days = ["Понедельник","Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
      var index = JD.GetDayOfWeek(this.date)
      return days[index];
    },
  }
}
</script>

<style lang="scss">
</style>

