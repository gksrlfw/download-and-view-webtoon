import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  getters: {
    changeMode (state) {
      return state.changeMode;
    }
  },
  state: {
    changeMode: false
  },
  mutations: {
    SET_MODE (state, mode) {
      console.log(mode);
      state.changeMode = mode;
    }
  },
  actions: {

  },
  modules: {
  }
};
