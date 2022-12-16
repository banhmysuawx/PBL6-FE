import { createStore } from "vuex";

export default createStore({
  state: {
    accessToken: "",
    company: {
      id: 3,
    },
    user: {
      username: "",
      id: 0,
      role: "seeker",
    },
  },
  getters: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("Bear")) {
        state.accessToken = String(localStorage.getItem("accessToken"));
        state.user.id = Number(localStorage.getItem("id"));
        state.user.role = String(localStorage.getItem("role"));
        state.user.username = String(localStorage.getItem("username"));
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {},
  modules: {},
});
