
<template>
    <svg width="720" height="120">
        <circle cx="40" cy="60" r="10"></circle>
        <circle cx="80" cy="60" r="10"></circle>
        <circle cx="120" cy="60" r="10"></circle>
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
      localLon: 0.0,
    }
  },
  created: function(){
      this.init();
  },
  methods: {  
    NumberWithCommas: function (x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    mounted: function(){
        var circle = d3.select(this.$el)
                        .selectAll("circle");

        circle.style("fill", "steelblue");
        circle.attr("r", 30);
        circle.data([32, 57, 112]);
        circle.attr("r", function(d) { return Math.sqrt(d); });
        circle.attr("cx", function(d, i) { return i * 100 + 30; });

        this.localLat = this.latitude;
        this.localLon = this.longitude;
    }
  },
  computed:{
  }
}
</script>

<style lang="scss">
</style>

