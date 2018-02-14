// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto' //check if this needs to be included in webpack??

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import VuexStore from './vuex/store';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);

const store = new Vuex.Store(VuexStore);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  template: '<App/>',
  components: { App }
})
