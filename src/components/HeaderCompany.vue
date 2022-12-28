<template>
  <div class="header-component">
    <div class="logo">
      <router-link :to="{ name: 'home' }"
        ><img src="../assets/logo2.png" alt=""
      /></router-link>
    </div>
    <div class="header-left">
      <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-sub-menu key="all-jobs">
          <template #title>All Jobs</template>
          <a-sub-menu key="sub-skill" title="Job by Skill">
            <router-link
              v-for="skill in skills"
              :to="{
                name: 'jobview',
                query: { skill: skill.name },
              }"
            >
              <a-menu-item v-bind:key="skill.name">{{
                skill.name
              }}</a-menu-item>
            </router-link>
          </a-sub-menu>
          <a-sub-menu key="sub-company" title="Job by Company">
            <router-link
              v-for="company in companies"
              :to="{
                name: 'jobview',
                query: { company: company.company_name },
              }"
            >
              <a-menu-item v-bind:key="company.company_name">
                {{ company.company_name }}
              </a-menu-item>
            </router-link>
          </a-sub-menu>
        </a-sub-menu>
        <a-menu-item key="list-company">
          <router-link :to="{ name: 'list-company' }">
            <span>Company</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub-history" v-if="userId">
          <template #title>History</template>

          <router-link :to="{ name: 'appliedJob' }">
            <a-menu-item key="appliedJob">Applied Job</a-menu-item>
          </router-link>
          <router-link :to="{ name: 'favoriteJob' }">
            <a-menu-item key="favoriteJob">Favorite Job</a-menu-item>
          </router-link>
        </a-sub-menu>

        <a-menu-item key="JobBoard" v-if="role && role != 'seeker'">
          <router-link :to="{ name: 'JobBoard' }">
            <span>Sign to Company</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="header-right">
      <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-sub-menu key="username" v-bind:title="username" v-if="userId">
          <template #icon>
            <a-avatar v-bind:src="avatar" />
          </template>
          <a-menu-item key="profile">
            <router-link :to="{ name: 'profile' }">
              <span> Profile </span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="favoriteJob">Favorite Job</a-menu-item>
          <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="login" v-else @click="login">Login</a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  CaretDownFilled,
  UserOutlined,
  BellFilled,
  MessageFilled,
} from "@ant-design/icons-vue";
import axios from "axios";
export default defineComponent({
  name: "HeaderComponentView",
  data() {
    return {
      skills: [],
      categories: [],
      companies: [],
      routeSkill: [],
      userId: this.$store.state.user.id,
      role: this.$store.state.user.role,
      username: this.$store.state.user.username,
      avatar: this.$store.state.user.avatar,
    };
  },
  components: {
    CaretDownFilled,
    UserOutlined,
    BellFilled,
    MessageFilled,
  },
  mounted() {
    console.log(this.userId);
    this.getInfoJob();
  },
  methods: {
    async getInfoJob() {
      const categoryPromise = axios.get("jobs/categories").then((response) => {
        this.categories = response.data.results;
      });
      const skillPromise = axios.get("jobs/skills").then((response) => {
        this.skills = response.data.results;
      });
      const companyPromise = axios
        .get("companies/companies")
        .then((response) => {
          this.companies = response.data.results;
        });
      await Promise.all([skillPromise, categoryPromise, companyPromise]);
    },
    async logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      this.$router.push("/login");
    },
    async login() {
      this.$router.push("/login");
    },
  },
});
</script>
<style>
.flex-grow {
  flex-grow: 1;
}
.header-component {
  width: 100%;
  background: #007082;
  display: flex;
  /* justify-content: space-between;
  padding: 0;
  padding-right: 20px; */
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem !important;
}
.header-component .logo img {
  max-width: 150px;
  filter: brightness(0) invert(1);
}
.flex-grow {
  flex-grow: 1;
}
.header-component {
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
}
.header-component .ant-layout-header {
  background: #007082;
  display: flex;
}
.header-component .ant-menu {
  background: #007082;
}
.header-component .ant-menu-horizontal {
  border-bottom: 0px;
}
.header-component .ant-layout-header {
  padding: 0 24px !important;
}
.header-component
  li.ant-menu-overflow-item.ant-menu-item.ant-menu-item-only-child {
  padding: 0 20px !important;
}
.header-component .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
  padding: 0 7px !important;
}
.header-component
  ul.ant-menu-overflow.ant-menu.ant-menu-root.ant-menu-horizontal.ant-menu-light {
  font-size: 20px;
  font-family: "Roboto Condensed", sans-serif;
  color: white;
  font-weight: 400;
  margin-left: 1.4rem;
}
.header-right .name {
  padding-right: 10px;
}
.header-right span.anticon {
  font-size: 20px;
}
.header-component .ant-menu-horizontal > .ant-menu-item a {
  color: white;
}
.header-right
  span.ant-menu-item-icon.ant-avatar.ant-avatar-circle.ant-avatar-image {
  background: white;
}
</style>
