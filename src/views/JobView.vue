<template>
  <div class="home">
    <Header />
    <a-layout-content>
      <div class="list-job">
        <div class="container">
          <div class="list-job-content">
            <div class="list-job-wrapper">
              <div class="list-job-info-box"></div>
              <div class="job-detail-box"></div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import JobComponent from "../components/JobComponent.vue";
import Header from "../layouts/header.vue";
export default defineComponent({
  name: "JobView",
  components: {
    JobComponent,
    Header,
  },
});
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
}
.container {
  background-color: #e9e9e9;
  position: relative;
}
.list-job-content {
  margin: 30px auto;
  max-width: 1350px;
  min-height: 700px;
  height: calc(100vh - 360px);
  background-color: transparent;
  border: none;
}

.list-job-content .list-job-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  background-color: #e9e9e9;
  height: 100%;
}
.list-job-content .list-job-info-box,
.list-job-content .job-detail-box {
  height: 100%;
  overflow: hidden;
  background-color: white;
}
</style>
