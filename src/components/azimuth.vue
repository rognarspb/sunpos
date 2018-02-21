<i18n>
{
  "en": {
    "azimuth": "Azimuth"
  },
  "ru": {
    "azimuth": "Азимут"
  }
}
</i18n>
<template>
    <svg width="100%" height="410" viewBox="0 0 500 500">
       <defs>
          <marker
            id="arrow"
            markerUnits="strokeWidth"
            markerWidth="12"
            markerHeight="12"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            orient="auto">
            <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: gray;"></path>
          </marker>
        </defs>

        <circle cx="240" cy="240" r="200" id="orbit" stroke="gray" stroke-width="1" fill="none"></circle>
        
        <line x1="40" y1="240" x2="440" y2="240" stroke="lightgray" stroke-width="2"></line>
        <line x1="240" y1="40" x2="240" y2="440" stroke="lightgray" stroke-width="2"></line>

        <path id="day"></path>
        <path id="mgh"></path>
        <path id="egh"></path>

        <line x1="240" y1="240" x2="440" y2="440" stroke="orange" stroke-width="2" id="az1"></line>
        <line x1="240" y1="240" x2="40" y2="440" stroke="steelblue" stroke-width="2" id="az2"></line>

        <line x1="240" y1="240" x2="430" y2="440" id="sunline" stroke="gray" stroke-width="1" stroke-dasharray="5,5"></line>
        <circle cx="240" cy="240" r="20" id="sun" fill="yellow" stroke="orange" stroke-width="4"></circle>
        <circle cx="240" cy="240" r="10" fill="steelblue" ></circle>

        <text x="100" y="230" font-family="Verdana" id="angleText" stroke="steelblue" font-size="16">&straightphi;={{currentAzimuth.toFixed(2)}}&deg;</text>
        <text x="100" y="240" font-family="Verdana" id="az1Text" stroke="steelblue" font-size="16">&straightphi;m={{azimuthMorning.toFixed(2)}}&deg;</text>
        <text x="100" y="250" font-family="Verdana" id="az2Text" stroke="steelblue" font-size="16">&straightphi;e={{azimuthEvening.toFixed(2)}}&deg;</text>

    </svg>
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';
import * as JD from '../js/jd.js';
import * as Sun from '../js/sun.js';
import * as Util from '../js/util.js';


export default {
  name: 'azimuth',
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
  components: {
  },
  data () {
    return {
      ghMorning1: 0.0,
      ghMorning2: 0.0,
      ghEvening1: 0.0,
      ghEvening2: 0.0,

      azMorning: 0.0,
      azEvening: 0.0
    }
  },
  mounted: function(){
      this.draw();
      this.update();
  },
  methods: {  
    // degree to radians:
    rad: function(degree){
        return (degree * Math.PI)/180;
    },   
    draw: function(){
        var az1 = d3.select(this.$el).select("#az1");
        var az2 = d3.select(this.$el).select("#az2");
        var sun = d3.select(this.$el).select("#sun");
        var sunline = d3.select(this.$el).select("#sunline");
        var suntext = d3.select(this.$el).select("#angleText");
        var az1Text = d3.select(this.$el).select("#az1Text");
        var az2Text = d3.select(this.$el).select("#az2Text");
        
        var elevInfo = Sun.GetElevationTime(0.0, this.date, this.latitude, this.longitude);
        var currentAzimuth = Sun.GetAzimuthAngle(this.date, this.latitude, this.longitude);
        console.log("Updated azimuth = " + currentAzimuth);

        var r = 200.0;
        var x1 = r*Math.cos(Util.rad(elevInfo.morningAzimuth - 90));
        var y1 = r*Math.sin(Util.rad(elevInfo.morningAzimuth - 90));
        var y2 = r*Math.cos(Util.rad(elevInfo.eveningAzimuth - 180));
        var x2 = r*Math.sin(Util.rad(elevInfo.eveningAzimuth - 180));

        var x0 = r*Math.cos(Util.rad(currentAzimuth - 90));
        var y0 = r*Math.sin(Util.rad(currentAzimuth - 90));


        sun.attr("cx", 240 + x0);
        sun.attr("cy", 240 + y0);
        sunline.attr("x2", 240 + x0);
        sunline.attr("y2", 240 + y0);
        suntext.attr("x", 240 + x0 - 50);
        suntext.attr("y", 240 + y0 + 50);
        

        az1.attr("x2", 240 + x1);
        az1.attr("y2", 240 + y1);
        az2.attr("x2", 240 - x2);
        az2.attr("y2", 240 + y2);

        az1Text.attr("x", 240 + x1 - 50);
        az1Text.attr("y", 240 + y1 + 50);
        az2Text.attr("x", 240 - x2 - 50);
        az2Text.attr("y", 240 + y2 + 50);

        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(240)
          .startAngle(Util.rad(elevInfo.morningAzimuth)) 
          .endAngle(Util.rad(elevInfo.eveningAzimuth));

        d3.select(this.$el).select("#day")
          .attr("d", arc)
          .attr("fill", "yellow")
          .attr("fill-opacity","0.5")
          .attr("transform", "translate(240,240)");

        var gh1 = Sun.GetElevationTime(-0.8, this.date, this.latitude, this.longitude);
        var gh2 = Sun.GetElevationTime(6.1, this.date, this.latitude, this.longitude);

        var arcm = d3.arc()
          .innerRadius(0)
          .outerRadius(240)
          .startAngle(Util.rad(gh1.morningAzimuth)) 
          .endAngle(Util.rad(gh2.morningAzimuth));
        
        d3.select(this.$el).select("#mgh")
          .attr("d", arcm)
          .attr("fill", "orange")
          .attr("fill-opacity","0.5")
          .attr("transform", "translate(240,240)");

        var arce = d3.arc()
          .innerRadius(0)
          .outerRadius(240)
          .startAngle(Util.rad(gh1.eveningAzimuth)) 
          .endAngle(Util.rad(gh2.eveningAzimuth));
        
        d3.select(this.$el).select("#egh")
          .attr("d", arce)
          .attr("fill", "orange")
          .attr("fill-opacity","0.5")
          .attr("transform", "translate(240,240)");
    },
   
    update: function(){
        this.draw();
    }
  },
  watch:{
    date: function(newValue){
      this.update();
    },    
    latitude: function(newValue){
      this.update();
    },
    longitude: function(newValue){
      this.update();
    }
  },
  computed: {
    currentAzimuth: function(){
      return Sun.GetAzimuthAngle(this.date, this.latitude, this.longitude);
    },
    azimuthMorning: function(){
      var elevInfo = Sun.GetElevationTime(0.0, this.date, this.latitude, this.longitude);
      return elevInfo.morningAzimuth;
    },
    azimuthEvening: function(){
      var elevInfo = Sun.GetElevationTime(0.0, this.date, this.latitude, this.longitude);
      return elevInfo.eveningAzimuth;
    }
  }
}
</script>

<style lang="scss">
  .earth{
    fill: "steelblue";
  }
  svg{
    background: white;
  }
</style>

