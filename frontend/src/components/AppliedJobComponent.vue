<template>
  <div class="applied-job">
    <a-card hoverable style="width: 600px">
      <template #cover style="border: 1px solid #e9e9e9">
        <img alt="example" src="../assets/logo2.png" />
      </template>
      <a-rate value="4.8" disabled allow-half />
      <div class="top-company__content">
        <p class="top-company__title">title</p>
        <p class="top-company__description">description</p>
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppliedJobComponent",
});
</script>
<style scoped>
.applied-job img {
  max-width: 200px;
}
.applied-job .ant-card.ant-card-bordered.ant-card-hoverable {
  display: flex;
}
</style>
