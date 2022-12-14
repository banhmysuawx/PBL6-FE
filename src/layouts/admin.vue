<template>
  <a-layout>
    <Header />
    <a-layout :style="style">
      <div class="layout-sider">
        <a-layout-sider
          style="background: #fff"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <a-menu
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
                    ><a href="">Nguyen Thi Anh Tuyet</a></span
                  >
                  <span class="user-role">Employer</span>
                  <span class="user-role user-company">Meta Technology</span>
                </div>
              </div>
            </a-menu-item>

            <a-menu-item key="dashboard">
              <router-link :to="{ name: 'dashboard' }">
                <HomeOutlined />
                <span>Dashboard</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="account-management">
              <router-link :to="{ name: 'account-management' }">
                <TeamOutlined />
                <span>Account Mananagement</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="company-management">
              <router-link :to="{ name: 'company-management' }">
                <WifiOutlined />
                <span>Company Mananagement</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="seeker-management">
              <FileSearchOutlined />
              <span>Seeker Mananagement</span>
            </a-menu-item>
            <a-menu-item key="post-management">
              <FileTextOutlined />
              <span>Post Mananagement</span>
            </a-menu-item>
            <!-- <a-menu-item key="2">
          <EnvironmentOutlined />
          <span>Location Management</span>
        </a-menu-item>
        <a-menu-item key="3">
          <HomeOutlined />
          <span>Skill Mananagement</span>
        </a-menu-item>
        <a-menu-item key="4">
          <TeamOutlined />
          <span>Candidate Management</span>
        </a-menu-item>
        <a-menu-item key="5">
          <CalendarOutlined />
          <span>Calendar Interview</span>
        </a-menu-item>
        <hr />
        <a-menu-item key="6">
          <MailOutlined />
          <span>Support</span>
        </a-menu-item>
        <a-menu-item key="7">
          <SettingOutlined />
          <span>Setting</span>
        </a-menu-item> -->
          </a-menu>
        </a-layout-sider>
      </div>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "../components/Header.vue";
import { storeToRefs } from "pinia";
import { useMenu } from "../store/use-menu";
import { defineComponent } from "vue";

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
    const store = useMenu();

    return {
      ...storeToRefs(store),
    };
  },
});
</script>

<style scoped>
main.ant-layout-content,
.layout-sider {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
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
  background: #f9f8f8;
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
  color: black !important;
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
</style>
