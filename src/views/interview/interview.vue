<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container style="background-color: white">
        <el-header style="height: 80px; background: #007082; padding: 0"
          ><HeaderCompanyView
        /></el-header>
        <div style="margin: 10px">
          <FullCalendar
            :options="calendarOptions"
            style="margin: 10px"
            :selectable="true"
          />
        </div>
      </el-container>
    </el-container>

    <!-- Information event-->

    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>Information Applicant</span>
      <el-row></el-row>
      <el-row></el-row>
      <el-row></el-row>
      <el-row></el-row>
      <el-row>
        <el-form-item label="Job name">
          <el-input v-model="job.name" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="Mark Quizz">
          <el-input v-model="applicant.result_test" />
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Link google">
          <el-input v-model="applicant.link_gg_meet" />
        </el-form-item>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import axios from "axios";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "Interview",
  data() {
    return {
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        dateClick: this.handleDateClick,
        events: [],
        slotMinTime: "06:00:00",
        slotMaxTime: "20:00:00",
      },
      drawer: false,
      applicant: {},
      job: {},
      profile: {},
    };
  },
  components: {
    SideBar,
    HeaderCompanyView,
    FullCalendar,
  },
  created() {
    const id = this.$store.state.company.id;
    axios
      .get(`/applicants/company/applicant-interview/get_event?id_company=${id}`)
      .then((response) => {
        this.calendarOptions.events = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async handleDateClick(info) {
      var time =
        info.date.getFullYear() +
        "-" +
        info.date.getMonth() +
        "-" +
        info.date.getDate() +
        " " +
        info.date.getHours() +
        ":" +
        info.date.getMinutes();
      const id = this.$store.state.company.id;
      await axios
        .get(
          `/applicants/company/applicant-interview/get_event_by_time?id_company=${id}&time=${time}`
        )
        .then((res) => {
          this.applicant = res.data;
          console.log(this.applicant);
          if (res.data.status.length > 0) {
            this.drawer = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`/jobs/jobs/${this.applicant.job}`)
        .then((res) => {
          this.job = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/css/index.css";
@import "./index.scss";
</style>
