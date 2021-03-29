import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'


import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  './assets/bootstrap.them.scss';

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(PerfectScrollbar)

Vue.config.productionTip = false

router.afterEach(() => {
  window.scrollTo(0,0);
});

Vue.filter("currency", function(item) {
  const n = Number(item);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => {

    const currency =
      i && c !== "." && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, "")
        : c;
    return currency;
  })}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
