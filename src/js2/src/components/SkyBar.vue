<template>
  <div class="skybar">
    <div>lat {{ latitude }}</div>
    <div>lon {{ longitude }}</div>
    <template v-for="bar in bars" :key="bar.id">
      <div class="skybar__rect" :style="getBarStyle(bar)">
        {{ bar.name }} {{ bar.time }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as Sun from '../utils/sun';

const props = defineProps({
  minWidth: { type: Number, required: false, default: null }
});

const bars = [
  { id: 0, alpha: undefined, name: 'Ночь' },
  { id: 1, alpha: -18.0, name: 'Астрономические сумерки (утро)' },
  { id: 2, alpha: -12.0, name: 'Навигационные сумерки (утро)' },
  { id: 3, alpha: -6.0, name: 'Гражданские сумерки (утро)' },
  { id: 4, alpha:  undefined, name: 'День', fit: '*' },
  { id: 5, alpha: 6.0, name: 'Гражданские сумерки (вечер)' },
  { id: 6, alpha: 12.0, name: 'Навигационные сумерки (вечер)' },
  { id: 7, alpha: 18.0, name: 'Астрономические сумерки' },
  { id: 8, alpha: undefined, name: 'Ночь' }
];

const latitude = ref();

const longitude = ref();

const date = new Date();

const getBarStyle = (bar) => {
  const posX = bar.id - bars.length / 2;
  const maxHeightPercent = 16;
  const posPercent = 100 * ((posX * posX) / maxHeightPercent);
  const gradValue = `linear-gradient(90deg, rgb(0, 26, 137) 0%, rgba(16,125,181,1) ${posPercent}%, rgba(0, 213, 255, 0) 100%)`;
  const dayPercent = (1 / 8) * 100;
  return {
    flex: bar.id == 4 ? '1 1 auto' : '',
    height: `${dayPercent}%`,
    background: gradValue,
  };
};

const getTwilightTimeMorning = (alpha) => {
  var twilight = Sun.GetTwilightTime(alpha, date, latitude.value, longitude.value);
  var h = isNaN(twilight.morningTwilight.hours) ? "--" : String(twilight.morningTwilight.hours);
  var m = isNaN(twilight.morningTwilight.minutes) ? "--" : String(twilight.morningTwilight.minutes);
  return h.padStart(2, '0') + ":" + m.padStart(2, '0');
};

const getTwilightTimeEvening = (alpha) => {
  var twilight = Sun.GetTwilightTime(alpha, date, latitude.value, longitude.value);
  var h = isNaN(twilight.eveningTwilight.hours) ? "--" : String(twilight.eveningTwilight.hours);
  var m = isNaN(twilight.eveningTwilight.minutes) ? "--" : String(twilight.eveningTwilight.minutes);

  return h.padStart(2, '0') + ":" + m.padStart(2, '0');
};

const getTwilightTime = (alpha) => {
  if (alpha) {
    if (alpha > 0.0) {
      return getTwilightTimeEvening(-1.0*alpha);
    } else {
      return getTwilightTimeMorning(alpha);
    }
  }
  return '';
};

const getLocation = () => {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  if ("geolocation" in navigator) {
    // try get current coordinates
    navigator.geolocation.getCurrentPosition((pos) => {
      var coords = pos.coords;
      latitude.value = coords.latitude;
      longitude.value = coords.longitude;
      for(const bar of bars) {
        bar.time = getTwilightTime(bar.alpha);
      }
    }, (err) => {
      console.warn("ERROR getting geoposition (${err.code}): ${err.message}");
    }, options);
  }
};






getLocation();

</script>

<style scoped>
.skybar {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

.skybar__rect {
  min-width: 50px;
  background: rgb(127, 169, 216);
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  margin-bottom: 10px;
  border-radius: 4px;
}

.skybar__rect1:after {
  transition: background-color .3s ease-in;
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 100%;
  width: 100%;
  height: 100%;
  background: none;
}

.skybar__rect:hover:after {
  background: rgba(140, 182, 230, 0.5);
}
</style>