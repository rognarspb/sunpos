<template>
  <div class="calendar-year">
    <div class="calendar-year__title">
      {{ yearNumber }} год
    </div>
    <template v-for="q in quarters" :key="q.index">
      <div class="calendar-year__quarter">
        <div class="calendar-year__quarter__title">
          {{ toRoman(q.index + 1) }} Квартал
        </div>
      </div>
      <div class="calendar-year__months">
        <template v-for="m in q.months" :key="m.index">
          <div class="calendar-year__month">
            <kp-month
              :month="m.month"
              :year="m.year"
              :selected="selected"
              @date:selected="onDateSelected"
            />
          </div>
        </template>
      </div>
    </template>
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

  const init = () =>  {
    const now = moment();
    for (let i = 0; i < 12; i++) {
      months.value.push({
        index: i,
        month: i,
        year: now.year()
      });
    }
  };

  const yearNumber = computed(() => {
    const now = moment();
    return months.value ? months.value[0].year : now.year();
  });

  const quarters = computed(() => {
    const quartersArray = [];
    let quarterMonths = [];
    let qx = 0;

    if (!months.value) {
      return [];
    }

    for(const m of months.value) {
      if (m.index !== 0 && m.index % 3 === 0) {
        quartersArray.push({
          index: qx++,
          months: quarterMonths
        });
        quarterMonths = [];
      }
      quarterMonths.push(m);
    }
    return quartersArray;
  });

  const onDateSelected = (isoDate) => {
    selected.value = isoDate;
    emit('date:selected', isoDate);
  };

  init();
</script>

<style scoped>
  .calendar-year {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .calendar-year__title {
    text-align: center;
    font-size: 20px;
    padding: 10px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-width: 850px;
    width: 100%;
    border-bottom: 1px solid #efefef;
  }

  .calendar-year__months {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .calendar-year__quarter {
    margin-top: 16px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-width: 850px;
    width: 100%;
  }

  .calendar-year__quarter__title {
    text-align: center;
    font-weight: bold;
  }

  .calendar-year__month {
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 10px;
  }

  .calendar-year__month:nth-child(3n) {
    page-break-after: always; /* CSS 2.1 syntax */
    break-after: always; /* New */
  }
</style>
