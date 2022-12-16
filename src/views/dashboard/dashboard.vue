<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container>
        <el-header style="height: 50px"><HeaderCompanyView /></el-header>
        <el-main>
          <div class="main-container">
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="8" style="font-size: 25px"
                >Welcome, Hoang Dung</el-col
              >
            </el-row>
            <el-row :gutter="20" style="margin: 20px">
              <el-col :span="6">
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <span>Card name</span>
                      <el-button class="button" text
                        >Operation button</el-button
                      >
                    </div>
                  </template>
                  <div v-for="o in 2" :key="o" class="text item">
                    {{ "List item " + o }}
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <span>Card name</span>
                      <el-button class="button" text
                        >Operation button</el-button
                      >
                    </div>
                  </template>
                  <div v-for="o in 2" :key="o" class="text item">
                    {{ "List item " + o }}
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <span>Card name</span>
                      <el-button class="button" text
                        >Operation button</el-button
                      >
                    </div>
                  </template>
                  <div v-for="o in 2" :key="o" class="text item">
                    {{ "List item " + o }}
                  </div>
                </el-card>
              </el-col>

              <el-col :span="6">
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <span>Card name</span>
                      <el-button class="button" text
                        >Operation button</el-button
                      >
                    </div>
                  </template>
                  <div v-for="o in 2" :key="o" class="text item">
                    {{ "List item " + o }}
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row style="margin: 20px" :gutter="20">
              <el-col :span="12">
                <Bar :data="chartData" :options="chartOptions" />
              </el-col>
              <el-col :span="12">
                <Pie
                  type="pie"
                  width="380"
                  :options="chartOptions"
                  :series="series"
                ></Pie>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import axios from "axios";
import { toast } from "bulma-toast";
import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "Dashboard",

  data() {
    return {
      chartData: {
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],

        datasets: [
          {
            label: "Number Applicants applied",
            backgroundColor: " rgba(70, 130, 180, 0.9)",
            data: [40, 20, 12, 15, 16, 0, 20, 23, 16, 11, 9, 5],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  components: {
    SideBar,
    HeaderCompanyView,
    Bar,
    Pie,
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>
