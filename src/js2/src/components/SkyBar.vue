<template>
  <div class="skybar">
    <template v-for="bar in bars" :key="bar.id">
      <div class="skybar__rect" :style="getBarStyle(bar)">
        {{ bar.name }}
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  minWidth: { type: Number, required: false, default: null }
});

const bars = [
  { id: 0, name: 'Ночь' },
  { id: 1, name: 'Астрономические сумерки (утро)' },
  { id: 2, name: 'Навигационные сумерки (утро)' },
  { id: 3, name: 'Гражданские сумерки (утро)' },
  { id: 4, name: 'День', fit: '*' },
  { id: 5, name: 'Гражданские сумерки (вечер)' },
  { id: 6, name: 'Навигационные сумерки (вечер)' },
  { id: 7, name: 'Астрономические сумерки' },
  { id: 8, name: 'Ночь' }
];


const getBarStyle = (bar) => {
  const posX = bar.id - bars.length/2;
  const maxHeightPercent = 16;
  const posPercent = 100*((posX*posX)/maxHeightPercent);
  const gradValue = `linear-gradient(0deg, rgb(0, 56, 177) 0%, rgba(16,135,201,1) ${posPercent}%, rgba(0, 213, 255, 0) 100%)`;
  return {
    flex: bar.id == 4 ? '1 1 auto' : '',
    background: gradValue,
  };
};

</script>

<style scoped>
.skybar {
  min-height: 200px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
}

.skybar__rect {
  min-width: 50px;
  background: rgb(127, 169, 216);
  transform: rotate(-180deg);
  writing-mode: tb-rl;
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.skybar__rect:hover {
  background: rgb(140, 182, 230)!important;
}
</style>