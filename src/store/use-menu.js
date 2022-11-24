import { defineStore } from "pinia";

export const useMenu = defineStore("menuId", {
  state: () => ({
    selectedKeys: [],
    openKeys: [],
    collapsed: false,
    size: "",
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
    onChangeSize() {
      this.size = this.collapsed ? "124px" : "284px";
      console.log(this.size);
    },
  },
});
