import axios from "axios";
import store from "../store";

axios.defaults.baseURL = "https://api.quangdinh.me/";

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      // store.commit("setIsLoading", true);
      refresh = true;
      const data = await axios
        .post("/auth/token/refresh", {
          refresh: localStorage.getItem("refresh"),
        })
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.access;
          return response.data;
        });
      if (data.access) {
        await axios
          .get(error.config.url, {
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          })
          .then((response) => {
            const data = response.data;
            const user = {
              id: data.id,
              username: data.username,
              role: data.role,
              avatar: data.avatar,
              email: data.email,
              gender: data.gender,
            };
            store.commit("setUser", user);
            store.commit("setIsLoading", false);
            localStorage.setItem("id", data.id);
            localStorage.setItem("role", data.role);
          });
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
