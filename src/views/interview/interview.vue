<template>
    <div>
    <el-container class="layout-container-demo" >
      <SideBar/>
      <el-container>
          <el-header style="height:50px"><HeaderCompanyView/></el-header>
          <el-container style="display:flex; flex-direction: column;">
            <FullCalendar :options="calendarOptions" />


          </el-container>    
      
     </el-container>
    </el-container>
 
  </div>

  </template>
  
  <script>

  import SideBar from "@/components/SideBar.vue"
  import HeaderCompanyView from "@/components/HeaderCompany.vue"
  import '@fullcalendar/core/vdom' 
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import { Calendar } from '@fullcalendar/core';
  import timeGridPlugin from '@fullcalendar/timegrid';
  
  export default {
      name : "Interview",
      data(){
        return{
          calendarOptions: {
            plugins: [ timeGridPlugin ],
            initialView: 'timeGridWeek',
            dateClick: this.handleDateClick,
            // events: [
            //   { title: 'event 1', start: '2022-11-30 15:00:00+07', end:'2022-11-30 16:30:00+07',allDay: 'true' },
            //   { title: 'event 10', date: '2022-11-15' },
            //   { title: 'event 2', date: '2022-11-20' }
            // ]
          }
        }
      },
      components:{
        SideBar,
        HeaderCompanyView,
        FullCalendar 
      },
     
  }
  </script>
  
  <style lang="scss">
  @import  "../../assets/css/index.css";
  @import "./index.scss"

  </style>