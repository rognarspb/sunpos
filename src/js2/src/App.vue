<template>
  <div class="row">
    <template v-for="day in days" :key="day">
      <div class="col">
        <KpIndex :date="day"/>
      </div>
    </template>
  </div>
  <div class="row">
    <div class="col">
      <KpIndex :date="getDay(-2)"/>
    </div>
    <div class="col">
      <KpIndex :date="getDay(-1)"/>
    </div>
    <div class="col">
      <KpIndex :date="getDay()"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import KpIndex from './components/KpIndex.vue';

export default {
  name: 'App',
  components: {
    KpIndex
  },
  data: function() {
    return {
      startDay: new Date(),
      finishDay: new Date()
    };
  },
  methods: {
    getDay(offset) {
      if (offset > 0) {
        return moment().add(offset, 'day').toDate();
      }
      return new Date();
    }
  },
  computed: {
    days() {
      const result = [];
      if (!this.startDay || !this.finishDay) {
        return result;
      }

      let dt = this.startDay;
      let numDays = 0;

      while (moment(dt).isBefore(this.finishDay, 'day') || numDays <= 50) {
        result.push(dt);
        dt = moment(dt).add(1, 'day').toDate();
        numDays++;
      }
      return result;
    }
  }

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.col {
  display: inline-block;
}
</style>
