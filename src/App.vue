<template>
  <router-view v-if="!isLoading" />
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import { mapGetters } from "vuex";
import { onMounted } from "vue";
import axios from "axios";
import store from "./store";
export default {
  data() {
    return {
      is_company: true,
    };
  },
  setup() {
    onMounted(async () => {
      if (localStorage.getItem("refresh")) {
        const user = await axios
          .get("auth/me")
          .then((response) => {
            const data = response.data;
            const user = {
              id: data.id,
              username: data.username,
              role: data.role,
              avatar: data.avatar,
            };
            this.$store.commit("setUser", user);
            localStorage.setItem("id", user.id);
            localStorage.setItem("username", user.username);
            localStorage.setItem("role", user.role);
          })
          .catch((error) => error);
      } else store.commit("setIsLoading", false);
    });
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  watch: {
    isLoading(newVal, oldVal) {
      console.log(newVal);
      this.isLoading = newVal;
    },
  },
  components: {
    SideBar,
    HeaderCompanyView,
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
