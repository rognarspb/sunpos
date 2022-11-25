import { defineStore } from 'pinia';
import moment from 'moment';
import { KpService } from '../services/KpService';
import KpIndexDataSet from '../model/KpIndexDataSet';

export const useStore = defineStore('KpIndexStore', {
  state: () => {
    return {
      kpData: [],
      isLoading: false,
      isLoaded: false,
      error: null
    };
  },
  actions: {
    async getDatasetByDate(dt) {
      if (!dt) {
        throw Error('Dataset date not specified');
      }

      // if (!this.kpData || this.kpData.length == 0){
      //   await this.load();
      // }

      const momentObj = dt ? moment(dt) : moment();
      const [first] = this.kpData.filter(x => momentObj.isSame(x.date, 'day'));
      if (first) {
        return first;
      } else {
        return KpIndexDataSet.Empty(momentObj.toDate());
      }
    },
    async load() {
      try {
        if (this.isLoading === true) {
          // avoid multiple "loading" at the same time
          return;
        }
        this.isLoaded = false;
        this.isLoading = true;
        this.error = null;
        this.kpData = [];

        this.kpDate = this.date;
        this.kpDateData = null;
        this.values = [];

        const service = new KpService();
        this.kpData = await service.fetch();
        this.isLoaded = true;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});