<template>
  <div class="month">
    <div class="title">
      <div v-if="showNavigation" class="title__arrow" @click="prev">
        &#129044;
      </div>
      <div class="title__text" :title="titleTooltip">
        {{ title }}
      </div>
      <div v-if="showNavigation" class="title__arrow" @click="next">
        &#129046;
      </div>
    </div>
    <kp-days
      :start="startDate"
      :finish="finishDate"
      :selected="selected"
      @date:selected="onDateSelected"
    />
  </div>
</template>

<script>
import moment from 'moment';
import KpDays from './KpDays.vue';

export default {
  name: 'KpMonth',
  components: { KpDays },
  props: {
    month: { type: Number, required: false, default: () => new Date().getMonth() },
    year: { type: Number, required: false, default: () => new Date().getFullYear() },
    selected: { type: String, required: false, default: '' },
    showYear: { type: Boolean, required: false, default: false },
    showNavigation: { type: Boolean, required: false, default: false }
  },
  emits: ['date:selected', 'date:changed'],
  data() {
    return {
      dateYear: null,
      dateMonth: null,
      dateDay: 1
    };
  },
  computed: {
    isValid() {
      return (this.dateMonth >= 0 && this.dateMonth < 12 && this.dateYear);
    },
    startDate() {
      if (this.isValid) {
        const dt = new Date(this.dateYear, this.dateMonth, 1, 0, 0, 0);
        return dt.toISOString();
      }
      return '';
    },
    finishDate() {
      if (this.isValid) {
        const dt = new Date(this.dateYear, this.dateMonth, 1, 0, 0, 0);
        return moment(dt).endOf('month').toISOString();
      }
      return '';
    },
    title() {
      if (this.isValid) {
        const dt = new Date(this.year, this.dateMonth, 1);
        const dateFormat = this.showYear ? { month: 'long', year: 'numeric' } : { month: 'long' };
        const monthName = dt.toLocaleString('ru-ru', dateFormat);
        return monthName;
      }
      return '';
    },
    titleTooltip() {
      if (this.isValid) {
        const dt = new Date(this.year, this.dateMonth, 1);
        const monthName = dt.toLocaleString('ru-ru', { month: 'long', year: 'numeric' });
        return monthName;
      }
      return '';
    }
  },
  watch: {
    month() {
      this.update();
    },
    year() {
      this.update();
    }
  },
  created() {
    this.update();
  },
  methods: {
    onDateSelected(isoDate) {
      this.$emit('date:selected', isoDate);
    },
    update() {
      this.dateYear = this.year;
      this.dateMonth = this.month;
    },
    next() {
      if (this.dateMonth >= 11) {
        this.dateMonth = 0;
        this.dateYear++;
      } else {
        this.dateMonth++;
      }
      if (this.isValid) {
        const dt = new Date(this.year, this.dateMonth, 1);
        this.$emit('date:changed', dt.toISOString());
      }
    },
    prev() {
      if (this.dateMonth <= 0) {
        this.dateMonth = 11;
        this.dateYear--;
      } else {
        this.dateMonth--;
      }
      if (this.isValid) {
        const dt = new Date(this.year, this.dateMonth, 1);
        this.$emit('date:changed', dt.toISOString());
      }
    }
  }
};
</script>

<style scoped>
  .month {
    border: 1px solid lightgray;
    padding: 5px 5px 15px 5px;
    border-radius: 4px;
    max-width: 280px;
    height: 240px;
  }
  .title {
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .title__arrow {
    width: 30px;
    text-align: center;
    font-size: 14pt;
    border-radius: 4px;
  }

  .title__arrow:hover {
    cursor: pointer;
    background: #efefef;
  }

  .title__text {
    text-align: center;
    font-weight: bold;
    width: 100%;
  }

  .title__text:hover {
    cursor: pointer;
    color: rgb(255, 75, 62);
  }
</style>
