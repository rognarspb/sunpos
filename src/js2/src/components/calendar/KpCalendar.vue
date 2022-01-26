<template>
  <div class="calendar">
    <div v-if="mode==='month'" class="calendar-month">
      <kp-month
        :month="firstMonth"
        :year="firstYear"
        :selected="selected"
        @date:selected="onDateSelected"
        show-year
        show-navigation>
      </kp-month>
    </div>
    <div class="calendar-quarter" v-if="mode==='quarter'">
      <template v-for="m in months" :key="m.index">
        <div class="calendar-quarter__month">
          <kp-month
            :month="m.month"
            :year="m.year"
            :selected="selected"
            @date:selected="onDateSelected">
          </kp-month>
        </div>
      </template>
    </div>
    <div class="calendar-year" v-if="mode==='year'">
      <div class="calendar-year__title">{{firstYear}}</div>
      <div class="calendar-year__months">
        <template v-for="m in months" :key="m.index">
          <div class="calendar-year__month">
            <kp-month
              :month="m.month"
              :year="m.year"
              :selected="selected"
              @date:selected="onDateSelected">
            </kp-month>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import KpMonth from './KpMonth.vue';

export default {
  name: 'KpCalendar',
  components: { KpMonth },
  props: {
    mode: { type: String, required: false, default: 'quater' }
  },
  data: function() {
    return {
      months: [],
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
  width: 100%;
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
