<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="applied-job-container">
          <div class="title">Applied Jobs</div>
          <AppliedJobComponent />
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script>
import AppliedJobComponent from "../components/AppliedJobComponent.vue";
import EmptyApplied from "../components/EmptyApplied.vue";
import Header from "../layouts/header.vue";
import Footer from "../layouts/footer.vue";
export default {
  name: "AppliedJob",
  components: {
    AppliedJobComponent,
    EmptyApplied,
    Header,
    Footer,
  },
};
</script>

<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
  padding-bottom: 20px;
}
.applied-job-container {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  min-height: 700px;
  margin: auto;
  margin-top: 20px;
  overflow-y: scroll;
  height: 600px;
}
.applied-job-container .title {
  font-size: 27px;
  font-family: Roboto, sans-serif;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 1rem;
  margin-left: 100px;
  line-height: 35px;
}
</style>
