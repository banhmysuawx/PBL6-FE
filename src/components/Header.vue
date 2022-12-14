<template>
  <div class="header-component">
    <a-layout-header class="header">
      <MenuUnfoldOutlined
        v-if="collapsed"
        class="trigger"
        @click="onChangeCollapsed()"
      />
      <MenuFoldOutlined v-else class="trigger" @click="onChangeCollapsed()" />
      <div class="logo"><img src="../assets/logo2.png" alt="" /></div>
      <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">
          <PlusCircleOutlined />
          <span>Post Job</span>
        </a-menu-item>
        <a-menu-item key="2">
          <MessageOutlined />
          <span>Connect</span>
        </a-menu-item>
        <a-menu-item key="3">
          <SearchOutlined />
          <span>Find CV</span>
        </a-menu-item>
        <a-menu-item key="4">
          <BellOutlined />
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMenu } from "../store/use-menu";

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
.header-component
  ul.ant-menu-overflow.ant-menu.ant-menu-root.ant-menu-horizontal.ant-menu-light {
  margin-left: 50%;
}
</style>
