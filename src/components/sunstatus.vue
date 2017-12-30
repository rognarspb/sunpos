
<template>
    <svg width="100%" height="100%" viewBox="0 0 820 360">       
        <line x1="0" y1="180" x2="820" y2="180" stroke="lightgray" stroke-width="1"></line>
        <line x1="50" y1="0" x2="50" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
        <line x1="770" y1="0" x2="770" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
        <rect x="0" y="181" width="820" height="179" fill="#c1ffa9" fill-opacity="0.2"></rect>
        <text x = "180" y = "100" font-family="Arial" font-size="24" fill="orange">Восход: {{sunrise}}</text>
        <text x = "540" y = "100" font-family="Arial" font-size="24" fill="steelblue">Закат: {{sunset}}</text>
        <text x = "30" y = "200" font-family="Arial" font-size="16" fill="gray">00:00</text>
        <text x = "750" y = "200" font-family="Arial" font-size="16" fill="gray">23:59</text>
        <text x = "680" y = "170" font-family="Arial" font-size="14" fill="gray">Линия горизонта</text>
        <circle cx="410" cy="180" r="20" id="sun" fill="yellow" stroke="orange" stroke-width="4"></circle>       
    </svg>
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';
import * as JD from '../js/jd.js';
import * as Sun from '../js/sun.js';
import * as Util from '../js/util.js';


export default {
  name: 'sunstatus',
  props: {
      date: {
          default: new Date()
      },
      latitude: {
          type: Number,
          default: 60
      },
      longitude: {
          type: Number,
          default: 30
      }
  },
  components: {
  },
  data () {
    return {
    }
  },
  mounted: function(){
      this.update();
  },
  methods: {  
    displayFunction: function(ix){
        var totalMin = 2*ix;
        var hours = Math.floor(totalMin/60);
        var minutes = totalMin - hours*60;

        // build date based on total minutes value
        var dt = new Date();
        dt.setFullYear(this.date.getFullYear());
        dt.setMonth(this.date.getMonth());
        dt.setDate(this.date.getDate());
        dt.setHours(hours, minutes);

        // calculate hour:
        var val = Sun.GetElevationAngle(dt, this.latitude, this.longitude);
        return {
            x: ix,
            y: 2*val
        };
    },
    update: function(){
        var svgElem = d3.select(this.$el);

        var functionData = d3.range(719).map(this.displayFunction);

        var lineFunction = d3.line()
                          .x(function(d) { return 50+d.x; })
                          .y(function(d) { return 180-d.y; })
                          .curve(d3.curveLinear);

        svgElem.select("path").remove();
        var lineGraph = svgElem.append("path")
                            .attr("d", lineFunction(functionData))
                            .attr("stroke", "steelblue")
                            .attr("stroke-width", 2)
                            .attr("fill", "none")
                            .attr("fill", "#a9c1ff") 
                            .attr("fill-opacity", "0.1");
                            
        // calc sun "position":
        var totalMin = this.date.getHours()*60 + this.date.getMinutes();
        var elevation = Sun.GetElevationAngle(this.date, this.latitude, this.longitude);
        var cx = 50 + totalMin/2;
        var cy = 180 - 2*elevation;

        var sun = svgElem.select("#sun").remove();
        //sun.attr("cx", cx);
        //sun.attr("cy", cy);
        var sun = svgElem.append("circle")
                            .attr("id", "sun")
                            .attr("cx", cx)
                            .attr("cy", cy)
                            .attr("r", 20)
                            .attr("stroke", "orange")
                            .attr("stroke-width", 2)
                            .attr("fill", "yellow");                                                            
    }
  },
  watch:{
    date: function(newValue){
      this.update();
    },
    longitude: function(newValue){
      this.update();
    },
    latitude: function(newValue){
      this.update();
    }
  },
  computed: {
        sunrise: function(){
            var ha =  Sun.GetSunriseHourAngle(this.date, this.latitude);
            var timeObj = Util.degreeToTime(ha);
            var sn =  Sun.GetSolarNoon(this.date, this.longitude);
            var solarNoonObj = JD.GetDateObject(sn);          
            var hours = solarNoonObj.hours - timeObj.hours;
            var minutes = solarNoonObj.minutes - timeObj.minutes;
            if (minutes < 0){
              minutes = 60 + minutes;
              hours--;
            }
            return String(hours).padStart(2,'0') + ":" + String(minutes).padStart(2,'0');
          },
          sunset: function(){
            var ha =  Sun.GetSunriseHourAngle(this.date, this.latitude);
            var timeObj = Util.degreeToTime(ha);
            var sn =  Sun.GetSolarNoon(this.date, this.longitude);
            var solarNoonObj = JD.GetDateObject(sn);          
            var hours = solarNoonObj.hours + timeObj.hours;
            var minutes = solarNoonObj.minutes + timeObj.minutes;
            if (minutes > 60){
              minutes = minutes - 60;
              hours++;
            }
            return String(hours).padStart(2,'0') + ":" + String(minutes).padStart(2,'0');
          },

  }
}
</script>

<style lang="scss">
  .earth{
    fill: "steelblue";
  }
</style>

