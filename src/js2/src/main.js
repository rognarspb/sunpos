import { createApp } from 'vue';
import App from './App.vue';
import VueTimers from 'vue-timers';

const app = createApp(App);
app.mount('#app');
app.use(VueTimers);
