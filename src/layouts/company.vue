<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout
        style="
          flex-direction: unset;
          position: fixed;
          height: 100%;
          width: 100%;
        "
      >
        <div class="layout-sider">
          <a-layout-sider style="background: #fff" :trigger="null" collapsible>
            <a-menu
              theme="dark"
              mode="inline"
              :style="{ height: '100%', borderRight: 0 }"
              v-model:openKeys="openKeys"
              v-model:selectedKeys="selectedKeys"
              v-model:defaultSelectedKeys="selectedKeys"
            >
              <a-menu-item
                style="
                  min-height: 80px;
                  padding-top: 0.3rem !important;
                  border-bottom: 1px solid #e9e9e9;
                "
              >
                <div class="layout-user">
                  <UserOutlined />
                  <div class="layout-account">
                    <span class="user-name"
                      ><a href="">{{ username }}</a></span
                    >
                    <span class="user-role">Employer</span>
                    <span class="user-role user-company">{{ name }}</span>
                  </div>
                </div>
              </a-menu-item>

              <a-menu-item key="company-dashboard">
                <router-link :to="{ name: 'company-dashboard' }">
                  <HomeOutlined />
                  <span>Dashboard</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="JobBoard">
                <router-link :to="{ name: 'JobBoard' }">
                  <TeamOutlined />
                  <span>Job Board</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="company-job">
                <router-link :to="{ name: 'company-job' }">
                  <FileSearchOutlined />
                  <span>Job Management</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="company-location">
                <router-link :to="{ name: 'company-location' }">
                  <FileTextOutlined />
                  <span>Location Management</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="Interview">
                <router-link :to="{ name: 'Interview' }">
                  <FileTextOutlined />
                  <span>Interview Calendar</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="Candidate">
                <router-link :to="{ name: 'Candidate' }">
                  <FileTextOutlined />
                  <span>Candidate Management</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="company-quizz">
                <router-link :to="{ name: 'company-quizz' }">
                  <FileTextOutlined />
                  <span>Test Management</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="company-information">
                <router-link :to="{ name: 'company-information' }">
                  <FileTextOutlined />
                  <span>Information</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="home">
                <router-link :to="{ name: 'home' }">
                  <FileTextOutlined />
                  <span>User View</span>
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-layout-sider>
        </div>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts">
import Header from "./header.vue";
import "ant-design-vue/dist/antd.css";
import { storeToRefs } from "pinia";
import { useMenu } from "../store/use-menu";
import { defineComponent } from "vue";
import store from "../store";
import {
  UserOutlined,
  HomeOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
  MailOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  WifiOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "company",
  components: {
    Header,
    UserOutlined,
    HomeOutlined,
    MenuOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    CalendarOutlined,
    SettingOutlined,
    MailOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    WifiOutlined,
  },
  setup() {
    const storeMenu = useMenu();
    console.log(storeMenu.selectedKeys);

    return {
      name: store.state.company.name,
      username: store.state.user.username,
      ...storeToRefs(storeMenu),
    };
  },
});
</script>

<style scoped>
main.ant-layout-content,
.layout-sider {
  position: relative;
  top: 64px;
  background-color: rgb(48, 65, 86);
}
.layout-sider ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark {
  background-color: rgb(48, 65, 86);
}
main.ant-layout-content {
  background-color: white;
}
.layout-sider {
  margin-right: 20px;
}
section.ant-layout.ant-layout-has-sider {
  min-height: 700px;
}
.site-layout-background {
  background: #fff;
}

/* aside.ant-layout-sider.ant-layout-sider-dark {
  width: 100% !important;
  flex: 0 0 260px;
  max-width: 260px !important;
  min-width: 260px !important;
  height: 100%;
  display: flex;
} */
/* aside.ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-collapsed {
  flex: 0 0 100px !important;
  max-width: 100px !important;
  min-width: 100px !important;
} */
.ant-menu.ant-menu-inline-collapsed .layout-user li.ant-menu-item {
  left: 0;
  padding: 0 calc(50% - 16px / 2);
  text-overflow: clip;
}
.ant-menu.ant-menu-inline-collapsed li.ant-menu-item .layout-account {
  display: none;
}
ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light {
  background: rgb(48, 65, 86);
}
/* .ant-layout-sider {
  position: fixed;
} */
.ant-layout-sider-children {
  width: 100%;
}
.layout-sider
  ul.ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-inline-collapsed {
  width: fit-content !important;
  max-width: 80px !important;
}
.layout-sider aside.ant-layout-sider.ant-layout-sider-dark {
  width: fit-content !important;
  max-width: 300px !important;
  height: 100%;
  display: flex;
}
.layout-user {
  display: flex;
}
.layout-user li.ant-menu-item,
.layout-user span.ant-menu-title-content {
  min-height: 64px;
  padding-top: 0.3rem !important;
  border-bottom: 1px solid #e9e9e9;
}

.layout-user span.anticon.anticon-user {
  margin-right: 15px;
}
hr {
  border-top: 1px solid #e9e9e9;
}
.layout-account {
  padding: 12px 0;
}
.ant-menu-inline.ant-menu-root .ant-menu-item {
  background: red;
}
.layout-account span.user-name {
  line-height: 17px;
  display: block;
}
.layout-account a {
  font-weight: 550;
  color: white !important;
}
.layout-account span.user-role {
  line-height: 17px;
  font-size: 12px;
  display: block;
}
.layout-account span.user-role.user-company {
  color: rgb(188, 71, 108);
  font-weight: 550;
}
.home .ant-menu-item a {
  color: white !important;
}
.layout-sider .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: rgb(134, 143, 154) !important;
}
</style>
