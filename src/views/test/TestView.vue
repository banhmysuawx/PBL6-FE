<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <test />
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Test from "../../components/Test.vue";
import Header from "../../layouts/header.vue";
import Footer from "../../layouts/footer.vue";
export default defineComponent({
  name: "TestView",
  components: {
    Test,
    Header,
    Footer,
  },
});
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
  padding-bottom: 20px;
}
</style>
