import { createStore } from "vuex";

export default createStore({
  state: {
    user: {}
  },
  getters: {},
  mutations: {
    setUser(data: any) {
      this.user = data
    }
  },
  actions: {},
  modules: {},
});
