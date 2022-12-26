/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module "@vue/runtime-core" {
//   import store from "./store"; // path to store file
//   import { ComponentCustomProperties } from "vue";
//   interface ComponentCustomProperties {
//     $store: store;
//   }
// }
