<template>
  <div class="calendar">
    <div v-if="mode==='month'" class="calendar-month">
      <kp-month
        :month="firstMonth"
        :year="firstYear"
        :selected="selectedValue"
        show-year
        show-navigation
        @date:selected="onDateSelected"
      />
    </div>
    <div v-if="mode==='quarter'">
      <KpQuarter @date:selected="onDateSelected" />
    </div>
    <div v-if="mode==='year'">
      <KpYear @date:selected="onDateSelected" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import moment from 'moment';
  import KpMonth from './KpMonth.vue';
  import KpYear from './KpYear.vue';
  import KpQuarter from './KpQuarter.vue';

  const toRoman = (num) => {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    for (const i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  const name = 'KpCalendar';

  // components: { KpMonth },
  const props = defineProps({
    mode: { type: String, required: false, default: 'quater' },
    selected: { type: String, required: false, default: new Date().toISOString() }
  });

  const emit = defineEmits(['date:selected']);

  const months  = ref([]);
  const quarter = ref(0);
  const year = ref(new Date().getFullYear());
  const selectedValue = ref(props.selected);

  // computed
  const firstMonth = computed(() => {
    const now = moment();
    return months.value ? months.value[0].month : now.month();
  });

  const firstYear = computed(() => {
    const now = moment();
    return months.value ? months.value[0].year : now.year();
  });

  const quarterTitle = computed(() => {
    return `${toRoman(quarter.value + 1)} квартал ${year.value}`;
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
    selectedValue.value = isoDate;
    emit('date:selected', isoDate);
  };

  const update = () => {
    const now = moment();
    if (props.mode === 'month') {
      months.value = [{
        index: 0,
        month: now.month(),
        year: now.year()
      }];
    } else if (props.mode === 'quarter') {
      const quarter = now.month() / 3;
      months.value = [];
      for (let i = 0; i < 3; i++) {
        months.value.push({
          index: i,
          month: quarter + i,
          year: now.year()
        });
      }
    } else if (props.mode === 'year') {
      months.value = [];
      for (let i = 0; i < 12; i++) {
        months.value.push({
          index: i,
          month: i,
          year: now.year()
        });
      }
    }
  };

  watch(() => props.selected, (newValue) => {
    selectedValue.value = newValue;
  });

  update();
</script>

<style scoped>
.calendar {
  animation-duration: 10ms;
}

</style>
