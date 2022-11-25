<template>
  <div class="kp-index">
    <div class="kp-index__header">
      {{ dateText }}
    </div>
    <div v-if="isLoading" class="kp-index__panel">
      <svg width="100%" height="400" viewBox="-40 0 480 440">
        <text
          x="120"
          y="220"
          font-family="Monospace"
          font-size="16"
        >
          Загрузка данных...
        </text>
      </svg>
    </div>
    <div v-if="!isLoading && error" class="kp-index__panel">
      <svg width="100%" height="400" viewBox="-40 0 480 440">
        <rect
          fill="#efefef"
          :width="480"
          :height="440"
          :x="0"
          :y="0"
        />
      </svg>
    </div>
    <div v-if="error" class="kp-index__error">
      <strong>Ошибка:</strong> {{ error }}
    </div>
    <div v-if="!isLoading && !error" class="kp-index__panel">
      <svg width="100%" height="400" viewBox="-40 0 480 440">
        <template v-for="(item, index) in values" :key="index">
          <ValueBar :x="index * 50" y="20" :value="item.value" />
          <text :style="textStyle" :x="index * 50" :y="400">
            {{ item.periodStart.toString().padStart(2, '0') + ':00' }}
          </text>
        </template>
      </svg>
    </div>
    <div v-if="showData">
      <div>Данные:</div>
      <pre>{{ formattedData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import { useStore } from '../stores/KpIndexStore';
import ValueBar from './ValueBar.vue';

const props = defineProps({
  date: { type: [Date, String], required: false, default: null },
  name: { type: String, required: false, default: 'Estimated' },
  fontSize: { type: [Number, String], required: false, default: 12 },
  fontFamily: { type: String, required: false, default: 'Roboto Mono' }
});

const store = useStore();

const kpDataSet = ref();
const kpDate = ref(null);
const values = ref([]);
const showData = ref(false);

const { isLoading, isLoaded, error } = storeToRefs(store);

const formattedData = computed(() => {
  return kpDataSet.value ? JSON.stringify(kpDataSet.value, null, 2) : '';
});


const textStyle = computed(() => {
  const style = {
    'font-family': props.fontFamily,
    'font-size': props.fontSize + 'px'
  };
  return style;
});

const dateText = computed(() => {
  return kpDate.value
    ? moment(props.date).format('DD MMMM YYYY')
    : 'Нет данных';
});


watch(() => props.name, () => {
  load();
});

watch(() => props.date, () => {
  console.log(`Date changed to: ${props.date}`);
  load();
});

watch(isLoaded, () => {
  load();
});


const load = async() => {
  if (!props.date || !props.name) {
    return;
  }

  values.value = [];
  kpDate.value = undefined;

  kpDataSet.value = await store.getDatasetByDate(props.date);
  if (kpDataSet.value) {
    values.value = kpDataSet.value.getByName(props.name).values;
    kpDate.value = kpDataSet.value.date;
  }
};

// load data on created:
load();
</script>

<style scoped>
.kp-index__panel {
  background: #f0f0f0;
  margin: 15px;
  border: 1px gray;
}

.kp-index__header {
  font-size: 16pt;
  text-align: center;
}

.kp-index__error {
  padding: 20px;
  margin: 10px;
  background: lightcoral;
  color: whitesmoke;
  font-size: 10pt;
}
</style>
