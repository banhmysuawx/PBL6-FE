<template>
  <div class="header-component">
    <a-layout-header class="header">
      <div class="logo">
        <router-link :to="{ name: 'home' }"
          ><img src="../assets/logo2.png" alt=""
        /></router-link>
      </div>
      <div class="header-left">
        <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-sub-menu key="sub1">
            <template #title>All Jobs</template>
            <a-sub-menu key="all-jobs" title="Job by Skill">
              <router-link
                v-for="skill in skills"
                :to="{ name: 'jobview', params: { name: skill.name } }"
              >
                <a-menu-item v-bind:key="skill.name">{{
                  skill.name
                }}</a-menu-item>
              </router-link>
            </a-sub-menu>
            <a-sub-menu key="sub3-4" title="Job by Category">
              <router-link
                v-for="category in categories"
                :to="{ name: 'jobview', params: { name: category.name } }"
              >
                <a-menu-item v-bind:key="category.name">
                  {{ category.name }}
                </a-menu-item>
              </router-link>
            </a-sub-menu>
            <a-sub-menu key="sub5-6" title="Job by Company">
              <router-link
                v-for="company in companies"
                :to="{
                  name: 'jobview',
                  params: { name: company.company_name },
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
          <a-menu-item key="appliedJob">
            <router-link :to="{ name: 'appliedJob' }">
              <span> History </span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="header-right">
        <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="0">
            <MessageFilled />
          </a-menu-item>
          <a-menu-item key="1">
            <BellFilled />
          </a-menu-item>
          <a-sub-menu key="sub1-2" title="Tuyet Nguyen">
            <template #icon>
              <a-avatar size="{{50}}">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </template>
            <a-menu-item key="profile">
              <router-link :to="{ name: 'profile' }">
                <span> Profile </span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">Favorite Job</a-menu-item>
            <a-menu-item key="3">Logout</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-layout-header>
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
  name: "Header",
  data() {
    return {
      skills: [],
      categories: [],
      companies: [],
      routeSkill: [],
    };
  },
  components: {
    CaretDownFilled,
    UserOutlined,
    BellFilled,
    MessageFilled,
  },
  mounted() {
    this.getInfoJob();
  },
  methods: {
    async getInfoJob() {
      const categoryPromise = axios
        .get("https://api.quangdinh.me/jobs/categories")
        .then((response) => {
          this.categories = response.data.results;
        });
      const skillPromise = axios
        .get("https://api.quangdinh.me/jobs/skills")
        .then((response) => {
          this.skills = response.data.results;
        });
      const companyPromise = axios
        .get("https://api.quangdinh.me/companies/companies")
        .then((response) => {
          this.companies = response.data.results;
        });
      await Promise.all([skillPromise, categoryPromise, companyPromise]);
    },
  },
});
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem !important;
}
.logo img {
  max-width: 150px;
  filter: brightness(0) invert(1);
}
.flex-grow {
  flex-grow: 1;
}
.header-component header.ant-layout-header.header {
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
  padding: 0 5px !important;
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
.header-right {
  margin-left: 35%;
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
</style>
