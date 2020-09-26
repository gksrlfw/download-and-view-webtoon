import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  getters: {
    dirs (state) {
      return state.dirs;
    },
    folder (state) {
      return state.folder;
    }
  },
  state: {
    dirs: [],
    folder: []
  },
  mutations: {
    SET_ITEM (state, folder) {
      console.log(folder);
      state.folder = folder;
    }
  },
  actions: {

  },
  modules: {
  }
};
