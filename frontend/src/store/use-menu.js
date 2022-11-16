import { defineStore } from "pinia";

export const useMenu = defineStore("menuId", {
  state: () => ({
    selectedKeys: [],
    openKeys: [],
    collapsed: false,
  }),

  actions: {
    onSelectedKeys(data) {
      this.selectedKeys = data;
    },

    onOpenKeys(data) {
      this.openKeys = data;
    },
    onChangeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
});
