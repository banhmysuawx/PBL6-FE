<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container style="background-color: white">
        <el-header style="height: 50px"><HeaderCompanyView /></el-header>
        <div style="margin: 10px">
          <FullCalendar :options="calendarOptions" style="margin: 10px" 
          :selectable="true"
    />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import axios from "axios";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

export default {
  name: "Interview",
  data() {
    return {
      calendarOptions: {
        plugins: [timeGridPlugin,interactionPlugin],
        initialView: "timeGridWeek",
        dateClick: this.handleDateClick,
        events: [],
        slotMinTime: "06:00:00",
        slotMaxTime: "20:00:00",
      },
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
  methods:{

    handleDateClick(info) {
      alert(info);
      console.log(info)
    },
 
  }
};
</script>

<style lang="scss">
@import "../../assets/css/index.css";
@import "./index.scss";
</style>
