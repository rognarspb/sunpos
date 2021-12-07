<template>
  <div class="kp-index">
    <div class="kp-index__header">{{dateText}}</div>
    <div v-if="isLoading">Загрузка данных...</div>
    <div v-if="!isLoading && error" class="kp-index__panel">
      <svg width="100%" height="400" viewBox="-40 0 480 440">
        <rect fill="#efefef"  :width="480" :height="440" :x="0" :y="0"></rect>
      </svg>
    </div>
    <div class="kp-index__error" v-if="error">
      <strong>Ошибка:</strong> {{error}}
    </div>
    <div v-if="!isLoading && !error" class="kp-index__panel">
      <svg width="100%" height="400" viewBox="-40 0 480 440">
        <template v-for="(item, index) in values" :key="index">
          <value-bar :x="index*50" y="20" :value="item.value"/>
          <text :style="textStyle" :x="index*50" :y="400">{{item.periodStart}}</text>
        </template>
      </svg>
    </div>
    <div v-if="showData">
      <div>Данные:</div>
      <pre>{{formattedData}}</pre>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { KpService } from '../services/KpService';
import ValueBar from './ValueBar.vue';

export default {
  name: 'KpIndex',
  components: {
    ValueBar
  },
  props: {
    date: { type: [Date, String], required: false, default: null },
    fontSize: { type: [Number, String], required: false, default: 18 },
    fontFamily: { type: String, required: false, default: 'Monospace' }
  },
  data: function() {
    return {
      kpData: null,
      kpDataSet: null,
      kpDate: null,
      values: [],
      error: null,
      isLoading: false,
      showData: false
    };
  },
  computed: {
    formattedData() {
      return this.kpDataSet ? JSON.stringify(this.kpDataSet, null, 2) : '';
    },
    textStyle() {
      const style = {
        'font-family': this.fontFamily,
        'font-size': this.fontSize + 'px'
      };
      return style;
    },
    dateText() {
      return this.kpDate ? moment(this.kpDate).format('DD.MM.YYYY') : 'Нет данных';
    }
  },
  async created() {
    try {
      this.isLoading = true;
      this.kpDate = this.date;
      this.kpDateData = null;
      this.values = [];

      const service = new KpService();
      this.kpData = await service.fetch();
      const kpDataSet = service.findDate(this.date);
      if (kpDataSet) {
        this.kpDataSet = kpDataSet;
        this.values = kpDataSet.estimated.values;
        this.kpDate = kpDataSet.date;
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }
};

</script>
<style scoped>
.kp-index__panel {
  background: #f0f0f0;
  margin: 15px;
  border: 1px gray;
}
.kp-index__header {
  font-size: 18pt;
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
