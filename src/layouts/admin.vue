<template>
  <a-layout>
    <Header />
    <SidebarComponent />
    <a-layout :style="style">
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '24px',
          margin: 0,
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "../components/Header.vue";
import { defineComponent } from "vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import { useMenu } from "../store/use-menu.js";
export default defineComponent({
  data() {
    const { size } = useMenu();
    console.log(size);
    return {
      style: `{left: ${size}}`,
    };
  },
  components: {
    Header,
    SidebarComponent,
  },
});
</script>

<style scoped>
main.ant-layout-content {
  position: fixed;
  left: 284px;
  top: 64px;
  max-width: 1296px;
  width: 100%;
}
</style>
