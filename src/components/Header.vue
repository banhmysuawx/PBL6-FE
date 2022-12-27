<template>
  <div class="header-component">
    <a-layout-header class="header">
      <div class="header-left">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="onChangeCollapsed()"
        />
        <MenuFoldOutlined v-else class="trigger" @click="onChangeCollapsed()" />
        <div class="logo-header"><img src="../assets/logo2.png" alt="" /></div>
      </div>
      <div class="header-right">
        <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">
            <router-link :to="{ name: 'JobBoard' }">
              <MessageOutlined />
              <span>Company</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="{ name: 'home' }">
              <MessageOutlined />
              <span>Seeker</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3" v-if="id" @click="logout">
            <span>Logout</span>
          </a-menu-item>
          <a-menu-item key="4" v-else @click="login">
            <span>Login</span>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMenu } from "../store/use-menu";
import store from "../store";
import axios from "axios";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  MessageOutlined,
  SearchOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusCircleOutlined,
    MessageOutlined,
    SearchOutlined,
    BellOutlined,
  },
  data() {
    return {
      collapsed: false,
      size: "",
      id: store.state.user.id,
    };
  },
  setup() {
    const { collapsed } = useMenu();

    return {
      collapsed,
    };
  },
  methods: {
    onChangeCollapsed() {
      const store = useMenu();
      store.onChangeCollapsed();
      store.onChangeSize();
      this.collapsed = store.collapsed;
      this.size = store.size;
    },
    async logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refresh");
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
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem !important;
}
.logo-header img {
  max-width: 150px;
  filter: brightness(0) invert(1);
}
.flex-grow {
  flex-grow: 1;
}
.header-component header.ant-layout-header.header {
  position: fixed;
  z-index: 1;
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
.header-component span.anticon.anticon-menu-fold,
.header-component span.anticon.anticon-menu-unfold {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem !important;
  margin-left: 0 !important;
  font-size: 25px;
  padding: 4px;
  background: rgb(190 190 190 / 20%);
  color: white;
  border: 1px solid rgb(190 190 190 / 20%);
  border-radius: 4px;
}
.header-component .ant-layout-header {
  padding: 0 24px !important;
}
.header-component .ant-menu-title-content {
  font-size: 17px;
  font-weight: 500;
  color: white;
  font-family: inherit;
  padding: 6px 15px;
  border: 1px solid rgb(190 190 190 / 20%);
  border-radius: 20px;
  background: rgb(190 190 190 / 20%);
}
.header-component
  li.ant-menu-overflow-item.ant-menu-item.ant-menu-item-only-child {
  padding: 0 5px !important;
}
.header-component .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
  padding: 0 7px !important;
}
.header-left {
  display: flex;
}
.header {
  justify-content: space-between;
}
.header .ant-menu-horizontal > .ant-menu-item a {
  color: white;
}
</style>
