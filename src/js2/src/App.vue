<template>
  <div>
    <!-- <h4>Выбор даты</h4>
    <KpDatePicker />
    <h4>Режим: квартал</h4>
    <div style="margin-top: 20px;">
      <KpCalendar mode="quarter" />
    </div>
    <h4>Режим: месяц</h4>
    <div style="margin-top: 20px;">
      <KpCalendar mode="month" />
    </div>
    <h4>Режим: год</h4>
    <div style="margin-top: 20px;">
      <KpCalendar mode="year" />
    </div> -->
    <div>
      <KpIndexSet />
    </div>
  </div>
</template>

<script>
import KpIndexSet from './components/KpIndexSet.vue';
import KpCalendar from './components/calendar/KpCalendar.vue';
import KpDatePicker from './components/calendar/KpDatePicker.vue';

export default {
  name: 'App',
  components: {
    KpIndexSet,
    // KpCalendar,
    // KpDatePicker
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
