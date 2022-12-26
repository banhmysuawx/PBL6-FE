<template>
  <div>
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  :collapse="isCollapse"
>
<div style="text-align:right">
    <div v-if="isCollapse==true" style="">
      <el-button @click="changeCollapse()"> <el-icon><Expand /></el-icon></el-button>
    </div>
    <div v-else>
      <el-button @click="changeCollapse()" type="primary"><el-icon><Fold /></el-icon></el-button>
    </div>

 
</div>
<el-menu-item index="0" @click="Dashboard()">
    <el-icon><location /></el-icon>
    <span style="color: rgb(191, 203, 217)">Dashboard</span>
  </el-menu-item>

  <el-menu-item index="1" @click="Jobboard()">
    <el-icon><location /></el-icon>
    <span style="color: rgb(191, 203, 217)">Job Board</span>
  </el-menu-item>

  <el-menu-item index="2"  @click="JobManagement()">
    <el-icon><location /></el-icon>
    <span style="color: rgb(191, 203, 217)">Job Management</span>
  </el-menu-item>

  <el-menu-item index="11"  @click="LocationManagement()">
    <el-icon><setting /></el-icon>
    <span style="color: rgb(191, 203, 217)">Location Management</span>
  </el-menu-item>


  <el-menu-item index="3"  @click="InterviewCalendar()">
    <el-icon><Sunny /></el-icon>
    <span style="color: rgb(191, 203, 217)">Interview Calendar</span>
  </el-menu-item>

  <el-menu-item index="4"  @click="TestManagement()">
    <el-icon><Document /></el-icon>
    <span style="color: rgb(191, 203, 217)"><span class="content-menu-item">Test Management</span></span>
  </el-menu-item>

  <el-menu-item index="5"  @click="CandidateManagement()">
    <el-icon><User /></el-icon>
    <span style="color: rgb(191, 203, 217)">Candidate Management</span>
  </el-menu-item>

  <el-menu-item index="6"  @click="Information()">
    <el-icon><Calendar/></el-icon>
    <span style="color: rgb(191, 203, 217)">Information</span>
  </el-menu-item>

  <el-menu-item index="7"  @click="Setting()">
    <el-icon><setting /></el-icon>
    <span style="color: rgb(191, 203, 217)">Setting</span>
  </el-menu-item>

  <el-menu-item index="8"  @click="UserView()">
    <el-icon><setting /></el-icon>
    <span style="color: rgb(191, 203, 217)">User View</span>
  </el-menu-item>

</el-menu>
  </div>
  <router-view/>

</template>

<script>
export default {
  name : "SideBar",
  data(){
    return {
      isCollapse : false,
    }
  },
  methods:{
    changeCollapse(){
      this.isCollapse = !this.isCollapse;
    },
    Dashboard(){
      this.$router.push({ name: "company-dashboard" });
    },
    Jobboard(){
      this.$router.push({ name: "JobBoard" });
    },
    JobManagement(){
      this.$router.push({ name: "company-job" });
    },
    LocationManagement(){
      this.$router.push({ name: "company-location" });
    },
    InterviewCalendar(){
      this.$router.push({ name: "Interview" });
    },
    CandidateManagement(){
      this.$router.push({ name: "Candidate" });
    },
    TestManagement(){
      this.$router.push({ name: "company-quizz" });
    }
  }
  
}
</script>

<style lang="scss">
.el-menu-vertical-demo {
width: 280px;
height: 1000px;
position: relative;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2)
}
</style>