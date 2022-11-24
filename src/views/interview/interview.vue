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
  
  export default {
      name : "Interview",
      data(){
        return{
          calendarOptions: {
            plugins: [ dayGridPlugin, interactionPlugin ],
            initialView: 'dayGridMonth',
            dateClick: this.handleDateClick,
            events: [
              { title: 'event 1', date: '2019-04-01' },
              { title: 'event 2', date: '2019-04-02' }
            ]
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