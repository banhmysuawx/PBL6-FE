<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="applied-job-container">
          <div class="title">Favorite Jobs</div>
          <div class="favorite-jos">
            <div class="list-job" v-for="job in listJobs">
              <Job v-bind:job="job.job" />
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
export default {
  name: "FavoriteJob",
  components: {
    EmptyApplied,
    Header,
    Footer,
    Job,
  },
  data() {
    return {
      listJobs: [],
    };
  },
  mounted() {
    this.getListJobs();
  },
  methods: {
    async getListJobs() {
      await axios
        .get("https://api.quangdinh.me/favorites/favorites/" + 8)
        .then((response) => {
          const data = response.data;
          this.listJobs = data;
          console.log(this.listJobs);
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
