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
      console.log(this.selectedKeys);
    },

    onOpenKeys(data) {
      this.openKeys = data;
      console.log(this.openKeys);
    },
    onChangeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
});
