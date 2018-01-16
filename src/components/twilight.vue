<i18n>
{
  "en": {
    "title": "Twilight ang golden hour",
    "astroTwilight": "Astronomical twilight",
    "nauticalTwilight": "Nautical twilight",
    "civilTwilight": "Civil twilight",
    "goldenHour": "Golden hour",
    "morning": "Morning",
    "evening": "Evening"
  },
  "ru": {
    "title": "Сумерки и золотой час",
    "astroTwilight": "Астрономические сумерки",
    "nauticalTwilight": "Навигационные сумерки",
    "civilTwilight": "Гражданские сумерки",
    "goldenHour": "Золотой час",
    "morning": "Утро",
    "evening": "Вечер"
  }
}
</i18n>
<template>
    <div>
        <h4>{{$t('title')}}</h4>
        <div class="info">
            <h5>{{$t('morning')}}</h5>
            <table class="table table-reponsive table-sm">
                <tbody>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="darkblue"></circle>
                            </svg>
                        </td>
                        <td>{{$t('astroTwilight')}}</td>
                        <td>{{astronomicalTwilightM1}}</td>
                        <td>{{astronomicalTwilightM2}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#585daf"></circle>
                            </svg>
                        </td>
                        <td>{{$t('nauticalTwilight')}}</td>
                        <td>{{nauticalTwilightM1}}</td>
                        <td>{{nauticalTwilightM2}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#8386af"></circle>
                            </svg>
                        </td>
                        <td>{{$t('civilTwilight')}}</td>
                        <td>{{civilTwilightM1}}</td>
                        <td>{{civilTwilightM2}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#eae811"></circle>
                            </svg>                            
                        </td>
                        <td>{{$t('goldenHour')}}</td>
                        <td>{{goldenHourM1}}</td>
                        <td>{{goldenHourM2}}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <h5>{{$t('evening')}}</h5>
            <table class="table table-reponsive table-sm">
                <tbody>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="darkblue"></circle>
                            </svg>                             
                        </td>
                        <td>{{$t('astroTwilight')}}</td>
                        <td>{{astronomicalTwilightE1}}</td>
                        <td>{{astronomicalTwilightE2}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#585daf"></circle>
                            </svg>
                        </td>
                        <td>{{$t('nauticalTwilight')}}</td>
                        <td>{{nauticalTwilightE1}}</td>
                        <td>{{nauticalTwilightE2}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#8386af"></circle>
                            </svg>
                        </td>
                        <td>{{$t('civilTwilight')}}</td>
                        <td>{{civilTwilightE1}}</td>
                        <td>{{civilTwilightE2}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <svg width="36" height="36" style="background:none">
                                <circle cx="18" cy="18" r="16" stroke="#afafaf" stroke-width="2" fill="#ffdf2a"></circle>
                            </svg>                            
                        </td>
                        <td>{{$t('goldenHour')}}</td>
                        <td>{{goldenHourE1}}</td>
                        <td>{{goldenHourE2}}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import * as JD from '../js/jd.js';
import * as Sun from '../js/sun.js';
import * as Util from '../js/util.js';


export default {
  name: 'twilight',
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
    getTwilightTimeM: function(alpha){
        var twilight = Sun.GetTwilightTime(alpha, this.date, this.latitude, this.longitude);
        var h = isNaN(twilight.morningTwilight.hours) ? "--" : String(twilight.morningTwilight.hours);
        var m = isNaN(twilight.morningTwilight.minutes) ? "--" : String(twilight.morningTwilight.minutes);
        return h.padStart(2,'0') + ":" + m.padStart(2,'0');
    },
    getTwilightTimeE: function(alpha){
        var twilight = Sun.GetTwilightTime(alpha, this.date, this.latitude, this.longitude);
        var h = isNaN(twilight.eveningTwilight.hours) ? "--" : String(twilight.eveningTwilight.hours);
        var m = isNaN(twilight.eveningTwilight.minutes) ? "--" : String(twilight.eveningTwilight.minutes);

        return h.padStart(2,'0') + ":" + m.padStart(2,'0');
    },
  },
  computed: {         
   
    // 12-18 degree
    astronomicalTwilightM1: function(){
      return this.getTwilightTimeM(-18.0);
    },
    astronomicalTwilightM2: function(){
      return this.getTwilightTimeM(-12.0);
    },
    astronomicalTwilightE1: function(){
      return this.getTwilightTimeE(-12.0);
    },
    astronomicalTwilightE2: function(){
      return this.getTwilightTimeE(-18.0);
    },

    // 6-12 degree
    nauticalTwilightM1: function(){
      return this.getTwilightTimeM(-12.0);
    },
    nauticalTwilightM2: function(){
      return this.getTwilightTimeM(-6.0);
    },
    nauticalTwilightE1: function(){
      return this.getTwilightTimeE(-6.0);
    },
    nauticalTwilightE2: function(){
      return this.getTwilightTimeE(-12.0);
    },

    // 0.5-6 degree
    civilTwilightM1: function(){
      return this.getTwilightTimeM(-6.0);
    },
    civilTwilightM2: function(){
      return this.getTwilightTimeM(-0.5);
    },
    civilTwilightE1: function(){
      return this.getTwilightTimeE(-0.5);
    },
    civilTwilightE2: function(){
      return this.getTwilightTimeE(-6.0);
    },

    // Golden photography hours:
    // a). +6.0 to +12.0 degrees
    // b). -4.0 to +6.0 degrees
    // c). 0.0 to +10 degrees (?)
    goldenHourM1: function(){
      var hmax = this.getTwilightTimeM(10.0);
      if (hmax == "--:--")
        return "--:--";
        
      return this.getTwilightTimeM(-0.83);
    },
    goldenHourM2: function(){
      return this.getTwilightTimeM(10.0);
    },
    goldenHourE1: function(){
      return this.getTwilightTimeE(10.0);
    },
    goldenHourE2: function(){
      var hmax = this.getTwilightTimeM(10.0);
      if (hmax == "--:--")
        return "--:--";
        
      return this.getTwilightTimeE(-0.83);
    }
  }
}
</script>

<style lang="scss">
    .table-sm{
        margin-bottom: 0.5rem;
    }
</style>

