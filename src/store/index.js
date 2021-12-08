import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 3,
    token: localStorage.getItem('token'),
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setToken(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    deleteToken(state) {
      localStorage.removeItem('token');
      state.token = undefined;
    },
  },
  actions: {

  },
  modules: {},
});
