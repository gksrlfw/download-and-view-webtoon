import Vue from 'vue';
import Vuex from 'vuex';

import folder from './folder.js';
import viewer from './viewer.js';
import player from './player.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    folder,
    viewer,
    player
  }
});
