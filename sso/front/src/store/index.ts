import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    token: ''
  },
  getters: {},
  mutations: {
    setUser(data: any) {
      this.user = data
    },
    setToken(data: any) { 
      this.token = data
    }
  },
  actions: {},
  modules: {},
});
