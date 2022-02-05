<template>
  <div class="settings">
    <div>Диапазон дат: </div>
    <label>C </label>
    <KpDatePicker v-model="startDay" />
    <label>по </label>
    <KpDatePicker v-model="finishDay" />
    <label>Name of set:</label>
    <select v-model="datasetName">
      <option value="Estimated">
        Estimated
      </option>
      <option value="High Latitude">
        High Latitude
      </option>
      <option value="Middle Latitude">
        Middle Latitude
      </option>
    </select>
  </div>
  <div class="row">
    <template v-for="day in days" :key="day">
      <div class="col">
        <KpIndex :date="day" :name="datasetName" />
      </div>
    </template>
  </div>
</template>

<script>
  import moment from 'moment';
  import KpIndex from './KpIndex.vue';
  import KpDatePicker from './calendar/KpDatePicker.vue';

  export default {
    name: 'KpIndexSet',
    components: {
      KpIndex,
      KpDatePicker
    },
    data: function() {
      return {
        startDay: new Date(),
        finishDay: new Date(),
        datasetName: 'Estimated'
      };
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
    },
    methods: {
      getDay(offset) {
        if (offset > 0) {
          return moment().add(offset, 'day').toDate();
        }
        return new Date();
      }
    },
  };

</script>

<style scoped>
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .col {
    display: inline-block;
  }
</style>
