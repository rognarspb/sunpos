<template>
  <div class="calendar-quarter">
    <div class="calendar-quarter__title">
      <div class="calendar-quarter__arrow" @click="prevQuarter">
        &#129044;
      </div>
      <div class="calendar-quarter__title__text">
        {{ quarterTitle }}
      </div>
      <div class="calendar-quarter__arrow" @click="nextQuarter">
        &#129046;
      </div>
    </div>
    <div class="calendar-quarter__months">
      <template v-for="m in months" :key="m.index">
        <div class="calendar-quarter__month">
          <kp-month
            :month="m.month"
            :year="m.year"
            :selected="selected"
            @date:selected="onDateSelected"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import moment from 'moment';
  import KpMonth from './KpMonth.vue';
  import toRoman from '../../services/KpRomanConverter';

  const months  = ref([]);
  const selected = ref(new Date().toISOString());
  const emit = defineEmits(['date:selected']);

  const quarterNumber = computed(() => {
    const dt = selected.value ? moment(selected.value) :  moment();
    return dt.quarter();
  });

  const yearNumber = computed(() => {
    const dt = selected.value ? moment(selected.value) :  moment();
    return dt.year();
  });

  const quarterTitle = computed(() => {
    return `${toRoman(quarterNumber.value + 1)} квартал ${yearNumber.value}`;
  });

  const init = () => {
    const now = moment();
    const quarter = now.month() / 3;
    months.value = [];
    for (let i = 0; i < 3; i++) {
      months.value.push({
        index: i,
        month: quarter + i,
        year: now.year()
      });
    }
  };

  const onDateSelected = (isoDate) => {
    selected.value = isoDate;
    emit('date:selected', isoDate);
  };

  init();
</script>

<style scoped>
  .calendar-quarter {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .calendar-quarter__arrow {
    width: 30px;
    text-align: center;
    font-size: 18pt;
    border-radius: 4px;
  }

  .calendar-quarter__arrow:hover {
    cursor: pointer;
    background: #efefef;
  }

  .calendar-quarter__title {
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    max-width: 850px;
    width: 100%;
  }

  .calendar-quarter__title__text {
    text-align: center;
    font-weight: bold;
    width: 100%;
  }

  .calendar-quarter__months {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .calendar-quarter__month {
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 10px;
  }
</style>
