import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => ({
    userId: 8,
  }),
});
