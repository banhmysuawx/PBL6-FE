<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="applied-job-container">
          <div class="title">Favorite Jobs</div>
          <div class="favorite-jos">
            <div class="list-job" v-for="(job, index) in listJobs">
              <div class="job-component">
                <a-card hoverable>
                  <template #cover style="border: 1px solid #e9e9e9">
                    <div class="job__logo">
                      <img
                        alt="example"
                        v-bind:src="
                          `https://api.quangdinh.me` + job.job.company.image
                        "
                      />
                    </div>
                  </template>
                  <div class="content-container">
                    <div class="job__content">
                      <p class="job__title">
                        {{ job.job.name }}
                      </p>
                      <div class="salary">
                        <DollarOutlined />
                        <p>{{ job.job.salary }}$</p>
                      </div>
                      <ul class="benefit">
                        <li class="benefit-text">Hình thức làm việc hybird</li>
                        <li class="benefit-text">Bảo hiểm 100% lương</li>
                        <li class="benefit-text">
                          Đài thọ 100% chí phí học tập cho CBNV
                        </li>
                      </ul>
                      <div class="tag">
                        <p v-for="skill in job.job.skills">{{ skill.name }}</p>
                        <p v-if="job.job.category_name">
                          {{ job.job.category_name }}
                        </p>
                      </div>
                    </div>
                    <div class="city-and-date">
                      <div class="favorite">
                        <p
                          :style="{ color: isFavorite }"
                          @click="deleteFavoriteJob(job.id, index)"
                        >
                          ❤
                        </p>
                      </div>
                      <div class="address">
                        <p v-for="location in job.job.locations">
                          {{ location.location_name }}
                        </p>
                      </div>
                      <div class="date">1d</div>
                    </div>
                  </div>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script>
import EmptyApplied from "../components/EmptyApplied.vue";
import Header from "../layouts/header.vue";
import Footer from "../layouts/footer.vue";
import Job from "../components/job-view/Job.vue";
import axios from "axios";
import { DollarOutlined } from "@ant-design/icons-vue";
export default {
  name: "FavoriteJob",
  components: {
    EmptyApplied,
    Header,
    Footer,
    Job,
    DollarOutlined,
  },
  data() {
    const userId = localStorage.getItem("id");
    return {
      listJobs: [],
      isFavorite: "red",
      userId,
    };
  },
  mounted() {
    this.getListJobs();
  },
  methods: {
    async getListJobs() {
      await axios
        .get("favorites/favorites/" + this.userId)
        .then((response) => {
          const data = response.data;
          this.listJobs = data;
          console.log(this.userId);
        })
        .catch((error) => console.log(error));
    },
    async deleteFavoriteJob(id, index) {
      await axios
        .delete("favorites/favorites/delete/" + id)
        .then((response) => {
          this.listJobs.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
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
.list-job {
  width: 80%;
  margin: 10px auto;
}
</style>
