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
<el-menu-item index="0">
    <el-icon><location /></el-icon>
    <span style="color: rgb(191, 203, 217)">Dashboard</span>
  </el-menu-item>

  <el-menu-item index="1">
    <router-link
                class="my-2 btn btn-block text-left"
                to="/job_board"
    >
    <el-icon><location /></el-icon>
    <span style="color: rgb(191, 203, 217)">Job Board</span>
  </router-link>

  </el-menu-item>

  <el-menu-item index="2">
    <el-icon><location /></el-icon>
    <router-link
                class="my-2 btn btn-block text-left"
                to="/company/job"
    >
    <span style="color: rgb(191, 203, 217)">Job Management</span>
  </router-link>
  </el-menu-item>


  <el-menu-item index="10">
    <el-icon><setting /></el-icon>
    <span style="color: rgb(191, 203, 217)">Skill Management</span>
  </el-menu-item>

  <el-menu-item index="11">
    <el-icon><setting /></el-icon>
    <router-link
                class="my-2 btn btn-block text-left"
                to="/company/location"
    >
    <span style="color: rgb(191, 203, 217)">Location Management</span>
  </router-link>
  </el-menu-item>


  <el-menu-item index="3">
    <el-icon><Sunny /></el-icon>
    <router-link
                class="my-2 btn btn-block text-left"
                to="/interview"
    >
    <span style="color: rgb(191, 203, 217)">Interview Calendar</span>
  </router-link>
  </el-menu-item>

  <el-menu-item index="4">
    <el-icon><Document /></el-icon>
    <span style="color: rgb(191, 203, 217)"><span class="content-menu-item">Test Management</span></span>
  </el-menu-item>

  <el-menu-item index="5">
    <el-icon><User /></el-icon>
    <router-link
                class="my-2 btn btn-block text-left"
                to="/candidate"
    >
    <span style="color: rgb(191, 203, 217)">Candidate Management</span>
  </router-link>
  </el-menu-item>

  <el-menu-item index="6">
    <el-icon><Calendar/></el-icon>
    <span style="color: rgb(191, 203, 217)">Information</span>
  </el-menu-item>

  <el-menu-item index="7">
    <el-icon><setting /></el-icon>
    <span style="color: rgb(191, 203, 217)">Setting</span>
  </el-menu-item>

  <el-menu-item index="8">
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
    }
  }
  
}
</script>

<style lang="scss">
.el-menu-vertical-demo {
width: 280px;
height: 1000px;
position: relative;
}
</style>