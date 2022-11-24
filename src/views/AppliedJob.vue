<template>
  <div class="home">
    <div class="applied-job-container">
      <div class="title">Applied Jobs</div>
      <empty-applied />
    </div>
  </div>
</template>
<script>
import AppliedJobComponent from "../components/AppliedJobComponent.vue";
import EmptyApplied from "../components/EmptyApplied.vue";
export default {
  name: "AppliedJob",
  components: {
    AppliedJobComponent,
    EmptyApplied,
  },
};
</script>

<style scoped>
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
  margin-left: 50px;
  line-height: 35px;
}
</style>
