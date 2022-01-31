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
    <div
      v-for="row in rows"
      :key="row.index"
      class="row"
    >
      <div class="week">
        {{ row.weekIndex }}
      </div>
      <div
        v-for="cell in row.cells"
        :key="cell.index"
        class="cell"
        :class="getCellClass(cell)"
        :title="cell.displayDate"
        @click="onSelectDate(cell)"
      >
        <span v-if="!cell.isHidden" class="day">{{ cell.day }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import moment from 'moment';
  import { ref, toRefs, watch } from 'vue';

  const name = 'KpDays';
  const props = defineProps({
    selected: { type: String, required: false, default: '' },
    start: { type: String, required: false, default: '' },
    finish: { type: String, required: false, default: '' },
    readonly: { type: Boolean, required: false, default: false }
  });

  const emit = defineEmits(['date:selected']);

  const rows = ref([]);
  const cells = ref([]);
  const startDay = ref(null);
  const finishDay = ref(null);
  const selectedDay = ref(null);

  const update = () => {
    startDay.value = moment(props.start);
    finishDay.value = moment(props.finish);

    const updatedRows = [];
    const updatedCells = [];
    const selectedDay = props.selected && moment(props.selected).isValid()
      ? moment(props.selected).startOf('day')
      : null;

    let rowIndex = 0;
    let dt = moment(startDay.value).isoWeekday(1);
    let row = null;

    while (dt.isSameOrBefore(finishDay.value)) {
      row = {
        index: rowIndex++,
        weekIndex: dt.week(),
        cells: []
      };
      updatedRows.push(row);

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
          isHidden: dt.isBefore(startDay.value) || dt.isAfter(finishDay.value),
          isToday: moment().startOf('day').isSame(dt.startOf('day')),
          isSelected: selectedDay && selectedDay.isSame(dt.startOf('day'))
        };
        row.cells.push(cell);
        updatedCells.push(cell);
        dt = dt.add(1, 'day');
      }
    }
    rows.value = updatedRows;
    cells.value = updatedCells;
  };

  const getCellClass = (column) => {
    const classNames = ['cell'];
    if (column.isToday) {
      classNames.push('cell-today');
    }
    if (!column.isWorkDay) {
      classNames.push('cell-weekend');
    }
    if (column.isSelected && !column.isHidden) {
      classNames.push('cell-selected');
    }
    return classNames.join(' ');
  };

  const onSelectDate = (cell) => {
    // do not handle empty cells:
    if (cell.isHidden) {
      return;
    }

    if (selectedDay.value === cell.isoDate && cell.isSelected) {
      // do nothing:
      return;
    }

    selectedDay.value = cell.isoDate;
    cell.isSelected = true;

    // unselect others:
    cells.value.forEach((x) => {
      if (x !== cell) {
        x.isSelected = false;
      }
    });

    emit('date:selected', cell.isoDate);
  };

  const updateSelected = () => {
    const selectedDay = props.selected && moment(props.selected).isValid()
      ? moment(props.selected).startOf('day')
      : null;

    cells.value.forEach((x) => {
      const dt = moment(x.isoDate);
      x.isSelected = selectedDay && selectedDay.isSame(dt.startOf('day'));
    });
  };

  watch(() => props.start, () => { update(); });
  watch(() => props.finish, () => { update(); });
  watch(() => props.selected, () => { updateSelected(); });
  // watch(start, () => {
  //   update();
  // });
  // watch(finish, () => {
  //   update();
  // });
  // watch(selected, () => {
  //   updateSelected();
  // });

  // update on created:
  update();
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
