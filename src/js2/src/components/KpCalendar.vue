<template>
  <div class="calendar">
    <div class="weekdays">
      <div>ПН</div>
      <div>ВТ</div>
      <div>СР</div>
      <div>ЧТ</div>
      <div>ПТ</div>
      <div>СБ</div>
      <div>ВС</div>
    </div>
    <div v-for="row in rows" :key="row.index" class="row">
      <div class="week">{{row.weekIndex}}</div>
      <div v-for="column in row.columns"
        :key="column.index"
        class="cell"
        :class="getCellClass(column)"
        :title="column.isoDate"
      >
        <span v-if="!column.isHidden" class="day">{{column.day}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'KpCalendar',
  props: {
    start: { type: String, required: false },
    finish: { type: String, required: false }
  },
  data: function() {
    return {
      rows: [],
      startDay: null,
      finishDay: null
    };
  },
  created() {
    this.startDay = moment(this.start);
    this.finishDay = moment(this.finish);
    this.update();
  },
  methods: {
    getCellClass(column) {
      const classNames = ['cell'];
      if (column.isToday) {
        classNames.push('cell-today');
      }
      if (!column.isWorkDay) {
        classNames.push('cell-weekend');
      }
      return classNames.join(' ');
    },
    update() {
      const rows = [];

      let rowIndex = 0;
      let dt = moment(this.startDay).isoWeekday(1);
      let row = null;

      while (dt.isSameOrBefore(this.finishDay)) {
        row = {
          index: rowIndex++,
          weekIndex: dt.week(),
          columns: []
        };
        rows.push(row);

        if (rowIndex > 6) {
          break;
        }

        for (let cellIndex = 0; cellIndex < 7; cellIndex++) {
          // set day properties
          const column = {
            index: cellIndex,
            day: dt.date(),
            isWorkDay: dt.isoWeekday() >= 1 && dt.isoWeekday() < 6,
            isDayOff: false,
            isoDate: dt.toISOString(),
            isHidden: dt.isBefore(this.startDay) || dt.isAfter(this.finishDay),
            isToday: moment().startOf('day').isSame(dt.startOf('day'))
          };
          row.columns.push(column);
          dt = dt.add(1, 'day');
        }
      }
      this.rows = rows;
    }
  }
};
</script>

<style>
  .calendar {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11pt;
    border: 1px solid lightgray;
    padding: 5px 5px 15px 5px;
    border-radius: 4px;
    max-width: 280px;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .weekdays {
    margin-bottom: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 33px;
  }

  .weekdays > div {
    width: 33px;
    height: 20px;
    color: rgb(160, 160, 160);
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: 9pt;
  }

  .week {
    padding: 3px;
    font-size: 6pt;
    color: gray;
    width: 25px;
    text-align: center;
  }

  .cell{
    background: white;
    border: 1px solid #efefef;
    padding: 3px;
    font-weight: bold;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .cell:hover {
    background: #efefef;
    cursor: pointer;
  }

  .cell-today {
    background: steelblue;
    border-color: steelblue;
    color: whitesmoke;
  }

  .cell-today:hover {
    background: rgb(79, 135, 180);
    color: white;
  }

  .cell-weekend {
    color: rgb(218, 63, 63);
  }
</style>
