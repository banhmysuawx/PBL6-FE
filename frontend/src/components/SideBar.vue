<template>
    <div>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-menu-item index="1">
      <el-icon><location /></el-icon>
      <template #title>Job Management </template>
    </el-menu-item>

    <el-menu-item index="2">
      <el-icon><location /></el-icon>
      <template #title>Location Management</template>
    </el-menu-item>

    <el-menu-item index="3">
      <el-icon><Sunny /></el-icon>
      <template #title>Skill Management</template>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon><Document /></el-icon>
      <template #title><span class="content-menu-item">Test Management</span></template>
    </el-menu-item>

    <el-menu-item index="5">
      <el-icon><User /></el-icon>
      <template #title>Candidate Management</template>
    </el-menu-item>

    <el-menu-item index="6">
      <el-icon><Calendar /></el-icon>
      <template #title>Calendar Interview</template>
    </el-menu-item>

    <el-menu-item index="7">
      <el-icon><setting /></el-icon>
      <template #title>Setting</template>
    </el-menu-item>

    <div v-if="isCollapse==true">
      <el-button @click="changeCollapse()"> <el-icon><Expand /></el-icon></el-button>
    </div>
    <div v-else>
      <el-button @click="changeCollapse()"><el-icon><Fold /></el-icon></el-button>
    </div>
 
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
}

</style>