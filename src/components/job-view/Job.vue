<template>
  <div class="job-component">
    <a-card hoverable>
      <template #cover style="border: 1px solid #e9e9e9">
        <div class="job__logo">
          <img alt="example" src="../../assets/logo2.png" />
        </div>
      </template>
      <div class="content-container">
        <div class="job__content">
          <p class="job__title">
            {{ job.name }}
          </p>
          <div class="salary">
            <DollarOutlined />
            <p>{{ job.salary }}$</p>
          </div>
          <ul class="benefit">
            <li class="benefit-text">Hình thức làm việc hybird</li>
            <li class="benefit-text">Bảo hiểm 100% lương</li>
            <li class="benefit-text">Đài thọ 100% chí phí học tập cho CBNV</li>
          </ul>
          <div class="tag">
            <p v-for="skill in job.skills">{{ skill.name }}</p>
            <p v-if="job.category_name">{{ job.category_name }}</p>
          </div>
        </div>
        <div class="city-and-date">
          <div class="new"><p>New</p></div>
          <div class="address">
            <p v-for="location in job.locations">
              {{ location.location_name }}
            </p>
          </div>
          <div class="date">1d</div>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DollarOutlined } from "@ant-design/icons-vue";
import { Job } from "../../utils";
export default defineComponent({
  name: "Job",
  components: {
    DollarOutlined,
  },
  props: {
    job: {
      type: Object as PropType<Job>,
    },
  },
});
</script>
<style scoped>
@import "./index.css";
</style>
