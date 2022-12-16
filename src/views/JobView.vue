<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="list-job">
          <div class="container">
            <div class="filter-container">
              <div class="filter">
                <a-dropdown>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        <UserOutlined />
                        1st menu item
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-button>
                    Job Level
                    <CaretDownFilled />
                  </a-button>
                </a-dropdown>
              </div>
              <div class="filter">
                <a-dropdown>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        <UserOutlined />
                        1st menu item
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-button>
                    Salary Range
                    <CaretDownFilled />
                  </a-button>
                </a-dropdown>
              </div>
              <div class="filter">
                <a-dropdown>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        <UserOutlined />
                        1st menu item
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-button>
                    Address
                    <CaretDownFilled />
                  </a-button>
                </a-dropdown>
              </div>
            </div>
            <div class="list-job-content">
              <div class="list-job-wrapper">
                <div class="list-job-info-box">
                  <div class="total-job">
                    <h1>{{ total }} Jobs for developers</h1>
                  </div>
                  <div class="list-job" v-for="job in listJobs">
                    <Job
                      v-bind:job="job.job"
                      v-bind:isFavorite="`red`"
                      @click="onChange(job.job.id)"
                    />
                  </div>
                </div>
                <div class="job-detail-box">
                  <div class="job-detail-box__content">
                    <JobDetail v-bind:id="currentJob" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "../layouts/header.vue";
import PageHeader from "../components/PageHeader.vue";
import Footer from "../layouts/footer.vue";
import axios from "axios";
import Job from "../components/job-view/Job.vue";
import JobDetail from "../components/job-detail/JobDetail.vue";
import { CaretDownFilled } from "@ant-design/icons-vue";
export default defineComponent({
  name: "JobView",
  data() {
    return {
      listJobs: [],
      total: 0,
      currentJob: 1,
    };
  },
  mounted() {
    this.getListJobs();
  },
  components: {
    Header,
    PageHeader,
    Footer,
    Job,
    JobDetail,
    CaretDownFilled,
  },
  methods: {
    async getListJobs() {
      await axios
        .get("jobs/user/get_jobs")
        .then((response) => {
          const data = response.data;
          this.listJobs = data;
          this.total = data.length;
          this.currentJob = this.listJobs[0]["job"]["id"];
        })
        .catch((error) => console.log(error));
    },
    onChange(id: number) {
      this.currentJob = id;
    },
  },
});
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
}
.container {
  background: #f9f8f8;
  position: relative;
  padding-bottom: 5px;
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
  grid-template-columns: 0.9fr 1fr;
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
.list-job-content .list-job-info-box {
  overflow-y: scroll;
}

.list-job-content .job-detail-box__content {
  margin: 20px;
}

.filter-container {
  display: flex;
  max-width: 1350px !important;
  margin: 30px auto;
}
.filter {
  padding-right: 30px;
}
.filter button.ant-btn.ant-dropdown-trigger {
  font-size: 16px;
  height: 38px;
  padding: 6px 15px;
}
.filter span.anticon.anticon-caret-down {
  margin-left: 40px;
}
.total-job {
  padding: 15px 0;
  padding-bottom: 0;
  padding-left: 2rem;
  text-align: left;
}
.total-job h1 {
  font-weight: 550;
  font-size: 35px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
