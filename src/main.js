import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from "./routes";
import { BootstrapVue } from 'bootstrap-vue';
import { store } from "./store/TournamentStore"

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router: new VueRouter({ routes, mode: 'history' }),
  store
}).$mount('#app')


// allo 