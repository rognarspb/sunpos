import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import moment from 'moment';
import './assets/css/main.css';

moment.locale('ru');

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
