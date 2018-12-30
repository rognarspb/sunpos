<i18n>
{
  "en": {
    "kpindex": "Kp Index",
    "refresh": "Refresh",
    "days": "Days count"
  },
  "ru": {
    "kpindex": "Kp индекс",
    "refresh": "Обновить",
    "days": "Отображать дней"
  }
}
</i18n>

<template>
    <div class="container">
        <h4>{{title}}</h4>
        <label>{{$t('days')}}:</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">{{$t('days')}}:</span>
            <template v-for="number in days">
              <button type="button" :key="number" v-bind:class="{ 'active' : numdays == number}" class="btn btn-outline-secondary" @click="setNumDays(number)">{{number}}</button>
            </template>       
            <span class="input-group-text">...</span>   
          </div>
          <input type="number" v-model="numdays" placeholder="days" class="form-control"/>
        </div>      
     
        <svg width="100%" height="400" viewBox="0 0 480 440"></svg>
        <button type="button" v-on:click="update" class="btn btn-outline-primary btn-sm">{{$t('refresh')}}</button>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import * as d3 from 'd3';
import {KpIndexParser} from '../js/kp.js';



export default {
  name: 'kpindex',
  props: {
      date: {
          default: new Date(),
          required: true,
      },
      subset: {
        default: 0,
        required: false
      }
      // numdays: {
      //   default: 1,
      //   required: false
      // }
  },
  components: {
  },
  data () {
    return {
      kpData: null,
      kpValues: [],
      kpDayValues: [],
      numdays: 1,
      days: [1,2,3,4,5]
    }
  },
  mounted: function(){
      this.update();
  },
  methods: {  

    setNumDays: function(n){
      this.numdays = n;
      //this.refresh();
    },

    numDaysClass(n, nd) {
          return n => nd == n
              ? 'btn-secondary'
              : 'btn-secondary-outline'; 
    },
    
    loadData: function(){
        const kpUrl = "https://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt";
        axios.get(kpUrl)
          .then(response => {
              let strData = response.data.toString()
              let parser = new KpIndexParser(strData);
              this.kpValues = parser.parseDate(this.date);

              this.kpDayValues = [];
              for(let i=0; i < this.numdays; i++) {
                let kpDate = moment(this.date).subtract(i, 'days');
                let kpVals = parser.parseDate(kpDate);
                this.kpDayValues.push(kpVals);
              }
              this.draw();
        });
    },   
    draw: function(){
        // join and group indicies?
        //let indices = this.kpValues[this.subset].indices;
        let indices = [];
        for(let i=this.numdays-1; i >= 0; i--) {
            let dayIndices = this.kpDayValues[i][this.subset].indices;
            indices = indices.concat(dayIndices);
        }
        let svgElem = d3.select(this.$el).select("svg");
        let scaleFactor = 40;
        let barWidth = 50/this.numdays;
        let barStep = 60/this.numdays;
        let txtOffset = barWidth/2 - 5;

        svgElem.selectAll("*").remove();
        svgElem.selectAll('bars')
          .data(indices)
          .enter()
            .append('rect')
              .attr('stroke', 'gray')
              .attr('fill', function(d){
                  let kp = d.value;
                  if (kp < 0){
                      return 'steelblue';
                  }
                  else if (kp >=0  && kp <= 3) {
                      return 'green';
                  }
                  else if (kp > 3 && kp < 5) {
                      return 'yellow'
                  }
                  else if (kp >= 5) {
                    return 'red';
                  }
              })
              .attr('width', barWidth)
              .attr('x', function(d, i) {
                  return i * barStep;
              })
              .attr('height', 0) //this is the initial value
              .attr('y', 380)
              .transition()
              .duration(1500) //time in ms
              .attr('y', function(d) {
                  let height = (d.value > 0 ) ? d.value * scaleFactor : 10;
                  return 380 - height;
              })
              .attr('height', function(d) {
                  let height = (d.value > 0 ) ? d.value * scaleFactor : 10;
                  return height;
              });

        svgElem.selectAll('frames')
          .data(indices)
          .enter()
            .append('rect')
              .attr('width', barWidth)
              .attr('height', scaleFactor*9)
              .attr('fill', 'none')
              .attr('stroke', 'lightgray')
              .attr('y', 20)
              .attr('x', function(d, i) {
                  return i * barStep;
              });

          svgElem.selectAll('txt')
            .data(indices)
            .enter()
              .append('text')
                .text(function(d){
                    return d.value;
                })
                .attr('font-size', 18)
                .attr('y', function(d){
                    let height = (d.value > 0 ) ? d.value * scaleFactor : 10;
                    return 370 - height;
                })
                .attr('x', function(d, i) {
                    return i * barStep + txtOffset;
                });
                
          let hoursOffsetY = 400;
          let rotateHours = this.numdays > 1;
          svgElem.selectAll('hours')
            .data(indices)
            .enter()
              .append('text')
                .text(function(d){
                    return d.startPeriod + ':00';
                })
                .attr('font-size', function(){
                    return rotateHours ? 2*barStep/3 : 18;
                })
                .attr('transform', function(d, i) {
                    return rotateHours 
                      ? `translate(${i*barStep}, ${hoursOffsetY - 16}) rotate(90)`
                      : `translate(${i*barStep}, ${hoursOffsetY})`;
                });

          svgElem.append('line')
            .attr('x1', 0)
            .attr('y1', 220)
            .attr('x2', 480)
            .attr('y2', 220)
            .attr('stroke', 'orange')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5');
    },
   
    update: function(){
        this.loadData();
    }
  },
  watch:{
    date: function(newValue){
      this.update();
    },
    numdays: function(newValue){
      this.update();
    }
  },
  computed: {
      title(){
          if (this.kpValues && this.kpValues.length > 0)
            return this.kpValues[this.subset].name;
          return 'Unknown subset';
      }

  }
}
</script>

<style lang="scss">
  h4 {
    margin-bottom: 10px;
    margin-top: 5px;
  }
  svg{
    background: white;
  }
  div.container{
    width: 100%; 
    height: 100%;
    background: whitesmoke;
  }
</style>

