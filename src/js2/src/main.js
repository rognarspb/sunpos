import { createApp } from 'vue';
import App from './App.vue';
import moment from 'moment';
import VCalendar from 'v-calendar';

moment.locale('ru');

const app = createApp(App);
app.use(VCalendar);
app.mount('#app');
