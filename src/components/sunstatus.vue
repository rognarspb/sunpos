
<template>
    <svg width="100%" height="400" viewBox="0 0 500 500">
        
        <circle cx="240" cy="240" r="200" id="orbit" stroke="gray" stroke-width="1" fill="none"></circle>
        <circle cx="240" cy="240" r="180" stroke="lightgray" stroke-width="1" fill="none"></circle>      
        <line x1="40" y1="240" x2="440" y2="240" stroke="lightgray" stroke-width="2"></line>
        <text x = "160" y = "475" font-family="Verdana" font-size="16">Положение солнца</text>
    </svg>
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';
import * as JD from '../js/jd.js';
import * as SUN from '../js/sun.js';


export default {
  name: 'sunstatus',
  props: {
      date: {
          type: Object,
          default: new Date()
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
    // degree to radians:
    rad: function(degree){
        return (degree * Math.PI)/180;
    },   
    updateEarth: function(degree) {
       
    },
    update: function(){

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

