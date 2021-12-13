<template>
  <div>
    <label>Start date:</label>
    <input type="date" v-model="startDay"/>
    <label>Finish date:</label>
    <input type="date" v-model="finishDay"/>
    <label>Name of set:</label>
    <select v-model="datasetName">
      <option value="Estimated">Estimated</option>
      <option value="High Latitude">High Latitude</option>
      <option value="Middle Latitude">Middle Latitude</option>
    </select>
  </div>
  <div class="row">
    <template v-for="day in days" :key="day">
      <div class="col">
        <KpIndex :date="day" :name="datasetName"/>
      </div>
    </template>
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
      finishDay: new Date(),
      datasetName: 'Estimated'
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

      while (moment(dt).isSameOrBefore(this.finishDay, 'date') && numDays <= 50) {
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
