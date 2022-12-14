import { defineStore } from "pinia";

export const useMenu = defineStore("menuId", {
  state: () => ({
    selectedKeys: [],
    openKeys: [],
    collapsed: false,
    size: "",
  }),

  actions: {
    onSelectedKeys(data: any) {
      this.selectedKeys = data;
    },

    onOpenKeys(data: any) {
      this.openKeys = data;
      console.log(this.openKeys);
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
