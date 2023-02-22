//vue
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip'
import VueSimpleAlert from "vue-simple-alert";
import vmodal from 'vue-js-modal'
import VueSession from 'vue-session'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//vuex
import store from './@core/store/store';

//styles
import 'bootstrap';
import Popover from 'vue-js-popover'
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeartbeat,
  faHandHoldingWater, 
  faFistRaised, 
  faShieldAlt, 
  faRunning, 
  faHeadSideVirus, 
  faUserShield,
  faHandRock,
  faMagic,
  faTasks,
  faExchangeAlt,
  faCheck,
  faTrashAlt,
  faSyncAlt,
  faLock,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//component
import App from './App.vue';
import GameHeader from './@core/component/GameHeader';
import AdditionalAttributeLabel from './@core/component/AdditionalAttributeLabel';

//routes
import router from './routes/routes.js';

//filter
import './@core/filters';


export const gameBus = new Vue();

library.add(
  faHeartbeat,
  faHandHoldingWater,
  faFistRaised,
  faShieldAlt,
  faRunning,
  faHeadSideVirus,
  faUserShield,
  faHandRock,
  faMagic,
  faTasks,
  faExchangeAlt,
  faCheck,
  faTrashAlt,
  faSyncAlt,
  faLock,
  faSignInAlt
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSession);
Vue.use(Popover, { tooltip: true })
Vue.config.productionTip = false;
Vue.use(vmodal);
Vue.use(VTooltip);
Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueSimpleAlert);
Vue.component('game-header', GameHeader);
Vue.component('additional-attribute', AdditionalAttributeLabel);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
