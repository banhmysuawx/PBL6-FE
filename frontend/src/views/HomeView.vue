<template>
  <div class="home">
    <Header />
    <a-layout-content>
      <home-component />
    </a-layout-content>
  </div>
</template>

<script>
import HomeComponent from "../components/HomeComponent.vue";
import Header from "../layouts/header.vue";
export default {
  name: "HomeView",
  components: {
    HomeComponent,
    Header,
  },
};
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
}
</style>
