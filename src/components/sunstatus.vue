<i18n>
{
  "en": {
    "sunrise": "Sunrise",
    "sunset": "Sunset",
    "solarnoon": "Solar noon",
    "horizont": "Skyline",

    "astroTwilight": "Astronomical twilight",
    "nauticalTwilight": "Nautical twilight",
    "civilTwilight": "Civil twilight",
    "goldenHour": "Golden hour",
    "morning": "morning",
    "evening": "evening",

    "day": "Day",
    "night": "Night",

    "till": "Till ",
    "startsfrom": "Starts from ",

    "time": "Time",
    "azimuth": "azimuth",
    "elevation": "elevation"
  },
  "ru": {
    "sunrise": "Восход",
    "sunset": "Закат",
    "solarnoon": "Истинный полдень",
    "horizont": "Линия горизонта",

    "astroTwilight": "Астрономические сумерки",
    "nauticalTwilight": "Навигационные сумерки",
    "civilTwilight": "Гражданские сумерки",
    "goldenHour": "Золотой час",
    "morning": "утро",
    "evening": "вечер",

    "day": "День",
    "night": "Ночь",
    "till": "До",
    "startsfrom": "Начинается в ",

    "time": "Время",
    "azimuth": "азимут",
    "elevation": "высота"

  }
}
</i18n>
<template>
      <div style="width: 100%; height: 100%;">
        <div class="tooltip" style="opacity: 0" id="infoTooltip"></div>
        <div class="tooltip" style="opacity: 0" id="timelineTooltip"></div>
        <svg width="100%" height="100%" viewBox="0 0 820 460"> 
            <defs>
                <linearGradient id="dayGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop class="gstart" offset="0%" stop-color="orangered" stop-opacity="1"/>
                    <stop class="gmid" offset="10%" stop-color="#ffd42a" stop-opacity="1"/>
                    <stop class="gmid" offset="90%" stop-color="#ffd42a" stop-opacity="1"/>
                    <stop class="gend" offset="100%" stop-color="orangered" stop-opacity="1"/>
                </linearGradient>
                <linearGradient id="morningGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop class="gstart" offset="0%" stop-color="#00aad4" stop-opacity="1"/>
                    <stop class="gmid" offset="70%" stop-color="#00aad4" stop-opacity="1"/>
                    <stop class="gend" offset="100%" stop-color="orangered" stop-opacity="1"/>                
                </linearGradient>
                <linearGradient id="eveningGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop class="gstart" offset="0%" stop-color="orangered" stop-opacity="1"/>
                    <stop class="gmid" offset="30%" stop-color="#00aad4" stop-opacity="1"/>
                    <stop class="gend" offset="100%" stop-color="#00aad4" stop-opacity="1"/>
                </linearGradient> 
                <linearGradient id="morningTwilightGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop class="gstart" offset="0%" stop-color="#214478" stop-opacity="1"/>
                    <stop class="gmid" offset="50%" stop-color="#4e7ec5" stop-opacity="1"/>
                    <stop class="gend" offset="100%" stop-color="#00aad4" stop-opacity="1"/>                
                </linearGradient>                
                <linearGradient id="eveningTwilightGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop class="gstart" offset="0%" stop-color="#00aad4" stop-opacity="1"/>
                    <stop class="gmid" offset="50%" stop-color="#4e7ec5" stop-opacity="1"/>
                    <stop class="gend" offset="100%" stop-color="#214478" stop-opacity="1"/>
                </linearGradient> 
                
            </defs>
            <circle cx="410" cy="182" r="4" stroke="#afafaf" stroke-width="2" fill="#efefef" id="sunrisePoint"></circle>
            <circle cx="410" cy="182" r="4" stroke="#afafaf" stroke-width="2" fill="#efefef" id="sunsetPoint"></circle>


            <rect x="0" y="0" width="820" height="180" fill="#e2efff" fill-opacity="0.5" id="skyrect"></rect>
            <rect x="0" y="181" width="820" height="178" fill="#c1ffa9" fill-opacity="0.2" id="earthrect"></rect>

            <rect x="0" y="360" width="100" height="50" fill="#214478" fill-opacity="0.9" id="night1"></rect>
            <rect x="25" y="360" width="100" height="50" fill="#315488" fill-opacity="0.9" id="atw1"></rect>
            <rect x="50" y="360" width="100" height="50" fill="url(#morningTwilightGradient)" fill-opacity="0.9" id="tw1"></rect>
            <rect x="100" y="360" width="100" height="50" fill="url(#morningGradient)" fill-opacity="0.9" id="twmorning" ></rect>
            <rect x="200" y="360" width="420" height="50" fill="url(#dayGradient)" fill-opacity="0.9" id="day"></rect>
            <rect x="620" y="360" width="100" height="50" fill="url(#eveningGradient)" fill-opacity="0.9" id="twevening"></rect>
            <rect x="670" y="360" width="100" height="50" fill="url(#eveningTwilightGradient)" fill-opacity="0.9" id="tw2"></rect>
            <rect x="700" y="360" width="100" height="50" fill="#315488" fill-opacity="0.9" id="atw2"></rect>
            <rect x="720" y="360" width="100" height="50" fill="#214478" fill-opacity="0.9" id="night2"></rect>

            <rect x="100" y="0" width="100" height="360" fill="yellow" fill-opacity="0.4" id="goldenhour1" title="Morning Golden hour"></rect>
            <rect x="620" y="0" width="100" height="360" fill="yellow" fill-opacity="0.4" id="goldenhour2"></rect>

            <line x1="0" y1="180" x2="820" y2="180" stroke="lightgray" stroke-width="1"></line>
            <line x1="50" y1="0" x2="50" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
            <line x1="770" y1="0" x2="770" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
            <line x1="410" y1="0" x2="410" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="5,5"></line>
            <line x1="0" y1="0" x2="0" y2="360" stroke="lightgray" stroke-width="1" stroke-dasharray="3,3" id="cursorline"></line>

            <line x1="0" y1="360" x2="820" y2="360" stroke="lightgray" stroke-width="1"></line>
            <line x1="0" y1="410" x2="820" y2="410" stroke="lightgray" stroke-width="1"></line>            
            <line x1="410" y1="0" x2="410" y2="360" stroke="orange" stroke-width="1" stroke-dasharray="5,5" id="solarNoonLine"></line>

            <!-- <circle cx="120" cy="80" r="80" stroke="none" fill="white" ></circle> -->
            <g transform="translate(120 30)">
              <text x="0" y="0" font-family="Arial" font-size="2em" fill="darkorange" id="sunriselabel" class="label-lg">
                <tspan x="0" dy="1.2em" text-anchor="middle">{{$t('sunrise')}}</tspan>
                <tspan x="0" dy="1.2em" text-anchor="middle">{{sunrise}}</tspan>
              </text>
            </g>

            <!-- <circle cx="700" cy="80" r="80" stroke="none" fill="white" ></circle> -->
            <g transform="translate(700 30)">
              <text x="0" y="0" font-family="Arial" font-size="2em" fill="steelblue" id="sunsetlabel" class="label-lg">
                <tspan x="0" dy="1.2em" text-anchor="middle">{{$t('sunset')}}</tspan>
                <tspan x="0" dy="1.2em" text-anchor="middle">{{sunset}}</tspan>
              </text>
            </g>
            
            <text x = "250" y = "350" font-family="Arial" font-size="16" fill="gray" id="solarNoonText">{{$t('solarnoon')}}: {{solarnoon}}</text>
            <text x = "30" y = "200" font-family="Arial" font-size="16" fill="gray">00:00</text>
            <text x = "390" y = "200" font-family="Arial" font-size="16" fill="gray">12:00</text>
            <text x = "750" y = "200" font-family="Arial" font-size="16" fill="gray">23:59</text>
            <text x = "680" y = "170" font-family="Arial" font-size="14" fill="gray">{{$t('horizont')}}</text>
            <circle cx="410" cy="180" r="20" id="sun" fill="yellow" stroke="orange" stroke-width="4"></circle>       
        </svg>
      </div>
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
      this.drawTimelineLabels();
      this.setTimelineTooltips();
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
        dt.setHours(hours, minutes, 0);

        // calculate hour:
        var val = Sun.GetElevationAngle(dt, this.latitude, this.longitude);
        var azimuth = Sun.GetAzimuthAngle(dt, this.latitude, this.longitude);
        return {
            x: ix,
            y: 2*val,
            value: val,
            azimuth: azimuth,
            date: dt
        };
    },
    displayHtml: function(ix){
        var data = this.displayFunction(ix);
        var dateStr = Util.timeToShortString(data.date);
        return  this.$t("time") + ": " + dateStr + 
                "<br/>" + 
                "&alpha;=" + data.value.toFixed(2) + "&deg; (" + this.$t("elevation") + ")" +
                "<br/>" + 
                "f=" + data.azimuth.toFixed(2) + "&deg; (" + this.$t("azimuth") + ")";

    },
    update: function(){
        var self = this;
        var svgElem = d3.select(this.$el).select("svg");
        var tooltip = d3.select(this.$el).select("#infoTooltip");
        var cursorline = d3.select(this.$el).select("#cursorline");

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
                            .attr("fill", "none");
                            //.attr("fill", "#a9c1ff") 
                            //.attr("fill-opacity", "0.1");

        // scatterplot data:

        svgElem.selectAll("circle.cursor").remove();
        var cursorcircle = svgElem.append("circle")
          .attr("r", 20)
          .attr("cx",0)
          .attr("cy",0)
          .attr("fill", "yellow")
          .attr("stroke","orange")
          .style("opacity", 0)
          .attr("class","cursor");

        svgElem.selectAll("circle.dotcursor").remove();
        //  var cursorcircle = svgElem.select("#cursor");
        svgElem.selectAll("dot")	
          .data(functionData.filter(function(d){
              return (2*d.x) % 20 == 0;
          }))		
        .enter().append("circle")						
          .attr("r", 3)		
          .attr("cx", function(d) { return 50 + d.x; })		 
          .attr("cy", function(d) { return 180 - d.y; })
          .attr("stroke", "steelblue")
          .attr("fill", "steelblue")
          .attr("class","dotcursor")
          .style("opacity", .3)
          .on("mouseover", function(d) {		
              tooltip.transition()		
                  .duration(200)		
                  .style("opacity", .9);		
              tooltip.html(self.displayHtml(d.x))	
                  .style("left", (event.pageX + 15) + "px")		
                  .style("top", (event.pageY - 340) + "px");	
              cursorcircle.attr("cx", 50 + d.x)
                        .attr("cy", 180 - d.y)
                        .style("opacity", 0.5);
              cursorline.attr("x1", 50 + d.x)
                        .attr("x2", 50 + d.x)
                        .style("opacity", 1);
              })					
          .on("mouseout", function(d) {		
              tooltip.transition()		
                  .duration(500)		
                  .style("opacity", 0);	
              cursorline.style("opacity", 0);
              cursorcircle.style("opacity", 0);
          });
                           

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
        if (this.date.getHours() > 1) {
          this.updateSun(moment(this.date).subtract(60, "minutes").toDate(), 'sun2', 0.1);
        }
        if (this.date.getHours() > 0) {
          this.updateSun(moment(this.date).subtract(30, "minutes").toDate(), 'sun1', 0.3);
        }
        this.updateSun(moment(this.date).toDate(), 'sun', 1.0);  
        
        var elevation = Sun.GetElevationAngle(this.date, this.latitude, this.longitude);
        var skycolor = elevation > 0 ? "#e2efff" : "#121f1f";
        svgElem.select("#skyrect")
          .attr("fill", skycolor);

        if (elevation > 0 ){
          svgElem.select("#sunriselabel").attr("fill", "darkorange");
          svgElem.select("#sunsetlabel").attr("fill", "steelblue");
          svgElem.select("#earthrect").attr("fill", "#c1ffa9");
        } else {
          svgElem.select("#sunriselabel").attr("fill", "yellow");
          svgElem.select("#sunsetlabel").attr("fill", "white");
          svgElem.select("#earthrect").attr("fill", "#03ab3a");
        }

        this.updateTimeline();
        this.updateGoldenHours();
    },

    getPixelOffset: function(dt){
       var mins = Math.floor(Util.getTotalSeconds(dt)/60);
       return 50 + mins/2;
    },

    updateTimeline: function(){
        var svgElem = d3.select(this.$el).select("svg");
        var s1 = Sun.GetSunriseTime(this.date, this.latitude, this.longitude);
        var s2 = Sun.GetSunsetTime(this.date, this.latitude, this.longitude);
        var tw = Sun.GetTwilightTime(-6.0, this.date, this.latitude, this.longitude);
        var ntw = Sun.GetTwilightTime(-12.0, this.date, this.latitude, this.longitude);
        var atw = Sun.GetTwilightTime(-18.0, this.date, this.latitude, this.longitude);

        svgElem.select("#night1")
          .attr("x", 0)
          .attr("width", 50 + this.getPixelOffset(atw.morningTwilight)-50);
        // astronomical twilights
        svgElem.select("#atw1")
          .attr("x", this.getPixelOffset(atw.morningTwilight))
          .attr("width", this.getPixelOffset(ntw.morningTwilight) - this.getPixelOffset(atw.morningTwilight));
        // nautical twilights
        svgElem.select("#tw1")
          .attr("x", this.getPixelOffset(ntw.morningTwilight))
          .attr("width", this.getPixelOffset(tw.morningTwilight) - this.getPixelOffset(ntw.morningTwilight));
        // civil twilight
        svgElem.select("#twmorning")
          .attr("x", this.getPixelOffset(tw.morningTwilight))
          .attr("width", this.getPixelOffset(s1) - this.getPixelOffset(tw.morningTwilight));
        svgElem.select("#day")
          .attr("x", this.getPixelOffset(s1))
          .attr("width", this.getPixelOffset(s2) - this.getPixelOffset(s1));
        // civil twilight
        svgElem.select("#twevening")
          .attr("x", this.getPixelOffset(s2))
          .attr("width", this.getPixelOffset(tw.eveningTwilight) - this.getPixelOffset(s2));
        // nautical twilight
        svgElem.select("#tw2")
          .attr("x", this.getPixelOffset(tw.eveningTwilight))
          .attr("width", this.getPixelOffset(ntw.eveningTwilight) - this.getPixelOffset(tw.eveningTwilight));
        // astronomical twilights
        svgElem.select("#atw2")
          .attr("x", this.getPixelOffset(ntw.eveningTwilight))
          .attr("width", this.getPixelOffset(atw.eveningTwilight) - this.getPixelOffset(ntw.eveningTwilight));
        svgElem.select("#night2")
          .attr("x", this.getPixelOffset(atw.eveningTwilight))
          .attr("width", 820 - this.getPixelOffset(atw.eveningTwilight));
    },



    updateGoldenHours: function(){

        var svgElem = d3.select(this.$el).select("svg");

        var hmin = Sun.GetTwilightTime(-0.83, this.date, this.latitude, this.longitude);
        var hmax = Sun.GetTwilightTime(10.0, this.date, this.latitude, this.longitude);
        svgElem.select("#goldenhour1")
          .attr("x", this.getPixelOffset(hmin.morningTwilight))
          .attr("width", this.getPixelOffset(hmax.morningTwilight) - this.getPixelOffset(hmin.morningTwilight));

        svgElem.select("#goldenhour2")
          .attr("x", this.getPixelOffset(hmax.eveningTwilight))
          .attr("width", this.getPixelOffset(hmin.eveningTwilight) - this.getPixelOffset(hmax.eveningTwilight));
          
    },

    drawTimelineLabels: function() {
        var svgElem = d3.select(this.$el).select("svg");
        var hourData = d3.range(25).map(function(x){
          return {
            x: 50 + x*30,
            textOffset: 40 + x*30,
            hour: String(x).padStart(2, "0")
          }
        });
        svgElem.selectAll("txt")
          .data(hourData)
          .enter()
            .append("text")
              .attr("x", function(d){ return d.textOffset })
              .attr("y", 430)
              .attr("font-family", "Arial")
              .attr("font-size", "16")
              .attr("fill", "gray")
              .text(function(d){ return d.hour });

        svgElem.selectAll("ticks")        
          .data(hourData)
          .enter()
            .append("line")
              .attr("x1", function(d){ return d.x })
              .attr("x2", function(d){ return d.x })
              .attr("y1", 405)
              .attr("y2", 415)
              .attr("stroke", "black");
    },
    getTimelineTextById(id){
      var htmlText = "Element id = " + event.target.id;
      var s1 = Sun.GetSunriseTime(this.date, this.latitude, this.longitude);
      var s2 = Sun.GetSunsetTime(this.date, this.latitude, this.longitude);
      var tw = Sun.GetTwilightTime(-6.0, this.date, this.latitude, this.longitude);
      var ntw = Sun.GetTwilightTime(-12.0, this.date, this.latitude, this.longitude);
      var atw = Sun.GetTwilightTime(-18.0, this.date, this.latitude, this.longitude);
      var hmax = Sun.GetTwilightTime(10.0, this.date, this.latitude, this.longitude);       
      var hmin =  Sun.GetTwilightTime(-0.83, this.date, this.latitude, this.longitude);
      
      if (id == "atw1"){              

        htmlText = '<p><strong>' + this.$t('astroTwilight') +  ' (' + this.$t('morning') + ')</strong></p>';
        htmlText += "<p>" + Util.timeObjToShortString(atw.morningTwilight) + " - " + Util.timeObjToShortString(ntw.morningTwilight) + "</p>";        
      }
      else if (id == "tw1"){      
        htmlText = '<p><strong>' + this.$t('nauticalTwilight') +  ' (' + this.$t('morning') + ')</strong></p>';
        htmlText += "<p>" + Util.timeObjToShortString(ntw.morningTwilight) + " - " + Util.timeObjToShortString(tw.morningTwilight) + "</p>";        
      }
      else if (id == "twmorning"){
        htmlText = '<p><strong>' + this.$t('civilTwilight') +  ' (' + this.$t('morning') + ')</strong></p>';
        htmlText += "<p>" + Util.timeObjToShortString(tw.morningTwilight) + " - " + Util.timeObjToShortString(s1) + "</p>";
      }
      else if (id == "day"){
        htmlText = '<p><strong>' + this.$t('day') +  '</strong></p>';
        htmlText += "<p>" + Util.timeObjToShortString(s1) + " - " + Util.timeObjToShortString(s2) + "</p>";
      }
      else if (id == "twevening"){      
        htmlText = "<p><strong>" + this.$t('civilTwilight') + " (" + this.$t('evening') + ")</strong></p>";
        htmlText += "<p>" + Util.timeObjToShortString(s2) + " - " + Util.timeObjToShortString(tw.eveningTwilight) + "</p>";        
      }
      else if (id == "tw2"){      
        htmlText = "<p><strong>" + this.$t('nauticalTwilight') + " (" + this.$t('evening') + ")</strong></p>";
        htmlText += "<p>" + Util.timeObjToShortString(tw.eveningTwilight) + " - " + Util.timeObjToShortString(ntw.eveningTwilight) + "</p>";        
      }
      else if (id == "atw2"){      
        htmlText = "<p><strong>" + this.$t('astroTwilight') + " (" + this.$t('evening') + ")</strong></p>";
        htmlText += "<p>" + Util.timeObjToShortString(ntw.eveningTwilight) + " - " + Util.timeObjToShortString(atw.eveningTwilight) + "</p>";        
      }
      else if (id == "night1"){
        htmlText = "<p><strong>" + this.$t('night') + "</strong></p>";
        htmlText += this.$t("till") + " " + Util.timeObjToShortString(atw.morningTwilight) 
      }
      else if (id == "night2"){
        htmlText = "<p><strong>" + this.$t('night') + "</strong></p>";
        htmlText += this.$t("startsfrom") + " " + Util.timeObjToShortString(atw.eveningTwilight) 
      }
      else if (id == "goldenhour1"){      
        htmlText = "<p><strong>" + this.$t('goldenHour') + " (" + this.$t('morning') + ")</strong></p>";
        htmlText += "<p>" + Util.timeObjToShortString(hmin.morningTwilight) + " - " + Util.timeObjToShortString(hmax.morningTwilight) + "</p>";  
        
        var t1  = Util.timeObjToDate(this.date, hmin.morningTwilight);
        var t2  = Util.timeObjToDate(this.date, hmin.eveningTwilight);
        var az1 = Sun.GetAzimuthAngle(t1, this.latitude, this.longitude).toFixed(2);
        var az2 = Sun.GetAzimuthAngle(t2, this.latitude, this.longitude).toFixed(2);
        htmlText += "<p>" + "&alpha; = "  + az1 + "&deg; - " + az2 + "&deg; </p>";        
      }
      else if (id == "goldenhour2"){      
        htmlText = "<p><strong>" + this.$t('goldenHour') + " (" + this.$t('evening') + ")</strong></p>";
        htmlText += "<p>" + Util.timeObjToShortString(hmin.eveningTwilight) + " - " + Util.timeObjToShortString(hmax.eveningTwilight) + "</p>";        
        var t2  = Util.timeObjToDate(this.date, hmax.morningTwilight);
        var t1  = Util.timeObjToDate(this.date, hmax.eveningTwilight);
        var az1 = Sun.GetAzimuthAngle(t1, this.latitude, this.longitude).toFixed(2);
        var az2 = Sun.GetAzimuthAngle(t2, this.latitude, this.longitude).toFixed(2);
        htmlText += "<p>" + "&alpha; = "  + az1 + "&deg; - " + az2 + "&deg; </p>";        
      }
      
      return htmlText;
    },
    setTimelineTooltips: function(){
        var svgElem = d3.select(this.$el).select("svg");
        var tooltip = d3.select(this.$el).select("#timelineTooltip");
        var self = this;

        svgElem.selectAll("#night1, #tw1, #twmorning, #day, #twevening, #tw2, #night2, #atw1, #atw2, #goldenhour1, #goldenhour2")
          .on("mouseover", function() {	
            svgElem.append("rect")
              .attr("x", d3.select(this).attr("x"))
              .attr("y", d3.select(this).attr("y"))
              .attr("width", d3.select(this).attr("width"))
              .attr("height", d3.select(this).attr("height"))
              .attr("id", "rectSelection")
              .style("fill", "none")
              .style("stroke", "orangered")
              .style("stroke-width", 2);

            var htmlText = "id = " + event.target.id;
            tooltip.transition()		
              .duration(200)		
              .style("opacity", .9);		
            tooltip.html(self.getTimelineTextById(event.target.id))	
              .style("left", (event.pageX + 15) + "px")		
              .style("top", (event.pageY - 340) + "px");	
          })
          .on("mouseout", function(d) {		
            d3.select("#rectSelection").remove();
            tooltip.transition()		
              .duration(500)		
              .style("opacity", 0);	
          });
    },

    updateSun: function(datetime, id, opacity) {
        var totalMin = datetime.getHours()*60 + datetime.getMinutes();
        var elevation = Sun.GetElevationAngle(datetime, this.latitude, this.longitude);
       
        var cx = 50 + totalMin/2;
        var cy = 180 - 2*elevation;

        var svgElem = d3.select(this.$el).select("svg");
        var sun = svgElem.select('#' + id).remove();
        sun = svgElem.append("circle")
                          .attr("id", id)
                          .attr("cx", cx)
                          .attr("cy", cy)
                          .attr("r", 20)
                          .attr("stroke", "orange")
                          .attr("stroke-width", 4)
                          .attr("fill", "yellow")
                          .attr("opacity", opacity);    
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
  div.tooltip {	
    position: absolute;			
    min-width: 160px;					
    height: auto;
    padding: 5px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 2px;			
    pointer-events: none;
    p {
      margin-bottom: 0.1rem;
    }
    strong:after {
      display: block;
      content: " ";
      height: 0.2rem;      
    }
    br{
      height: 0.1rem;
    }
}
</style>

line-height