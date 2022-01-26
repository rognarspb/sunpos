<template>
  <div class="container">
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
      <div v-for="cell in row.cells"
        :key="cell.index"
        class="cell"
        :class="getCellClass(cell)"
        :title="cell.displayDate"
        @click="onSelectDate(cell)"
      >
        <span v-if="!cell.isHidden" class="day">{{cell.day}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'KpDays',
  props: {
    selected: { type: String, required: false },
    start: { type: String, required: false },
    finish: { type: String, required: false },
    readonly: { type: Boolean, required: false, default: false }
  },
  data: function() {
    return {
      rows: [],
      cells: [],
      startDay: null,
      finishDay: null,
      selectedDay: null
    };
  },
  created() {
    this.update();
  },
  watch: {
    start() {
      this.update();
    },
    finish() {
      this.update();
    },
    selected(newVal) {
      this.updateSelected();
    }
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
      if (column.isSelected) {
        classNames.push('cell-selected');
      }
      return classNames.join(' ');
    },
    onSelectDate(cell) {
      // do not handle empty cells:
      if (cell.isHidden) {
        return;
      }

      if (this.selectedDay === cell.isoDate && cell.isSelected) {
        // do nothing:
        return;
      }

      this.selectedDay = cell.isoDate;
      cell.isSelected = true;

      // unselect others:
      this.cells.forEach((x) => {
        if (x !== cell) {
          x.isSelected = false;
        }
      });

      this.$emit('date:selected', cell.isoDate);
    },
    updateSelected() {
      const selectedDay = this.selected && moment(this.selected).isValid()
        ? moment(this.selected).startOf('day')
        : null;

      this.cells.forEach((x) => {
        const dt = moment(x.isoDate);
        x.isSelected = selectedDay && selectedDay.isSame(dt.startOf('day'));
      });
    },
    update() {
      this.startDay = moment(this.start);
      this.finishDay = moment(this.finish);

      const rows = [];
      const cells = [];
      const selectedDay = this.selected && moment(this.selected).isValid()
        ? moment(this.selected).startOf('day')
        : null;

      let rowIndex = 0;
      let dt = moment(this.startDay).isoWeekday(1);
      let row = null;

      while (dt.isSameOrBefore(this.finishDay)) {
        row = {
          index: rowIndex++,
          weekIndex: dt.week(),
          cells: []
        };
        rows.push(row);

        if (rowIndex > 6) {
          break;
        }

        for (let cellIndex = 0; cellIndex < 7; cellIndex++) {
          // set day properties
          const cell = {
            index: cellIndex,
            day: dt.date(),
            isWorkDay: dt.isoWeekday() >= 1 && dt.isoWeekday() < 6,
            isDayOff: false,
            isoDate: dt.toISOString(),
            displayDate: dt.format('DD.MM.YYYY'),
            isHidden: dt.isBefore(this.startDay) || dt.isAfter(this.finishDay),
            isToday: moment().startOf('day').isSame(dt.startOf('day')),
            isSelected: selectedDay && selectedDay.isSame(dt.startOf('day'))
          };
          row.cells.push(cell);
          cells.push(cell);
          dt = dt.add(1, 'day');
        }
      }
      this.rows = rows;
      this.cells = cells;
    }
  }
};
</script>

<style>
  .container {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11pt;
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
    text-decoration: underline;
  }

  .cell-today:hover {
    text-decoration: underline;
  }

  .cell-selected {
    background: rgb(76, 130, 175);
    border-color: rgb(76, 130, 175);
    color: whitesmoke;
  }

  .cell-selected:hover {
    background: rgb(86, 137, 179);
    color: white;
  }

  .cell-weekend {
    color: rgb(218, 63, 63);
  }
</style>
