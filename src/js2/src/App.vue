<template>
  <div>
    <div style="padding: 20px;">
      <kp-calendar start="2022-01-01" finish="2022-01-31" ></kp-calendar>
    </div>
    <div>
      <KpIndexSet/>
    </div>
  </div>
</template>

<script>
import KpIndexSet from './components/KpIndexSet.vue';
import KpCalendar from './components/KpCalendar.vue';

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
