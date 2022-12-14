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
                <span>2.345</span>
              </div>
            </div>
            <div class="dashboard-card_item" style="background: #c5a3d3">
              <div class="dashboard-card_item_header">
                <FileSearchOutlined />
                <span class="text">Seeker</span>
              </div>
              <div class="dashboard-card_item_content">
                <span>2.345</span>
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
                <span>2.345</span>
              </div>
            </div>
            <div class="dashboard-card_item" style="background: #ffcccc">
              <div class="dashboard-card_item_header">
                <FileTextOutlined />
                <span class="text">Post</span>
              </div>
              <div class="dashboard-card_item_content">
                <span>2.345</span>
              </div>
            </div>
          </div>
          <div class="dashboard-chart">
            <div class="title"><span>Listing Performance</span></div>
            <canvas id="example"></canvas>
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
export default defineComponent({
  name: "Dashboard",
  data() {
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
        // legend: {
        //   position: "top left",
        // },
      },
    };
    return {
      dataChart,
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
    const ctx = document.getElementById("example");
    new Chart(ctx, this.dataChart);
  },
  methods: {
    async getDataChart() {
      const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        datasets: [
          {
            label: "seeker",
            backgroundColor: "#fce0a6",
            data: [40, 20, 12, 39, 10, 40, 39, 40],
          },
          {
            label: "company",
            backgroundColor: "#82d782",
            data: [40, 20, 12, 39, 10, 40, 39, 80],
          },
        ],
      };
      this.dataChart.data = data;
      return data;
    },
  },
});
</script>
<style scoped>
.container {
  padding-top: 20px;
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
.dashboard-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  padding: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 7px;
  background-color: white;
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
.dashboard-chart {
  border: 1px solid #e9e9e9;
  background: white;
  border-radius: 7px;
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
</style>
