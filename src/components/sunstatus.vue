<i18n>
{
  "en": {
    "sunrise": "Sunrise",
    "sunset": "Sunset",
    "solarnoon": "Solar noon",
    "horizont": "Skyline"
  },
  "ru": {
    "sunrise": "Восход",
    "sunset": "Закат",
    "solarnoon": "Истинный полдень",
    "horizont": "Линия горизонта"
  }
}
</i18n>
<template>
  <transition appear name="fade">
      <div>
        <div class="tooltip" style="opacity: 0" id="infoTooltip"></div>
        <svg width="100%" height="100%" viewBox="0 0 820 360">       
            <line x1="0" y1="180" x2="820" y2="180" stroke="lightgray" stroke-width="1"></line>
            <line x1="50" y1="0" x2="50" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
            <line x1="770" y1="0" x2="770" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
            <line x1="410" y1="0" x2="410" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>

            <circle cx="410" cy="182" r="4" stroke="#afafaf" stroke-width="2" fill="#efefef" id="sunrisePoint"></circle>
            <circle cx="410" cy="182" r="4" stroke="#afafaf" stroke-width="2" fill="#efefef" id="sunsetPoint"></circle>
            <line x1="410" y1="0" x2="410" y2="360" stroke="orange" stroke-width="1" stroke-dasharray="5,5" id="solarNoonLine"></line>

            <rect x="0" y="181" width="820" height="179" fill="#c1ffa9" fill-opacity="0.2"></rect>
            <text x = "120" y = "100" font-family="Arial" font-size="24" fill="orange">{{$t('sunrise')}}: {{sunrise}}</text>
            <text x = "500" y = "100" font-family="Arial" font-size="24" fill="steelblue">{{$t('sunset')}}: {{sunset}}</text>
            <text x = "250" y = "350" font-family="Arial" font-size="16" fill="gray" id="solarNoonText">{{$t('solarnoon')}}: {{solarnoon}}</text>
            <text x = "30" y = "200" font-family="Arial" font-size="16" fill="gray">00:00</text>
            <text x = "390" y = "200" font-family="Arial" font-size="16" fill="gray">12:00</text>
            <text x = "750" y = "200" font-family="Arial" font-size="16" fill="gray">23:59</text>
            <text x = "680" y = "170" font-family="Arial" font-size="14" fill="gray">{{$t('horizont')}}</text>
            <circle cx="410" cy="180" r="20" id="sun" fill="yellow" stroke="orange" stroke-width="4"></circle>       
        </svg>
      </div>
  </transition>
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
            y: 2*val,
            value: val,
            date: dt
        };
    },
    displayHtml: function(ix){
        var data = this.displayFunction(ix);
        var dateStr = Util.timeToString(data.date);
        return "Time: " + dateStr + "<br/>" + "&alpha;=" + data.value.toFixed(2) + "&deg;"
    },
    update: function(){
        var self = this;
        var svgElem = d3.select(this.$el).select("svg");
        var tooltip = d3.select(this.$el).select("#infoTooltip");

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
                            .attr("fill-opacity", "0.1")
                            .on("mouseover", function(d) {		
                                tooltip.transition()		
                                    .duration(200)		
                                    .style("opacity", .9);		
                                tooltip.html(function(){
                                      var w = event.path[1].clientWidth;
                                      var ix = Math.floor(event.clientX * (820.0/w));
                                      return self.displayHtml(ix - 50);
                                    })	
                                   .style("left", (event.pageX) + "px")		
                                   .style("top", (event.pageY - 300) + "px");	
                                })					
                            .on("mouseout", function(d) {		
                                tooltip.transition()		
                                    .duration(500)		
                                    .style("opacity", 0);	
                            });;

        // mark sunset and sunrise
        var dtSunrise = Sun.GetSunriseTime(this.date, this.latitude, this.longitude);
        var dtSunset  = Sun.GetSunsetTime(this.date, this.latitude, this.longitude);
        var dtSolarNoon = Sun.GetSolarNoonTime(this.date, this.latitude, this.longitude);

        var minsSunrise = Math.floor(Util.getTotalSeconds(dtSunrise)/60);
        svgElem.select("#sunrisePoint")
               .attr("cx", 50 + minsSunrise/2);

        var minsSunset = Math.floor(Util.getTotalSeconds(dtSunset)/60);
         svgElem.select("#sunsetPoint")
                .attr("cx", 50 + minsSunset/2);

        var minsSolarNoon = Math.floor(Util.getTotalSeconds(dtSolarNoon)/60);
        svgElem.select("#solarNoonLine")
            .attr("x1", 50 + minsSolarNoon/2)
            .attr("x2", 50 + minsSolarNoon/2);
        svgElem.select("#solarNoonText")
            .attr("x", 55 + minsSolarNoon/2)
        
                            
        // calc sun "position":
        var totalMin = this.date.getHours()*60 + this.date.getMinutes();
        var elevation = Sun.GetElevationAngle(this.date, this.latitude, this.longitude);
       
        var cx = 50 + totalMin/2;
        var cy = 180 - 2*elevation;

        var sun = svgElem.select("#sun").remove();
        sun = svgElem.append("circle")
                          .attr("id", "sun")
                          .attr("cx", cx)
                          .attr("cy", cy)
                          .attr("r", 20)
                          .attr("stroke", "orange")
                          .attr("stroke-width", 4)
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
            var sunriseTime = Sun.GetSunriseTime(this.date, this.latitude, this.longitude);
            return String(sunriseTime.hours).padStart(2,'0') + ":" 
                 + String(sunriseTime.minutes).padStart(2,'0') + ":" 
                 + String(sunriseTime.seconds).padStart(2,'0');
          },
          sunset: function(){
            var sunsetTime = Sun.GetSunsetTime(this.date, this.latitude, this.longitude);
            return String(sunsetTime.hours).padStart(2,'0') + ":" 
                 + String(sunsetTime.minutes).padStart(2,'0') + ":" 
                 + String(sunsetTime.seconds).padStart(2,'0');
          },
          solarnoon: function(){
            var solarNoonTime = Sun.GetSolarNoonTime(this.date, this.latitude, this.longitude);
            return String(solarNoonTime.hours).padStart(2,'0') + ":" 
                 + String(solarNoonTime.minutes).padStart(2,'0') + ":" 
                 + String(solarNoonTime.seconds).padStart(2,'0');
          },

  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  div.tooltip {	
    position: absolute;			
    width: 160px;					
    height: 36px;					
    padding: 5px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 2px;			
    pointer-events: none;			
}
</style>

