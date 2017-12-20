
<template>
    <svg width="100%" height="100%" viewBox="0 0 480 480">
        <circle cx="40" cy="240" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>
        <circle cx="440" cy="240" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>
        <circle cx="240" cy="40" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>
        <circle cx="240" cy="440" r="20" stroke="#afafaf" stroke-width="2" fill="#efefef"></circle>

        <circle cx="240" cy="240" r="200" id="orbit" stroke="gray" stroke-width="1" fill="none"></circle>
        <circle cx="240" cy="240" r="180" stroke="lightgray" stroke-width="1" fill="none"></circle>
        
        <line x1="40" y1="240" x2="440" y2="240" stroke="lightgray" stroke-width="2"></line>
        <line x1="240" y1="40" x2="240" y2="440" stroke="lightgray" stroke-width="2"></line>

        <line x1="240" y1="240" x2="440" y2="240" id="angle" stroke="gray" stroke-width="1" stroke-dasharray="5,5"></line>

        <circle cx="440" cy="240" r="20" id="earth" fill="steelblue"></circle>
        <circle cx="240" cy="240" r="35" id="sun" fill="yellow" stroke="orange" stroke-width="4"></circle>
        <circle cx="240" cy="240" r="10" id="sun" fill="orange" ></circle>
        <text x = "200" y = "80" font-family="Verdana" font-size="16">{{longitude}}</text>
    </svg>
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';


export default {
  name: 'ecliptic',
  props: {
    longitude: Number,
    latitude: Number
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
      this.update();
  },
  methods: {  
    // degree to radians:
    rad: function(degree){
        return (degree * Math.PI)/180;
    },   
    updateEarth: function(degree) {
        var orbit = d3.select(this.$el).select("#orbit");
        var earth = d3.select(this.$el).select("#earth");
        var sun = d3.select(this.$el).select("#sun");
        var angle = d3.select(this.$el).select("#angle");

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
</style>

