<template>
  <div class="home">
    <Header />
    <a-layout-content>
      <div class="applied-job-container">
        <div class="title">Applied Jobs</div>
        <AppliedJobComponent />
      </div>
    </a-layout-content>
  </div>
</template>
<script>
import AppliedJobComponent from "../components/AppliedJobComponent.vue";
import EmptyApplied from "../components/EmptyApplied.vue";
import Header from "../layouts/header.vue";
export default {
  name: "AppliedJob",
  components: {
    AppliedJobComponent,
    EmptyApplied,
    Header,
  },
};
</script>

<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
}
.applied-job-container {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  min-height: 700px;
  margin: auto;
  margin-top: 20px;
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
