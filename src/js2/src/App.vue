<template>
  <div>
    <h4>Режим: квартал</h4>
    <div style="margin-top: 20px;">
      <kp-calendar mode="quarter"></kp-calendar>
    </div>
    <h4>Режим: месяц</h4>
    <div style="margin-top: 20px;">
      <kp-calendar mode="month"></kp-calendar>
    </div>
    <h4>Режим: год</h4>
    <div style="margin-top: 20px;">
      <kp-calendar mode="year"></kp-calendar>
    </div>
    <div>
      <KpIndexSet/>
    </div>
  </div>
</template>

<script>
import KpIndexSet from './components/KpIndexSet.vue';
import KpCalendar from './components/calendar/KpCalendar.vue';

export default {
  name: 'App',
  components: {
    KpIndexSet,
    KpCalendar
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
