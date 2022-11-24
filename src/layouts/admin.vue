<template>
  <a-layout>
    <Header />
    <a-layout>
      <SidebarComponent />
      <a-layout style="padding: 0 24px 24px">
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
  </a-layout>
</template>
<script>
import Header from "../components/Header.vue";
import SidebarComponent from "../components/SidebarComponent.vue";

export default {
  components: {
    Header,
    SidebarComponent,
  },
};
</script>
