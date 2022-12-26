<template>
  <div class="job-component">
    <router-link
      :to="{
        name: name,
        params: { name: job.name },
        query: { idJob: job.id, idCompany: job.company.id },
      }"
      v-show="show"
    >
      <a-card hoverable>
        <template #cover style="border: 1px solid #e9e9e9">
          <div class="job__logo">
            <img alt="example" v-bind:src="image" />
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
              <li class="benefit-text">{{ job.description }}</li>
            </ul>
            <div class="tag">
              <p v-for="skill in job.skills">{{ skill.name }}</p>
              <p v-if="job.category_name">{{ job.category_name }}</p>
            </div>
          </div>
          <div class="city-and-date">
            <!-- <div class="favorite">
            <p :style="{ color: isFavorite }">❤</p>
          </div> -->
            <div class="address">
              <p v-for="location in job.locations">
                {{ location.location_name }}
              </p>
            </div>
            <div class="date">1d</div>
          </div>
        </div>
      </a-card>
    </router-link>
    <a-card hoverable v-show="!show">
      <template #cover style="border: 1px solid #e9e9e9">
        <div class="job__logo">
          <img alt="example" v-bind:src="job.company.image" />
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
            <li class="benefit-text">{{ job.description }}</li>
          </ul>
          <div class="tag">
            <p v-for="skill in job.skills">{{ skill.name }}</p>
            <p v-if="job.category_name">{{ job.category_name }}</p>
          </div>
        </div>
        <div class="city-and-date">
          <!-- <div class="favorite">
            <p :style="{ color: isFavorite }">❤</p>
          </div> -->
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
import store from "../../store/index";
export default defineComponent({
  name: "Job",
  components: {
    DollarOutlined,
  },
  data() {
    const role = store.state.user.role;
    let name = "jobdetail";
    if (this.show) {
      name = role === "seeker" ? "jobdetail" : "admin-job-detail";
    }
    return {
      name,
      role,
      jobId: this.job,
    };
  },
  mounted() {
    console.log(this.image);
  },
  props: {
    job: {
      type: Object as PropType<Job>,
    },
    isFavorite: String,
    show: {
      type: Boolean,
      default: true,
    },
    image: String,
  },
});
</script>
<style scoped>
@import "./index.css";
</style>
