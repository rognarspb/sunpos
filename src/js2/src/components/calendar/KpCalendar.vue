<template>
  <div class="calendar">
    <div v-if="mode==='month'" class="calendar-month">
      <kp-month
        :month="firstMonth"
        :year="firstYear"
        :selected="selected"
        @date:selected="onDateSelected"
        show-year
        show-navigation
      />
    </div>
    <div v-if="mode==='quarter'" class="calendar-quarter">
      <div class="calendar-quarter__title">
        <div class="calendar-quarter__arrow" @click="prevQuarter">&#129044;</div>
        <div class="calendar-quarter__title__text">{{quarterTitle}}</div>
        <div class="calendar-quarter__arrow" @click="nextQuarter">&#129046;</div>
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
    <div v-if="mode==='year'" class="calendar-year">
      <div class="calendar-year__title">{{ firstYear }}</div>
      <div class="calendar-year__months">
        <template v-for="m in months" :key="m.index">
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
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import KpMonth from './KpMonth.vue';

function toRoman(num) {
  const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = '';
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

export default {
  name: 'KpCalendar',
  components: { KpMonth },
  props: {
    mode: { type: String, required: false, default: 'quater' }
  },
  data: function() {
    return {
      months: [],
      quarter: 0,
      year: new Date().getFullYear(),
      selected: new Date().toISOString()
    };
  },
  created() {
    this.update();
  },
  computed: {
    firstMonth() {
      const now = moment();
      return this.months ? this.months[0].month : now.month();
    },
    firstYear() {
      const now = moment();
      return this.months ? this.months[0].year : now.year();
    },
    quarterTitle() {
      return `${toRoman(this.quarter + 1)} квартал ${this.year}`;
    }
  },
  methods: {
    onDateSelected(isoDate) {
      this.selected = isoDate;
      this.$emit('date:selected', isoDate);
    },
    update() {
      const now = moment();
      if (this.mode === 'month') {
        this.months = [{
          index: 0,
          month: now.month(),
          year: now.year()
        }];
      } else if (this.mode === 'quarter') {
        const quarter = now.month() / 3;

        for (let i = 0; i < 3; i++) {
          this.months.push({
            index: i,
            month: quarter + i,
            year: now.year()
          });
        }
      } else if (this.mode === 'year') {
        for (let i = 0; i < 12; i++) {
          this.months.push({
            index: i,
            month: i,
            year: now.year()
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.calendar {
  animation-duration: 10ms;
}

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

.calendar-year__title {
  text-align: center;
  font-size: 20px;
  padding: 10px;
  font-weight: bold;
  background: #efefef;
  margin-bottom: 10px;
}

.calendar-year__months {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
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
