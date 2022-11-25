<template>
  <div class="settings">
    <label>Диапазон дат c </label>
    <KpDatePicker v-model="startDay" />
    <label>по </label>
    <KpDatePicker v-model="finishDay" />
    <label>Набор данных:</label>
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

<script setup>
import { ref, computed } from 'vue';
import moment from 'moment';
import KpIndex from './KpIndex.vue';
import KpDatePicker from './calendar/KpDatePicker.vue';
import { useStore } from '../stores/KpIndexStore';

const store = useStore();

const startDay = ref(moment().subtract(3, 'days').toDate());
const finishDay = ref(new Date());
const datasetName = ref('Estimated');

const days = computed(() => {
  const result = [];
  if (!startDay.value || !finishDay.value) {
    return result;
  }

  let dt = startDay.value;
  let numDays = 0;

  while (moment(dt).isSameOrBefore(finishDay.value, 'date') && numDays <= 50) {
    result.push(dt);
    dt = moment(dt).add(1, 'day').toDate();
    numDays++;
  }
  return result;
});

const getDay = (offset) => {
  if (offset > 0) {
    return moment().add(offset, 'day').toDate();
  }
  return new Date();
};

// load data:
store.load();

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

.settings {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.settings label {
  margin-left: 15px;
  margin-right: 5px;
  font-weight: bold;
}

@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    --active: #275EFE;
    --active-inner: #fff;
    --focus: 2px rgba(198, 212, 255, 1);
    --border: #BBC1E1;
    --border-hover: #275EFE;
    --background: #fff;
    --disabled: #F6F8FF;
    --disabled-inner: #E1E6F9;
    border-radius: 4px 0 0 4px;
    border: 1px solid lightgray;
    padding: 5px;
  }
}

select:focus-visible {
  outline-color: lightgray;
  outline-width: 1px;
}
</style>
