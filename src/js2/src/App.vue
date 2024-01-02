<template>
  <div>
    <div>
      <EarthYear/>
    </div>
    <div>
      <!-- <SkyBar /> -->
    </div>
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

<script setup>
import KpIndexSet from './components/KpIndexSet.vue';
import KpCalendar from './components/calendar/KpCalendar.vue';
import KpDatePicker from './components/calendar/KpDatePicker.vue';
import SkyBar from './components/SkyBar.vue';
import EarthYear from './components/EarthYear.vue';

</script>

<style>

</style>
