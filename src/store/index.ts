import { createStore } from "vuex";

export default createStore({
  state: {
    accessToken: "",
    refreshToken: "",
    isLoading: true,
    company: {
      id: 1,
      name: "mgm",
    },
    user: {
      username: "",
      email: "",
      gender: "female",
      id: 0,
      role: "seeker",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("Bear")) {
        state.accessToken = String(localStorage.getItem("accessToken"));
        state.user.id = Number(this.$store.state.user.id);
        state.user.role = String(this.$store.state.user.role);
        state.user.username = String(localStorage.getItem("username"));
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
  },
  actions: {},
  modules: {},
});
