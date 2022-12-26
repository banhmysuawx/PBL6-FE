<template>
  <div class="home">
    <div class="container">
      <div class="dashboard-container">
        <div class="dashboard-document">
          <div class="dashboard-card">
            <div class="dashboard-card_item" style="background: #82d782">
              <router-link :to="{ name: 'account-management' }">
                <div class="dashboard-card_item_header">
                  <TeamOutlined />
                  <span class="text">Account</span>
                </div>
              </router-link>
              <div class="dashboard-card_item_content">
                <span>{{ totalAcc }}</span>
              </div>
            </div>
            <div class="dashboard-card_item" style="background: #c5a3d3">
              <div class="dashboard-card_item_header">
                <FileSearchOutlined />
                <span class="text">Seeker</span>
              </div>
              <div class="dashboard-card_item_content">
                <span>{{ totalSeeker }}</span>
              </div>
            </div>
            <div class="dashboard-card_item" style="background: #fce0a6">
              <router-link :to="{ name: 'company-management' }">
                <div class="dashboard-card_item_header">
                  <WifiOutlined />
                  <span class="text">Company</span>
                </div>
              </router-link>
              <div class="dashboard-card_item_content">
                <span>{{ totalEmployer }}</span>
              </div>
            </div>
            <div class="dashboard-card_item" style="background: #ffcccc">
              <div class="dashboard-card_item_header">
                <FileTextOutlined />
                <span class="text">Post</span>
              </div>
              <div class="dashboard-card_item_content">
                <span>{{ totalJob }}</span>
              </div>
            </div>
          </div>
          <div class="dashboard-chart">
            <div class="title"><span>Listing Performance</span></div>
            <canvas id="example"></canvas>
          </div>
        </div>
        <div class="dashboard-company-analysis">
          <div class="dashboard-top-company-card">
            <div class="dashboard-company">
              <div class="dashboard-company__item">
                <div class="top-company-text">Top Companies</div>
                <div class="top-company-text_rating">Rating</div>
              </div>
              <div
                class="dashboard-company__item"
                v-for="company in topCompanies"
              >
                <div class="company-title">
                  <div class="dashboard-company-logo">
                    <img src="../../assets/logo2.png" alt="" />
                  </div>
                  {{ company.name }}
                </div>
                <div class="rating">
                  <a-rate v-bind:value="company.rating" disabled allow-half />
                </div>
              </div>
            </div>
          </div>
          <div class="dashboard-top-company-card">
            <div class="dashboard-company">
              <div class="dashboard-company__item">
                <div class="top-company-text">Top High Salary</div>
                <div class="top-company-text_rating">Salary</div>
              </div>
              <div
                class="dashboard-company__item"
                v-for="company in highSalrary"
              >
                <div class="company-title">
                  <div class="dashboard-company-logo">
                    <img src="../../assets/logo2.png" alt="" />
                  </div>
                  {{ company.name }}
                </div>
                <div class="salary">{{ company.salary }}$</div>
              </div>
            </div>
          </div>
          <div class="dashboard-top-company-card">
            <div class="dashboard-company">
              <div class="dashboard-company__item">
                <div class="top-company-text">Top Job Category</div>
                <div class="top-company-text_rating">count</div>
              </div>
              <div
                class="dashboard-company__item"
                v-for="company in topCategory"
              >
                <div class="company-title">
                  <div class="dashboard-company-logo">
                    <img src="../../assets/logo2.png" alt="" />
                  </div>
                  {{ company.name }}
                </div>
                <div class="salary">{{ company.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import {
  TeamOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  WifiOutlined,
} from "@ant-design/icons-vue";
import Chart from "chart.js";
import axios from "axios";
export default defineComponent({
  name: "Dashboard",
  data() {
    const topCompanies = [];
    const highSalrary = [];
    const topCategory = [];
    const dataChart = {
      type: "bar",
      data: {},
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25,
              },
            },
          ],
        },
      },
    };
    return {
      dataChart,
      topCompanies,
      topCategory,
      highSalrary,
      totalAcc: 0,
      totalEmployer: 0,
      totalSeeker: 0,
      totalJob: 0,
    };
  },
  components: {
    TeamOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    WifiOutlined,
  },
  mounted() {
    this.getDataChart();
    this.getDataTotal();
    this.getTop();
  },
  methods: {
    async getDataChart() {
      let dataChart = {};
      await axios
        .get("statisticals/statisticals/seeker-employer-by-month")
        .then((response) => {
          const data = response.data;
          dataChart = {
            labels: data.labels,
            datasets: [
              {
                label: "seeker",
                backgroundColor: "#fce0a6",
                data: data.seeker,
              },
              {
                label: "company",
                backgroundColor: "#82d782",
                data: data.employer,
              },
            ],
          };
          this.dataChart.data = dataChart;
          const ctx = document.getElementById("example");
          new Chart(ctx, this.dataChart);
        });
    },
    async getDataTotal() {
      const urlAcc = `auth/admin/sum-accounts`;
      const urlEmployer = `auth/admin/sum-employer`;
      const urlSeeker = `auth/admin/sum-seeker`;
      const urlJob = `jobs/admin/jobs/sum_jobs`;

      const accPromise = axios
        .get(urlAcc)
        .then((response) => response.data.sum_account)
        .catch(() => 0);
      const employerromise = axios
        .get(urlEmployer)
        .then((response) => response.data.employer_count)
        .catch(() => 0);
      const seekerPromise = axios
        .get(urlSeeker)
        .then((response) => response.data.seeker_count)
        .catch(() => 0);
      const jobPromise = axios
        .get(urlJob)
        .then((response) => response.data.sum_job)
        .catch(() => 0);

      [this.totalAcc, this.totalEmployer, this.totalSeeker, this.totalJob] =
        await Promise.all([
          accPromise,
          employerromise,
          seekerPromise,
          jobPromise,
        ]);
    },
    async getTop() {
      const topSalary = axios
        .get("statisticals/statisticals/top-job-high-salary")
        .then((response) => {
          const data = response.data;
          return data.labels.map((item, index) => {
            return {
              name: item,
              salary: data.chartData[index],
            };
          });
        })
        .catch((error) => error);

      const topCategory = axios
        .get("statisticals/statisticals/top-job-category")
        .then((response) => {
          const data = response.data;
          return data.labels.map((item, index) => {
            return {
              name: item,
              count: data.chartData[index],
            };
          });
        })
        .catch((error) => error);

      const topCompanies = axios
        .get("statisticals/statisticals/top-company")
        .then((response) => {
          const data = response.data;
          return data.labels.map((item, index) => {
            return {
              name: item,
              rating: data.chartData[index],
            };
          });
        })
        .catch((error) => error);

      [this.highSalrary, this.topCategory, this.topCompanies] =
        await Promise.all([topSalary, topCategory, topCompanies]);
    },
  },
});
</script>
<style scoped>
.container {
  padding-top: 20px;
  background: #fafafb !important;
  height: 700px;
  overflow-y: scroll;
}
.dashboard-container {
  /* display: flex;
  flex-direction: column; */
  max-width: 1200px !important;
  margin: auto;
}
.dashboard-document {
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  column-gap: 50px;
}
.dashboard-company-analysis {
  display: grid;
  grid-template-columns: 1fr 0.7fr 0.7fr;
}
.dashboard-card,
.dashboard-chart,
.dashboard-top-company-card {
  box-shadow: 4px 2px 6px 6px rgb(0 0 0 /5%);
  border-radius: 7px;
  background-color: white;
}
.dashboard-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  padding: 20px;
}
.dashboard-card_item {
  background: white;
  padding: 15px 20px;
  border-radius: 7px;
  width: 200px;
}
.dashboard-card_item_header {
  display: flex;
}
.dashboard-card_item_header span.anticon {
  padding: 5px;
  border: 1px solid;
  border-radius: 50%;
  border: none;
  background: #2c3e50;
  font-size: 15px;
  color: white;
}
.dashboard-card_item_header .text {
  color: #2c3e50 !important;
}
.dashboard-card_item_header span {
  padding-left: 7px;
  margin: auto 0;
  font-size: 17px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.dashboard-card_item_content {
  padding-top: 10px;
  font-size: 25px;
  font-weight: 550;
}
.home {
  background-color: #f9f8f8 !important;
  height: 100%;
}
.dashboard-chart canvas#example {
  height: 300px !important;
  width: 600px !important;
  margin: 0 auto;
}
.dashboard-chart .title {
  margin: 10px 0;
  font-size: 20px;
  color: #2c3e50;
}
.dashboard-company {
  margin: 20px;
}
.dashboard-top-company-card {
  margin: 20px 10px;
  height: fit-content;
}
.dashboard-company__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;
}
.company-title {
  text-align: left;
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
}
.dashboard-company-logo {
  width: 50px;
  height: 30px;
  margin-right: 10px;
}
.top-company-text {
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  font-weight: 550;
}
.top-company-text_rating {
  font-size: 15px;
  text-align: right;
  padding-right: 10px;
  font-style: italic;
}
.dashboard-company__item .salary {
  text-align: right;
  display: unset;
  padding-right: 10px;
}
</style>
