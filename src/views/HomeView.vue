<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="container">
          <PageHeader v-bind:totalCompany="totalJobs" />
          <div class="top-companies">
            <div class="title">Top Companies</div>
            <div class="row">
              <div class="top-company" v-for="company in topCompanies">
                <TopCompany v-bind:company="company" />
              </div>
            </div>
          </div>
          <div class="space"></div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Header from "../layouts/header.vue";
import Footer from "../layouts/footer.vue";
import TopCompany from "../components/company/TopCompany.vue";
import PageHeader from "../components/PageHeader.vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "HomeView",
  components: {
    Header,
    Footer,
    TopCompany,
    PageHeader,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  watch: {
    isLoading(newVal, oldVal) {
      console.log(newVal);
      this.isLoading = newVal;
    },
  },
  data() {
    return {
      topCompanies: [],
      totalJobs: 0,
    };
  },
  mounted() {
    this.getTopCompanies();
    this.getTotalJob();
  },
  methods: {
    async getTopCompanies() {
      await axios
        .get("companies/companies/top_company")
        .then((response) => {
          this.topCompanies = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTotalJob() {
      await axios
        .get("jobs/jobs/sum_jobs")
        .then((response) => {
          this.totalJobs = response.data.sum_job;
        })
        .catch((error) => {
          console.log(error);
        });
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
  max-width: 100% !important;
}
.top-companies {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.top-companies .title {
  font-size: 27px;
  font-family: Roboto, sans-serif;
  text-align: left;
  margin-top: 30px;
  margin-left: 12px;
  line-height: 35px;
}
.row {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 20px;
}
.top-company {
  width: 25%;
  margin-top: 30px;
  padding: 12px;
}
.space {
  height: 40px;
}
</style>
