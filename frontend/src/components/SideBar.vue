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
    
    <el-menu-item index="1">
      <el-icon><location /></el-icon>
      <span style="color: rgb(191, 203, 217)">Job Management </span>
    </el-menu-item>

    <el-menu-item index="2">
      <el-icon><location /></el-icon>
      <span style="color: rgb(191, 203, 217)">Location Management</span>
    </el-menu-item>

    <el-menu-item index="3">
      <el-icon><Sunny /></el-icon>
      <span style="color: rgb(191, 203, 217)">Skill Management</span>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon><Document /></el-icon>
      <span style="color: rgb(191, 203, 217)"><span class="content-menu-item">Test Management</span></span>
    </el-menu-item>

    <el-menu-item index="5">
      <el-icon><User /></el-icon>
      <span style="color: rgb(191, 203, 217)">Candidate Management</span>
    </el-menu-item>

    <el-menu-item index="6">
      <el-icon><Calendar/></el-icon>
      <span style="color: rgb(191, 203, 217)">Calendar Interview</span>
    </el-menu-item>

    <el-menu-item index="7">
      <el-icon><setting /></el-icon>
      <span style="color: rgb(191, 203, 217)">Setting</span>
    </el-menu-item>

    
    <el-menu-item index="8">
      <el-icon><User /></el-icon>
      <span style="color: rgb(191, 203, 217)">Candidate Management</span>
    </el-menu-item>

    <el-menu-item index="9">
      <el-icon><Calendar/></el-icon>
      <span style="color: rgb(191, 203, 217)">Calendar Interview</span>
    </el-menu-item>

    <el-menu-item index="10">
      <el-icon><setting /></el-icon>
      <span style="color: rgb(191, 203, 217)">Setting</span>
    </el-menu-item>

    
    <el-menu-item index="11">
      <el-icon><User /></el-icon>
      <span style="color: rgb(191, 203, 217)">Candidate Management</span>
    </el-menu-item>

    <el-menu-item index="12">
      <el-icon><Calendar/></el-icon>
      <span style="color: rgb(191, 203, 217)">Calendar Interview</span>
    </el-menu-item>

    <el-menu-item index="13">
      <el-icon><setting /></el-icon>
      <span style="color: rgb(191, 203, 217)">Setting</span>
    </el-menu-item>

   
 
  </el-menu>
    </div>
    
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