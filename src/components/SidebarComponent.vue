<template>
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
        <div class="layout-user">
          <a-menu-item>
            <UserOutlined />
            <div class="layout-account">
              <span class="user-name"><a href="">Nguyen Thi Anh Tuyet</a></span>
              <span class="user-role">Employer</span>
              <span class="user-role user-company">Meta Technology</span>
            </div>
          </a-menu-item>
        </div>
        <a-menu-item key="1">
          <MenuOutlined />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="view-job">
          <router-link :to="{ name: 'view-job' }">
            <HomeOutlined />
            <span>Job Mananagement</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="addLocation">
          <router-link :to="{ name: 'addLocation' }">
            <EnvironmentOutlined />
            <span>Location Management</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="addSkill">
          <router-link :to="{ name: 'addSkill' }">
            <HomeOutlined />
            <span>Skill Mananagement</span>
          </router-link>
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
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "../store/use-menu";

import {
  UserOutlined,
  HomeOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UserOutlined,
    HomeOutlined,
    MenuOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    CalendarOutlined,
    SettingOutlined,
    MailOutlined,
  },
  setup() {
    const store = useMenu();

    return {
      ...storeToRefs(store),
    };
  },
});
</script>

<style>
.site-layout-background {
  background: #fff;
}
.layout-sider {
  width: 260px;
  position: fixed;
  top: 64px;
  z-index: 2;
}

.layout-sider aside.ant-layout-sider.ant-layout-sider-dark {
  width: 100% !important;
  flex: 0 0 260px;
  max-width: 260px !important;
  min-width: 260px !important;
  height: 100%;
  display: flex;
}
.layout-sider
  aside.ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-collapsed {
  flex: 0 0 100px !important;
  max-width: 100px !important;
  min-width: 100px !important;
}
.ant-menu.ant-menu-inline-collapsed .layout-user li.ant-menu-item {
  left: 0;
  padding: 0 calc(50% - 16px / 2);
  text-overflow: clip;
}
.ant-menu.ant-menu-inline-collapsed
  .layout-user
  li.ant-menu-item
  .layout-account {
  display: none;
}
.layout-sider .ant-layout-sider {
  position: fixed;
}
.layout-sider .ant-layout-sider-children {
  width: 100%;
}
.layout-user li.ant-menu-item,
.layout-user span.ant-menu-title-content {
  min-height: 64px;
  padding-top: 0.3rem !important;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
}

.layout-user span.anticon.anticon-user {
  margin-right: 15px;
}
.layout-sider hr {
  border-top: 1px solid #e9e9e9;
}
.layout-user svg {
  height: 32px;
  width: 20px;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -16px;
}
.layout-account {
  padding: 12px 0;
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
