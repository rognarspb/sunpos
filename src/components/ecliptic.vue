<i18n>
{
  "en": {
    "vernalEquinox": "Vernal equinox",
    "summerSolstice": "Summer solstice",
    "autumnalEquinox": "Autumnal equinox",
    "winterSolstice": "Winter solstice"
  },
  "ru": {
    "vernalEquinox": "Весеннее равноденствие",
    "summerSolstice": "Летнее солнцестояние",
    "autumnalEquinox": "Осеннее равноденствие",
    "winterSolstice": "Зимнее солнцестояние"
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
        <circle cx="40" cy="240" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>
        <circle cx="440" cy="240" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>
        <circle cx="240" cy="40" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>
        <circle cx="240" cy="440" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>

        <circle cx="240" cy="240" r="200" id="orbit" stroke="gray" stroke-width="1" fill="none"></circle>
        <circle cx="240" cy="240" r="180" stroke="lightgray" stroke-width="1" fill="none"></circle>
        
        <line x1="40" y1="240" x2="440" y2="240" stroke="lightgray" stroke-width="2"></line>
        <line x1="240" y1="40" x2="240" y2="440" stroke="lightgray" stroke-width="2"></line>

        <line x1="240" y1="240" x2="440" y2="240" id="angle" stroke="gray" stroke-width="1" stroke-dasharray="5,5"></line>
        <line x1="440" y1="0" x2="440" y2="480" id="vertical" stroke="gray" stroke-width="1" stroke-dasharray="5,5"></line>
        <text x = "100" y = "230" font-family="Verdana" id="angleText" stroke="steelblue" font-size="16">&lambda;={{longitude}}&deg;</text>

        <circle cx="440" cy="240" r="20" id="earth" fill="steelblue"></circle>
        <circle cx="240" cy="240" r="35" id="sun" fill="yellow" stroke="orange" stroke-width="4"></circle>
        <circle cx="240" cy="240" r="10" id="sun" fill="orange" ></circle>

        <text x = "160" y = "475" font-family="Verdana" font-size="16">{{$t('vernalEquinox')}}</text>
        <text x = "340" y = "210" font-family="Verdana" font-size="16">{{$t('summerSolstice')}}</text>
        <text x = "160" y = "15" font-family="Verdana" font-size="16">{{$t('autumnalEquinox')}}</text>
        <text x = "10" y = "210" font-family="Verdana" font-size="16">{{$t('winterSolstice')}}</text>

    </svg>
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';


export default {
  name: 'ecliptic',
  props: {
    longitude: Number, // ecliptic longitude
    latitude: Number   // ecliptic latitude
  },
  components: {
  },
  data () {
    return {
      localLat: 0.0,
      localLon: 0.0
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
      var curve = d3.curveBasisOpen;
      var data = d3.range(5)
      var scale1 = d3.scaleLinear().domain(d3.extent(data)).range([5*Math.PI/6, 4*Math.PI/6])
      var scale2 = d3.scaleLinear().domain(d3.extent(data)).range([11*Math.PI/6, 5*Math.PI/3])
      var line1 = d3.radialLine()
        .angle(function(d,i) { return scale1(d) })
        .radius(250)
      	.curve(curve);
      var line2 = d3.radialLine()
        .angle(function(d,i) { return scale2(d) })
        .radius(250)
      	.curve(curve);

      d3.select(this.$el)
          .append("path")
          .attr("d", line1(data))
          .attr("stroke", "gray")
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("marker-end", "url(#arrow)")
          .attr("transform", "translate(240,240)");

      d3.select(this.$el)
          .append("path")
          .attr("d", line2(data))
          .attr("stroke", "gray")
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("marker-end", "url(#arrow)")
          .attr("transform", "translate(240,240)");

    },
    updateEarth: function(degree) {
        var orbit = d3.select(this.$el).select("#orbit");
        var earth = d3.select(this.$el).select("#earth");
        var sun = d3.select(this.$el).select("#sun");
        var angle = d3.select(this.$el).select("#angle");
        var angleText = d3.select(this.$el).select("#angleText");
        var vertical = d3.select(this.$el).select("#vertical");

        var r = Number(orbit.attr("r"));
        var cx0 = Number(sun.attr("cx"));
        var cy0 = Number(sun.attr("cy"));
        var x = r*Math.cos(this.rad(-degree) - 1.5*Math.PI);
        var y = r*Math.sin(this.rad(-degree) - 1.5*Math.PI);

        var cx = cx0 + x;
        var cy = cy0 + y;

        earth.attr("cx", cx);
        earth.attr("cy", cy);
        angle.attr("x2", cx);
        angle.attr("y2", cy);

        vertical.attr("x1", cx);
        vertical.attr("x2", cx);

        var cx1 = cx0 + x/2;
        var cy1 = cy0 + y/2;
        angleText.attr("x", cx1);
        angleText.attr("y", cy1);       
    },
    update: function(){
        var delta = this.longitude > this.localLon ? 1.0 : -1.0; // one degree
        var phi = this.localLon;

        var self = this;
        var t = d3.timer(function() {
            phi = phi + delta;
            self.updateEarth(phi);
            if (Math.abs(phi - self.longitude) <= 2.0) {
              self.localLon = self.longitude;
              self.updateEarth(self.longitude);
              t.stop();
            }
        });
    }
  },
  watch:{
    longitude: function(newValue){
      this.update();
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

