import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'

// bootstrap extensions:
Vue.use(BootstrapVue);

// vue localization:
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ru',
  messages: {
    en: {
    },
    ru: {
    }
  }
})

new Vue({
  i18n,
  el: '#app',
  render: h => h(App)
})
